require('dotenv').config();
const fs = require('fs');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const { db, initDatabase } = require('./src/config/db');

const apiRoutes = require('./src/routes/api');
const adminRoutes = require('./src/routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const { TRUSTED_HOSTS } = require('./src/services/securityService');

// 1. Enable Trust Proxy (required for secure cookies and accurate client IP behind Hostinger CDN / reverse proxy)
app.set('trust proxy', 1);
app.disable('x-powered-by');

// 2. Sensitive File Shield Middleware: Block direct downloads of database, config, and source files
const BLOCKED_FILE_EXTENSIONS = /\.(sqlite|sqlite3|db|env|json|lock|log|git|sh|yml|yaml|md|ts|map|bak|sql)$/i;
app.use((req, res, next) => {
  const pathname = req.path.toLowerCase();
  // Allow explicit legitimate public XML/TXT files
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt' || pathname === '/llms.txt' || pathname === '/llms-full.txt') {
    return next();
  }
  if (BLOCKED_FILE_EXTENSIONS.test(pathname) || pathname.includes('database.sqlite')) {
    return res.status(403).type('text/plain').send('403 Forbidden: Direct access to internal system files is prohibited.');
  }
  next();
});

// 3. Strict CORS Policy
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    try {
      const hostname = new URL(origin).hostname.toLowerCase();
      if (TRUSTED_HOSTS.has(hostname) || hostname.endsWith('.hostingersite.com')) {
        return callback(null, true);
      }
      return callback(new Error('CORS request blocked from untrusted origin: ' + hostname));
    } catch (e) {
      return callback(new Error('Malformed origin header'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token', 'Accept']
};
app.use(cors(corsOptions));

// 4. Request body parsing with strict size limits (prevents payload flood / denial of service)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// 5. Hardened Session for Admin authentication
app.use(session({
  name: '__cderma_sid',
  secret: process.env.SESSION_SECRET || 'cderma_nepal_clinical_botanical_luxury_2026',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days max lifetime
    httpOnly: true,                  // Mitigate XSS session theft
    sameSite: 'lax',                 // Strict CSRF defense on top-level navigations
    secure: isProduction             // Enforce HTTPS transmission in production
  }
}));

// 6. Comprehensive Security Headers & Content Security Policy (CSP)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  // Enforce HSTS in production or over HTTPS
  if (isProduction || req.secure) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Content Security Policy tailored for CDerma typography and UI libraries
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://cderma.com.np https://antiquewhite-porcupine-932870.hostingersite.com https://*.hostingersite.com",
    "connect-src 'self'",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '));

  next();
});

// 7. Static Asset Directories with Content-Type and Nosniff enforcement
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '1d',
  setHeaders: (res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

app.use('/uploads', (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Disposition', 'inline');
  next();
}, express.static(path.join(__dirname, 'public/uploads'), {
  maxAge: '1d'
}));

app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

// Public APIs
app.use('/api', apiRoutes);

// Admin CMS
app.use('/admin', adminRoutes);

// Clean Route Handlers for Public Web Pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/products', (req, res) => res.sendFile(path.join(__dirname, 'products.html')));
app.get('/products.html', (req, res) => res.sendFile(path.join(__dirname, 'products.html')));

app.get('/product-detail', (req, res) => res.sendFile(path.join(__dirname, 'product-detail.html')));
app.get('/product-detail.html', (req, res) => res.sendFile(path.join(__dirname, 'product-detail.html')));
app.get('/products/:slug', (req, res) => res.sendFile(path.join(__dirname, 'product-detail.html')));

app.get('/science', (req, res) => res.sendFile(path.join(__dirname, 'science.html')));
app.get('/science.html', (req, res) => res.sendFile(path.join(__dirname, 'science.html')));

app.get('/b2b', (req, res) => res.sendFile(path.join(__dirname, 'b2b.html')));
app.get('/b2b.html', (req, res) => res.sendFile(path.join(__dirname, 'b2b.html')));

app.get('/clinics', (req, res) => res.sendFile(path.join(__dirname, 'clinics.html')));
app.get('/clinics.html', (req, res) => res.sendFile(path.join(__dirname, 'clinics.html')));

app.get('/monographs', (req, res) => res.sendFile(path.join(__dirname, 'monographs.html')));
app.get('/monographs.html', (req, res) => res.sendFile(path.join(__dirname, 'monographs.html')));
app.get('/doctors-advice', (req, res) => res.sendFile(path.join(__dirname, 'monographs.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'monographs.html')));

// AI & LLM Discovery Endpoints (llms.txt standard)
app.get('/llms.txt', (req, res) => {
  const llmsPath = path.join(__dirname, 'llms.txt');
  if (fs.existsSync(llmsPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.sendFile(llmsPath);
  }
  try {
    const { generateAll } = require('./src/services/llmsGenerator');
    generateAll().then(result => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.send(result.llmsTxt);
    }).catch(err => {
      res.status(500).type('text/plain').send('# Error generating llms.txt: ' + err.message);
    });
  } catch (err) {
    res.status(404).type('text/plain').send('# llms.txt not found');
  }
});

app.get('/llms-full.txt', (req, res) => {
  const fullPath = path.join(__dirname, 'llms-full.txt');
  if (fs.existsSync(fullPath)) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.sendFile(fullPath);
  }
  try {
    const { generateAll } = require('./src/services/llmsGenerator');
    generateAll().then(result => {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.send(result.llmsFullTxt);
    }).catch(err => {
      res.status(500).type('text/plain').send('# Error generating llms-full.txt: ' + err.message);
    });
  } catch (err) {
    res.status(404).type('text/plain').send('# llms-full.txt not found');
  }
});

// SEO Endpoints: robots.txt and dynamic sitemap.xml
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  try {
    const db = require('./src/config/db');
    const products = db.prepare("SELECT slug, title, image_url, updated_at FROM products WHERE status = 'active' ORDER BY id ASC").all();
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Static pages
    const staticPages = [
      { loc: 'https://cderma.com.np/', priority: '1.0', changefreq: 'weekly', title: 'CDerma Nepal Doctor Recommended Skincare Logo', img: 'https://cderma.com.np/assets/images/cderma-logo.png' },
      { loc: 'https://cderma.com.np/products.html', priority: '0.9', changefreq: 'weekly' },
      { loc: 'https://cderma.com.np/product-detail.html', priority: '0.9', changefreq: 'weekly' },
      { loc: 'https://cderma.com.np/science.html', priority: '0.8', changefreq: 'monthly' },
      { loc: 'https://cderma.com.np/b2b.html', priority: '0.85', changefreq: 'weekly' },
      { loc: 'https://cderma.com.np/clinics.html', priority: '0.8', changefreq: 'weekly' },
      { loc: 'https://cderma.com.np/monographs.html', priority: '0.8', changefreq: 'weekly' }
    ];

    staticPages.forEach(p => {
      xml += `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n`;
      if (p.img) {
        xml += `    <image:image>\n      <image:loc>${p.img}</image:loc>\n      <image:title>${p.title}</image:title>\n    </image:image>\n`;
      }
      xml += `  </url>\n`;
    });

    // Dynamic active products
    products.forEach(prod => {
      const prodImg = prod.image_url ? (prod.image_url.startsWith('http') ? prod.image_url : `https://cderma.com.np/${prod.image_url.replace(/^\//, '')}`) : 'https://cderma.com.np/assets/images/cderma-logo.png';
      xml += `  <url>\n    <loc>https://cderma.com.np/products/${encodeURIComponent(prod.slug)}</loc>\n    <lastmod>${prod.updated_at ? prod.updated_at.split(' ')[0] : today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n`;
      xml += `    <image:image>\n      <image:loc>${prodImg}</image:loc>\n      <image:title>${prod.title.replace(/[<>&'"]/g, '')}</image:title>\n    </image:image>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>\n`;
    res.type('application/xml').send(xml);
  } catch (err) {
    res.type('application/xml').sendFile(path.join(__dirname, 'sitemap.xml'));
  }
});

// Canonical Public Web Pages
app.get('/cleanroom', (req, res) => res.sendFile(path.join(__dirname, 'science.html')));
app.get('/cleanroom.html', (req, res) => res.sendFile(path.join(__dirname, 'science.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'science.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/privacy', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/terms', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/faq', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// 404 handler (API routes return JSON, Web requests return 404 page)
app.use((req, res) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/admin/api/')) {
    return res.status(404).json({ success: false, error: 'NOT_FOUND', message: 'API resource not found.' });
  }
  res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Central Error Handler (prevents stack traces & internal error leakage)
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  if (res.headersSent) {
    return next(err);
  }
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: 'INTERNAL_ERROR',
    message: isProduction ? 'An internal error occurred. Please try again later.' : err.message
  });
});

// Start Server
async function startServer() {
  try {
    await initDatabase();

    // Initialize or refresh LLMs.txt files on startup
    try {
      const { generateAll } = require('./src/services/llmsGenerator');
      await generateAll();
    } catch (e) {
      console.warn('Initial LLMs.txt generation notice:', e.message);
    }

    app.listen(PORT, () => {
      console.log(`🌿 CDerma Nepal Full-Stack Node.js Application active on port ${PORT}`);
      console.log(`🌐 Public Website: http://localhost:${PORT}`);
      console.log(`⚙️  Admin CMS:    http://localhost:${PORT}/admin`);
      console.log(`🔐 Default Login: admin / cderma2026! (configure in .env)`);
    });
  } catch (err) {
    console.error('Fatal error initializing server database:', err);
    process.exit(1);
  }
}

startServer();

