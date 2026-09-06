const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { requireAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// ==================== AUTH ROUTES ====================

// GET /admin/login - Login Page
router.get('/login', (req, res) => {
  if (req.session && req.session.adminUser) {
    return res.redirect('/admin');
  }
  res.sendFile(require('path').resolve(__dirname, '../views/admin/login.html'));
});

// POST /admin/login - Handle Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username.trim());
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify username and password.' });
  }

  req.session.adminUser = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  res.json({ success: true, message: 'Authenticated successfully.', redirect: '/admin' });
});

// POST /admin/logout - Handle Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true, redirect: '/admin/login' });
  });
});

// ==================== PROTECTED ADMIN API ====================

// GET /admin - Main CMS Dashboard View
router.get('/', requireAdmin, (req, res) => {
  res.sendFile(require('path').resolve(__dirname, '../views/admin/index.html'));
});

// GET /admin/api/stats - Dashboard Overview Metrics
router.get('/api/stats', requireAdmin, (req, res) => {
  try {
    const pendingB2B = db.prepare("SELECT COUNT(*) as count FROM b2b_applications WHERE status = 'pending'").get().count;
    const totalB2B = db.prepare('SELECT COUNT(*) as count FROM b2b_applications').get().count;
    const unreadInquiries = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'unread'").get().count;
    const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const totalClinics = db.prepare("SELECT COUNT(*) as count FROM clinics WHERE status = 'active'").get().count;
    const totalMonographs = db.prepare('SELECT COUNT(*) as count FROM monographs WHERE is_published = 1').get().count;

    const recentApplications = db.prepare('SELECT * FROM b2b_applications ORDER BY created_at DESC LIMIT 5').all();
    const recentInquiries = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 5').all();

    res.json({
      success: true,
      stats: {
        pendingB2B,
        totalB2B,
        unreadInquiries,
        totalProducts,
        totalClinics,
        totalMonographs
      },
      recentApplications,
      recentInquiries,
      currentUser: req.session.adminUser
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== 1. SITE SETTINGS CMS ====================

// GET /admin/api/settings
router.get('/api/settings', requireAdmin, (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM site_settings ORDER BY category ASC, id ASC').all();
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/settings - Update site settings (bulk key-value)
router.post('/api/settings', requireAdmin, (req, res) => {
  try {
    const { settings } = req.body; // array of { key, value } or object { key: value }
    const updateStmt = db.prepare('UPDATE site_settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?');

    const updateTx = db.transaction((data) => {
      if (Array.isArray(data)) {
        for (const s of data) {
          updateStmt.run(s.value, s.key);
        }
      } else if (typeof data === 'object') {
        for (const [key, value] of Object.entries(data)) {
          updateStmt.run(value, key);
        }
      }
    });

    updateTx(settings);
    res.json({ success: true, message: 'Site copy and settings updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== 2. PRODUCTS CMS ====================

// GET /admin/api/products
router.get('/api/products', requireAdmin, (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY sort_order ASC, id ASC').all();
    const parsed = products.map(p => ({
      ...p,
      key_benefits: p.key_benefits ? JSON.parse(p.key_benefits) : [],
      active_ingredients: p.active_ingredients ? JSON.parse(p.active_ingredients) : []
    }));
    res.json({ success: true, products: parsed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/products - Create Product
router.post('/api/products', requireAdmin, (req, res) => {
  try {
    const {
      title, subtitle, slug, category, volume, price_npr,
      clinical_badge, summary, description, key_benefits,
      active_ingredients, inci_full, usage_instructions,
      image_url, is_featured, sort_order, status
    } = req.body;

    const safeSlug = (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    const benefitsJson = typeof key_benefits === 'string' ? key_benefits : JSON.stringify(key_benefits || []);
    const ingredientsJson = typeof active_ingredients === 'string' ? active_ingredients : JSON.stringify(active_ingredients || []);

    const stmt = db.prepare(`
      INSERT INTO products (
        slug, title, subtitle, category, volume, price_npr,
        clinical_badge, summary, description, key_benefits,
        active_ingredients, inci_full, usage_instructions,
        image_url, is_featured, sort_order, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      safeSlug, title, subtitle || '', category, volume || '', parseFloat(price_npr) || 0,
      clinical_badge || '', summary || '', description || '', benefitsJson,
      ingredientsJson, inci_full || '', usage_instructions || '',
      image_url || 'assets/images/product-packaging-dropper.png',
      is_featured ? 1 : 0, parseInt(sort_order) || 0, status || 'active'
    );

    res.status(201).json({ success: true, message: 'Product created successfully.', productId: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /admin/api/products/:id - Update Product
router.put('/api/products/:id', requireAdmin, (req, res) => {
  try {
    const {
      title, subtitle, slug, category, volume, price_npr,
      clinical_badge, summary, description, key_benefits,
      active_ingredients, inci_full, usage_instructions,
      image_url, is_featured, sort_order, status
    } = req.body;

    const benefitsJson = typeof key_benefits === 'string' ? key_benefits : JSON.stringify(key_benefits || []);
    const ingredientsJson = typeof active_ingredients === 'string' ? active_ingredients : JSON.stringify(active_ingredients || []);

    const stmt = db.prepare(`
      UPDATE products SET
        slug = ?, title = ?, subtitle = ?, category = ?, volume = ?, price_npr = ?,
        clinical_badge = ?, summary = ?, description = ?, key_benefits = ?,
        active_ingredients = ?, inci_full = ?, usage_instructions = ?,
        image_url = ?, is_featured = ?, sort_order = ?, status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      slug, title, subtitle || '', category, volume || '', parseFloat(price_npr) || 0,
      clinical_badge || '', summary || '', description || '', benefitsJson,
      ingredientsJson, inci_full || '', usage_instructions || '',
      image_url || 'assets/images/product-packaging-dropper.png',
      is_featured ? 1 : 0, parseInt(sort_order) || 0, status || 'active',
      req.params.id
    );

    res.json({ success: true, message: 'Product updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /admin/api/products/:id
router.delete('/api/products/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Product deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== 3. CLINICS CMS ====================

// GET /admin/api/clinics
router.get('/api/clinics', requireAdmin, (req, res) => {
  try {
    const clinics = db.prepare('SELECT * FROM clinics ORDER BY sort_order ASC, id ASC').all();
    res.json({ success: true, clinics });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/clinics - Create Clinic
router.post('/api/clinics', requireAdmin, (req, res) => {
  try {
    const { name, category, city, province, address, phone, email, lead_doctor, is_verified, map_url, status, sort_order } = req.body;
    const stmt = db.prepare(`
      INSERT INTO clinics (name, category, city, province, address, phone, email, lead_doctor, is_verified, map_url, status, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      name, category || 'Dermatology Clinic', city, province, address, phone || '', email || '',
      lead_doctor || '', is_verified ? 1 : 0, map_url || '', status || 'active', parseInt(sort_order) || 0
    );
    res.status(201).json({ success: true, message: 'Clinic added successfully.', clinicId: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /admin/api/clinics/:id - Update Clinic
router.put('/api/clinics/:id', requireAdmin, (req, res) => {
  try {
    const { name, category, city, province, address, phone, email, lead_doctor, is_verified, map_url, status, sort_order } = req.body;
    const stmt = db.prepare(`
      UPDATE clinics SET
        name = ?, category = ?, city = ?, province = ?, address = ?, phone = ?,
        email = ?, lead_doctor = ?, is_verified = ?, map_url = ?, status = ?, sort_order = ?
      WHERE id = ?
    `);
    stmt.run(
      name, category, city, province, address, phone || '', email || '',
      lead_doctor || '', is_verified ? 1 : 0, map_url || '', status || 'active', parseInt(sort_order) || 0,
      req.params.id
    );
    res.json({ success: true, message: 'Clinic updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /admin/api/clinics/:id
router.delete('/api/clinics/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM clinics WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Clinic removed.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== 4. MONOGRAPHS CMS ====================

// GET /admin/api/monographs
router.get('/api/monographs', requireAdmin, (req, res) => {
  try {
    const monographs = db.prepare('SELECT * FROM monographs ORDER BY sort_order ASC, id ASC').all();
    res.json({ success: true, monographs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/monographs - Create Monograph
router.post('/api/monographs', requireAdmin, (req, res) => {
  try {
    const { code, title, category, indication, active_compounds, clinical_protocol, dosage_timing, precautions, pdf_file, is_published, sort_order } = req.body;
    const stmt = db.prepare(`
      INSERT INTO monographs (code, title, category, indication, active_compounds, clinical_protocol, dosage_timing, precautions, pdf_file, is_published, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      code, title, category || 'Clinical Protocol', indication || '', active_compounds || '',
      clinical_protocol || '', dosage_timing || '', precautions || '', pdf_file || '',
      is_published ? 1 : 0, parseInt(sort_order) || 0
    );
    res.status(201).json({ success: true, message: 'Monograph published.', monographId: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /admin/api/monographs/:id
router.put('/api/monographs/:id', requireAdmin, (req, res) => {
  try {
    const { code, title, category, indication, active_compounds, clinical_protocol, dosage_timing, precautions, pdf_file, is_published, sort_order } = req.body;
    const stmt = db.prepare(`
      UPDATE monographs SET
        code = ?, title = ?, category = ?, indication = ?, active_compounds = ?,
        clinical_protocol = ?, dosage_timing = ?, precautions = ?, pdf_file = ?, is_published = ?, sort_order = ?
      WHERE id = ?
    `);
    stmt.run(
      code, title, category, indication, active_compounds, clinical_protocol, dosage_timing,
      precautions, pdf_file, is_published ? 1 : 0, parseInt(sort_order) || 0, req.params.id
    );
    res.json({ success: true, message: 'Monograph updated.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /admin/api/monographs/:id
router.delete('/api/monographs/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM monographs WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Monograph deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== 5. B2B APPLICATIONS CMS ====================

// GET /admin/api/b2b-applications
router.get('/api/b2b-applications', requireAdmin, (req, res) => {
  try {
    const { status, province } = req.query;
    let query = 'SELECT * FROM b2b_applications';
    const params = [];
    const conditions = [];

    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }
    if (province) {
      conditions.push('province = ?');
      params.push(province);
    }
    if (conditions.length) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY created_at DESC';
    const applications = db.prepare(query).all(...params);
    res.json({ success: true, count: applications.length, applications });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /admin/api/b2b-applications/:id/status
router.put('/api/b2b-applications/:id/status', requireAdmin, (req, res) => {
  try {
    const { status, admin_notes } = req.body;
    const stmt = db.prepare('UPDATE b2b_applications SET status = ?, admin_notes = ? WHERE id = ?');
    stmt.run(status, admin_notes || '', req.params.id);
    res.json({ success: true, message: `Application status updated to ${status}.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== 6. INQUIRIES CMS ====================

// GET /admin/api/inquiries
router.get('/api/inquiries', requireAdmin, (req, res) => {
  try {
    const inquiries = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
    res.json({ success: true, count: inquiries.length, inquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /admin/api/inquiries/:id/status
router.put('/api/inquiries/:id/status', requireAdmin, (req, res) => {
  try {
    const { status } = req.body;
    db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ success: true, message: `Inquiry status updated to ${status}.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== 7. MEDIA UPLOAD API ====================

// POST /admin/api/upload
router.post('/api/upload', requireAdmin, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
  const relativeUrl = `uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: 'File uploaded successfully.',
    url: relativeUrl,
    filename: req.file.filename
  });
});

module.exports = router;
