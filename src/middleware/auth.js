/**
 * Admin Authentication Middleware
 * Protects CMS routes by verifying session state, idle timeouts, and role authorization.
 */

const SESSION_IDLE_TIMEOUT_MS = 12 * 60 * 60 * 1000; // 12 hours idle timeout

function requireAdmin(req, res, next) {
  if (req.session && (req.session.adminUser || req.session.adminLoggedIn)) {
    // Check idle timeout
    const now = Date.now();
    if (req.session.lastActivity && (now - req.session.lastActivity > SESSION_IDLE_TIMEOUT_MS)) {
      req.session.destroy(() => {});
      if (isApiRequest(req)) {
        return res.status(401).json({ success: false, error: 'SESSION_EXPIRED', message: 'Session expired due to inactivity. Please log in again.' });
      }
      return res.redirect('/admin/login?expired=1');
    }

    req.session.lastActivity = now;
    return next();
  }

  // Return 401 JSON for API requests
  if (isApiRequest(req)) {
    return res.status(401).json({ success: false, error: 'UNAUTHORIZED', message: 'Authentication required. Please login.' });
  }

  // Redirect web browser to login page
  return res.redirect('/admin/login');
}

function isApiRequest(req) {
  return req.path.startsWith('/api/') ||
         (req.originalUrl && req.originalUrl.includes('/api/')) ||
         req.xhr ||
         (req.headers.accept && req.headers.accept.includes('application/json'));
}

module.exports = {
  requireAdmin,
  isApiRequest
};
