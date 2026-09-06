/**
 * Admin Authentication Middleware
 * Protects CMS routes by checking session login state.
 */

function requireAdmin(req, res, next) {
  if (req.session && req.session.adminUser) {
    return next();
  }
  
  // If API request, return 401 JSON
  if (req.path.startsWith('/api/') || req.xhr || (req.headers.accept && req.headers.accept.includes('application/json'))) {
    return res.status(401).json({ success: false, message: 'Authentication required. Please login.' });
  }

  // Otherwise redirect to admin login page
  return res.redirect('/admin/login');
}

module.exports = {
  requireAdmin
};
