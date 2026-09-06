const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');
const {
  defaultSettings,
  defaultMedia,
  defaultProducts,
  defaultClinics,
  defaultMonographs
} = require('./seedData');

const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency and write performance
db.pragma('journal_mode = WAL');

function initDatabase() {
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
      category TEXT DEFAULT 'Dermatology Clinic',
      city TEXT NOT NULL,
      province TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      lead_doctor TEXT,
      is_verified INTEGER DEFAULT 1,
      map_url TEXT,
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

  // 7. Admin Users Table
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

  // Seed Data if tables are empty
  seedInitialData();
}

function seedInitialData() {
  // Seed Site Settings (insert or ignore so new keys are automatically added)
  const insertSetting = db.prepare('INSERT OR IGNORE INTO site_settings (key, value, category, label) VALUES (?, ?, ?, ?)');
  const insertManySettings = db.transaction((settings) => {
    for (const s of settings) {
      insertSetting.run(s.key, s.value, s.category, s.label);
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
        image_url, is_featured, sort_order, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertManyProducts = db.transaction((products) => {
      for (const p of products) {
        insertProduct.run(
          p.slug, p.title, p.subtitle, p.category, p.volume, p.price_npr,
          p.clinical_badge, p.summary, p.description, p.key_benefits,
          p.active_ingredients, p.inci_full, p.usage_instructions,
          p.image_url, p.is_featured, p.sort_order, p.status
        );
      }
    });
    insertManyProducts(defaultProducts);
    console.log('🌱 Seeded initial products.');
  }

  // Seed Clinics
  const clinicCount = db.prepare('SELECT COUNT(*) as count FROM clinics').get().count;
  if (clinicCount === 0) {
    const insertClinic = db.prepare(`
      INSERT OR IGNORE INTO clinics (
        name, category, city, province, address, phone, email, lead_doctor, is_verified, status, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertManyClinics = db.transaction((clinics) => {
      for (const c of clinics) {
        insertClinic.run(
          c.name, c.category, c.city, c.province, c.address, c.phone, c.email, c.lead_doctor, c.is_verified, c.status, c.sort_order
        );
      }
    });
    insertManyClinics(defaultClinics);
    console.log('🌱 Seeded initial clinic locator directory.');
  }

  // Seed Monographs
  const monoCount = db.prepare('SELECT COUNT(*) as count FROM monographs').get().count;
  if (monoCount === 0) {
    const insertMono = db.prepare(`
      INSERT OR IGNORE INTO monographs (
        code, title, category, indication, active_compounds, clinical_protocol, dosage_timing, precautions, pdf_file, is_published, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const insertManyMonos = db.transaction((monos) => {
      for (const m of monos) {
        insertMono.run(
          m.code, m.title, m.category, m.indication, m.active_compounds, m.clinical_protocol, m.dosage_timing, m.precautions, m.pdf_file, m.is_published, m.sort_order
        );
      }
    });
    insertManyMonos(defaultMonographs);
    console.log('🌱 Seeded initial clinical monographs.');
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
}

// Run DB setup
initDatabase();

module.exports = db;
