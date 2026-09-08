const { db, initDatabase } = require('../src/config/db');
const fs = require('fs');

async function main() {
  await initDatabase();
  console.log('Database initialized successfully.');

  const updates = [
    // Newly inserted / updated keys
    {
      key: 'home_pillars_badge',
      value: 'Quality Skincare Made in Nepal',
      value_ne: 'नेपालमा उत्पादित गुणस्तरीय छाला हेरचाह',
      category: 'Home Page',
      label: 'Home Pillars Badge'
    },
    {
      key: 'home_pillars_title',
      value: 'Doctor-Grade Face Care You Can Trust.',
      value_ne: 'तपाईंले विश्वास गर्न सक्ने डाक्टर-ग्रेड फेस केयर।',
      category: 'Home Page',
      label: 'Home Pillars Title'
    },
    {
      key: 'home_pillars_subtitle',
      value: 'We believe everyone in Nepal deserves honest, effective face care that truly works. CDerma brings you doctor-tested formulas made with pure ingredients, clear labels, and total care.',
      value_ne: 'हाम्रो विश्वास छ कि नेपालमा हरेक व्यक्तिले प्रभावकारी र विश्वासिलो फेस केयर पाउनुपर्छ। सिडर्माले शुद्ध तत्वहरू, स्पष्ट लेबल र पूर्ण हेरचाहका साथ चिकित्सकद्वारा प्रमाणित फर्मुलाहरू प्रस्तुत गर्दछ।',
      category: 'Home Page',
      label: 'Home Pillars Subtitle'
    },
    {
      key: 'home_practitioner_badge',
      value: 'Practitioner Validation',
      value_ne: 'चिकित्सकीय प्रमाणीकरण',
      category: 'Home Page',
      label: 'Practitioner Validation Badge'
    },
    {
      key: 'home_practitioner_title',
      value: 'Recommended by Doctors.',
      value_ne: 'वरिष्ठ चिकित्सकहरूद्वारा सिफारिस गरिएको।',
      category: 'Home Page',
      label: 'Practitioner Validation Title'
    },
    {
      key: 'home_practitioner_subtitle',
      value: 'CDerma formulations are evaluated and recommended by registered medical professionals across Nepal for reliable everyday barrier care and post-procedure hydration.',
      value_ne: 'सिडर्माका फर्मुलाहरू नेपालभरिका दर्तावाला स्वास्थ्यकर्मी तथा चिकित्सकहरूद्वारा दैनिक ब्यारियर केयर र उपचारपछिको आद्रताका लागि मूल्याङ्कन तथा सिफारिस गरिएका छन्।',
      category: 'Home Page',
      label: 'Practitioner Validation Subtitle'
    },
    {
      key: 'products_catalog_title',
      value: 'Our Complete Face Care & Daily Essentials',
      value_ne: 'हाम्रा सम्पूर्ण फेस केयर तथा दैनिक आवश्यक उत्पादनहरू',
      category: 'Products Page',
      label: 'Products Catalog Title'
    },
    {
      key: 'products_catalog_subtitle',
      value: 'Available at leading cosmetic stores, beauty retailers, and certified skin clinics across Nepal.',
      value_ne: 'नेपालभरिका प्रमुख कस्मेटिक स्टोर, ब्युटी रिटेलर र प्रमाणित छाला क्लिनिकहरूमा उपलब्ध छन्।',
      category: 'Products Page',
      label: 'Products Catalog Subtitle'
    },

    // Existing keys missing Nepali values
    {
      key: 'b2b_stat_1_val',
      value: '120+',
      value_ne: '१२०+',
      category: 'B2B Wholesale',
      label: 'B2B Stat 1 Value'
    },
    {
      key: 'b2b_stat_1_lbl',
      value: 'Cosmetic Stores & Pharmacies',
      value_ne: 'कस्मेटिक स्टोर तथा फार्मेसीहरू',
      category: 'B2B Wholesale',
      label: 'B2B Stat 1 Label'
    },
    {
      key: 'b2b_stat_2_val',
      value: '45+',
      value_ne: '४५+',
      category: 'B2B Wholesale',
      label: 'B2B Stat 2 Value'
    },
    {
      key: 'b2b_stat_2_lbl',
      value: 'Dermatology Clinics & Hospitals',
      value_ne: 'डर्माटोलोजी क्लिनिक तथा अस्पतालहरू',
      category: 'B2B Wholesale',
      label: 'B2B Stat 2 Label'
    },
    {
      key: 'b2b_stat_3_val',
      value: '24h',
      value_ne: '२४ घण्टा',
      category: 'B2B Wholesale',
      label: 'B2B Stat 3 Value'
    },
    {
      key: 'b2b_stat_3_lbl',
      value: 'Express Dispatch from Koshi Lab',
      value_ne: 'कोशी ल्याबबाट द्रुत डेलिभरी',
      category: 'B2B Wholesale',
      label: 'B2B Stat 3 Label'
    },
    {
      key: 'b2b_stat_4_val',
      value: '100%',
      value_ne: '१००%',
      category: 'B2B Wholesale',
      label: 'B2B Stat 4 Value'
    },
    {
      key: 'b2b_stat_4_lbl',
      value: 'Nepal Domestic Supply Reliability',
      value_ne: 'नेपालभर भरपर्दो आपूर्ति सुनिश्चितता',
      category: 'B2B Wholesale',
      label: 'B2B Stat 4 Label'
    },
    {
      key: 'monographs_hero_title',
      value: 'Medical Guidance & Clinical Monographs',
      value_ne: 'चिकित्सकीय परामर्श तथा क्लिनिकल मोनोग्राफहरू',
      category: 'Monographs',
      label: 'Monographs Headline'
    },
    {
      key: 'monographs_hero_subtitle',
      value: 'Evidence-based dermatological prescribing protocols, post-procedure recovery schedules, and peer-reviewed formulation monographs for healthcare practitioners.',
      value_ne: 'स्वास्थ्यकर्मीहरूका लागि प्रमाण-आधारित डर्माटोलोजिकल प्रेस्क्राइबिङ प्रोटोकल, प्रक्रियापछिको रिकभरी तालिका, र क्लिनिकल मोनोग्राफहरू।',
      category: 'Monographs',
      label: 'Monographs Subtitle'
    },
    {
      key: 'science_botanical_title',
      value: 'Koshi Alpine Extraction: Preserving Delicate Triterpenoids',
      value_ne: 'कोशी अल्पाइन एक्स्ट्र्याक्सन: संवेदनशील ट्राइटरपेनोइड्सको संरक्षण',
      category: 'Science & About',
      label: 'Botanical Section Title'
    },
    {
      key: 'science_botanical_desc',
      value: 'Conventional high-heat distillation destroys the fragile anti-inflammatory molecular chains in native flora. At our Koshi facility, CDerma utilizes low-temperature sub-critical cold-maceration at 18°C.',
      value_ne: 'परम्परागत उच्च-ताप डिस्टिलेसनले स्थानीय वनस्पतिका संवेदनशील एन्टी-इन्फ्लेमेटरी मोलिक्युलर चेनहरू नष्ट गर्दछ। हाम्रो कोशी प्रयोगशालामा सिडर्माले १८° सेन्टिग्रेडमा न्यून-ताप सब-क्रिटिकल कोल्ड-म्यासेरेसन प्रविधि प्रयोग गर्दछ।',
      category: 'Science & About',
      label: 'Botanical Section Description'
    }
  ];

  const checkStmt = db.prepare('SELECT key FROM site_settings WHERE key = ?');
  const insertStmt = db.prepare('INSERT INTO site_settings (key, value, value_ne, category, label) VALUES (?, ?, ?, ?, ?)');
  const updateStmt = db.prepare('UPDATE site_settings SET value = ?, value_ne = ?, category = ?, label = ? WHERE key = ?');

  for (const item of updates) {
    const existing = checkStmt.get(item.key);
    if (existing) {
      updateStmt.run(item.value, item.value_ne, item.category, item.label, item.key);
      console.log(`Updated setting: ${item.key}`);
    } else {
      insertStmt.run(item.key, item.value, item.value_ne, item.category, item.label);
      console.log(`Inserted setting: ${item.key}`);
    }
  }

  // Verify all 39 data-cms keys
  const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
  const cmsKeysInHtml = new Set();
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const regex = /data-cms="([^"]+)"/g;
    let m;
    while ((m = regex.exec(content)) !== null) {
      cmsKeysInHtml.add(m[1]);
    }
  });

  const rows = db.prepare('SELECT key, value, value_ne FROM site_settings').all();
  const dbMap = {};
  rows.forEach(r => dbMap[r.key] = r);

  let allGood = true;
  cmsKeysInHtml.forEach(k => {
    if (!dbMap[k]) {
      console.error(`ERROR: Key missing in DB: ${k}`);
      allGood = false;
    } else if (!dbMap[k].value_ne || dbMap[k].value_ne.trim() === '') {
      console.error(`ERROR: Key missing value_ne in DB: ${k}`);
      allGood = false;
    }
  });

  if (allGood) {
    console.log(`\nSUCCESS! All ${cmsKeysInHtml.size} data-cms keys across all HTML files are present in DB with valid value_ne!`);
  }
}

main().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
