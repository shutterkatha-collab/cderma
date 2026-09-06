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
    const totalMediaSlots = db.prepare('SELECT COUNT(*) as count FROM site_media').get().count;

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
        totalMonographs,
        totalMediaSlots
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

// POST /admin/api/settings - Update site settings (bulk key-value with upsert)
router.post('/api/settings', requireAdmin, (req, res) => {
  try {
    const { settings } = req.body; // array of { key, value, category, label } or object { key: value }
    const upsertStmt = db.prepare(`
      INSERT INTO site_settings (key, value, category, label)
      VALUES (@key, @value, COALESCE(@category, 'Custom'), COALESCE(@label, @key))
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        category = COALESCE(excluded.category, site_settings.category),
        label = COALESCE(excluded.label, site_settings.label),
        updated_at = CURRENT_TIMESTAMP
    `);

    const updateTx = db.transaction((data) => {
      if (Array.isArray(data)) {
        for (const s of data) {
          upsertStmt.run({
            key: s.key,
            value: s.value !== undefined ? String(s.value) : '',
            category: s.category || null,
            label: s.label || null
          });
        }
      } else if (typeof data === 'object' && data !== null) {
        for (const [key, value] of Object.entries(data)) {
          upsertStmt.run({
            key,
            value: value !== undefined ? String(value) : '',
            category: null,
            label: null
          });
        }
      }
    });

    updateTx(settings);
    res.json({ success: true, message: 'Site copy and settings updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/settings/custom - Create or configure a new custom content key
router.post('/api/settings/custom', requireAdmin, (req, res) => {
  try {
    const { key, label, category, value } = req.body;
    if (!key || !key.trim()) {
      return res.status(400).json({ success: false, message: 'Field key is required (e.g. promo_banner_text).' });
    }

    const cleanKey = key.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const cleanLabel = label && label.trim() ? label.trim() : cleanKey;
    const cleanCategory = category && category.trim() ? category.trim() : 'General';
    const cleanValue = value !== undefined ? String(value) : '';

    const stmt = db.prepare(`
      INSERT INTO site_settings (key, value, category, label)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        category = excluded.category,
        label = excluded.label,
        updated_at = CURRENT_TIMESTAMP
    `);

    stmt.run(cleanKey, cleanValue, cleanCategory, cleanLabel);
    res.json({
      success: true,
      message: `Content field "${cleanKey}" registered successfully.`,
      field: { key: cleanKey, value: cleanValue, category: cleanCategory, label: cleanLabel }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /admin/api/settings/:key - Delete a custom setting key
router.delete('/api/settings/:key', requireAdmin, (req, res) => {
  try {
    const { key } = req.params;
    db.prepare('DELETE FROM site_settings WHERE key = ?').run(key);
    res.json({ success: true, message: `Field "${key}" removed.` });
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

// ==================== 7. MEDIA & ASSET MANAGEMENT API ====================

// GET /admin/api/media - Fetch all media slots
router.get('/api/media', requireAdmin, (req, res) => {
  try {
    const slots = db.prepare('SELECT * FROM site_media ORDER BY page ASC, id ASC').all();
    res.json({ success: true, count: slots.length, media: slots });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/media/:slot_key - Update specific image slot (via file or URL)
router.post('/api/media/:slot_key', requireAdmin, upload.single('file'), (req, res) => {
  try {
    const { slot_key } = req.params;
    let imageUrl = req.body.image_url;

    if (req.file) {
      imageUrl = `uploads/${req.file.filename}`;
    }

    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Please provide an image file or an image URL.' });
    }

    const slotLabel = req.body.slot_label;
    const description = req.body.description;
    const page = req.body.page || 'Global';

    // Check if slot exists
    const existing = db.prepare('SELECT * FROM site_media WHERE slot_key = ?').get(slot_key);

    if (existing) {
      db.prepare(`
        UPDATE site_media
        SET image_url = ?,
            slot_label = COALESCE(?, slot_label),
            description = COALESCE(?, description),
            page = COALESCE(?, page),
            updated_at = CURRENT_TIMESTAMP
        WHERE slot_key = ?
      `).run(imageUrl, slotLabel || null, description || null, page || null, slot_key);
    } else {
      db.prepare(`
        INSERT INTO site_media (slot_key, slot_label, page, description, image_url)
        VALUES (?, ?, ?, ?, ?)
      `).run(slot_key, slotLabel || slot_key, page, description || '', imageUrl);
    }

    const updated = db.prepare('SELECT * FROM site_media WHERE slot_key = ?').get(slot_key);
    res.json({
      success: true,
      message: `Image slot "${slot_key}" updated successfully!`,
      slot: updated
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/media/custom - Register a new custom media slot
router.post('/api/media/custom', requireAdmin, upload.single('file'), (req, res) => {
  try {
    const { slot_key, slot_label, page, description } = req.body;
    let imageUrl = req.body.image_url;

    if (req.file) {
      imageUrl = `uploads/${req.file.filename}`;
    }

    if (!slot_key || !slot_key.trim()) {
      return res.status(400).json({ success: false, message: 'Slot key is required (e.g. promo_banner_image).' });
    }

    const cleanKey = slot_key.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const cleanLabel = slot_label && slot_label.trim() ? slot_label.trim() : cleanKey;
    const cleanPage = page && page.trim() ? page.trim() : 'Global';
    const cleanDesc = description && description.trim() ? description.trim() : '';
    const cleanUrl = imageUrl && imageUrl.trim() ? imageUrl.trim() : 'assets/images/product-packaging-dropper.png';

    db.prepare(`
      INSERT INTO site_media (slot_key, slot_label, page, description, image_url)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(slot_key) DO UPDATE SET
        slot_label = excluded.slot_label,
        page = excluded.page,
        description = excluded.description,
        image_url = excluded.image_url,
        updated_at = CURRENT_TIMESTAMP
    `).run(cleanKey, cleanLabel, cleanPage, cleanDesc, cleanUrl);

    const slot = db.prepare('SELECT * FROM site_media WHERE slot_key = ?').get(cleanKey);
    res.json({
      success: true,
      message: `Media slot "${cleanKey}" created successfully.`,
      slot
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /admin/api/media/:slot_key - Delete an image slot
router.delete('/api/media/:slot_key', requireAdmin, (req, res) => {
  try {
    const { slot_key } = req.params;
    db.prepare('DELETE FROM site_media WHERE slot_key = ?').run(slot_key);
    res.json({ success: true, message: `Media slot "${slot_key}" deleted.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/upload - General Asset Uploader
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
