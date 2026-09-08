/**
 * CDerma Nepal - Production-Ready LLMs.txt & LLMs-Full.txt Generator Service
 * Conforms to the emerging /llms.txt specification for AI search engines,
 * LLM crawlers (ChatGPT, Perplexity, Claude, Copilot), RAG systems, and AI agents.
 */

const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const ROOT_DIR = path.resolve(__dirname, '../../');
const LLMS_TXT_PATH = path.join(ROOT_DIR, 'llms.txt');
const LLMS_FULL_TXT_PATH = path.join(ROOT_DIR, 'llms-full.txt');

function getBaseUrl() {
  return (process.env.SITE_URL || 'https://cderma.com.np').replace(/\/+$/, '');
}

/**
 * Discovers and parses public canonical URLs from sitemap.xml
 */
function getSitemapUrls() {
  const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return [];
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [];
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return [...new Set(urls)];
}

/**
 * Extracts clean settings map from database
 */
function getSiteSettingsMap() {
  try {
    const rows = db.prepare('SELECT key, value, value_ne FROM site_settings').all();
    const map = {};
    for (const r of rows) {
      map[r.key] = r.value || '';
      map[r.key + '_ne'] = r.value_ne || '';
    }
    return map;
  } catch (e) {
    return {};
  }
}

/**
 * Generate concise /llms.txt
 */
function generateLlmsTxt(products, monographs, clinics, settings, baseUrl) {
  const generatedDate = new Date().toISOString().split('T')[0];

  let md = `# CDerma Nepal — Doctor-Formulated Skincare & Cleanroom Dermocosmetics\n\n`;
  md += `> CDerma Nepal (by K&K Trading Concern) is Nepal's premier doctor-formulated clinical skincare manufacturer and wholesale supplier based in Itahari, Sunsari, Koshi Province. Formulated under ISO Class 7 cleanroom precision specifically for high-altitude UV, dry winter climates, and urban pollution in South Asia.\n\n`;

  md += `## Canonical Information\n`;
  md += `- Base URL: ${baseUrl}\n`;
  md += `- Primary Language: English (en) / Nepali (ne)\n`;
  md += `- Facility: ISO Class 7 Cleanroom, Sunsari District, Koshi Province, Nepal\n`;
  md += `- Regulatory: DDA / PAN: 609874123 • EXIM: 3049904360114NP • GMP Compliant\n`;
  md += `- Full Detailed Index: [llms-full.txt](${baseUrl}/llms-full.txt)\n`;
  md += `- XML Sitemap: [sitemap.xml](${baseUrl}/sitemap.xml)\n`;
  md += `- Last Updated: ${generatedDate}\n\n`;

  md += `## Core Website Pages\n`;
  md += `- [CDerma Home](${baseUrl}/): Official portal detailing doctor formulations, clinical certifications, and Himalayan bio-actives.\n`;
  md += `- [Clinical Formulations Directory](${baseUrl}/products.html): Medical dermocosmetics catalog for barrier restoration, cleansers, serums, and mineral sunscreens.\n`;
  md += `- [Cleanroom Botanical Science](${baseUrl}/science.html): ISO Class 7 cleanroom engineering, sub-critical alpine Centella extraction, and soil-to-vial batch tracing.\n`;
  md += `- [B2B Wholesale & Clinic Supply](${baseUrl}/b2b.html): Wholesale partnership tiers, protected retailer margins (35%–48%), and cleanroom batch dispatch.\n`;
  md += `- [Authorized Clinics & Dispensaries Locator](${baseUrl}/clinics.html): Directory of certified hospital pharmacies, aesthetic clinics, and cosmetic retailers across all 7 provinces of Nepal.\n`;
  md += `- [Clinical Monographs & Doctor Advice](${baseUrl}/monographs.html): Evidence-based prescribing protocols, post-procedure barrier recovery guides, and patient education.\n\n`;

  md += `## Medical-Grade Products (Formulary)\n`;
  products.forEach(p => {
    const prodUrl = `${baseUrl}/products/${encodeURIComponent(p.slug)}`;
    const priceStr = p.price_npr ? `NPR ${p.price_npr}` : 'Prescription Tier';
    const volStr = p.volume ? ` (${p.volume})` : '';
    const badgeStr = p.clinical_badge ? ` · ${p.clinical_badge}` : '';
    md += `- [${p.title}](${prodUrl}): ${p.subtitle || p.category}${volStr} — ${priceStr}${badgeStr}. Target: ${p.summary || 'Barrier health and cellular regeneration'}.\n`;
  });
  md += `\n`;

  md += `## Clinical Monographs & Prescribing Protocols\n`;
  monographs.forEach(m => {
    const monoUrl = `${baseUrl}/monographs.html#${m.code}`;
    const author = m.author || 'Dr. S. Karki';
    md += `- [${m.code}: ${m.title}](${monoUrl}): ${m.category} monograph by ${author}. Indication: ${m.indication || 'Skin barrier dysfunction'}. Protocol: ${m.summary || 'Clinical guidance'}.\n`;
  });
  md += `\n`;

  md += `## Authorized Dispensing Network\n`;
  clinics.slice(0, 5).forEach(c => {
    md += `- [${c.name}](${baseUrl}/clinics.html): ${c.category} in ${c.city}, ${c.province}. Lead: ${c.lead_doctor || 'Verified Physician'}.\n`;
  });
  md += `- [View All ${clinics.length} Verified Outlets](${baseUrl}/clinics.html): Complete provincial distribution grid with stock verification and contact numbers.\n\n`;

  md += `## Key Scientific Specifications\n`;
  md += `- Cleanroom Environment: ISO Class 7 (Class 10,000) with positive-pressure HEPA filtration.\n`;
  md += `- Physiological Formulation: pH balanced between 5.4 and 5.8 to match native human acid mantle.\n`;
  md += `- Purity Standard: 100% artificial perfume-free, paraben-free, zero questionable fillers, heavy-metal assayed.\n`;
  md += `- Cold-Chain Guarantee: Sealed batch tracking with calibrated temperature data-loggers on provincial shipments.\n\n`;

  md += `## Frequently Asked Questions (FAQ)\n`;
  md += `- What makes CDerma unique in Nepal?: Formulated specifically for Nepal's extreme UV and dry winter climates using sub-alpine Centella and bio-identical ceramides (NP, AP, EOP) produced locally in Itahari.\n`;
  md += `- Where can patients buy CDerma?: Exclusively available through verified dermatology clinics, aesthetic institutes, authorized cosmetic stores, and hospital pharmacies nationwide.\n`;
  md += `- What is the Wholesale MOQ for clinics and retailers?: Accessible introductory tiers starting from 24 units across mixed SKUs with counter testers and retail merchandising displays.\n`;
  md += `- Can practitioners inspect the facility?: Yes, CDerma hosts scheduled technical walkthroughs of the Itahari cleanroom suites for licensed doctors and procurement committees.\n\n`;

  md += `## Contact & Corporate Verification\n`;
  md += `- Corporate Entity: K&K Trading Concern / CDerma Nepal\n`;
  md += `- Manufacturing & Hub: Sunsari District, Koshi Province, Nepal\n`;
  md += `- Telephone: ${settings.contact_phone || '+977 9820753751'}\n`;
  md += `- WhatsApp Desk: ${settings.contact_whatsapp || '+977 9801234567'}\n`;
  md += `- Official Email: ${settings.contact_email || 'kandktradingconcern@gmail.com'}\n`;
  md += `- Registration: DDA / PAN: 609874123 • EXIM: 3049904360114NP\n`;

  return md;
}

/**
 * Generate comprehensive /llms-full.txt
 */
function generateLlmsFullTxt(products, monographs, clinics, settings, baseUrl) {
  const generatedDate = new Date().toISOString().split('T')[0];

  let md = `# CDerma Nepal — Comprehensive Clinical Skincare & Cleanroom Dossier\n\n`;
  md += `> Complete authoritative documentation for AI agents, LLMs, and medical search engines. Contains full product monographs, INCI ingredients declarations, clinical advice articles, authorized dispensary registry, cleanroom manufacturing standards, and bilingual English-Nepali references.\n\n`;

  md += `## 1. System Metadata & Index\n`;
  md += `- Canonical Domain: ${baseUrl}\n`;
  md += `- Compact Index: ${baseUrl}/llms.txt\n`;
  md += `- Sitemap: ${baseUrl}/sitemap.xml\n`;
  md += `- Generation Date: ${generatedDate}\n`;
  md += `- Manufacturer: CDerma Nepal / K&K Trading Concern\n`;
  md += `- Headquarters & Facility: Itahari, Sunsari District, Koshi Province, Nepal\n`;
  md += `- Quality Standard: ISO Class 7 (Class 10,000) Cleanroom • GMP Guidelines • DDA Registered\n\n`;

  md += `## 2. Core Public Web Architecture\n`;
  md += `| Page | Canonical URL | Primary Function |\n`;
  md += `|------|---------------|------------------|\n`;
  md += `| Homepage | ${baseUrl}/ | Brand identity, clinical certifications, climate adaptation, hero products, FAQs |\n`;
  md += `| Products Catalog | ${baseUrl}/products.html | Full medical-grade skincare formulary with category and tolerance filtering |\n`;
  md += `| Regimen Details | ${baseUrl}/product-detail.html | Interactive clinical detailer, INCI disclosures, usage rituals, and specifications |\n`;
  md += `| Science & Cleanroom | ${baseUrl}/science.html | Cleanroom standards, sub-critical Centella extraction, HEPA airflow, batch assay |\n`;
  md += `| B2B Wholesale | ${baseUrl}/b2b.html | Retailer margin tiers (35%–48%), direct clinic dispensary supply, application portal |\n`;
  md += `| Clinics Directory | ${baseUrl}/clinics.html | Verified store & clinic locator across Kathmandu, Pokhara, Biratnagar, and all 7 provinces |\n`;
  md += `| Monographs & Blog | ${baseUrl}/monographs.html | Clinical research monographs, doctor prescribing protocols, and evidence-based patient advice |\n\n`;

  md += `## 3. Complete Product Formulary Monographs\n`;
  products.forEach((p, idx) => {
    let keyBenefits = [];
    try { keyBenefits = JSON.parse(p.key_benefits || '[]'); } catch(e) {}
    let activeIngs = [];
    try { activeIngs = JSON.parse(p.active_ingredients || '[]'); } catch(e) {}

    md += `### 3.${idx + 1} ${p.title}\n`;
    md += `- Canonical URL: ${baseUrl}/products/${encodeURIComponent(p.slug)}\n`;
    md += `- Formula Code: ${p.slug}\n`;
    md += `- Category: ${p.category} | Volume: ${p.volume || 'Standard'}\n`;
    md += `- Pricing: NPR ${p.price_npr || 0} (Protected MAP Retail Pricing)\n`;
    md += `- Clinical Badge: ${p.clinical_badge || 'Medical Dermocosmetic'}\n`;
    md += `- Nepali Title: ${p.title_ne || p.title}\n`;
    md += `- Clinical Indication: ${p.summary || 'Daily physiological barrier support'}\n`;
    md += `- Full Description: ${p.description || 'Doctor-formulated physiological barrier restorative.'}\n`;
    
    if (keyBenefits.length > 0) {
      md += `- Key Clinical Benefits:\n`;
      keyBenefits.forEach(b => { md += `  * ${b}\n`; });
    }
    
    if (activeIngs.length > 0) {
      md += `- Active Compounds & Pharmacological Action:\n`;
      activeIngs.forEach(ing => {
        md += `  * ${ing.name || ing}: ${ing.description || ing.role || 'Active dermal component'}\n`;
      });
    }

    if (p.usage_instructions) {
      md += `- Application Ritual & Directions: ${p.usage_instructions}\n`;
    }
    md += `\n`;
  });

  md += `## 4. Published Clinical Monographs & Prescribing Protocols\n`;
  monographs.forEach((m, idx) => {
    md += `### 4.${idx + 1} [${m.code}] ${m.title}\n`;
    md += `- URL: ${baseUrl}/monographs.html#${m.code}\n`;
    md += `- Category: ${m.category} | Author: ${m.author || 'Dr. S. Karki'} | Read Time: ${m.read_time || '5 min'}\n`;
    md += `- Target Clinical Indication: ${m.indication || 'Skin barrier repair'}\n`;
    md += `- Summary: ${m.summary || ''}\n`;
    if (m.clinical_protocol) {
      md += `- Prescribing Protocol: ${m.clinical_protocol}\n`;
    }
    if (m.active_compounds) {
      md += `- Monitored Active Compounds: ${m.active_compounds}\n`;
    }
    if (m.title_ne) {
      md += `- नेपाली शीर्षक: ${m.title_ne}\n`;
      md += `- नेपाली सारांश: ${m.summary_ne || ''}\n`;
    }
    md += `\n`;
  });

  md += `## 5. Authorized Medical Dispensaries & Clinic Network\n`;
  clinics.forEach((c, idx) => {
    md += `### 5.${idx + 1} ${c.name}\n`;
    md += `- Facility Type: ${c.category}\n`;
    md += `- Location: ${c.address}, ${c.city}, ${c.province} Province\n`;
    md += `- Lead Physician / Specialist: ${c.lead_doctor || 'Licensed Practitioner'} (${c.doctor_nmc || 'NMC Registered'})\n`;
    md += `- Stock Verification: ${c.stock_summary || 'Full Clinical Formulary In Stock'}\n`;
    md += `- Operating Hours: ${c.operating_hours || '10:00 - 19:00 (Sun-Fri)'}\n`;
    if (c.phone) md += `- Contact Phone: ${c.phone}\n`;
    if (c.name_ne) md += `- नेपाली विवरण: ${c.name_ne} (${c.address_ne || c.address})\n`;
    md += `\n`;
  });

  md += `## 6. Manufacturing Standards & Laboratory Verification\n`;
  md += `- Facility Environment: Certified ISO Class 7 (Class 10,000) cleanroom in Sunsari, Koshi Province.\n`;
  md += `- Air Purity & HEPA Filtration: 0.3 micron positive-pressure HEPA filtration with zero airborne cross-contamination.\n`;
  md += `- Sub-Critical Botanical Extraction: Closed-loop low-temperature sub-critical extraction yielding 88.4% active Asiaticoside and Madecassoside fractions, preserving thermolabile terpenes.\n`;
  md += `- Analytical Quality Assurance: Every commercial batch undergoes third-party microbial bioburden screening (USP 61/62), centrifugal phase stability (4,000 RPM / 30 mins), and heavy metal spectroscopy (Pb/Hg/As < 1.0 ppm).\n`;
  md += `- Cold-Chain Distribution: Direct dispatch in climate-monitored courier boxes maintaining -5°C to 25°C transit safety.\n\n`;

  md += `## 7. B2B Wholesale Distribution Terms\n`;
  md += `- Eligibility: Licensed cosmetic store retailers, aesthetic clinics, dermatology centers, and hospital pharmacies.\n`;
  md += `- Retail Profit Margin: 35% to 48% structured gross margin with strict MAP (Minimum Advertised Price) protection to prevent online discounting.\n`;
  md += `- Ordering Tiers:\n`;
  md += `  * Trial Starter Pack: 25 - 50 units (ideal for testing regional retail demand)\n`;
  md += `  * Standard Store Supply: 50 - 150 units (includes acrylic counter displays and tester units)\n`;
  md += `  * Institutional / Bulk: 150 - 500 units (preferential pricing for hospital chains and large dermatology practices)\n`;
  md += `  * Regional Wholesaler: 500+ units (exclusive territory rights and direct lab dispatch)\n`;
  md += `- Logistics Speed: Same-day delivery in Kathmandu Valley; 24 to 48 hour guaranteed priority dispatch across all 7 provinces.\n\n`;

  md += `## 8. Clinical FAQ & Answers\n`;
  md += `### Q1: Why do doctors in Nepal recommend CDerma barrier serums over imported alternatives?\n`;
  md += `A1: Imported skincare frequently endures extreme heat during overseas shipping and border customs warehousing, degrading delicate bioactive ingredients. CDerma is cold-chain formulated and manufactured domestically in Itahari, guaranteeing fresh batch delivery with maximum pharmacological potency and zero artificial fragrances.\n\n`;

  md += `### Q2: Are CDerma products safe for sensitive, reactive, and acne-prone skin?\n`;
  md += `A2: Yes. All CDerma products are formulated at physiological pH (5.4–5.8), free from synthetic perfumes, essential oils, and pore-clogging mineral oils. They are designed for reactive skin and safe for post-laser/peel healing.\n\n`;

  md += `### Q3: How do patients verify batch authenticity?\n`;
  md += `A3: Each CDerma bottle features a unique 8-digit manufacturing lot ID and QR code linking directly to the cleanroom Certificate of Analysis (COA) confirming microbiological and purity screening.\n\n`;

  md += `## 9. नेपाली भाषा सारांश (Nepali Language Reference)\n`;
  md += `### सिडर्मा नेपाल — परिचय र क्लिनिकल मापदण्ड\n`;
  md += `सिडर्मा नेपाल (के एन्ड के ट्रेडिङ कन्सर्नद्वारा प्रवर्द्धित) नेपालकै पहिलो डाक्टर-फर्मुलेटेड क्लिनिकल छाला हेरचाह उत्पादक तथा थोक वितरक हो। सुनसरीको इटहरीमा रहेको ISO क्लास ७ क्लिनरुममा निर्मित हाम्रा उत्पादनहरू नेपालको उच्च उचाइको घाम, जाडोको सुक्खापन र सहरी प्रदूषणलाई ध्यानमा राखी तयार पारिएका हुन्।\n\n`;
  md += `### मुख्य उत्पादनहरू (नेपाली विवरण):\n`;
  products.forEach(p => {
    md += `- **${p.title_ne || p.title}**: ${p.subtitle_ne || p.subtitle || p.category} (मूल्य: रु ${p.price_npr || 0}) — ${p.summary_ne || p.summary || ''}\n`;
  });
  md += `\n### क्लिनिक तथा स्टोर सञ्जाल:\n`;
  md += `काठमाडौं, पोखरा, विराटनगर, धरान, चितवन र बुटवलसहित सातै प्रदेशका प्रमुख अस्पताल फार्मेसी तथा छाला क्लिनिकहरूमा सिडर्माका उत्पादनहरू सिफारिस गरिन्छन्।\n\n`;

  md += `## 10. Corporate Inquiries & Contacts\n`;
  md += `- Company: K&K Trading Concern / CDerma Nepal\n`;
  md += `- Official Address: Itahari, Sunsari District, Koshi Province, Nepal\n`;
  md += `- Phone: ${settings.contact_phone || '+977 9820753751'}\n`;
  md += `- WhatsApp: ${settings.contact_whatsapp || '+977 9801234567'}\n`;
  md += `- Email: ${settings.contact_email || 'kandktradingconcern@gmail.com'}\n`;
  md += `- DDA / PAN: 609874123 | EXIM: 3049904360114NP\n`;

  return md;
}

/**
 * Main Generator Function
 * Builds and saves both /llms.txt and /llms-full.txt
 */
async function generateAll(options = {}) {
  const baseUrl = options.baseUrl || getBaseUrl();
  const startTime = Date.now();

  // Query fresh data from SQLite
  const products = db.prepare("SELECT * FROM products WHERE status = 'active' ORDER BY sort_order ASC, id ASC").all();
  const monographs = db.prepare("SELECT * FROM monographs WHERE is_published = 1 ORDER BY sort_order ASC, id ASC").all();
  const clinics = db.prepare("SELECT * FROM clinics WHERE status = 'active' ORDER BY sort_order ASC, id ASC").all();
  const settings = getSiteSettingsMap();
  const sitemapUrls = getSitemapUrls();

  // Compile texts
  const llmsTxt = generateLlmsTxt(products, monographs, clinics, settings, baseUrl);
  const llmsFullTxt = generateLlmsFullTxt(products, monographs, clinics, settings, baseUrl);

  // Write files to root
  fs.writeFileSync(LLMS_TXT_PATH, llmsTxt, 'utf8');
  fs.writeFileSync(LLMS_FULL_TXT_PATH, llmsFullTxt, 'utf8');

  const durationMs = Date.now() - startTime;
  const stats = {
    generatedAt: new Date().toISOString(),
    durationMs,
    baseUrl,
    llmsTxtBytes: Buffer.byteLength(llmsTxt, 'utf8'),
    llmsFullTxtBytes: Buffer.byteLength(llmsFullTxt, 'utf8'),
    productCount: products.length,
    monographCount: monographs.length,
    clinicCount: clinics.length,
    sitemapUrlCount: sitemapUrls.length
  };

  // Persist status to site_settings if available
  try {
    const upsertSetting = db.prepare(`
      INSERT INTO site_settings (key, value, category, label)
      VALUES (?, ?, 'seo', ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP
    `);
    upsertSetting.run('llms_last_generated', stats.generatedAt, 'Last LLMs.txt Generation Timestamp');
    upsertSetting.run('llms_stats', JSON.stringify(stats), 'LLMs Generation Telemetry');
    if (!settings.llms_auto_generate) {
      upsertSetting.run('llms_auto_generate', '1', 'Auto-regenerate LLMs.txt on Content Edits');
    }
  } catch (e) {
    console.warn('Could not persist llms stats to site_settings:', e.message);
  }

  console.log(`✅ [llmsGenerator] Generated /llms.txt (${stats.llmsTxtBytes} B) & /llms-full.txt (${stats.llmsFullTxtBytes} B) in ${durationMs}ms`);

  return {
    success: true,
    stats,
    llmsTxt,
    llmsFullTxt
  };
}

/**
 * Hook to regenerate files if auto-generation is enabled
 */
async function regenerateIfEnabled() {
  try {
    const row = db.prepare("SELECT value FROM site_settings WHERE key = 'llms_auto_generate'").get();
    if (row && row.value === '0') {
      console.log('ℹ️ [llmsGenerator] Auto-generation is disabled in settings. Skipping.');
      return null;
    }
    return await generateAll();
  } catch (e) {
    console.error('Error during auto-regeneration of llms files:', e.message);
    return null;
  }
}

module.exports = {
  generateAll,
  regenerateIfEnabled,
  getBaseUrl,
  LLMS_TXT_PATH,
  LLMS_FULL_TXT_PATH
};
