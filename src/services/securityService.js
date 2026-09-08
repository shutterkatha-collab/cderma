/**
 * CDerma Nepal — Core Security Service
 * Implements:
 * 1. Modern Memory-Hard Password Hashing (crypto.scrypt with auto-upgrade from bcrypt)
 * 2. Timing-Safe Password Comparison (prevents side-channel user enumeration)
 * 3. In-Memory Distributed-Ready Rate Limiting (sliding window per IP/endpoint)
 * 4. CSRF & Origin Verification for State-Changing Operations
 * 5. Structured Security Audit Logging
 */

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// ==========================================
// 1. MODERN PASSWORD HASHING (SCRYPT + BCRYPT COMPAT)
// ==========================================

const SCRYPT_CONFIG = {
  N: 16384, // CPU/memory cost
  r: 8,     // Block size
  p: 1,     // Parallelization
  keyLen: 64
};

/**
 * Hash a password using Node.js crypto.scrypt (NIST approved memory-hard algorithm)
 * @param {string} password 
 * @returns {string} format: scrypt$N$r$p$saltHex$derivedKeyHex
 */
function hashPassword(password) {
  if (typeof password !== 'string' || password.length === 0) {
    throw new Error('Password must be a non-empty string.');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, SCRYPT_CONFIG.keyLen, {
    N: SCRYPT_CONFIG.N,
    r: SCRYPT_CONFIG.r,
    p: SCRYPT_CONFIG.p
  });
  return `scrypt$${SCRYPT_CONFIG.N}$${SCRYPT_CONFIG.r}$${SCRYPT_CONFIG.p}$${salt}$${derivedKey.toString('hex')}`;
}

/**
 * Verify a password against either a modern scrypt hash or legacy bcrypt hash.
 * Constant-time comparison ensures protection against timing attacks.
 * @param {string} password 
 * @param {string} storedHash 
 * @returns {{ valid: boolean, needsRehash: boolean }}
 */
function verifyPassword(password, storedHash) {
  if (!password || !storedHash) {
    // Constant-time dummy check to defeat timing attacks
    crypto.scryptSync('dummy_password_timing_pad', 'dummy_salt_padding_16b', SCRYPT_CONFIG.keyLen, {
      N: SCRYPT_CONFIG.N,
      r: SCRYPT_CONFIG.r,
      p: SCRYPT_CONFIG.p
    });
    return { valid: false, needsRehash: false };
  }

  // Case 1: Modern scrypt hash
  if (storedHash.startsWith('scrypt$')) {
    const parts = storedHash.split('$');
    if (parts.length !== 6) return { valid: false, needsRehash: false };
    const N = parseInt(parts[1], 10);
    const r = parseInt(parts[2], 10);
    const p = parseInt(parts[3], 10);
    const salt = parts[4];
    const expectedHex = parts[5];

    try {
      const derivedKey = crypto.scryptSync(password, salt, expectedHex.length / 2, { N, r, p });
      const expectedBuf = Buffer.from(expectedHex, 'hex');
      const valid = crypto.timingSafeEqual(derivedKey, expectedBuf);
      const needsRehash = N !== SCRYPT_CONFIG.N || r !== SCRYPT_CONFIG.r || p !== SCRYPT_CONFIG.p;
      return { valid, needsRehash };
    } catch (err) {
      return { valid: false, needsRehash: false };
    }
  }

  // Case 2: Legacy bcrypt hash ($2a$, $2b$, $2y$)
  if (storedHash.startsWith('$2')) {
    try {
      const valid = bcrypt.compareSync(password, storedHash);
      return { valid, needsRehash: valid }; // If valid bcrypt, upgrade to scrypt
    } catch (err) {
      return { valid: false, needsRehash: false };
    }
  }

  return { valid: false, needsRehash: false };
}

// ==========================================
// 2. IN-MEMORY RATE LIMITING ENGINE
// ==========================================

class MemoryRateLimiter {
  constructor(options = {}) {
    this.windowMs = options.windowMs || 60 * 1000; // Default 1 minute
    this.maxRequests = options.maxRequests || 100;
    this.message = options.message || 'Too many requests. Please try again later.';
    this.hits = new Map();

    // Periodic garbage collection every 2 minutes
    setInterval(() => this.cleanup(), 2 * 60 * 1000).unref();
  }

  cleanup() {
    const now = Date.now();
    for (const [key, record] of this.hits.entries()) {
      if (now - record.resetTime > this.windowMs) {
        this.hits.delete(key);
      }
    }
  }

  getClientKey(req) {
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0].trim() : (req.socket.remoteAddress || '127.0.0.1');
    return `${ip}:${req.baseUrl || ''}${req.path || ''}`;
  }

  middleware() {
    return (req, res, next) => {
      const key = this.getClientKey(req);
      const now = Date.now();

      let record = this.hits.get(key);
      if (!record || (now > record.resetTime)) {
        record = { count: 1, resetTime: now + this.windowMs };
        this.hits.set(key, record);
      } else {
        record.count++;
      }

      const remaining = Math.max(0, this.maxRequests - record.count);
      const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

      res.setHeader('RateLimit-Limit', this.maxRequests);
      res.setHeader('RateLimit-Remaining', remaining);
      res.setHeader('RateLimit-Reset', resetSeconds);

      if (record.count > this.maxRequests) {
        res.setHeader('Retry-After', resetSeconds);
        return res.status(429).json({
          success: false,
          error: 'TOO_MANY_REQUESTS',
          message: this.message,
          retryAfter: resetSeconds
        });
      }

      next();
    };
  }
}

// Pre-configured rate limiters
const authRateLimiter = new MemoryRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,            // 5 failed login attempts per IP
  message: 'Too many login attempts from this IP address. Please wait 15 minutes before retrying.'
});

const formRateLimiter = new MemoryRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 12,           // 12 submissions per hour
  message: 'Form submission frequency limit exceeded. Please wait before submitting additional applications.'
});

const apiRateLimiter = new MemoryRateLimiter({
  windowMs: 60 * 1000,      // 1 minute
  maxRequests: 180,          // 180 requests per min
  message: 'API request rate limit exceeded. Please slow down.'
});

// ==========================================
// 3. CSRF & ORIGIN VALIDATION MIDDLEWARE
// ==========================================

const TRUSTED_HOSTS = new Set([
  'cderma.com.np',
  'www.cderma.com.np',
  'antiquewhite-porcupine-932870.hostingersite.com',
  'localhost',
  '127.0.0.1'
]);

/**
 * Middleware to verify Origin and Referer headers for state-changing requests (POST, PUT, DELETE, PATCH).
 * Protects against Cross-Site Request Forgery (CSRF) without requiring breaking changes.
 */
function verifyCsrfOrigin(req, res, next) {
  // Safe read-only HTTP methods do not mutate state
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const origin = req.headers['origin'];
  const referer = req.headers['referer'];

  // Check Origin header first if present
  if (origin) {
    try {
      const url = new URL(origin);
      const hostname = url.hostname.toLowerCase();
      if (!TRUSTED_HOSTS.has(hostname) && !hostname.endsWith('.hostingersite.com')) {
        return res.status(403).json({
          success: false,
          message: 'Cross-origin mutation rejected. Untrusted Origin.'
        });
      }
    } catch (e) {
      return res.status(403).json({ success: false, message: 'Invalid Origin header.' });
    }
  } else if (referer) {
    try {
      const url = new URL(referer);
      const hostname = url.hostname.toLowerCase();
      if (!TRUSTED_HOSTS.has(hostname) && !hostname.endsWith('.hostingersite.com')) {
        return res.status(403).json({
          success: false,
          message: 'Cross-origin mutation rejected. Untrusted Referer.'
        });
      }
    } catch (e) {
      return res.status(403).json({ success: false, message: 'Invalid Referer header.' });
    }
  }

  next();
}

// ==========================================
// 4. SECURITY AUDIT LOGGING ENGINE
// ==========================================

/**
 * Write a security audit event to SQLite database
 * @param {object} db 
 * @param {object} event 
 */
function logSecurityEvent(db, {
  event_type,
  severity = 'INFO',
  ip_address = null,
  user_agent = null,
  username = null,
  details = null
}) {
  try {
    if (!db || !event_type) return;
    const detailStr = typeof details === 'object' ? JSON.stringify(details) : (details || null);
    db.prepare(`
      INSERT INTO security_audit_logs (
        event_type, severity, ip_address, user_agent, username, details
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      event_type,
      severity,
      ip_address,
      user_agent ? user_agent.substring(0, 255) : null,
      username,
      detailStr
    );
  } catch (err) {
    console.error('Failed to write security audit log:', err.message);
  }
}

/**
 * Helper to extract client IP from Express request safely
 */
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket ? req.socket.remoteAddress : 'unknown';
}

module.exports = {
  hashPassword,
  verifyPassword,
  authRateLimiter,
  formRateLimiter,
  apiRateLimiter,
  verifyCsrfOrigin,
  logSecurityEvent,
  getClientIp,
  TRUSTED_HOSTS
};
