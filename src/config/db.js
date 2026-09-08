const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {
  defaultSettings,
  defaultMedia,
  defaultProducts,
  defaultClinics,
  defaultMonographs,
  defaultHeroSlides
} = require('./seedData');

const dbPath = path.resolve(__dirname, '../../database.sqlite');

let rawDb = null;
let inTransaction = false;

function persist() {
  if (inTransaction || !rawDb) return;
  try {
    const data = rawDb.export();
    fs.writeFileSync(dbPath, Buffer.from(data));
  } catch (err) {
    console.error('Failed to persist SQLite database to disk:', err.message);
  }
}

function bindArgs(stmt, args) {
  if (!args || args.length === 0) return;
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && !Array.isArray(args[0])) {
    const obj = {};
    for (const [k, v] of Object.entries(args[0])) {
      const val = v === undefined ? null : v;
      if (k.startsWith('@') || k.startsWith(':') || k.startsWith('$')) {
        obj[k] = val;
      } else {
        obj['@' + k] = val;
        obj[':' + k] = val;
        obj['$' + k] = val;
      }
    }
    stmt.bind(obj);
  } else {
    const flat = (args.length === 1 && Array.isArray(args[0])) ? args[0] : args;
    stmt.bind(flat.map(v => v === undefined ? null : v));
  }
}

const db = {
  exec(sql) {
    if (!rawDb) throw new Error('Database not initialized yet.');
    rawDb.exec(sql);
    persist();
  },
  pragma(str) {
    if (!rawDb) return;
    try {
      rawDb.exec('PRAGMA ' + str.replace(/^PRAGMA\s+/i, ''));
    } catch (e) {}
  },
  prepare(sql) {
    return {
      all(...args) {
        if (!rawDb) throw new Error('Database not initialized yet.');
        const s = rawDb.prepare(sql);
        try {
          bindArgs(s, args);
          const rows = [];
          while (s.step()) rows.push(s.getAsObject());
          return rows;
        } finally {
          s.free();
        }
      },
      get(...args) {
        if (!rawDb) throw new Error('Database not initialized yet.');
        const s = rawDb.prepare(sql);
        try {
          bindArgs(s, args);
          if (s.step()) return s.getAsObject();
          return undefined;
        } finally {
          s.free();
        }
      },
      run(...args) {
        if (!rawDb) throw new Error('Database not initialized yet.');
        const s = rawDb.prepare(sql);
        try {
          bindArgs(s, args);
          s.step();
          const res = rawDb.exec('SELECT last_insert_rowid() AS id, changes() AS ch');
          let lastInsertRowid = 0;
          let changes = 0;
          if (res && res[0] && res[0].values && res[0].values[0]) {
            lastInsertRowid = res[0].values[0][0];
            changes = res[0].values[0][1];
          }
          persist();
          return { lastInsertRowid, changes };
        } finally {
          s.free();
        }
      }
    };
  },
  transaction(fn) {
    return function(...args) {
      if (!rawDb) throw new Error('Database not initialized yet.');
      inTransaction = true;
      rawDb.exec('BEGIN TRANSACTION;');
      try {
        const res = fn(...args);
        rawDb.exec('COMMIT;');
        inTransaction = false;
        persist();
        return res;
      } catch (e) {
        try { rawDb.exec('ROLLBACK;'); } catch (r) {}
        inTransaction = false;
        throw e;
      }
    };
  }
};

async function initDatabase() {
  if (rawDb) return db;
  const SQL = await initSqlJs();
  if (fs.existsSync(dbPath)) {
    try {
      const filebuffer = fs.readFileSync(dbPath);
      rawDb = new SQL.Database(filebuffer);
    } catch (e) {
      console.warn('Could not read existing database.sqlite, creating fresh database:', e.message);
      rawDb = new SQL.Database();
    }
  } else {
    rawDb = new SQL.Database();
  }

  // Enable WAL mode for better concurrency and write performance
  db.pragma('journal_mode = WAL');
  // 1. Site Settings Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT,
      category TEXT DEFAULT 'general',
      label TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 1b. Site Media & Images Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slot_key TEXT UNIQUE NOT NULL,
      slot_label TEXT NOT NULL,
      page TEXT DEFAULT 'Global',
      description TEXT,
      image_url TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Products Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      subtitle TEXT,
      category TEXT NOT NULL,
      volume TEXT,
      price_npr REAL DEFAULT 0,
      clinical_badge TEXT,
      summary TEXT,
      description TEXT,
      key_benefits TEXT, -- JSON array
      active_ingredients TEXT, -- JSON array
      inci_full TEXT,
      usage_instructions TEXT,
      image_url TEXT,
      is_featured INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      status TEXT DEFAULT 'active', -- active, draft, archived
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Clinics / Dispensaries Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS clinics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT DEFAULT 'Dermatology & Aesthetic Hospital',
      city TEXT NOT NULL,
      province TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      lead_doctor TEXT,
      doctor_nmc TEXT,
      doctor_image TEXT,
      distance_badge TEXT,
      stock_summary TEXT,
      batch_units TEXT,
      temp_control TEXT,
      operating_hours TEXT,
      is_verified INTEGER DEFAULT 1,
      is_in_stock INTEGER DEFAULT 1,
      map_url TEXT,
      directions_url TEXT,
      latitude REAL,
      longitude REAL,
      status TEXT DEFAULT 'active', -- active, inactive
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Clinical Monographs Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS monographs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT,
      indication TEXT,
      active_compounds TEXT,
      clinical_protocol TEXT,
      dosage_timing TEXT,
      precautions TEXT,
      pdf_file TEXT,
      is_published INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. B2B Wholesale Applications Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS b2b_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      practice_name TEXT NOT NULL,
      reg_number TEXT,
      facility_category TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      province TEXT NOT NULL,
      volume_tier TEXT NOT NULL,
      sample_kit_requested INTEGER DEFAULT 0,
      status TEXT DEFAULT 'pending', -- pending, reviewed, approved, declined
      admin_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. Inquiries & Verification Requests Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT,
      type TEXT DEFAULT 'general', -- general, doctor_verification, sample_request
      status TEXT DEFAULT 'unread', -- unread, replied, archived
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 7. Hero Showcase Slider Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS hero_slides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subtitle TEXT,
      badge_text TEXT,
      formula_number TEXT,
      origin_text TEXT,
      specs_text TEXT,
      image_url TEXT NOT NULL,
      cta_url TEXT DEFAULT 'product-detail.html',
      cta_text TEXT DEFAULT 'View Product Details',
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 8. Admin Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 9. Social Media Channels Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS social_channels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      handle TEXT,
      url TEXT NOT NULL,
      icon_name TEXT,
      badge_text TEXT,
      color_hex TEXT,
      is_active INTEGER DEFAULT 1,
      show_in_header INTEGER DEFAULT 0,
      show_in_footer INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 10. Social Media Showcase & UGC Feeds Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS social_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT NOT NULL,
      title TEXT NOT NULL,
      post_url TEXT NOT NULL,
      author_handle TEXT,
      media_url TEXT,
      caption TEXT,
      metrics_text TEXT,
      is_featured INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Run schema migrations for monographs, clinics, and bilingual columns
  migrateMonographsTable();
  migrateBilingualColumns();

  // Seed Data if tables are empty
  seedInitialData();

  persist();
  return db;
}

function migrateMonographsTable() {
  try {
    const columns = db.prepare("PRAGMA table_info(monographs)").all().map(c => c.name);
    const newColumns = [
      { name: 'author', type: 'TEXT' },
      { name: 'read_time', type: 'TEXT' },
      { name: 'date_text', type: 'TEXT' },
      { name: 'image_url', type: 'TEXT' },
      { name: 'summary', type: 'TEXT' },
      { name: 'content', type: 'TEXT' }
    ];

    for (const col of newColumns) {
      if (!columns.includes(col.name)) {
        db.exec(`ALTER TABLE monographs ADD COLUMN ${col.name} ${col.type};`);
      }
    }
  } catch (err) {
    console.error('Monograph migration notice:', err.message);
  }

  // Auto-migrate clinics table if columns are missing
  try {
    const clinicCols = db.prepare("PRAGMA table_info(clinics)").all().map(c => c.name);
    const newClinicCols = [
      { name: 'doctor_nmc', type: 'TEXT' },
      { name: 'doctor_image', type: 'TEXT' },
      { name: 'distance_badge', type: 'TEXT' },
      { name: 'stock_summary', type: 'TEXT' },
      { name: 'batch_units', type: 'TEXT' },
      { name: 'temp_control', type: 'TEXT' },
      { name: 'operating_hours', type: 'TEXT' },
      { name: 'is_in_stock', type: 'INTEGER DEFAULT 1' },
      { name: 'directions_url', type: 'TEXT' },
      { name: 'latitude', type: 'REAL' },
      { name: 'longitude', type: 'REAL' }
    ];

    for (const col of newClinicCols) {
      if (!clinicCols.includes(col.name)) {
        db.exec(`ALTER TABLE clinics ADD COLUMN ${col.name} ${col.type};`);
      }
    }
  } catch (err) {
    console.error('Clinics migration notice:', err.message);
  }
}

function migrateBilingualColumns() {
  // 1. site_settings
  try {
    const sCols = db.prepare("PRAGMA table_info(site_settings)").all().map(c => c.name);
    if (!sCols.includes('value_ne')) {
      db.exec("ALTER TABLE site_settings ADD COLUMN value_ne TEXT;");
    }
  } catch (e) {
    console.error('Settings bilingual migration notice:', e.message);
  }

  // 2. products
  try {
    const pCols = db.prepare("PRAGMA table_info(products)").all().map(c => c.name);
    const newPCols = [
      'title_ne', 'subtitle_ne', 'category_ne', 'clinical_badge_ne',
      'summary_ne', 'description_ne', 'key_benefits_ne', 'usage_instructions_ne'
    ];
    for (const col of newPCols) {
      if (!pCols.includes(col)) {
        db.exec(`ALTER TABLE products ADD COLUMN ${col} TEXT;`);
      }
    }
  } catch (e) {
    console.error('Products bilingual migration notice:', e.message);
  }

  // 3. hero_slides
  try {
    const hCols = db.prepare("PRAGMA table_info(hero_slides)").all().map(c => c.name);
    const newHCols = [
      'title_ne', 'subtitle_ne', 'badge_text_ne', 'origin_text_ne',
      'specs_text_ne', 'cta_text_ne'
    ];
    for (const col of newHCols) {
      if (!hCols.includes(col)) {
        db.exec(`ALTER TABLE hero_slides ADD COLUMN ${col} TEXT;`);
      }
    }
  } catch (e) {
    console.error('Hero slides bilingual migration notice:', e.message);
  }

  // 4. monographs
  try {
    const mCols = db.prepare("PRAGMA table_info(monographs)").all().map(c => c.name);
    const newMCols = [
      'title_ne', 'category_ne', 'indication_ne', 'summary_ne',
      'content_ne', 'clinical_protocol_ne'
    ];
    for (const col of newMCols) {
      if (!mCols.includes(col)) {
        db.exec(`ALTER TABLE monographs ADD COLUMN ${col} TEXT;`);
      }
    }
  } catch (e) {
    console.error('Monographs bilingual migration notice:', e.message);
  }

  // 5. clinics
  try {
    const cCols = db.prepare("PRAGMA table_info(clinics)").all().map(c => c.name);
    const newCCols = [
      'name_ne', 'category_ne', 'address_ne', 'stock_summary_ne', 'lead_doctor_ne'
    ];
    for (const col of newCCols) {
      if (!cCols.includes(col)) {
        db.exec(`ALTER TABLE clinics ADD COLUMN ${col} TEXT;`);
      }
    }
  } catch (e) {
    console.error('Clinics bilingual migration notice:', e.message);
  }
}

function seedInitialData() {
  // Seed Site Settings (insert or update value_ne)
  const insertSetting = db.prepare('INSERT OR IGNORE INTO site_settings (key, value, value_ne, category, label) VALUES (?, ?, ?, ?, ?)');
  const updateSettingNe = db.prepare("UPDATE site_settings SET value_ne = ? WHERE key = ? AND (value_ne IS NULL OR value_ne = '')");
  const insertManySettings = db.transaction((settings) => {
    for (const s of settings) {
      insertSetting.run(s.key, s.value, s.value_ne || null, s.category, s.label);
      if (s.value_ne) {
        updateSettingNe.run(s.value_ne, s.key);
      }
    }
  });
  insertManySettings(defaultSettings);

  // Seed Site Media Slots (insert or ignore)
  const insertMedia = db.prepare(`
    INSERT OR IGNORE INTO site_media (slot_key, slot_label, page, description, image_url)
    VALUES (?, ?, ?, ?, ?)
  `);
  const insertManyMedia = db.transaction((mediaItems) => {
    for (const m of mediaItems) {
      insertMedia.run(m.slot_key, m.slot_label, m.page, m.description, m.image_url);
    }
  });
  insertManyMedia(defaultMedia);

  // Seed Products
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
  if (productCount === 0) {
    const insertProduct = db.prepare(`
      INSERT OR IGNORE INTO products (
        slug, title, subtitle, category, volume, price_npr,
        clinical_badge, summary, description, key_benefits,
        active_ingredients, inci_full, usage_instructions,
        image_url, is_featured, sort_order, status,
        title_ne, subtitle_ne, category_ne, clinical_badge_ne,
        summary_ne, description_ne, key_benefits_ne, usage_instructions_ne
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertManyProducts = db.transaction((products) => {
      for (const p of products) {
        insertProduct.run(
          p.slug, p.title, p.subtitle, p.category, p.volume, p.price_npr,
          p.clinical_badge, p.summary, p.description, p.key_benefits,
          p.active_ingredients, p.inci_full, p.usage_instructions,
          p.image_url, p.is_featured, p.sort_order, p.status,
          p.title_ne || null, p.subtitle_ne || null, p.category_ne || null, p.clinical_badge_ne || null,
          p.summary_ne || null, p.description_ne || null, p.key_benefits_ne || null, p.usage_instructions_ne || null
        );
      }
    });
    insertManyProducts(defaultProducts);
    console.log('🌱 Seeded initial products with bilingual data.');
  } else {
    // Populate Nepali fields for existing products if empty
    const updateProductNe = db.prepare(`
      UPDATE products SET
        title_ne = @title_ne, subtitle_ne = @subtitle_ne, category_ne = @category_ne,
        clinical_badge_ne = @clinical_badge_ne, summary_ne = @summary_ne,
        description_ne = @description_ne, key_benefits_ne = @key_benefits_ne,
        usage_instructions_ne = @usage_instructions_ne
      WHERE slug = @slug AND (title_ne IS NULL OR title_ne = '')
    `);
    for (const p of defaultProducts) {
      if (p.title_ne) {
        updateProductNe.run({
          slug: p.slug,
          title_ne: p.title_ne,
          subtitle_ne: p.subtitle_ne || '',
          category_ne: p.category_ne || '',
          clinical_badge_ne: p.clinical_badge_ne || '',
          summary_ne: p.summary_ne || '',
          description_ne: p.description_ne || '',
          key_benefits_ne: p.key_benefits_ne || '',
          usage_instructions_ne: p.usage_instructions_ne || ''
        });
      }
    }
  }

  // Seed Clinics & Dispensaries (Insert or update rich clinic details)
  const insertClinic = db.prepare(`
    INSERT INTO clinics (
      name, category, city, province, address, phone, email,
      lead_doctor, doctor_nmc, doctor_image, distance_badge,
      stock_summary, batch_units, temp_control, operating_hours,
      is_verified, is_in_stock, directions_url, latitude, longitude,
      status, sort_order, name_ne, category_ne, address_ne,
      stock_summary_ne, lead_doctor_ne
    ) VALUES (
      @name, @category, @city, @province, @address, @phone, @email,
      @lead_doctor, @doctor_nmc, @doctor_image, @distance_badge,
      @stock_summary, @batch_units, @temp_control, @operating_hours,
      @is_verified, @is_in_stock, @directions_url, @latitude, @longitude,
      @status, @sort_order, @name_ne, @category_ne, @address_ne,
      @stock_summary_ne, @lead_doctor_ne
    )
  `);

  const updateClinic = db.prepare(`
    UPDATE clinics SET
      category = @category, city = @city, province = @province, address = @address,
      phone = @phone, email = @email, lead_doctor = @lead_doctor, doctor_nmc = @doctor_nmc,
      doctor_image = @doctor_image, distance_badge = @distance_badge, stock_summary = @stock_summary,
      batch_units = @batch_units, temp_control = @temp_control, operating_hours = @operating_hours,
      is_verified = @is_verified, is_in_stock = @is_in_stock, directions_url = @directions_url,
      latitude = @latitude, longitude = @longitude, status = @status, sort_order = @sort_order,
      name_ne = COALESCE(clinics.name_ne, @name_ne),
      category_ne = COALESCE(clinics.category_ne, @category_ne),
      address_ne = COALESCE(clinics.address_ne, @address_ne),
      stock_summary_ne = COALESCE(clinics.stock_summary_ne, @stock_summary_ne),
      lead_doctor_ne = COALESCE(clinics.lead_doctor_ne, @lead_doctor_ne)
    WHERE name = @name
  `);

  const clinicTx = db.transaction((clinics) => {
    for (const c of clinics) {
      const existing = db.prepare('SELECT id FROM clinics WHERE name = ?').get(c.name);
      const params = {
        name: c.name,
        category: c.category || 'Dermatology & Aesthetic Hospital',
        city: c.city,
        province: c.province,
        address: c.address,
        phone: c.phone || '',
        email: c.email || '',
        lead_doctor: c.lead_doctor || '',
        doctor_nmc: c.doctor_nmc || '',
        doctor_image: c.doctor_image || '',
        distance_badge: c.distance_badge || '',
        stock_summary: c.stock_summary || '',
        batch_units: c.batch_units || 'Verified In-Stock',
        temp_control: c.temp_control || '18°C Controlled',
        operating_hours: c.operating_hours || '09:00 - 19:00 (Sun-Fri)',
        is_verified: c.is_verified !== undefined ? c.is_verified : 1,
        is_in_stock: c.is_in_stock !== undefined ? c.is_in_stock : 1,
        directions_url: c.directions_url || '',
        latitude: c.latitude || 27.7172,
        longitude: c.longitude || 85.3240,
        status: c.status || 'active',
        sort_order: c.sort_order || 0,
        name_ne: c.name_ne || null,
        category_ne: c.category_ne || null,
        address_ne: c.address_ne || null,
        stock_summary_ne: c.stock_summary_ne || null,
        lead_doctor_ne: c.lead_doctor_ne || null
      };
      if (existing) {
        updateClinic.run(params);
      } else {
        insertClinic.run(params);
      }
    }
  });
  clinicTx(defaultClinics);
  console.log('🌱 Seeded/updated authorized clinics directory with bilingual data.');

  // Seed Monographs / Doctor's Advice Articles
  const upsertMono = db.prepare(`
    INSERT INTO monographs (
      code, title, category, indication, active_compounds, clinical_protocol,
      dosage_timing, precautions, pdf_file, is_published, sort_order,
      author, read_time, date_text, image_url, summary, content,
      title_ne, category_ne, indication_ne, summary_ne, content_ne, clinical_protocol_ne
    ) VALUES (
      @code, @title, @category, @indication, @active_compounds, @clinical_protocol,
      @dosage_timing, @precautions, @pdf_file, @is_published, @sort_order,
      @author, @read_time, @date_text, @image_url, @summary, @content,
      @title_ne, @category_ne, @indication_ne, @summary_ne, @content_ne, @clinical_protocol_ne
    )
    ON CONFLICT(code) DO UPDATE SET
      title = excluded.title,
      category = excluded.category,
      author = COALESCE(excluded.author, monographs.author),
      read_time = COALESCE(excluded.read_time, monographs.read_time),
      date_text = COALESCE(excluded.date_text, monographs.date_text),
      image_url = COALESCE(excluded.image_url, monographs.image_url),
      summary = COALESCE(excluded.summary, monographs.summary),
      content = COALESCE(excluded.content, monographs.content),
      is_published = excluded.is_published,
      sort_order = excluded.sort_order,
      title_ne = COALESCE(monographs.title_ne, excluded.title_ne),
      category_ne = COALESCE(monographs.category_ne, excluded.category_ne),
      indication_ne = COALESCE(monographs.indication_ne, excluded.indication_ne),
      summary_ne = COALESCE(monographs.summary_ne, excluded.summary_ne),
      content_ne = COALESCE(monographs.content_ne, excluded.content_ne),
      clinical_protocol_ne = COALESCE(monographs.clinical_protocol_ne, excluded.clinical_protocol_ne)
  `);

  const insertManyMonos = db.transaction((monos) => {
    for (const m of monos) {
      upsertMono.run({
        code: m.code,
        title: m.title,
        category: m.category || 'General',
        indication: m.indication || '',
        active_compounds: m.active_compounds || '',
        clinical_protocol: m.clinical_protocol || '',
        dosage_timing: m.dosage_timing || '',
        precautions: m.precautions || '',
        pdf_file: m.pdf_file || '',
        is_published: m.is_published !== undefined ? m.is_published : 1,
        sort_order: m.sort_order || 0,
        author: m.author || 'Dr. S. Karki',
        read_time: m.read_time || '4 min read',
        date_text: m.date_text || '2025',
        image_url: m.image_url || 'assets/images/img_7df877252467.jpg',
        summary: m.summary || '',
        content: m.content || '',
        title_ne: m.title_ne || null,
        category_ne: m.category_ne || null,
        indication_ne: m.indication_ne || null,
        summary_ne: m.summary_ne || null,
        content_ne: m.content_ne || null,
        clinical_protocol_ne: m.clinical_protocol_ne || null
      });
    }
  });
  insertManyMonos(defaultMonographs);

  // Ensure all monographs get their Nepali translations populated
  const { monographsNepali } = require('./seedDataNepali');
  const updateMonoNe = db.prepare(`
    UPDATE monographs SET
      title_ne = @title_ne,
      category_ne = @category_ne,
      indication_ne = @indication_ne,
      summary_ne = @summary_ne,
      clinical_protocol_ne = @clinical_protocol_ne
    WHERE code = @code AND (title_ne IS NULL OR title_ne = '')
  `);
  for (const [code, ne] of Object.entries(monographsNepali)) {
    if (ne.title_ne) {
      updateMonoNe.run({
        code,
        title_ne: ne.title_ne,
        category_ne: ne.category_ne || '',
        indication_ne: ne.indication_ne || '',
        summary_ne: ne.summary_ne || '',
        clinical_protocol_ne: ne.clinical_protocol_ne || ''
      });
    }
  }
  console.log('🌱 Seeded/updated monographs & doctor articles with bilingual data.');

  // Seed Hero Slides if table is empty, or update bilingual fields
  const heroCount = db.prepare('SELECT COUNT(*) as count FROM hero_slides').get().count;
  if (heroCount === 0 && defaultHeroSlides && defaultHeroSlides.length > 0) {
    const insertSlide = db.prepare(`
      INSERT INTO hero_slides (
        title, subtitle, badge_text, formula_number, origin_text,
        specs_text, image_url, cta_url, cta_text, sort_order, is_active,
        title_ne, subtitle_ne, badge_text_ne, origin_text_ne, specs_text_ne, cta_text_ne
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertManySlides = db.transaction((slides) => {
      for (const s of slides) {
        insertSlide.run(
          s.title, s.subtitle || '', s.badge_text || '', s.formula_number || '',
          s.origin_text || '', s.specs_text || '', s.image_url,
          s.cta_url || 'product-detail.html', s.cta_text || 'View Details',
          s.sort_order || 0, s.is_active !== undefined ? s.is_active : 1,
          s.title_ne || null, s.subtitle_ne || null, s.badge_text_ne || null,
          s.origin_text_ne || null, s.specs_text_ne || null, s.cta_text_ne || null
        );
      }
    });
    insertManySlides(defaultHeroSlides);
    console.log('🌱 Seeded initial hero slider showcase slides with bilingual data.');
  } else if (defaultHeroSlides && defaultHeroSlides.length > 0) {
    const updateHeroSlideNe = db.prepare(`
      UPDATE hero_slides SET
        title_ne = @title_ne, subtitle_ne = @subtitle_ne, badge_text_ne = @badge_text_ne,
        origin_text_ne = @origin_text_ne, specs_text_ne = @specs_text_ne, cta_text_ne = @cta_text_ne
      WHERE id = @id AND (title_ne IS NULL OR title_ne = '')
    `);
    const existingSlides = db.prepare('SELECT id, sort_order FROM hero_slides ORDER BY sort_order ASC, id ASC').all();
    existingSlides.forEach((slide, idx) => {
      const ne = defaultHeroSlides[idx];
      if (ne && ne.title_ne) {
        updateHeroSlideNe.run({
          id: slide.id,
          title_ne: ne.title_ne,
          subtitle_ne: ne.subtitle_ne || '',
          badge_text_ne: ne.badge_text_ne || '',
          origin_text_ne: ne.origin_text_ne || '',
          specs_text_ne: ne.specs_text_ne || '',
          cta_text_ne: ne.cta_text_ne || ''
        });
      }
    });
  }

  // Seed Admin User
  const adminCount = db.prepare('SELECT COUNT(*) as count FROM admin_users').get().count;
  if (adminCount === 0) {
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'cderma2026!';
    const passwordHash = bcrypt.hashSync(adminPass, 10);
    db.prepare('INSERT INTO admin_users (username, email, password_hash, role) VALUES (?, ?, ?, ?)').run(
      adminUser,
      'admin@cderma.com.np',
      passwordHash,
      'admin'
    );
    console.log(`🔐 Created default admin account (user: ${adminUser})`);
  }

  // Seed Default Social Channels
  const defaultSocialChannels = [
    {
      platform: 'instagram',
      name: 'Instagram',
      handle: '@cdermanepal',
      url: 'https://instagram.com/cdermanepal',
      icon_name: 'photo_camera',
      badge_text: 'Official Instagram',
      color_hex: '#E1306C',
      is_active: 1,
      show_in_header: 1,
      show_in_footer: 1,
      sort_order: 1
    },
    {
      platform: 'facebook',
      name: 'Facebook',
      handle: '@cdermanepal',
      url: 'https://facebook.com/cdermanepal',
      icon_name: 'thumb_up',
      badge_text: 'Official Page',
      color_hex: '#1877F2',
      is_active: 1,
      show_in_header: 0,
      show_in_footer: 1,
      sort_order: 2
    },
    {
      platform: 'tiktok',
      name: 'TikTok',
      handle: '@cdermanepal',
      url: 'https://tiktok.com/@cdermanepal',
      icon_name: 'music_note',
      badge_text: 'Skin Routines & Shorts',
      color_hex: '#111827',
      is_active: 1,
      show_in_header: 0,
      show_in_footer: 1,
      sort_order: 3
    },
    {
      platform: 'whatsapp',
      name: 'WhatsApp Business',
      handle: '+977 9820753751',
      url: 'https://wa.me/9779820753751',
      icon_name: 'chat',
      badge_text: 'Direct Clinic & Order Support',
      color_hex: '#25D366',
      is_active: 1,
      show_in_header: 1,
      show_in_footer: 1,
      sort_order: 4
    },
    {
      platform: 'youtube',
      name: 'YouTube',
      handle: '@cdermanepal',
      url: 'https://youtube.com/@cdermanepal',
      icon_name: 'play_circle',
      badge_text: 'Clinical Lectures & Cleanroom Tours',
      color_hex: '#FF0000',
      is_active: 1,
      show_in_header: 0,
      show_in_footer: 1,
      sort_order: 5
    },
    {
      platform: 'linkedin',
      name: 'LinkedIn',
      handle: 'cderma-nepal',
      url: 'https://linkedin.com/company/cdermanepal',
      icon_name: 'business_center',
      badge_text: 'Corporate & Distribution HQ',
      color_hex: '#0A66C2',
      is_active: 1,
      show_in_header: 0,
      show_in_footer: 1,
      sort_order: 6
    },
    {
      platform: 'twitter_x',
      name: 'X (Twitter)',
      handle: '@cdermanepal',
      url: 'https://x.com/cdermanepal',
      icon_name: 'tag',
      badge_text: 'Formulation Updates',
      color_hex: '#111827',
      is_active: 1,
      show_in_header: 0,
      show_in_footer: 1,
      sort_order: 7
    }
  ];

  const upsertSocial = db.prepare(`
    INSERT INTO social_channels (
      platform, name, handle, url, icon_name, badge_text, color_hex,
      is_active, show_in_header, show_in_footer, sort_order
    ) VALUES (
      @platform, @name, @handle, @url, @icon_name, @badge_text, @color_hex,
      @is_active, @show_in_header, @show_in_footer, @sort_order
    )
    ON CONFLICT(platform) DO UPDATE SET
      name = excluded.name,
      handle = COALESCE(social_channels.handle, excluded.handle),
      url = COALESCE(social_channels.url, excluded.url),
      color_hex = excluded.color_hex,
      icon_name = excluded.icon_name,
      badge_text = COALESCE(social_channels.badge_text, excluded.badge_text)
  `);

  const insertManySocial = db.transaction((channels) => {
    for (const ch of channels) {
      upsertSocial.run(ch);
    }
  });
  insertManySocial(defaultSocialChannels);

  // Seed Default Showcase Posts if empty
  const postCount = db.prepare('SELECT COUNT(*) as count FROM social_posts').get().count;
  if (postCount === 0) {
    const insertPost = db.prepare(`
      INSERT INTO social_posts (
        platform, title, post_url, author_handle, media_url, caption, metrics_text, is_featured, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const defaultPosts = [
      {
        platform: 'instagram',
        title: 'Cleanroom Synthesis of Formula No. 04',
        post_url: 'https://instagram.com/cdermanepal',
        author_handle: '@cdermanepal',
        media_url: 'assets/images/img_282f9d7b4a1e.jpg',
        caption: 'Behind the glass inside our Koshi ISO Class 7 cleanroom synthesizing 5% multi-ceramide barrier complex.',
        metrics_text: '18.4K Views • 1,240 Likes',
        is_featured: 1,
        sort_order: 1
      },
      {
        platform: 'tiktok',
        title: 'Dermatologist Review: Centella Barrier Restore',
        post_url: 'https://tiktok.com/@cdermanepal',
        author_handle: '@cdermanepal',
        media_url: 'assets/images/img_2fca738d0116.jpg',
        caption: 'Why our physiological 3:1:1 lipid ratio stops trans-epidermal water loss faster than generic creams.',
        metrics_text: '45.2K Views • 3,890 Likes',
        is_featured: 1,
        sort_order: 2
      },
      {
        platform: 'youtube',
        title: 'Post-Laser Care Protocol by Dr. S. Karki, MD',
        post_url: 'https://youtube.com/@cdermanepal',
        author_handle: '@cdermanepal',
        media_url: 'assets/images/img_7df877252467.jpg',
        caption: 'Clinical guidance on post-procedure healing in high UV altitude climates across Nepal.',
        metrics_text: '8.9K Views • 430 Comments',
        is_featured: 1,
        sort_order: 3
      }
    ];

    const insertManyPosts = db.transaction((posts) => {
      for (const p of posts) {
        insertPost.run(
          p.platform, p.title, p.post_url, p.author_handle, p.media_url,
          p.caption, p.metrics_text, p.is_featured, p.sort_order
        );
      }
    });
    insertManyPosts(defaultPosts);
  }

  // Seed Social Meta Settings
  const defaultSocialSettings = [
    { key: 'social_og_title', value: 'CDerma Choice by Professional | Medical Dermocosmetics Nepal', category: 'Social & Meta', label: 'Open Graph Share Title' },
    { key: 'social_og_description', value: 'Doctor-formulated physiological barrier repair and pure Himalayan bio-actives crafted in Itahari, Nepal.', category: 'Social & Meta', label: 'Open Graph Share Description' },
    { key: 'social_og_image', value: 'assets/images/img_282f9d7b4a1e.jpg', category: 'Social & Meta', label: 'Default Social Share Image Banner' },
    { key: 'social_twitter_site', value: '@cdermanepal', category: 'Social & Meta', label: 'Twitter / X Handle' },
    { key: 'social_whatsapp_floating', value: '1', category: 'Social & Meta', label: 'Show Floating WhatsApp Consult Widget' },
    { key: 'social_whatsapp_number', value: '+977 9820753751', category: 'Social & Meta', label: 'WhatsApp Liaison Number' },
    { key: 'social_whatsapp_msg', value: 'Namaste CDerma! I would like to inquire about formulations & clinical supplies.', category: 'Social & Meta', label: 'WhatsApp Pre-filled Message' }
  ];

  const upsertSetting = db.prepare(`
    INSERT INTO site_settings (key, value, category, label)
    VALUES (@key, @value, @category, @label)
    ON CONFLICT(key) DO UPDATE SET
      category = excluded.category,
      label = excluded.label
  `);
  const insertManySocialSettings = db.transaction((settings) => {
    for (const s of settings) {
      upsertSetting.run(s);
    }
  });
  insertManySocialSettings(defaultSocialSettings);
}

let initPromise = null;
function autoInit() {
  if (!initPromise) {
    initPromise = initDatabase().catch(err => {
      console.error('Automatic database init error:', err);
    });
  }
  return initPromise;
}

// Automatically trigger initialization on require
autoInit();

module.exports = db;
module.exports.db = db;
module.exports.initDatabase = initDatabase;
