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
    const totalSocialChannels = db.prepare('SELECT COUNT(*) as count FROM social_channels').get().count;
    const activeSocialChannels = db.prepare('SELECT COUNT(*) as count FROM social_channels WHERE is_active = 1').get().count;

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
        totalMediaSlots,
        totalSocialChannels,
        activeSocialChannels
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

// POST /admin/api/settings - Update site settings (bulk key-value with upsert and bilingual value_ne)
router.post('/api/settings', requireAdmin, (req, res) => {
  try {
    const { settings } = req.body; // array of { key, value, value_ne, category, label } or object { key: value }
    const upsertStmt = db.prepare(`
      INSERT INTO site_settings (key, value, value_ne, category, label)
      VALUES (@key, @value, @value_ne, COALESCE(@category, 'Custom'), COALESCE(@label, @key))
      ON CONFLICT(key) DO UPDATE SET
        value = CASE WHEN excluded.value IS NOT NULL THEN excluded.value ELSE site_settings.value END,
        value_ne = CASE WHEN excluded.value_ne IS NOT NULL THEN excluded.value_ne ELSE site_settings.value_ne END,
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
            value_ne: s.value_ne !== undefined ? (s.value_ne !== null ? String(s.value_ne) : null) : null,
            category: s.category || null,
            label: s.label || null
          });
        }
      } else if (typeof data === 'object' && data !== null) {
        for (const [key, value] of Object.entries(data)) {
          // If key ends with _ne, check if it targets an existing base setting
          if (key.endsWith('_ne')) {
            const baseKey = key.slice(0, -3);
            const exists = db.prepare('SELECT id FROM site_settings WHERE key = ?').get(baseKey);
            if (exists) {
              db.prepare('UPDATE site_settings SET value_ne = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?').run(String(value), baseKey);
              continue;
            }
          }
          upsertStmt.run({
            key,
            value: value !== undefined ? String(value) : '',
            value_ne: null,
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
router.post('/api/products', requireAdmin, upload.single('image'), (req, res) => {
  try {
    let {
      title, subtitle, slug, category, volume, price_npr,
      clinical_badge, summary, description, key_benefits,
      active_ingredients, inci_full, usage_instructions,
      image_url, is_featured, sort_order, status,
      title_ne, subtitle_ne, category_ne, clinical_badge_ne,
      summary_ne, description_ne, key_benefits_ne, usage_instructions_ne
    } = req.body;

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    const safeSlug = (slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    const benefitsJson = typeof key_benefits === 'string' ? key_benefits : JSON.stringify(key_benefits || []);
    const benefitsNeJson = typeof key_benefits_ne === 'string' ? key_benefits_ne : (key_benefits_ne ? JSON.stringify(key_benefits_ne) : null);
    const ingredientsJson = typeof active_ingredients === 'string' ? active_ingredients : JSON.stringify(active_ingredients || []);

    const stmt = db.prepare(`
      INSERT INTO products (
        slug, title, subtitle, category, volume, price_npr,
        clinical_badge, summary, description, key_benefits,
        active_ingredients, inci_full, usage_instructions,
        image_url, is_featured, sort_order, status,
        title_ne, subtitle_ne, category_ne, clinical_badge_ne,
        summary_ne, description_ne, key_benefits_ne, usage_instructions_ne
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      safeSlug, title, subtitle || '', category, volume || '', parseFloat(price_npr) || 0,
      clinical_badge || '', summary || '', description || '', benefitsJson,
      ingredientsJson, inci_full || '', usage_instructions || '',
      image_url || 'assets/images/product-packaging-dropper.png',
      is_featured ? 1 : 0, parseInt(sort_order) || 0, status || 'active',
      title_ne || null, subtitle_ne || null, category_ne || null, clinical_badge_ne || null,
      summary_ne || null, description_ne || null, benefitsNeJson, usage_instructions_ne || null
    );

    res.status(201).json({ success: true, message: 'Product created successfully.', productId: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /admin/api/products/:id - Update Product
router.put('/api/products/:id', requireAdmin, upload.single('image'), (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let {
      title, subtitle, slug, category, volume, price_npr,
      clinical_badge, summary, description, key_benefits,
      active_ingredients, inci_full, usage_instructions,
      image_url, is_featured, sort_order, status,
      title_ne, subtitle_ne, category_ne, clinical_badge_ne,
      summary_ne, description_ne, key_benefits_ne, usage_instructions_ne
    } = req.body;

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    } else if (!image_url) {
      image_url = existing.image_url;
    }

    const benefitsJson = typeof key_benefits === 'string' ? key_benefits : JSON.stringify(key_benefits || []);
    const benefitsNeJson = typeof key_benefits_ne === 'string' ? key_benefits_ne : (key_benefits_ne !== undefined ? JSON.stringify(key_benefits_ne) : existing.key_benefits_ne);
    const ingredientsJson = typeof active_ingredients === 'string' ? active_ingredients : JSON.stringify(active_ingredients || []);

    const stmt = db.prepare(`
      UPDATE products SET
        slug = ?, title = ?, subtitle = ?, category = ?, volume = ?, price_npr = ?,
        clinical_badge = ?, summary = ?, description = ?, key_benefits = ?,
        active_ingredients = ?, inci_full = ?, usage_instructions = ?,
        image_url = ?, is_featured = ?, sort_order = ?, status = ?,
        title_ne = ?, subtitle_ne = ?, category_ne = ?, clinical_badge_ne = ?,
        summary_ne = ?, description_ne = ?, key_benefits_ne = ?, usage_instructions_ne = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(
      slug !== undefined ? slug : existing.slug,
      title !== undefined ? title : existing.title,
      subtitle !== undefined ? subtitle : existing.subtitle,
      category !== undefined ? category : existing.category,
      volume !== undefined ? volume : existing.volume,
      price_npr !== undefined ? parseFloat(price_npr) : existing.price_npr,
      clinical_badge !== undefined ? clinical_badge : existing.clinical_badge,
      summary !== undefined ? summary : existing.summary,
      description !== undefined ? description : existing.description,
      benefitsJson,
      ingredientsJson,
      inci_full !== undefined ? inci_full : existing.inci_full,
      usage_instructions !== undefined ? usage_instructions : existing.usage_instructions,
      image_url,
      is_featured !== undefined ? (is_featured ? 1 : 0) : existing.is_featured,
      sort_order !== undefined ? (parseInt(sort_order) || 0) : existing.sort_order,
      status !== undefined ? status : existing.status,
      title_ne !== undefined ? title_ne : existing.title_ne,
      subtitle_ne !== undefined ? subtitle_ne : existing.subtitle_ne,
      category_ne !== undefined ? category_ne : existing.category_ne,
      clinical_badge_ne !== undefined ? clinical_badge_ne : existing.clinical_badge_ne,
      summary_ne !== undefined ? summary_ne : existing.summary_ne,
      description_ne !== undefined ? description_ne : existing.description_ne,
      benefitsNeJson,
      usage_instructions_ne !== undefined ? usage_instructions_ne : existing.usage_instructions_ne,
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
  upload.single('doctor_image')(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    try {
      const {
        name, category, city, province, address, phone, email,
        lead_doctor, doctor_nmc, doctor_image, distance_badge,
        stock_summary, batch_units, temp_control, operating_hours,
        is_verified, is_in_stock, map_url, directions_url, latitude, longitude,
        status, sort_order,
        name_ne, category_ne, address_ne, stock_summary_ne, lead_doctor_ne
      } = req.body;

      const finalDoctorImage = req.file ? `/uploads/${req.file.filename}` : (doctor_image || '');

      const stmt = db.prepare(`
        INSERT INTO clinics (
          name, category, city, province, address, phone, email,
          lead_doctor, doctor_nmc, doctor_image, distance_badge,
          stock_summary, batch_units, temp_control, operating_hours,
          is_verified, is_in_stock, map_url, directions_url, latitude, longitude,
          status, sort_order,
          name_ne, category_ne, address_ne, stock_summary_ne, lead_doctor_ne
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?,
          ?, ?,
          ?, ?, ?, ?, ?
        )
      `);
      const result = stmt.run(
        name, category || 'Dermatology & Aesthetic Hospital', city, province, address, phone || '', email || '',
        lead_doctor || '', doctor_nmc || '', finalDoctorImage, distance_badge || '',
        stock_summary || '', batch_units || 'Verified In-Stock', temp_control || '18°C Controlled', operating_hours || '09:00 - 19:00 (Sun-Fri)',
        is_verified ? 1 : 0, is_in_stock !== undefined ? (is_in_stock ? 1 : 0) : 1, map_url || '', directions_url || '',
        parseFloat(latitude) || 27.7172, parseFloat(longitude) || 85.3240,
        status || 'active', parseInt(sort_order) || 0,
        name_ne || null, category_ne || null, address_ne || null, stock_summary_ne || null, lead_doctor_ne || null
      );
      res.status(201).json({ success: true, message: 'Clinic added successfully.', clinicId: result.lastInsertRowid });
    } catch (e) {
      res.status(500).json({ success: false, error: e.message });
    }
  });
});

// PUT /admin/api/clinics/:id - Update Clinic
router.put('/api/clinics/:id', requireAdmin, (req, res) => {
  upload.single('doctor_image')(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, error: err.message });
    try {
      const {
        name, category, city, province, address, phone, email,
        lead_doctor, doctor_nmc, doctor_image, distance_badge,
        stock_summary, batch_units, temp_control, operating_hours,
        is_verified, is_in_stock, map_url, directions_url, latitude, longitude,
        status, sort_order,
        name_ne, category_ne, address_ne, stock_summary_ne, lead_doctor_ne
      } = req.body;

      const existing = db.prepare('SELECT * FROM clinics WHERE id = ?').get(req.params.id);
      const finalDoctorImage = req.file ? `/uploads/${req.file.filename}` : (doctor_image !== undefined ? doctor_image : (existing ? existing.doctor_image : ''));

      const stmt = db.prepare(`
        UPDATE clinics SET
          name = ?, category = ?, city = ?, province = ?, address = ?, phone = ?, email = ?,
          lead_doctor = ?, doctor_nmc = ?, doctor_image = ?, distance_badge = ?,
          stock_summary = ?, batch_units = ?, temp_control = ?, operating_hours = ?,
          is_verified = ?, is_in_stock = ?, map_url = ?, directions_url = ?, latitude = ?, longitude = ?,
          status = ?, sort_order = ?,
          name_ne = ?, category_ne = ?, address_ne = ?, stock_summary_ne = ?, lead_doctor_ne = ?
        WHERE id = ?
      `);
      stmt.run(
        name !== undefined ? name : existing.name,
        category !== undefined ? category : existing.category,
        city !== undefined ? city : existing.city,
        province !== undefined ? province : existing.province,
        address !== undefined ? address : existing.address,
        phone !== undefined ? phone : existing.phone,
        email !== undefined ? email : existing.email,
        lead_doctor !== undefined ? lead_doctor : existing.lead_doctor,
        doctor_nmc !== undefined ? doctor_nmc : existing.doctor_nmc,
        finalDoctorImage,
        distance_badge !== undefined ? distance_badge : existing.distance_badge,
        stock_summary !== undefined ? stock_summary : existing.stock_summary,
        batch_units !== undefined ? batch_units : existing.batch_units,
        temp_control !== undefined ? temp_control : existing.temp_control,
        operating_hours !== undefined ? operating_hours : existing.operating_hours,
        is_verified !== undefined ? (is_verified ? 1 : 0) : existing.is_verified,
        is_in_stock !== undefined ? (is_in_stock ? 1 : 0) : existing.is_in_stock,
        map_url !== undefined ? map_url : existing.map_url,
        directions_url !== undefined ? directions_url : existing.directions_url,
        parseFloat(latitude) || (existing ? existing.latitude : 27.7172),
        parseFloat(longitude) || (existing ? existing.longitude : 85.3240),
        status !== undefined ? status : existing.status,
        sort_order !== undefined ? parseInt(sort_order) : existing.sort_order,
        name_ne !== undefined ? name_ne : (existing ? existing.name_ne : null),
        category_ne !== undefined ? category_ne : (existing ? existing.category_ne : null),
        address_ne !== undefined ? address_ne : (existing ? existing.address_ne : null),
        stock_summary_ne !== undefined ? stock_summary_ne : (existing ? existing.stock_summary_ne : null),
        lead_doctor_ne !== undefined ? lead_doctor_ne : (existing ? existing.lead_doctor_ne : null),
        req.params.id
      );
      res.json({ success: true, message: 'Clinic updated successfully.' });
    } catch (e) {
      res.status(500).json({ success: false, error: e.message });
    }
  });
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

// POST /admin/api/monographs - Create Monograph / Article
router.post('/api/monographs', requireAdmin, upload.single('image'), (req, res) => {
  try {
    let {
      code, title, category, indication, active_compounds,
      clinical_protocol, dosage_timing, precautions, pdf_file,
      author, read_time, date_text, image_url, summary, content,
      is_published, sort_order,
      title_ne, category_ne, indication_ne, summary_ne, content_ne, clinical_protocol_ne
    } = req.body;

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    const safeCode = code && code.trim() ? code.trim() : `CD-ADV-${Date.now().toString().slice(-4)}`;
    const stmt = db.prepare(`
      INSERT INTO monographs (
        code, title, category, indication, active_compounds, clinical_protocol,
        dosage_timing, precautions, pdf_file, author, read_time, date_text,
        image_url, summary, content, is_published, sort_order,
        title_ne, category_ne, indication_ne, summary_ne, content_ne, clinical_protocol_ne
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      safeCode, title ? title.trim() : 'Untitled Article', category || 'General',
      indication || '', active_compounds || '', clinical_protocol || '',
      dosage_timing || '', precautions || '', pdf_file || '',
      author || 'CDerma Medical Advisory', read_time || '5 min read',
      date_text || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      image_url || 'assets/images/img_7df877252467.jpg',
      summary || '', content || summary || '',
      is_published !== undefined ? (is_published == '1' || is_published === true ? 1 : 0) : 1,
      parseInt(sort_order, 10) || 0,
      title_ne || null, category_ne || null, indication_ne || null, summary_ne || null, content_ne || null, clinical_protocol_ne || null
    );

    res.status(201).json({ success: true, message: 'Article/Monograph published successfully.', monographId: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /admin/api/monographs/:id - Update Monograph / Article
router.put('/api/monographs/:id', requireAdmin, upload.single('image'), (req, res) => {
  try {
    const existing = db.prepare('SELECT * FROM monographs WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Article/Monograph not found' });
    }

    let {
      code, title, category, indication, active_compounds,
      clinical_protocol, dosage_timing, precautions, pdf_file,
      author, read_time, date_text, image_url, summary, content,
      is_published, sort_order,
      title_ne, category_ne, indication_ne, summary_ne, content_ne, clinical_protocol_ne
    } = req.body;

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    } else if (!image_url) {
      image_url = existing.image_url;
    }

    const stmt = db.prepare(`
      UPDATE monographs SET
        code = ?, title = ?, category = ?, indication = ?, active_compounds = ?,
        clinical_protocol = ?, dosage_timing = ?, precautions = ?, pdf_file = ?,
        author = ?, read_time = ?, date_text = ?, image_url = ?, summary = ?, content = ?,
        is_published = ?, sort_order = ?,
        title_ne = ?, category_ne = ?, indication_ne = ?, summary_ne = ?, content_ne = ?, clinical_protocol_ne = ?
      WHERE id = ?
    `);

    stmt.run(
      code !== undefined ? code.trim() : existing.code,
      title !== undefined ? title.trim() : existing.title,
      category !== undefined ? category.trim() : existing.category,
      indication !== undefined ? indication : existing.indication,
      active_compounds !== undefined ? active_compounds : existing.active_compounds,
      clinical_protocol !== undefined ? clinical_protocol : existing.clinical_protocol,
      dosage_timing !== undefined ? dosage_timing : existing.dosage_timing,
      precautions !== undefined ? precautions : existing.precautions,
      pdf_file !== undefined ? pdf_file : existing.pdf_file,
      author !== undefined ? author : existing.author,
      read_time !== undefined ? read_time : existing.read_time,
      date_text !== undefined ? date_text : existing.date_text,
      image_url,
      summary !== undefined ? summary : existing.summary,
      content !== undefined ? content : existing.content,
      is_published !== undefined ? (is_published == '1' || is_published === true ? 1 : 0) : existing.is_published,
      sort_order !== undefined ? parseInt(sort_order, 10) : existing.sort_order,
      title_ne !== undefined ? title_ne : existing.title_ne,
      category_ne !== undefined ? category_ne : existing.category_ne,
      indication_ne !== undefined ? indication_ne : existing.indication_ne,
      summary_ne !== undefined ? summary_ne : existing.summary_ne,
      content_ne !== undefined ? content_ne : existing.content_ne,
      clinical_protocol_ne !== undefined ? clinical_protocol_ne : existing.clinical_protocol_ne,
      req.params.id
    );

    res.json({ success: true, message: 'Article/Monograph updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /admin/api/monographs/:id
router.delete('/api/monographs/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM monographs WHERE id = ?').run(req.params.id);
    res.json({ success: true, message: 'Article/Monograph deleted.' });
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
      imageUrl = `/uploads/${req.file.filename}`;
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
      imageUrl = `/uploads/${req.file.filename}`;
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
  const relativeUrl = `/uploads/${req.file.filename}`;
  res.json({
    success: true,
    message: 'File uploaded successfully.',
    url: relativeUrl,
    filename: req.file.filename
  });
});


// ==================== HERO SLIDES CMS ====================

// GET /admin/api/hero-slides - List all slides
router.get('/api/hero-slides', requireAdmin, (req, res) => {
  try {
    const slides = db.prepare('SELECT * FROM hero_slides ORDER BY sort_order ASC, id ASC').all();
    res.json({ success: true, count: slides.length, slides });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/hero-slides - Create new slide
router.post('/api/hero-slides', requireAdmin, upload.single('image'), (req, res) => {
  try {
    let {
      title, subtitle, badge_text, formula_number, origin_text,
      specs_text, image_url, cta_url, cta_text, sort_order, is_active,
      title_ne, subtitle_ne, badge_text_ne, origin_text_ne, specs_text_ne, cta_text_ne
    } = req.body;

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    if (!title || !image_url) {
      return res.status(400).json({ success: false, message: 'Title and image are required.' });
    }

    const insert = db.prepare(`
      INSERT INTO hero_slides (
        title, subtitle, badge_text, formula_number, origin_text,
        specs_text, image_url, cta_url, cta_text, sort_order, is_active,
        title_ne, subtitle_ne, badge_text_ne, origin_text_ne, specs_text_ne, cta_text_ne
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insert.run(
      title.trim(),
      subtitle ? subtitle.trim() : '',
      badge_text ? badge_text.trim() : 'Flagship Formula',
      formula_number ? formula_number.trim() : 'Formula No. 04',
      origin_text ? origin_text.trim() : 'Origin: Koshi Cleanroom Labs',
      specs_text ? specs_text.trim() : 'pH 5.4 · Pure Hydration',
      image_url.trim(),
      cta_url ? cta_url.trim() : 'product-detail.html',
      cta_text ? cta_text.trim() : 'View Product Details',
      parseInt(sort_order, 10) || 0,
      is_active !== undefined ? (is_active == '1' || is_active === true || is_active === 1 ? 1 : 0) : 1,
      title_ne || null,
      subtitle_ne || null,
      badge_text_ne || null,
      origin_text_ne || null,
      specs_text_ne || null,
      cta_text_ne || null
    );

    res.json({ success: true, message: 'Hero slide created successfully.', slideId: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /admin/api/hero-slides/:id - Update slide
router.put('/api/hero-slides/:id', requireAdmin, upload.single('image'), (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT * FROM hero_slides WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Slide not found.' });
    }

    let {
      title, subtitle, badge_text, formula_number, origin_text,
      specs_text, image_url, cta_url, cta_text, sort_order, is_active,
      title_ne, subtitle_ne, badge_text_ne, origin_text_ne, specs_text_ne, cta_text_ne
    } = req.body;

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    } else if (!image_url) {
      image_url = existing.image_url;
    }

    const update = db.prepare(`
      UPDATE hero_slides SET
        title = ?,
        subtitle = ?,
        badge_text = ?,
        formula_number = ?,
        origin_text = ?,
        specs_text = ?,
        image_url = ?,
        cta_url = ?,
        cta_text = ?,
        sort_order = ?,
        is_active = ?,
        title_ne = ?,
        subtitle_ne = ?,
        badge_text_ne = ?,
        origin_text_ne = ?,
        specs_text_ne = ?,
        cta_text_ne = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    update.run(
      title !== undefined ? title.trim() : existing.title,
      subtitle !== undefined ? subtitle.trim() : existing.subtitle,
      badge_text !== undefined ? badge_text.trim() : existing.badge_text,
      formula_number !== undefined ? formula_number.trim() : existing.formula_number,
      origin_text !== undefined ? origin_text.trim() : existing.origin_text,
      specs_text !== undefined ? specs_text.trim() : existing.specs_text,
      image_url,
      cta_url !== undefined ? cta_url.trim() : existing.cta_url,
      cta_text !== undefined ? cta_text.trim() : existing.cta_text,
      sort_order !== undefined ? parseInt(sort_order, 10) : existing.sort_order,
      is_active !== undefined ? (is_active == '1' || is_active === true || is_active === 1 ? 1 : 0) : existing.is_active,
      title_ne !== undefined ? title_ne : existing.title_ne,
      subtitle_ne !== undefined ? subtitle_ne : existing.subtitle_ne,
      badge_text_ne !== undefined ? badge_text_ne : existing.badge_text_ne,
      origin_text_ne !== undefined ? origin_text_ne : existing.origin_text_ne,
      specs_text_ne !== undefined ? specs_text_ne : existing.specs_text_ne,
      cta_text_ne !== undefined ? cta_text_ne : existing.cta_text_ne,
      id
    );

    res.json({ success: true, message: 'Hero slide updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /admin/api/hero-slides/:id - Delete slide
router.delete('/api/hero-slides/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM hero_slides WHERE id = ?').run(id);
    res.json({ success: true, message: 'Hero slide deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== 8. SOCIAL MEDIA INTEGRATION CMS ====================

// GET /admin/api/social - Fetch all social channels, showcase posts, and meta settings
router.get('/api/social', requireAdmin, (req, res) => {
  try {
    const channels = db.prepare('SELECT * FROM social_channels ORDER BY sort_order ASC, id ASC').all();
    const posts = db.prepare('SELECT * FROM social_posts ORDER BY sort_order ASC, id ASC').all();
    const metaRows = db.prepare("SELECT key, value FROM site_settings WHERE key LIKE 'social_%' OR category = 'Social & Meta'").all();

    const meta = {};
    for (const r of metaRows) {
      meta[r.key] = r.value;
    }

    res.json({
      success: true,
      channels,
      posts,
      meta
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/social/channels - Add new custom social channel
router.post('/api/social/channels', requireAdmin, (req, res) => {
  try {
    const { platform, name, handle, url, icon_name, badge_text, color_hex, is_active, show_in_header, show_in_footer, sort_order } = req.body;
    if (!platform || !name || !url) {
      return res.status(400).json({ success: false, message: 'Platform, Name, and Target URL are required.' });
    }

    const cleanPlatform = platform.toLowerCase().trim().replace(/[^a-z0-9_]/g, '_');
    const existing = db.prepare('SELECT id FROM social_channels WHERE platform = ?').get(cleanPlatform);
    if (existing) {
      return res.status(400).json({ success: false, message: 'A channel with this platform key already exists.' });
    }

    const insert = db.prepare(`
      INSERT INTO social_channels (
        platform, name, handle, url, icon_name, badge_text, color_hex,
        is_active, show_in_header, show_in_footer, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = insert.run(
      cleanPlatform,
      name.trim(),
      handle ? handle.trim() : '',
      url.trim(),
      icon_name ? icon_name.trim() : 'share',
      badge_text ? badge_text.trim() : '',
      color_hex ? color_hex.trim() : '#1d1c16',
      is_active == '1' || is_active === 1 || is_active === true ? 1 : 0,
      show_in_header == '1' || show_in_header === 1 || show_in_header === true ? 1 : 0,
      show_in_footer == '1' || show_in_footer === 1 || show_in_footer === true ? 1 : 0,
      parseInt(sort_order, 10) || 0
    );

    res.json({ success: true, id: info.lastInsertRowid, message: 'Social channel added successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /admin/api/social/channels/:id - Update channel
router.put('/api/social/channels/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const channel = db.prepare('SELECT * FROM social_channels WHERE id = ?').get(id);
    if (!channel) {
      return res.status(404).json({ success: false, message: 'Channel not found.' });
    }

    const { name, handle, url, icon_name, badge_text, color_hex, is_active, show_in_header, show_in_footer, sort_order } = req.body;

    const update = db.prepare(`
      UPDATE social_channels SET
        name = ?,
        handle = ?,
        url = ?,
        icon_name = ?,
        badge_text = ?,
        color_hex = ?,
        is_active = ?,
        show_in_header = ?,
        show_in_footer = ?,
        sort_order = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    update.run(
      name !== undefined ? name.trim() : channel.name,
      handle !== undefined ? handle.trim() : channel.handle,
      url !== undefined ? url.trim() : channel.url,
      icon_name !== undefined ? icon_name.trim() : channel.icon_name,
      badge_text !== undefined ? badge_text.trim() : channel.badge_text,
      color_hex !== undefined ? color_hex.trim() : channel.color_hex,
      is_active !== undefined ? (is_active == '1' || is_active === 1 || is_active === true ? 1 : 0) : channel.is_active,
      show_in_header !== undefined ? (show_in_header == '1' || show_in_header === 1 || show_in_header === true ? 1 : 0) : channel.show_in_header,
      show_in_footer !== undefined ? (show_in_footer == '1' || show_in_footer === 1 || show_in_footer === true ? 1 : 0) : channel.show_in_footer,
      sort_order !== undefined ? parseInt(sort_order, 10) : channel.sort_order,
      id
    );

    res.json({ success: true, message: 'Social channel updated successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /admin/api/social/channels/:id - Delete custom channel
router.delete('/api/social/channels/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM social_channels WHERE id = ?').run(id);
    res.json({ success: true, message: 'Social channel deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/social/posts - Add social showcase item
router.post('/api/social/posts', requireAdmin, upload.single('media'), (req, res) => {
  try {
    let { platform, title, post_url, author_handle, media_url, caption, metrics_text, is_featured, sort_order } = req.body;
    if (!title || !post_url) {
      return res.status(400).json({ success: false, message: 'Title and Post URL are required.' });
    }

    if (req.file) {
      media_url = `/uploads/${req.file.filename}`;
    }

    const insert = db.prepare(`
      INSERT INTO social_posts (
        platform, title, post_url, author_handle, media_url, caption, metrics_text, is_featured, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const info = insert.run(
      platform ? platform.trim() : 'instagram',
      title.trim(),
      post_url.trim(),
      author_handle ? author_handle.trim() : '@cdermanepal',
      media_url ? media_url.trim() : 'assets/images/img_282f9d7b4a1e.jpg',
      caption ? caption.trim() : '',
      metrics_text ? metrics_text.trim() : '',
      is_featured == '1' || is_featured === 1 || is_featured === true ? 1 : 0,
      parseInt(sort_order, 10) || 0
    );

    res.json({ success: true, id: info.lastInsertRowid, message: 'Social post added to showcase.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /admin/api/social/posts/:id - Update social showcase item
router.put('/api/social/posts/:id', requireAdmin, upload.single('media'), (req, res) => {
  try {
    const { id } = req.params;
    const post = db.prepare('SELECT * FROM social_posts WHERE id = ?').get(id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Social post not found.' });
    }

    let { platform, title, post_url, author_handle, media_url, caption, metrics_text, is_featured, sort_order } = req.body;

    if (req.file) {
      media_url = `/uploads/${req.file.filename}`;
    } else if (!media_url) {
      media_url = post.media_url;
    }

    const update = db.prepare(`
      UPDATE social_posts SET
        platform = ?,
        title = ?,
        post_url = ?,
        author_handle = ?,
        media_url = ?,
        caption = ?,
        metrics_text = ?,
        is_featured = ?,
        sort_order = ?
      WHERE id = ?
    `);

    update.run(
      platform !== undefined ? platform.trim() : post.platform,
      title !== undefined ? title.trim() : post.title,
      post_url !== undefined ? post_url.trim() : post.post_url,
      author_handle !== undefined ? author_handle.trim() : post.author_handle,
      media_url,
      caption !== undefined ? caption.trim() : post.caption,
      metrics_text !== undefined ? metrics_text.trim() : post.metrics_text,
      is_featured !== undefined ? (is_featured == '1' || is_featured === 1 || is_featured === true ? 1 : 0) : post.is_featured,
      sort_order !== undefined ? parseInt(sort_order, 10) : post.sort_order,
      id
    );

    res.json({ success: true, message: 'Social showcase post updated.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /admin/api/social/posts/:id - Delete social showcase item
router.delete('/api/social/posts/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM social_posts WHERE id = ?').run(id);
    res.json({ success: true, message: 'Social post deleted from showcase.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /admin/api/social/meta - Save Open Graph and Floating WhatsApp settings
router.post('/api/social/meta', requireAdmin, (req, res) => {
  try {
    const { meta } = req.body; // object { key: value }
    if (!meta || typeof meta !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid meta object.' });
    }

    const upsertStmt = db.prepare(`
      INSERT INTO site_settings (key, value, category, label)
      VALUES (@key, @value, 'Social & Meta', @key)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP
    `);

    const updateTx = db.transaction((obj) => {
      for (const [k, v] of Object.entries(obj)) {
        upsertStmt.run({
          key: k,
          value: v !== undefined ? String(v).trim() : ''
        });
      }
    });

    updateTx(meta);
    res.json({ success: true, message: 'Social sharing & Open Graph settings saved.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
