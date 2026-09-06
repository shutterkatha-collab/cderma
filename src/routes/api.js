const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/settings - Fetch all public site settings
router.get('/settings', (req, res) => {
  try {
    const settings = db.prepare('SELECT key, value, category FROM site_settings').all();
    const settingsMap = {};
    for (const s of settings) {
      settingsMap[s.key] = s.value;
    }
    res.json({ success: true, settings: settingsMap });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/media - Fetch all public site media and images
router.get('/media', (req, res) => {
  try {
    const media = db.prepare('SELECT slot_key, slot_label, page, description, image_url FROM site_media').all();
    const mediaMap = {};
    for (const m of media) {
      mediaMap[m.slot_key] = m.image_url;
    }
    res.json({ success: true, media: mediaMap, slots: media });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products - List active products
router.get('/products', (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = "SELECT * FROM products WHERE status = 'active'";
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (featured === '1' || featured === 'true') {
      query += ' AND is_featured = 1';
    }

    query += ' ORDER BY sort_order ASC, id ASC';
    const products = db.prepare(query).all(...params);

    // Parse JSON fields
    const parsed = products.map(p => ({
      ...p,
      key_benefits: p.key_benefits ? JSON.parse(p.key_benefits) : [],
      active_ingredients: p.active_ingredients ? JSON.parse(p.active_ingredients) : []
    }));

    res.json({ success: true, count: parsed.length, products: parsed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/:slug - Product detail
router.get('/products/:slug', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE slug = ?').get(req.params.slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.key_benefits = product.key_benefits ? JSON.parse(product.key_benefits) : [];
    product.active_ingredients = product.active_ingredients ? JSON.parse(product.active_ingredients) : [];

    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/clinics - Search/list authorized clinics
router.get('/clinics', (req, res) => {
  try {
    const { city, province, search } = req.query;
    let query = "SELECT * FROM clinics WHERE status = 'active'";
    const params = [];

    if (city) {
      query += ' AND LOWER(city) = LOWER(?)';
      params.push(city);
    }
    if (province) {
      query += ' AND LOWER(province) = LOWER(?)';
      params.push(province);
    }
    if (search) {
      query += ' AND (name LIKE ? OR city LIKE ? OR address LIKE ? OR lead_doctor LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    query += ' ORDER BY sort_order ASC, id ASC';
    const clinics = db.prepare(query).all(...params);

    res.json({ success: true, count: clinics.length, clinics });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/monographs - List published monographs
router.get('/monographs', (req, res) => {
  try {
    const monographs = db.prepare('SELECT * FROM monographs WHERE is_published = 1 ORDER BY sort_order ASC, id ASC').all();
    res.json({ success: true, count: monographs.length, monographs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/b2b/apply - Submit B2B Wholesale Application
router.post('/b2b/apply', (req, res) => {
  try {
    const {
      businessName,
      practiceName,
      regNumber,
      clinicType,
      facilityCategory,
      contactPerson,
      workEmail,
      email,
      phoneNumber,
      phone,
      province,
      volumeTier,
      sampleKitRequested,
      sampleKitCheck
    } = req.body;

    const finalPractice = (businessName || practiceName || '').trim();
    const finalContact = (contactPerson || '').trim();
    const finalEmail = (workEmail || email || '').trim();
    const finalPhone = (phoneNumber || phone || '').trim();
    const finalCategory = (clinicType || facilityCategory || 'Dermatology Clinic').trim();
    const finalReg = (regNumber || '').trim();
    const finalProvince = (province || 'Bagmati').trim();
    const finalVolume = (volumeTier || 'starter').trim();
    const sampleKit = sampleKitRequested || sampleKitCheck ? 1 : 0;

    if (!finalPractice || !finalContact || !finalEmail || !finalPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields: Practice Name, Contact Person, Email, and Phone.'
      });
    }

    const stmt = db.prepare(`
      INSERT INTO b2b_applications (
        practice_name, reg_number, facility_category, contact_person,
        email, phone, province, volume_tier, sample_kit_requested, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `);

    const result = stmt.run(
      finalPractice,
      finalReg,
      finalCategory,
      finalContact,
      finalEmail,
      finalPhone,
      finalProvince,
      finalVolume,
      sampleKit
    );

    res.status(201).json({
      success: true,
      message: 'Your clinic wholesale application has been successfully received. Our medical liaison team will review your credentials within 24 hours.',
      applicationId: result.lastInsertRowid
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/inquiries - Submit general inquiry or doctor verification
router.post('/inquiries', (req, res) => {
  try {
    const { name, email, phone, subject, message, type } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and Email are required.' });
    }

    const stmt = db.prepare(`
      INSERT INTO inquiries (name, email, phone, subject, message, type, status)
      VALUES (?, ?, ?, ?, ?, ?, 'unread')
    `);

    const result = stmt.run(
      name.trim(),
      email.trim(),
      (phone || '').trim(),
      (subject || 'General Inquiry').trim(),
      (message || '').trim(),
      type || 'general'
    );

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted. Our clinical coordinator will respond shortly.',
      inquiryId: result.lastInsertRowid
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
