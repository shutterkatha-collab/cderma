const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { formRateLimiter, apiRateLimiter, logSecurityEvent, getClientIp } = require('../services/securityService');
const { validateInquiryInput, validateB2BInput } = require('../services/validatorService');

// Apply general API rate limiting
router.use(apiRateLimiter.middleware());

// GET /api/auth/status - Check if active user has admin session
router.get('/auth/status', (req, res) => {
  const isAdmin = req.session && (req.session.adminLoggedIn === true || !!req.session.adminUser);
  res.json({
    authenticated: isAdmin,
    username: isAdmin ? (req.session.adminUser ? req.session.adminUser.username : (req.session.adminUsername || 'admin')) : null
  });
});


// Language Detection Helper
function getActiveLang(req) {
  const queryLang = (req.query.lang || '').toLowerCase();
  if (queryLang === 'ne' || queryLang === 'en') return queryLang;
  const cookieHeader = req.headers && req.headers.cookie;
  if (cookieHeader) {
    const match = cookieHeader.match(/(?:^|;\s*)cderma_lang=([^;]*)/);
    if (match && (match[1] === 'ne' || match[1] === 'en')) return match[1];
  }
  return 'en';
}

function localizeProduct(p, lang) {
  let keyBenefits = p.key_benefits ? JSON.parse(p.key_benefits) : [];
  if (lang === 'ne' && p.key_benefits_ne) {
    try { keyBenefits = JSON.parse(p.key_benefits_ne); } catch(e) {}
  }
  return {
    ...p,
    title: (lang === 'ne' && p.title_ne) ? p.title_ne : p.title,
    subtitle: (lang === 'ne' && p.subtitle_ne) ? p.subtitle_ne : p.subtitle,
    category: (lang === 'ne' && p.category_ne) ? p.category_ne : p.category,
    clinical_badge: (lang === 'ne' && p.clinical_badge_ne) ? p.clinical_badge_ne : p.clinical_badge,
    summary: (lang === 'ne' && p.summary_ne) ? p.summary_ne : p.summary,
    description: (lang === 'ne' && p.description_ne) ? p.description_ne : p.description,
    key_benefits: keyBenefits,
    active_ingredients: p.active_ingredients ? JSON.parse(p.active_ingredients) : [],
    usage_instructions: (lang === 'ne' && p.usage_instructions_ne) ? p.usage_instructions_ne : p.usage_instructions
  };
}

function localizeMonograph(m, lang) {
  return {
    ...m,
    title: (lang === 'ne' && m.title_ne) ? m.title_ne : m.title,
    category: (lang === 'ne' && m.category_ne) ? m.category_ne : m.category,
    indication: (lang === 'ne' && m.indication_ne) ? m.indication_ne : m.indication,
    summary: (lang === 'ne' && m.summary_ne) ? m.summary_ne : m.summary,
    content: (lang === 'ne' && m.content_ne) ? m.content_ne : m.content,
    clinical_protocol: (lang === 'ne' && m.clinical_protocol_ne) ? m.clinical_protocol_ne : m.clinical_protocol
  };
}

// GET /api/translations - Expose dictionary
router.get('/translations', (req, res) => {
  try {
    const { settingsNepali, productsNepali, heroSlidesNepali, monographsNepali, clinicsNepali } = require('../config/seedDataNepali');
    res.json({
      success: true,
      translations: {
        settings: settingsNepali,
        products: productsNepali,
        heroSlides: heroSlidesNepali,
        monographs: monographsNepali,
        clinics: clinicsNepali
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/hero-slides - Fetch published hero showcase slider slides
router.get('/hero-slides', (req, res) => {
  try {
    const lang = getActiveLang(req);
    const slides = db.prepare('SELECT * FROM hero_slides WHERE is_active = 1 ORDER BY sort_order ASC, id ASC').all();
    const localized = slides.map(s => ({
      ...s,
      title: (lang === 'ne' && s.title_ne) ? s.title_ne : s.title,
      subtitle: (lang === 'ne' && s.subtitle_ne) ? s.subtitle_ne : s.subtitle,
      badge_text: (lang === 'ne' && s.badge_text_ne) ? s.badge_text_ne : s.badge_text,
      origin_text: (lang === 'ne' && s.origin_text_ne) ? s.origin_text_ne : s.origin_text,
      specs_text: (lang === 'ne' && s.specs_text_ne) ? s.specs_text_ne : s.specs_text,
      cta_text: (lang === 'ne' && s.cta_text_ne) ? s.cta_text_ne : s.cta_text
    }));
    res.json({ success: true, lang, count: localized.length, slides: localized });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/settings - Fetch all public site settings
router.get('/settings', (req, res) => {
  try {
    const lang = getActiveLang(req);
    const settings = db.prepare('SELECT key, value, value_ne, category FROM site_settings').all();
    const settingsMap = {};
    for (const s of settings) {
      settingsMap[s.key] = (lang === 'ne' && s.value_ne) ? s.value_ne : s.value;
    }
    res.json({ success: true, lang, settings: settingsMap });
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
    const lang = getActiveLang(req);
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

    const parsed = products.map(p => localizeProduct(p, lang));
    res.json({ success: true, lang, count: parsed.length, products: parsed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/products/:slug - Product detail
router.get('/products/:slug', (req, res) => {
  try {
    const lang = getActiveLang(req);
    const slugOrId = req.params.slug;
    let product = db.prepare('SELECT * FROM products WHERE slug = ?').get(slugOrId);
    if (!product && !isNaN(parseInt(slugOrId, 10))) {
      product = db.prepare('SELECT * FROM products WHERE id = ?').get(parseInt(slugOrId, 10));
    }
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const localized = localizeProduct(product, lang);
    res.json({ success: true, lang, product: localized });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/clinics - Search/list authorized clinics
router.get('/clinics', (req, res) => {
  try {
    const lang = getActiveLang(req);
    const { city, province, search, facility, in_stock } = req.query;
    let query = "SELECT * FROM clinics WHERE status = 'active'";
    const params = [];

    if (city) {
      query += ' AND LOWER(city) = LOWER(?)';
      params.push(city);
    }
    if (province && province !== 'all' && !province.toLowerCase().includes('all')) {
      query += ' AND LOWER(province) LIKE LOWER(?)';
      params.push(`%${province.trim()}%`);
    }
    if (facility && facility !== 'all') {
      if (facility === 'cosmetic') {
        query += " AND (LOWER(category) LIKE '%cosmetic%' OR LOWER(category) LIKE '%retail%' OR LOWER(category) LIKE '%beauty%')";
      } else if (facility === 'dermatology') {
        query += " AND (LOWER(category) LIKE '%dermatology%' OR LOWER(category) LIKE '%dermal%' OR LOWER(category) LIKE '%skin%')";
      } else if (facility === 'hospital') {
        query += " AND (LOWER(category) LIKE '%hospital%' OR LOWER(category) LIKE '%pharmacy%' OR LOWER(category) LIKE '%dispensary%')";
      } else if (facility === 'aesthetic') {
        query += " AND (LOWER(category) LIKE '%aesthetic%' OR LOWER(category) LIKE '%laser%')";
      } else {
        query += ' AND LOWER(category) LIKE LOWER(?)';
        params.push(`%${facility}%`);
      }
    }
    if (in_stock === '1' || in_stock === 'true') {
      query += ' AND is_in_stock = 1';
    }
    if (search) {
      query += ' AND (name LIKE ? OR name_ne LIKE ? OR city LIKE ? OR address LIKE ? OR address_ne LIKE ? OR lead_doctor LIKE ? OR lead_doctor_ne LIKE ? OR doctor_nmc LIKE ? OR stock_summary LIKE ? OR category LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term, term, term, term, term, term, term, term);
    }

    query += ' ORDER BY sort_order ASC, id ASC';
    const clinics = db.prepare(query).all(...params);

    // Dynamic category breakdown counts
    const allActive = db.prepare("SELECT category FROM clinics WHERE status = 'active'").all();
    const counts = {
      all: allActive.length,
      cosmetic: allActive.filter(c => /cosmetic|retail|beauty/i.test(c.category)).length,
      dermatology: allActive.filter(c => /dermatology|dermal|skin/i.test(c.category)).length,
      hospital: allActive.filter(c => /hospital|pharmacy|dispensary/i.test(c.category)).length,
      aesthetic: allActive.filter(c => /aesthetic|laser/i.test(c.category)).length
    };

    const localized = clinics.map(c => ({
      ...c,
      name: (lang === 'ne' && c.name_ne) ? c.name_ne : c.name,
      category: (lang === 'ne' && c.category_ne) ? c.category_ne : c.category,
      address: (lang === 'ne' && c.address_ne) ? c.address_ne : c.address,
      stock_summary: (lang === 'ne' && c.stock_summary_ne) ? c.stock_summary_ne : c.stock_summary,
      lead_doctor: (lang === 'ne' && c.lead_doctor_ne) ? c.lead_doctor_ne : c.lead_doctor
    }));

    res.json({ success: true, lang, count: localized.length, total: allActive.length, counts, clinics: localized });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/monographs - List published monographs & doctor articles
router.get('/monographs', (req, res) => {
  try {
    const lang = getActiveLang(req);
    const { category, search } = req.query;
    let query = 'SELECT * FROM monographs WHERE is_published = 1';
    const params = [];
    if (category && category !== 'all') {
      query += ' AND (LOWER(category) = LOWER(?) OR LOWER(category) LIKE ?)';
      params.push(category, `%${category.toLowerCase()}%`);
    }
    if (search) {
      query += ' AND (title LIKE ? OR title_ne LIKE ? OR summary LIKE ? OR summary_ne LIKE ? OR author LIKE ? OR indication LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term, term, term);
    }
    query += ' ORDER BY sort_order ASC, id ASC';
    const monographs = db.prepare(query).all(...params);
    const localized = monographs.map(m => localizeMonograph(m, lang));
    res.json({ success: true, lang, count: localized.length, monographs: localized });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/monographs/:idOrCode - Single monograph or article
router.get('/monographs/:idOrCode', (req, res) => {
  try {
    const lang = getActiveLang(req);
    const param = req.params.idOrCode;
    let item = db.prepare('SELECT * FROM monographs WHERE code = ?').get(param);
    if (!item && !isNaN(parseInt(param, 10))) {
      item = db.prepare('SELECT * FROM monographs WHERE id = ?').get(parseInt(param, 10));
    }
    if (!item) {
      return res.status(404).json({ success: false, message: 'Monograph or article not found' });
    }
    const localized = localizeMonograph(item, lang);
    res.json({ success: true, lang, monograph: localized });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/blog-posts - Alias for /api/monographs (Doctor's Advice blog page)
router.get('/blog-posts', (req, res) => {
  try {
    const lang = getActiveLang(req);
    const { category, search } = req.query;
    let query = 'SELECT * FROM monographs WHERE is_published = 1';
    const params = [];
    if (category && category !== 'all') {
      query += ' AND (LOWER(category) = LOWER(?) OR LOWER(category) LIKE ?)';
      params.push(category, `%${category.toLowerCase()}%`);
    }
    if (search) {
      query += ' AND (title LIKE ? OR title_ne LIKE ? OR summary LIKE ? OR summary_ne LIKE ? OR author LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term, term);
    }
    query += ' ORDER BY sort_order ASC, id ASC';
    const posts = db.prepare(query).all(...params);
    const localized = posts.map(p => localizeMonograph(p, lang));
    res.json({ success: true, lang, count: localized.length, posts: localized });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/b2b/apply - Submit B2B Wholesale Application with rate limiting & schema validation
router.post('/b2b/apply', formRateLimiter.middleware(), (req, res) => {
  try {
    const validation = validateB2BInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_FAILED',
        message: validation.errors[0],
        errors: validation.errors
      });
    }

    const {
      practiceName,
      contactPerson,
      email,
      phone,
      facilityCategory,
      regNumber,
      province,
      volumeTier,
      sampleKit
    } = validation.data;

    const stmt = db.prepare(`
      INSERT INTO b2b_applications (
        practice_name, reg_number, facility_category, contact_person,
        email, phone, province, volume_tier, sample_kit_requested, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `);

    const result = stmt.run(
      practiceName,
      regNumber,
      facilityCategory,
      contactPerson,
      email,
      phone,
      province,
      volumeTier,
      sampleKit
    );

    logSecurityEvent(db, {
      event_type: 'B2B_APPLICATION_SUBMITTED',
      severity: 'INFO',
      ip_address: getClientIp(req),
      user_agent: req.headers['user-agent'],
      details: { applicationId: result.lastInsertRowid, practiceName, email }
    });

    res.status(201).json({
      success: true,
      message: 'Your clinic wholesale application has been successfully received. Our medical liaison team will review your credentials within 24 hours.',
      applicationId: result.lastInsertRowid
    });
  } catch (err) {
    console.error('Error processing B2B application:', err);
    res.status(500).json({ success: false, message: 'Failed to record wholesale application. Please try again.' });
  }
});

// POST /api/inquiries - Submit general inquiry or doctor verification with rate limiting & schema validation
router.post('/inquiries', formRateLimiter.middleware(), (req, res) => {
  try {
    const validation = validateInquiryInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_FAILED',
        message: validation.errors[0],
        errors: validation.errors
      });
    }

    const { name, email, phone, subject, message, type } = validation.data;

    const stmt = db.prepare(`
      INSERT INTO inquiries (name, email, phone, subject, message, type, status)
      VALUES (?, ?, ?, ?, ?, ?, 'unread')
    `);

    const result = stmt.run(
      name,
      email,
      phone,
      subject,
      message,
      type
    );

    logSecurityEvent(db, {
      event_type: 'INQUIRY_SUBMITTED',
      severity: 'INFO',
      ip_address: getClientIp(req),
      user_agent: req.headers['user-agent'],
      details: { inquiryId: result.lastInsertRowid, name, email, type }
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted. Our clinical coordinator will respond shortly.',
      inquiryId: result.lastInsertRowid
    });
  } catch (err) {
    console.error('Error processing inquiry:', err);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry. Please try again.' });
  }
});

// GET /api/social - Public social channels, showcase feeds, and meta
router.get('/social', (req, res) => {
  try {
    const channels = db.prepare('SELECT * FROM social_channels WHERE is_active = 1 ORDER BY sort_order ASC, id ASC').all();
    const posts = db.prepare('SELECT * FROM social_posts WHERE is_featured = 1 ORDER BY sort_order ASC, id ASC').all();
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

module.exports = router;
