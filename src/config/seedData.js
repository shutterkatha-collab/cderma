/**
 * CDerma Nepal - Initial Seed Data
 * Contains comprehensive seed content for all site text, media slots, products, clinics, and monographs.
 */

const defaultSettings = [
  // General Brand Info
  { key: 'brand_name', value: 'cDerma Skin Science', category: 'General', label: 'Brand Name' },
  { key: 'brand_tagline', value: 'Simple. Clinical. Professional.', category: 'General', label: 'Tagline' },
  { key: 'topbar_announcement', value: 'cDerma Skin Science • Dermatology-Focused Skincare • Marketed by K&K Trading Concern, Nepal', category: 'General', label: 'Top Announcement Banner' },

  // Home Page - Hero Section
  { key: 'hero_title', value: 'Science-led skincare for healthier skin.', category: 'Home Page', label: 'Hero Main Headline' },
  { key: 'hero_subtitle', value: 'Thoughtfully formulated with a professional approach for common and challenging skin concerns in Nepal.', category: 'Home Page', label: 'Hero Subtitle' },
  { key: 'hero_badge', value: 'cDerma | SKIN SCIENCE', category: 'Home Page', label: 'Hero Pill Badge' },
  { key: 'hero_cta_primary', value: 'Explore Our Products', category: 'Home Page', label: 'Primary CTA Button Text' },
  { key: 'hero_cta_secondary', value: 'For Professionals', category: 'Home Page', label: 'Secondary CTA Button Text' },

  // Navigation & Global Header (V3 6-item Nav)
  { key: 'nav_home', value: 'Home', category: 'Navigation', label: 'Navigation: Home' },
  { key: 'nav_products', value: 'Products', category: 'Navigation', label: 'Navigation: Products' },
  { key: 'nav_concerns', value: 'Skin Concerns', category: 'Navigation', label: 'Navigation: Skin Concerns' },
  { key: 'nav_b2b', value: 'For Professionals', category: 'Navigation', label: 'Navigation: For Professionals' },
  { key: 'nav_about', value: 'About', category: 'Navigation', label: 'Navigation: About' },
  { key: 'nav_contact', value: 'Contact', category: 'Navigation', label: 'Navigation: Contact' },

  // Home Page - 3 Pillars (V3 Spec)
  { key: 'pillar_1_title', value: 'Science-Based Approach', category: 'Home Page', label: 'Pillar 1 Title' },
  { key: 'pillar_1_desc', value: 'Formulations built around purposeful active ingredients.', category: 'Home Page', label: 'Pillar 1 Description' },
  { key: 'pillar_2_title', value: 'Quality Focused', category: 'Home Page', label: 'Pillar 2 Title' },
  { key: 'pillar_2_desc', value: 'Product quality and thoughtful formulation at the centre.', category: 'Home Page', label: 'Pillar 2 Description' },
  { key: 'pillar_3_title', value: 'Professional Approach', category: 'Home Page', label: 'Pillar 3 Title' },
  { key: 'pillar_3_desc', value: 'Designed around modern skincare needs.', category: 'Home Page', label: 'Pillar 3 Description' },

  // For Professionals (V3 Section 2)
  { key: 'b2b_hero_title', value: 'Partnering for Better Skin Care.', category: 'B2B Page', label: 'B2B Hero Title' },
  { key: 'b2b_hero_subtitle', value: 'Clear product information and professional support for dermatologists, clinics, pharmacies and other healthcare professionals.', category: 'B2B Page', label: 'B2B Hero Subtitle' },
  { key: 'b2b_cta_button', value: 'Professional Enquiry', category: 'B2B Page', label: 'B2B Button' },

  // About cDerma (V3 Section 3)
  { key: 'about_heading', value: 'Science-Led Skincare. Professional Approach.', category: 'About Page', label: 'About Heading' },
  { key: 'about_body', value: 'cDerma is a dermatology-focused skincare brand by K&K Trading Concern, created to provide thoughtful, science-led skincare solutions for common and challenging skin concerns in Nepal.', category: 'About Page', label: 'About Body' },
  { key: 'science_cleanroom_desc', value: 'Our facility in Itahari operates under ISO Class 7 (Class 10,000) air purity standards with positive HEPA filtration, automated batch traceability, and strict GMP protocols.', category: 'Science & About', label: 'Cleanroom Section Description' },
  { key: 'cleanroom_iso', value: 'ISO Class 7 (Class 10,000)', category: 'Science & About', label: 'Cleanroom ISO Grade' },
  { key: 'cleanroom_location', value: 'K&K Trading Concern, Itahari, Sunsari, Nepal', category: 'Science & About', label: 'Facility Location' },
  { key: 'cleanroom_testing', value: '100% Dermatologically Tested on South Asian Skin', category: 'Science & About', label: 'Testing Specification' },
  { key: 'cleanroom_ph', value: 'Physiological pH 5.2 – 5.5', category: 'Science & About', label: 'Target Physiological pH' },
  { key: 'science_botanical_badge', value: 'Indigenous Bio-Active Procurement', category: 'Science & About', label: 'Botanical Section Badge' },
  { key: 'science_botanical_title', value: 'Koshi Alpine Extraction: Preserving Delicate Triterpenoids', category: 'Science & About', label: 'Botanical Section Title' },
  { key: 'science_botanical_desc', value: 'Conventional high-heat distillation destroys the fragile anti-inflammatory molecular chains in native flora. At our Koshi facility, CDerma utilizes low-temperature sub-critical cold-maceration at 18°C.', category: 'Science & About', label: 'Botanical Section Description' },
  { key: 'science_trace_title', value: 'Direct Soil-to-Vial Batch Traceability', category: 'Science & About', label: 'Traceability Title' },
  { key: 'science_trace_desc', value: 'Every commercial unit leaving our Itahari cleanroom is stamped with a traceable 8-digit manufacturing lot ID.', category: 'Science & About', label: 'Traceability Description' },
  { key: 'science_cta_title', value: 'Schedule a Technical Cleanroom Inspection', category: 'Science & About', label: 'Science CTA Title' },
  { key: 'science_cta_subtitle', value: 'We invite licensed dermatologists, hospital procurement committees, and clinical researchers to inspect our sterile processing suites in Itahari.', category: 'Science & About', label: 'Science CTA Subtitle' },
  { key: 'science_cta_btn', value: 'Book Academic Cleanroom Tour', category: 'Science & About', label: 'Science CTA Button' },

  // B2B & Wholesale Portal
  { key: 'b2b_hero_title', value: 'Direct B2B Cosmetic Store, Clinic & Wholesale Distribution', category: 'B2B Wholesale', label: 'B2B Main Headline' },
  { key: 'b2b_hero_subtitle', value: 'Institutional supply agreements, cosmetic store counter testers, and direct wholesale pricing for premier beauty retailers, licensed dermatology clinics, and hospital pharmacies.', category: 'B2B Wholesale', label: 'B2B Subtitle' },
  { key: 'b2b_stat_1_val', value: '120+', category: 'B2B Wholesale', label: 'B2B Stat 1 Value' },
  { key: 'b2b_stat_1_lbl', value: 'Cosmetic Stores & Pharmacies', category: 'B2B Wholesale', label: 'B2B Stat 1 Label' },
  { key: 'b2b_stat_2_val', value: '45+', category: 'B2B Wholesale', label: 'B2B Stat 2 Value' },
  { key: 'b2b_stat_2_lbl', value: 'Dermatology Clinics & Hospitals', category: 'B2B Wholesale', label: 'B2B Stat 2 Label' },
  { key: 'b2b_stat_3_val', value: '24h', category: 'B2B Wholesale', label: 'B2B Stat 3 Value' },
  { key: 'b2b_stat_3_lbl', value: 'Express Dispatch from Koshi Lab', category: 'B2B Wholesale', label: 'B2B Stat 3 Label' },
  { key: 'b2b_stat_4_val', value: '100%', category: 'B2B Wholesale', label: 'B2B Stat 4 Value' },
  { key: 'b2b_stat_4_lbl', value: 'Nepal Domestic Supply Reliability', category: 'B2B Wholesale', label: 'B2B Stat 4 Label' },
  { key: 'b2b_benefit_1_title', value: 'Continuous Domestic Supply', category: 'B2B Wholesale', label: 'B2B Benefit 1 Title' },
  { key: 'b2b_benefit_1_desc', value: 'Formulated and manufactured in Nepal. Zero customs delays, import tariffs, or third-party border disruptions.', category: 'B2B Wholesale', label: 'B2B Benefit 1 Description' },
  { key: 'b2b_benefit_2_title', value: 'Practitioner & Retailer Margin Protection', category: 'B2B Wholesale', label: 'B2B Benefit 2 Title' },
  { key: 'b2b_benefit_2_desc', value: 'Strict MAP pricing and clear wholesale tiers protect cosmetic retailers and clinic dispensary margins against undercut discounting.', category: 'B2B Wholesale', label: 'B2B Benefit 2 Description' },
  { key: 'b2b_benefit_3_title', value: 'Store Testers & Doctor Trial Kits', category: 'B2B Wholesale', label: 'B2B Benefit 3 Title' },
  { key: 'b2b_benefit_3_desc', value: 'Luxury acrylic counter displays, full-size retail testers, beauty advisor selling guides, and clinical trial sachets provided to authorized partners.', category: 'B2B Wholesale', label: 'B2B Benefit 3 Description' },
  { key: 'b2b_form_title', value: 'Cosmetic Store & Clinic Wholesale Application', category: 'B2B Wholesale', label: 'Application Form Title' },
  { key: 'b2b_form_subtitle', value: 'Apply for direct cosmetic retailer, clinic dispensary wholesale pricing, counter tester units, and clinical trial kits.', category: 'B2B Wholesale', label: 'Application Form Subtitle' },
  { key: 'b2b_form_btn', value: 'Submit Wholesale Application', category: 'B2B Wholesale', label: 'Application Form Button' },

  // Products Page
  { key: 'products_hero_title', value: 'Clinical Formulations Directory', category: 'Products Page', label: 'Products Hero Title' },
  { key: 'products_hero_subtitle', value: 'Medical-grade dermatological regimens, concentrated active fractions, and post-procedure barrier creams formulated for Asian skin.', category: 'Products Page', label: 'Products Hero Subtitle' },
  { key: 'products_catalog_title', value: 'Our Complete Face Care & Daily Essentials', category: 'Products Page', label: 'Products Catalog Title' },
  { key: 'products_catalog_subtitle', value: 'Available at leading cosmetic stores, beauty retailers, and certified skin clinics across Nepal.', category: 'Products Page', label: 'Products Catalog Subtitle' },
  { key: 'products_disclaimer', value: 'For clinical dispensary prescription, authorized cosmetic stores, and clinic dispensing. Formulated at physiological pH in our Koshi cleanroom.', category: 'Products Page', label: 'Products Advisory Notice' },

  // Clinic Directory
  { key: 'clinics_hero_title', value: 'Authorized Cosmetic Store & Clinic Directory', category: 'Clinics', label: 'Clinic Locator Headline' },
  { key: 'clinics_hero_subtitle', value: 'Discover authorized beauty retailers, premium cosmetic stores, medical clinics, and aesthetic centers stocking official CDerma clinical formulations across Nepal.', category: 'Clinics', label: 'Clinic Locator Subtitle' },
  { key: 'clinics_search_placeholder', value: 'Search by cosmetic store, clinic name, doctor, city (Kathmandu, Pokhara, Biratnagar)...', category: 'Clinics', label: 'Clinic Search Placeholder' },

  // Monographs & Guidance
  { key: 'monographs_hero_title', value: 'Medical Guidance & Clinical Monographs', category: 'Monographs', label: 'Monographs Headline' },
  { key: 'monographs_hero_subtitle', value: 'Evidence-based dermatological prescribing protocols, post-procedure recovery schedules, and peer-reviewed formulation monographs for healthcare practitioners.', category: 'Monographs', label: 'Monographs Subtitle' },
  { key: 'monographs_disclaimer', value: 'Prescribing guides provided for licensed medical practitioners and dermatology professionals.', category: 'Monographs', label: 'Monographs Advisory' },

  // Contact & Footer
  { key: 'contact_email', value: 'kandktradingconcern@gmail.com', category: 'Contact & Footer', label: 'Official Medical Email' },
  { key: 'contact_phone', value: '+977 9820753751', category: 'Contact & Footer', label: 'Direct Medical Liaison Phone' },
  { key: 'contact_whatsapp', value: '+977 9820753751', category: 'Contact & Footer', label: 'Practitioner WhatsApp' },
  { key: 'contact_address', value: 'K&K Trading Concern, Itahari, Sunsari, Nepal', category: 'Contact & Footer', label: 'Manufacturing & Corporate Address' },
  { key: 'corporate_reg', value: 'Exim Code: 3049904360114NP • ISO 9001:2015 Certified • Mfg. Lic. NW(0729)/24/CM/2651', category: 'Contact & Footer', label: 'Registration & Compliance Notice' },
  { key: 'footer_mission', value: 'Professional skincare, made with care in Itahari, Nepal. Supplying premier cosmetic stores, beauty retailers, certified clinics, and dermatologists across Nepal.', category: 'Contact & Footer', label: 'Footer Brand Mission Statement' },
  { key: 'footer_copyright', value: '© 2026 K&K Trading Concern. Imported & Marketed in Nepal | Itahari, Sunsari | Exim Code: 3049904360114NP', category: 'Contact & Footer', label: 'Footer Copyright Notice' },

  // AEO Summary & Brand Definition
  { key: 'home_aeo_badge', value: 'Doctor-Recommended • Nepal Skincare Manufacturer', category: 'Home Page', label: 'AEO Section Badge' },
  { key: 'home_aeo_title', value: 'Doctor-Recommended Face Care & Skincare Manufacturer in Nepal', category: 'Home Page', label: 'AEO Section Title' },
  { key: 'home_aeo_desc', value: 'CDerma is Nepal\'s premier doctor-recommended face care manufacturer and wholesale skincare supplier. We formulate and produce dermatological barrier repair creams, cleansers, serums, and mineral sun protection for cosmetic stores, clinics, salons, and beauty retailers across Nepal.', category: 'Home Page', label: 'AEO Definition Paragraph' },
  { key: 'home_aeo_point_1', value: 'Manufactured in Cleanroom: Produced under certified ISO Class 7 cleanroom standards in Itahari, Sunsari.', category: 'Home Page', label: 'AEO Key Point 1' },
  { key: 'home_aeo_point_2', value: 'Formulated for Nepal\'s Climate: Engineered for high altitude, intense UV radiation, cold dry winters, and monsoon humidity.', category: 'Home Page', label: 'AEO Key Point 2' },
  { key: 'home_aeo_point_3', value: 'Doctor & Clinic Recommended: Backed by dermatologists and aesthetic clinics nationwide for post-procedure and daily barrier care.', category: 'Home Page', label: 'AEO Key Point 3' },
  { key: 'home_aeo_point_4', value: 'B2B Wholesale & Distribution: Direct supply to beauty retailers, pharmacies, and cosmetic outlets with protected margins.', category: 'Home Page', label: 'AEO Key Point 4' },

  // Home Featured Products Header
  { key: 'home_catalog_title', value: 'Physiological Formulary & Regimens', category: 'Home Page', label: 'Catalog Section Title' },
  { key: 'home_catalog_subtitle', value: 'Pure dermatological bio-actives formulated for high-altitude skin resilience.', category: 'Home Page', label: 'Catalog Section Subtitle' },

  // Products Page Purity Mandates
  { key: 'products_mandate_title', value: 'The CDerma Purity Mandate', category: 'Products Page', label: 'Mandate Section Title' },
  { key: 'products_mandate_1_title', value: 'Zero Synthetic Fragrance', category: 'Products Page', label: 'Mandate 1 Title' },
  { key: 'products_mandate_1_desc', value: 'No perfumes, essential oils, or masking agents that trigger contact dermatitis.', category: 'Products Page', label: 'Mandate 1 Desc' },
  { key: 'products_mandate_2_title', value: 'Pure Cleanroom Standards', category: 'Products Page', label: 'Mandate 2 Title' },
  { key: 'products_mandate_2_desc', value: 'ISO Class 7 cleanroom positive-pressure HEPA filtered manufacturing in Itahari.', category: 'Products Page', label: 'Mandate 2 Desc' },
  { key: 'products_mandate_3_title', value: 'Wild Himalayan Botanicals', category: 'Products Page', label: 'Mandate 3 Title' },
  { key: 'products_mandate_3_desc', value: 'Cold-macerated sub-alpine Centella Asiatica harvested sustainably above 1,800m.', category: 'Products Page', label: 'Mandate 3 Desc' },
  { key: 'products_mandate_4_title', value: 'Made for Nepal\'s Climate', category: 'Products Page', label: 'Mandate 4 Title' },
  { key: 'products_mandate_4_desc', value: 'Targeted formulations for high-altitude UV, dry winter winds, and monsoon humidity.', category: 'Products Page', label: 'Mandate 4 Desc' }
];

const defaultMedia = [
  {
    slot_key: 'site_logo',
    slot_label: 'Main Site Logo (Header & Light Surfaces)',
    page: 'Global',
    description: 'The official CDerma Choice by Professional logo in Pure Black (#000000) for navigation headers and light backgrounds.',
    image_url: 'assets/images/cderma-logo.png'
  },
  {
    slot_key: 'site_logo_white',
    slot_label: 'Inverted White Logo (Dark Surfaces & Admin)',
    page: 'Global',
    description: 'High-contrast Warm Alabaster (#FAF9F6) logo used on dark backgrounds like the Admin sidebar.',
    image_url: 'assets/images/cderma-logo-white.png'
  },
  {
    slot_key: 'hero_flagship_bottle',
    slot_label: 'Homepage Hero Dropper Bottle',
    page: 'Home Page',
    description: 'Ultra-luxury cosmetic packaging shot of the flagship frosted glass dropper bottle.',
    image_url: 'assets/images/product-packaging-dropper.png'
  },
  {
    slot_key: 'hero_model_portrait',
    slot_label: 'Radiant Skin Model Banner',
    page: 'Home Page',
    description: 'Editorial skincare photography featuring South Asian woman with radiant, healthy dewy bare skin.',
    image_url: 'assets/images/radiant-skin-model.png'
  },
  {
    slot_key: 'science_cleanroom',
    slot_label: 'Cleanroom Formulation Facility',
    page: 'Science & About',
    description: 'Architectural cleanroom photograph showing stainless steel bioreactors and cleanroom gowns in Itahari facility.',
    image_url: 'assets/images/cleanroom-facility.png'
  },
  {
    slot_key: 'science_botanical',
    slot_label: 'Centella Botanical Extraction Still-Life',
    page: 'Science & About',
    description: 'Alpine Centella Asiatica leaves and pristine water droplets resting on frosted laboratory glass.',
    image_url: 'assets/images/centella-botanical-extract.png'
  },
  {
    slot_key: 'science_texture',
    slot_label: 'Facial Cream & Serum Texture Swatch',
    page: 'Home & Products',
    description: 'Rich creamy velvety facial moisturizer droplet and silky golden serum texture smear on stone slab.',
    image_url: 'assets/images/texture-swatch.png'
  },
  {
    slot_key: 'science_doctor',
    slot_label: 'Consultant Dermatologist Portrait',
    page: 'Home & Science',
    description: 'Authentic portrait of consultant dermatologist doctor in white clinical coat.',
    image_url: 'assets/images/dr-karki-portrait.png'
  },
  {
    slot_key: 'b2b_banner',
    slot_label: 'B2B Wholesale Cleanroom Laboratory',
    page: 'B2B Portal',
    description: 'Wide laboratory cleanroom research and manufacturing overview banner.',
    image_url: 'assets/images/cleanroom-lab-wide.png'
  },
  {
    slot_key: 'testimonial_doctor_1',
    slot_label: 'Doctor Testimonial Portrait 1 (Dr. Karki)',
    page: 'Home Page',
    description: 'Physician headshot for first home page clinical endorsement.',
    image_url: 'assets/images/img_d8dddc0fbb21.jpg'
  },
  {
    slot_key: 'testimonial_doctor_2',
    slot_label: 'Doctor Testimonial Portrait 2 (Dr. Sharma)',
    page: 'Home Page',
    description: 'Physician headshot for second home page clinical endorsement.',
    image_url: 'assets/images/img_b7a64c067655.jpg'
  },
  {
    slot_key: 'product_cream_jar',
    slot_label: 'Flagship Barrier Cream Jar Packaging',
    page: 'Home & Products',
    description: 'Luxury frosted glass cream jar cosmetic packaging.',
    image_url: 'assets/images/img_623ee7600cd6.png'
  },
  {
    slot_key: 'science_microscope',
    slot_label: 'Laboratory Cellular Research Microscopy',
    page: 'Science & About',
    description: 'Dermatological laboratory microscope and cellular active extraction.',
    image_url: 'assets/images/img_3037b9a39d03.jpg'
  }
];

const defaultProducts = [
  {
    slug: 'coco-c-oil',
    title: 'Coco C Oil',
    title_ne: 'कोको सी तेल',
    subtitle: 'Extra Virgin Coconut Oil',
    subtitle_ne: 'एक्स्ट्रा भर्जिन नरिवल तेल',
    category: 'Daily Skin Care',
    category_ne: 'दैनिक छाला हेरचाह',
    volume: '100 ml',
    price_npr: 1250,
    clinical_badge: '100% Pure Virgin Cold-Pressed',
    clinical_badge_ne: '१००% शुद्ध कोल्ड-प्रेस्ड भर्जिन तेल',
    summary: 'For healthy skin & hair. Pure cold-pressed virgin coconut oil formulated for rich daily hydration and scalp nourishment.',
    summary_ne: 'स्वस्थ छाला र कपालको लागि। दैनिक पोषण र मोइस्चराइजिङका लागि १००% शुद्ध कोल्ड-प्रेस्ड एक्स्ट्रा भर्जिन नरिवल तेल।',
    description: 'cDerma Coco C Oil is a pure, cold-pressed extra virgin coconut oil crafted for everyday skin and hair care. Rich in natural fatty acids and nourishing antioxidants, it locks in moisture, softens dry areas, and keeps skin healthy and supple without artificial additives.',
    description_ne: 'सिडर्मा कोको सी तेल दैनिक छाला र कपालको हेरचाहका लागि १००% शुद्ध र कोल्ड-प्रेस्ड एक्स्ट्रा भर्जिन नरिवल तेल हो।',
    key_benefits: JSON.stringify([
      'Deeply hydrates and nourishes dry skin and hair',
      'Rich in fatty acids and antioxidants for daily moisture',
      '100% pure cold-pressed formula without artificial fragrance or additives'
    ]),
    key_benefits_ne: JSON.stringify([
      'सुख्खा छाला र कपाललाई गहिरो मोइस्चर र पोषण दिन्छ',
      'दैनिक सुरक्षा र ओसका लागि प्राकृतिक फ्याटी एसिडयुक्त',
      'कुनै कृत्रिम सुगन्ध वा रसायन बिनाको १००% शुद्ध कोल्ड-प्रेस्ड फर्मुला'
    ]),
    active_ingredients: JSON.stringify([
      { name: '100% Cold-Pressed Extra Virgin Coconut Oil', concentration: '100%', role: 'Deeply nourishes lipid barrier and softens skin' }
    ]),
    inci_full: 'Cocos Nucifera (Extra Virgin Coconut) Oil.',
    usage_instructions: 'Take a small amount onto palms and massage gently over clean skin or hair until fully absorbed. Suitable for daily morning and evening use.',
    usage_instructions_ne: 'हत्केलामा थोरै तेल लिएर सफा छाला वा कपालमा हलुका मसाज गर्नुहोस्।',
    image_url: 'assets/images/photoshoot-3063.jpg',
    is_featured: 1,
    sort_order: 1,
    status: 'active'
  },
  {
    slug: 'alpha-c-serum',
    title: 'Alpha C Serum',
    title_ne: 'अल्फा सी सिरम',
    subtitle: '2% Alpha Arbutin + 1% Kojic Acid with Multi-Peptides',
    subtitle_ne: '२% अल्फा आर्बुटिन + १% कोजिक एसिड र मल्टि-पेप्टाइड्स',
    category: 'Pigmentation & Uneven Tone',
    category_ne: 'पिग्मेन्टेसन र असमान छाला',
    volume: '30 ml',
    price_npr: 2200,
    clinical_badge: 'Targeted Tone & Clarity',
    clinical_badge_ne: 'दाग नियन्त्रण तथा उज्यालोपन',
    summary: 'Brightens uneven skin. Targets dark spots, post-acne marks, and uneven tone with proven brightening actives and skin-supporting peptides.',
    summary_ne: 'असमान छालालाई उज्यालो बनाउँछ। कालो दाग, घामको असर र पिग्मेन्टेसन कम गरी छालालाई सफा र चम्किलो बनाउँछ।',
    description: 'Alpha C Serum is a lightweight, purposeful daily serum formulated with 2% Alpha Arbutin, 1% Kojic Acid, and restorative Multi-Peptides. It helps visibly diminish the appearance of persistent dark spots and uneven pigmentation while strengthening skin resilience for a balanced, radiant look.',
    description_ne: 'अल्फा सी सिरम २% अल्फा आर्बुटिन, १% कोजिक एसिड र मल्टि-पेप्टाइड्सले बनेको हल्का सिरम हो।',
    key_benefits: JSON.stringify([
      'Visibly targets dark spots, blemishes, and uneven pigmentation',
      'Promotes a brighter, more balanced, and radiant complexion',
      'Multi-peptides support skin firmness and moisture retention'
    ]),
    key_benefits_ne: JSON.stringify([
      'कालो दाग, घामको दाग र पिग्मेन्टेसनलाई कम गर्दछ',
      'छालालाई एकनास, सफा र उज्यालो चमक प्रदान गर्दछ',
      'मल्टि-पेप्टाइड्सले छालाको दृढता र लचिलोपन बढाउँछ'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Alpha Arbutin', concentration: '2.0%', role: 'Targeted brightening active that fades dark spots' },
      { name: 'Kojic Acid', concentration: '1.0%', role: 'Promotes an even, luminous complexion' },
      { name: 'Multi-Peptide Complex', concentration: '3.0%', role: 'Supports barrier elasticity and repair' }
    ]),
    inci_full: 'Aqua, Alpha Arbutin, Glycerin, Kojic Acid, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Sodium Hyaluronate, Allantoin, Carbomer, Phenoxyethanol, Ethylhexylglycerin.',
    usage_instructions: 'Apply 3–4 drops onto clean, dry skin morning and evening before heavier creams. Always follow with daily sun protection in the morning.',
    usage_instructions_ne: 'सफा र सुख्खा अनुहारमा ३-४ थोपा बिहान र बेलुका लगाउनुहोस्। बिहान सनस्क्रिन अवश्य प्रयोग गर्नुहोस्।',
    image_url: 'assets/images/photoshoot-3120.jpg',
    is_featured: 1,
    sort_order: 2,
    status: 'active'
  },
  {
    slug: 'niacin-c-serum',
    title: 'Niacin C Serum',
    title_ne: 'नायसिन सी सिरम',
    subtitle: '10% Niacinamide with Zinc PCA',
    subtitle_ne: '१०% नायसिनामाइड र जिंक पीसीए',
    category: 'Acne & Oil Control',
    category_ne: 'डण्डीफोर र तेल नियन्त्रण',
    volume: '30 ml',
    price_npr: 2100,
    clinical_badge: 'Oil Balancing & Pore Refining',
    clinical_badge_ne: 'तेल सन्तुलन र छिद्र सुधार',
    summary: 'Clarifies and refines pores. High-purity 10% Niacinamide and Zinc PCA balance excess surface oil, reduce redness, and smooth texture.',
    summary_ne: 'छिद्र सफा गर्छ र तेल नियन्त्रण गर्दछ। १०% नायसिनामाइड र १% जिंकले छालाको चिल्लोपन घटाई दाना आउनबाट रोक्दछ।',
    description: 'Formulated specifically for oily, combination, and blemish-prone skin, cDerma Niacin C Serum pairs 10% high-purity Niacinamide with Zinc PCA. It helps regulate sebum production, tightens the appearance of enlarged pores, and soothes daily redness without stripping vital moisture.',
    description_ne: '१०% नायसिनामाइड र जिंक पीसीएले बनेको नायसिन सी सिरमले अतिरिक्त तेल नियन्त्रण गर्छ।',
    key_benefits: JSON.stringify([
      'Regulates excess surface oil and controls daily shine',
      'Visibly refines enlarged pores and smooths skin texture',
      'Soothes skin redness and fortifies the natural moisture barrier'
    ]),
    key_benefits_ne: JSON.stringify([
      'अतिरिक्त तेल नियन्त्रण गर्छ र चमक सन्तुलित राख्छ',
      'ठूला छिद्रहरूको आकार घटाउँछ र बनावट नरम बनाउँछ',
      'रातोपन शान्त पार्छ र छालाको सुरक्षा तह बलियो बनाउँछ'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Niacinamide (Vitamin B3)', concentration: '10.0%', role: 'Regulates sebum, improves texture, strengthens barrier' },
      { name: 'Zinc PCA', concentration: '1.0%', role: 'Controls excess surface oil and calms active blemishes' }
    ]),
    inci_full: 'Aqua, Niacinamide, Glycerin, Zinc PCA, Sodium Hyaluronate, Panthenol, Allantoin, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin.',
    usage_instructions: 'Apply 2–3 drops across face morning and night before moisturiser. Gently pat until fully absorbed.',
    usage_instructions_ne: 'बिहान र बेलुकी अनुहारमा २-३ थोपा लगाएर हलुका थपथपाउनुहोस्।',
    image_url: 'assets/images/photoshoot-3093.jpg',
    is_featured: 1,
    sort_order: 3,
    status: 'active'
  },
  {
    slug: 'retin-c-serum',
    title: 'Retin C Serum',
    title_ne: 'रेटिन सी सिरम',
    subtitle: 'Retinol 0.2% with Peptides',
    subtitle_ne: 'रेटिनोल ०.२% र पेप्टाइड्स',
    category: 'Daily Skin Care',
    category_ne: 'छाला नवीकरण र दैनिक हेरचाह',
    volume: '30 ml',
    price_npr: 2400,
    clinical_badge: 'Gentle Cellular Renewal',
    clinical_badge_ne: 'कोमल कोष नवीकरण र चिल्लोपना',
    summary: 'For smoother, younger-looking skin. Encapsulated retinol 0.2% accelerates renewal while peptides maintain skin comfort and suppleness.',
    summary_ne: 'नरम र जवान देखिने छालाको लागि। ०.२% रेटिनोल र पेप्टाइड्सले छालाको सतहलाई नयाँ र चम्किलो बनाउँछ।',
    description: 'cDerma Retin C Serum brings a gentle, thoughtfully calibrated 0.2% retinol concentration paired with nourishing peptides and squalane. It gently encourages natural cell turnover to soften early fine lines, refine uneven texture, and reveal smooth, refreshed skin with minimal irritation.',
    description_ne: 'रेटिन सी सिरमले कोमल ०.२% रेटिनोल र पेप्टाइड्सको सहयोगले छालाको प्राकृतिक कोष नवीकरणलाई गति दिन्छ।',
    key_benefits: JSON.stringify([
      'Accelerates natural cellular turnover for smoother texture',
      'Softens the appearance of fine lines and uneven surface marks',
      'Nourishing peptide base keeps skin comfortable and resilient'
    ]),
    key_benefits_ne: JSON.stringify([
      'कोष नवीकरणलाई गति दिई छालालाई चिल्लो र स्वस्थ बनाउँछ',
      'मसिना रेखा र दागहरूलाई कम गरी सफा देखाउँछ',
      'पेप्टाइड र स्क्वालिनले छालालाई नरम र सुरक्षित राख्छ'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Encapsulated Retinol', concentration: '0.2%', role: 'Stimulates cellular renewal and smooths fine texture' },
      { name: 'Multi-Peptide Blend', concentration: '2.5%', role: 'Supports elasticity, firmness, and barrier comfort' },
      { name: 'Plant-Derived Squalane', concentration: '3.0%', role: 'Prevents dryness and locks in smooth hydration' }
    ]),
    inci_full: 'Aqua, Caprylic/Capric Triglyceride, Glycerin, Squalane, Retinol, Polysorbate 20, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Sodium Hyaluronate, Tocopherol, Carbomer, Phenoxyethanol.',
    usage_instructions: 'Apply 2–3 drops at night only onto clean, dry skin. Begin by using 2–3 nights per week and gradually increase frequency as tolerated. Always apply sunscreen during the day.',
    usage_instructions_ne: 'बेलुकी मात्र २-३ थोपा सफा र सुख्खा अनुहारमा लगाउनुहोस्। सुरुमा हप्तामा २-३ पटक मात्र प्रयोग गर्नुहोस्।',
    image_url: 'assets/images/photoshoot-3063.jpg',
    is_featured: 1,
    sort_order: 4,
    status: 'active'
  },
  {
    slug: 'moistin-c-moisturiser',
    title: 'Moistin C Moisturiser',
    title_ne: 'मोइस्टिन सी मोइस्चराइजर',
    subtitle: 'Ultra-Hydrating Moisturising Cream with Hyaluronic Acid & Ceramides',
    subtitle_ne: 'हाइलुरोनिक एसिड र सेरामाइड्सयुक्त अल्ट्रा-हाइड्रेटिंग क्रिम',
    category: 'Hydration & Barrier Care',
    category_ne: 'हाइड्रेशन र ब्यारियर केयर',
    volume: '50 g',
    price_npr: 1950,
    clinical_badge: 'Deep Barrier Hydration',
    clinical_badge_ne: 'गहिरो ब्यारियर सुरक्षा र ओस',
    summary: 'For soft, healthy, radiant skin. Rich, non-greasy daily barrier cream that locks in moisture and guards against everyday dryness.',
    summary_ne: 'कोमल, स्वस्थ र चम्किलो छालाको लागि। दैनिक ओस सुरक्षित राख्ने र छालाको सुरक्षा तह बलियो बनाउने क्रिम।',
    description: 'cDerma Moistin C Moisturiser is a daily barrier cream designed for intense hydration and lasting skin comfort. Enriched with ceramides, multiple molecular weights of hyaluronic acid, and squalane, it absorbs smoothly without heaviness or greasiness.',
    description_ne: 'मोइस्टिन सी मोइस्चराइजर दैनिक प्रयोगका लागि तीव्र मोइस्चर र ब्यारियर सुरक्षा दिने क्रिम हो।',
    key_benefits: JSON.stringify([
      'Delivers long-lasting hydration and prevents moisture loss',
      'Ceramide and hyaluronic complex reinforces skin barrier function',
      'Leaves skin feeling soft, calm, supple, and non-greasy'
    ]),
    key_benefits_ne: JSON.stringify([
      'लामो समयसम्म ओस कायम राख्छ र पानीको कमी हुन दिँदैन',
      'सेरामाइड र हाइलुरोनिक एसिडले छालाको सुरक्षा तह बलियो बनाउँछ',
      'छालालाई चिल्लो नबनाई नरम, शान्त र कोमल राख्छ'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Ceramide Complex (NP, AP, EOP)', concentration: '3.0%', role: 'Replenishes natural stratum corneum barrier lipids' },
      { name: 'Multi-Depth Hyaluronic Acid', concentration: '2.0%', role: 'Attracts and binds deep surface hydration' },
      { name: 'Squalane', concentration: '5.0%', role: 'Locks in moisture with a soft, non-pore-clogging finish' }
    ]),
    inci_full: 'Aqua, Caprylic/Capric Triglyceride, Glycerin, Squalane, Ceramide NP, Ceramide AP, Ceramide EOP, Sodium Hyaluronate, Panthenol, Cetearyl Alcohol, Carbomer, Phenoxyethanol, Ethylhexylglycerin.',
    usage_instructions: 'Smooth a generous amount over face and neck morning and night after serums. Gently massage upward until absorbed.',
    usage_instructions_ne: 'सिरम लगाइसकेपछि बिहान र बेलुका अनुहार र घाँटीमा हलुका मसाज गर्दै लगाउनुहोस्।',
    image_url: 'assets/images/photoshoot-3120.jpg',
    is_featured: 1,
    sort_order: 5,
    status: 'active'
  }
];

const defaultClinics = [
  {
    name: 'Kathmandu Aesthetic & Skin Care Hospital',
    category: 'Dermatology & Aesthetic Hospital',
    city: 'Kathmandu',
    province: 'Bagmati',
    address: 'Marg 4, Naxal (Opposite Bhagwati Temple), Kathmandu',
    phone: '+977 9820753751',
    email: 'dispensary.ktm@cdermanepal.com',
    lead_doctor: 'Dr. A. Karki, MD Dermatology',
    doctor_nmc: 'NMC #9482 • Senior Consultant',
    doctor_image: 'assets/images/img_204637447def.jpg',
    distance_badge: '1.2 km',
    is_verified: 1,
    is_in_stock: 1,
    stock_summary: 'Centella Barrier Restore, Ceramide Deep Cream, Mandelic Peel',
    batch_units: '148 Units Verified',
    temp_control: '18.4°C Controlled',
    operating_hours: '09:00 - 19:30 (Sun-Fri)',
    directions_url: 'https://maps.google.com/?q=Naxal+Kathmandu+Nepal',
    latitude: 27.7172,
    longitude: 85.3240,
    status: 'active',
    sort_order: 1
  },
  {
    name: 'Koshi Regional Medical Skin Outpost',
    category: 'Hospital Pharmacy Wing',
    city: 'Biratnagar',
    province: 'Koshi',
    address: 'Hospital Road, Ward 4, Biratnagar, Koshi Province',
    phone: '+977 21 472190',
    email: 'koshi.outpost@cdermanepal.com',
    lead_doctor: 'Dr. R. Shrestha, MBBS, DDVL',
    doctor_nmc: 'NMC #6521 • Regional Dermal Lead',
    doctor_image: 'assets/images/img_b7a64c067655.jpg',
    distance_badge: 'Koshi Dist.',
    is_verified: 1,
    is_in_stock: 1,
    stock_summary: 'Complete Himalayan Bio-Active Batch Stock (Lot #2409)',
    batch_units: '210 Units Verified',
    temp_control: '17.8°C Controlled',
    operating_hours: '08:30 - 20:00 (Sun-Sat)',
    directions_url: 'https://maps.google.com/?q=Hospital+Road+Biratnagar+Nepal',
    latitude: 26.4525,
    longitude: 87.2718,
    status: 'active',
    sort_order: 2
  },
  {
    name: 'Western Skin Clinic & Laser Center',
    category: 'Aesthetic Institute & Laser Clinic',
    city: 'Pokhara',
    province: 'Gandaki',
    address: 'New Road, Pokhara-8 (Near Annapurna Complex)',
    phone: '+977 61 528741',
    email: 'pokhara.laser@cdermanepal.com',
    lead_doctor: 'Dr. A. Bastola, MD',
    doctor_nmc: 'NMC #7812 • Laser Dermatology',
    doctor_image: 'assets/images/img_d8dddc0fbb21.jpg',
    distance_badge: 'Gandaki Valley',
    is_verified: 1,
    is_in_stock: 1,
    stock_summary: 'Barrier Care Complex & Mineral Photoprotection In Stock',
    batch_units: '95 Units Verified',
    temp_control: '19.0°C Controlled',
    operating_hours: '09:30 - 18:30 (Sun-Fri)',
    directions_url: 'https://maps.google.com/?q=New+Road+Pokhara+Nepal',
    latitude: 28.2096,
    longitude: 83.9856,
    status: 'active',
    sort_order: 3
  },
  {
    name: 'Lalitpur Dermal Aesthetics & Beauty Counter',
    category: 'Cosmetic Store & Beauty Retailer',
    city: 'Lalitpur',
    province: 'Bagmati',
    address: 'Pulchowk Heights, Lalitpur (Near Labim Mall)',
    phone: '+977 1 5534211',
    email: 'lalitpur.retail@cdermanepal.com',
    lead_doctor: 'Dr. P. Thapa, Consultant Cosmetologist',
    doctor_nmc: 'NMC #9124 • Cosmetic Specialist',
    doctor_image: 'assets/images/dr-karki-portrait.png',
    distance_badge: '3.0 km',
    is_verified: 1,
    is_in_stock: 1,
    stock_summary: 'Specialized Post-Laser Recovery Formulations & Retail Serums',
    batch_units: '120 Units Verified',
    temp_control: '18.2°C Controlled',
    operating_hours: '10:00 - 19:00 (Sun-Fri)',
    directions_url: 'https://maps.google.com/?q=Pulchowk+Lalitpur+Nepal',
    latitude: 27.6782,
    longitude: 85.3169,
    status: 'active',
    sort_order: 4
  },
  {
    name: 'Chitwan Healthcare Dermatology Unit',
    category: 'Hospital Pharmacy Wing',
    city: 'Bharatpur',
    province: 'Bagmati',
    address: 'Chaubiskothi, Bharatpur-10, Chitwan',
    phone: '+977 56 523198',
    email: 'chitwan.dispensary@cdermanepal.com',
    lead_doctor: 'Dr. B. K. Adhikari, MD Dermatology',
    doctor_nmc: 'NMC #8340 • Hospital Consultant',
    doctor_image: 'assets/images/img_2bb12128dd04.jpg',
    distance_badge: 'Chitwan Central',
    is_verified: 1,
    is_in_stock: 1,
    stock_summary: 'Official Compounding & Monograph Dispensing Center',
    batch_units: '175 Units Verified',
    temp_control: '18.0°C Controlled',
    operating_hours: '08:00 - 20:00 (Daily)',
    directions_url: 'https://maps.google.com/?q=Chaubiskothi+Bharatpur+Chitwan',
    latitude: 27.6833,
    longitude: 84.4333,
    status: 'active',
    sort_order: 5
  },
  {
    name: 'Itahari Cleanroom Beauty & Cosmetic Dispensary',
    category: 'Cosmetic Store & Beauty Retailer',
    city: 'Itahari',
    province: 'Koshi',
    address: 'Main Chowk, Dharan Road, Itahari, Sunsari (Direct Cleanroom Hub)',
    phone: '+977 9820753751',
    email: 'itahari.store@cdermanepal.com',
    lead_doctor: 'Kavita Rai, Clinical Aesthetician',
    doctor_nmc: 'Certified Skin Practitioner',
    doctor_image: 'assets/images/radiant-skin-model.png',
    distance_badge: '0.5 km Direct Node',
    is_verified: 1,
    is_in_stock: 1,
    stock_summary: 'Fresh Production Batches, Full Face Care & Sun Protection',
    batch_units: '340 Units Verified',
    temp_control: '18.0°C Controlled',
    operating_hours: '08:30 - 20:30 (Daily)',
    directions_url: 'https://maps.google.com/?q=Itahari+Chowk+Nepal',
    latitude: 26.6667,
    longitude: 87.2833,
    status: 'active',
    sort_order: 6
  },
  {
    name: 'Dharan Medical Specialty & Derma Lounge',
    category: 'Aesthetic Institute & Laser Clinic',
    city: 'Dharan',
    province: 'Koshi',
    address: 'Bhanuchowk, Ward 2, Dharan, Koshi Province',
    phone: '+977 25 520410',
    email: 'dharan.dispensary@cdermanepal.com',
    lead_doctor: 'Dr. M. Tamang, MBBS, DVD',
    doctor_nmc: 'NMC #9055 • Clinical Advisor',
    doctor_image: 'assets/images/img_204637447def.jpg',
    distance_badge: 'Koshi Foothills',
    is_verified: 1,
    is_in_stock: 1,
    stock_summary: 'Barrier Repair Formulations, Pure Hydration & INCI Testing Lot',
    batch_units: '160 Units Verified',
    temp_control: '18.1°C Controlled',
    operating_hours: '09:00 - 19:30 (Daily)',
    directions_url: 'https://maps.google.com/?q=Bhanuchowk+Dharan+Nepal',
    latitude: 26.8124,
    longitude: 87.2835,
    status: 'active',
    sort_order: 7
  }
];

const defaultMonographs = [
  {
    code: 'CD-ADV-01',
    title: 'The Best Time to Apply Your Moisturiser (Most People Get This Wrong)',
    category: 'Hydration',
    read_time: '4 min read',
    date_text: 'Jan 2025',
    author: 'Dr. S. Karki',
    summary: 'Timing matters more than you think. Applying moisturiser on damp skin — right after washing your face — locks in up to 3x more water than applying it on dry skin.',
    content: 'Timing matters more than you think. Applying moisturiser on damp skin — right after washing your face — locks in up to 3x more water than applying it on dry skin. Most people wait until their face is completely dry, but applying humectants and barrier creams while the skin is still slightly hydrated seals in maximum moisture.',
    image_url: 'assets/images/img_7df877252467.jpg',
    indication: 'Dehydrated epidermal barrier, post-wash dryness, transepidermal water loss.',
    active_compounds: 'Multi-Depth Hyaluronic Acid, Phytoceramides, Glycerin USP.',
    clinical_protocol: 'Apply directly within 60 seconds of gentle face wash while stratum corneum is pliable.',
    dosage_timing: 'Morning & Evening application.',
    precautions: 'Do not towel rub vigorously prior to application.',
    pdf_file: 'assets/downloads/cderma-clinical-compendium-2025.pdf',
    is_published: 1,
    sort_order: 1
  },
  {
    code: 'CD-ADV-02',
    title: 'What Actually Causes Pimples — And What You Can Do About It',
    category: 'Acne & Pimples',
    read_time: '6 min read',
    date_text: 'Feb 2025',
    author: 'Dr. R. Shrestha',
    summary: 'Pimples happen when your pores get blocked by oil and dead skin cells. The key to preventing them is keeping your skin clean but not over-washing — and choosing products that won\'t clog pores.',
    content: 'Pimples happen when your pores get blocked by oil and dead skin cells. The key to preventing them is keeping your skin clean but not over-washing — and choosing products that won\'t clog pores. Over-cleansing with harsh sulfates can trigger compensatory sebum rebound.',
    image_url: 'assets/images/img_c0ee769d1620.jpg',
    indication: 'Acne vulgaris, comedogenic congestion, dysregulated sebum.',
    active_compounds: 'Zinc PCA, Apple Amino Acids, Niacinamide 5%.',
    clinical_protocol: 'Use non-comedogenic physiological wash twice daily.',
    dosage_timing: 'Twice daily (AM/PM).',
    precautions: 'Avoid aggressive physical scrubs that cause micro-tears.',
    pdf_file: 'assets/downloads/cderma-clinical-compendium-2025.pdf',
    is_published: 1,
    sort_order: 2
  },
  {
    code: 'CD-ADV-03',
    title: 'Niacinamide: The Simple Ingredient That Brightens Skin Without Irritation',
    category: 'Brightening',
    read_time: '5 min read',
    date_text: 'Feb 2025',
    author: 'Dr. P. Bhattarai',
    summary: 'Niacinamide (Vitamin B3) is one of the safest and most effective skin-brightening ingredients available. It reduces dark spots, evens skin tone, and strengthens your skin barrier all at once.',
    content: 'Niacinamide (Vitamin B3) is one of the safest and most effective skin-brightening ingredients available. It reduces dark spots, evens skin tone, and strengthens your skin barrier all at once without the peeling or sensitivity associated with hydroquinone.',
    image_url: 'assets/images/img_50a641f5031c.jpg',
    indication: 'Post-inflammatory hyperpigmentation (PIH), dullness, uneven skin tone.',
    active_compounds: 'Niacinamide (Vitamin B3) USP 5%, Centella Triterpenes.',
    clinical_protocol: 'Apply 3-4 drops evenly across cleansed face prior to heavier moisturizers.',
    dosage_timing: 'Daily AM & PM.',
    precautions: 'Compatible with all skin types including rosacea-prone skin.',
    pdf_file: 'assets/downloads/cderma-clinical-compendium-2025.pdf',
    is_published: 1,
    sort_order: 3
  },
  {
    code: 'CD-ADV-04',
    title: '5 Signs Your Skin Is Sensitive — And How to Calm It Down Fast',
    category: 'Sensitive Skin',
    read_time: '4 min read',
    date_text: 'Mar 2025',
    author: 'Dr. S. Karki',
    summary: 'Redness, stinging after washing, or a tight uncomfortable feeling? These are signs of sensitive skin. The good news: it\'s very manageable with the right gentle products and a simple routine.',
    content: 'Redness, stinging after washing, or a tight uncomfortable feeling? These are signs of sensitive skin. The good news: it\'s very manageable with the right gentle products and a simple routine that eliminates synthetic fragrances, denatured alcohols, and harsh foaming agents.',
    image_url: 'assets/images/img_b7a64c067655.jpg',
    indication: 'Hypersensitive skin, rosacea, wind-burn, compromised lipid mantle.',
    active_compounds: 'Alpine Centella Asiatica, Bio-Identical Ceramides NP/AP/EOP, Panthenol.',
    clinical_protocol: 'Strip routine back to physiological cleanser and barrier restore concentrate.',
    dosage_timing: 'Twice daily until barrier sensations normalize.',
    precautions: 'Avoid active acids (AHA/BHA) until stinging resolves completely.',
    pdf_file: 'assets/downloads/cderma-clinical-compendium-2025.pdf',
    is_published: 1,
    sort_order: 4
  },
  {
    code: 'CD-ADV-05',
    title: 'Your Perfect Morning Skincare Routine — 3 Steps, 5 Minutes, Done',
    category: 'Daily Routine',
    read_time: '7 min read',
    date_text: 'Mar 2025',
    author: 'Dr. R. Shrestha',
    summary: 'You don\'t need a complicated 12-step routine. A gentle cleanser, a ceramide serum, and a moisturiser with SPF — that\'s all your skin needs every morning to look and feel great.',
    content: 'You don\'t need a complicated 12-step routine. A gentle cleanser, a ceramide serum, and a moisturiser with SPF — that\'s all your skin needs every morning to look and feel great. Consistency beats complexity every single time.',
    image_url: 'assets/images/img_282f9d7b4a1e.jpg',
    indication: 'Daily maintenance, photoprotection, barrier resilience.',
    active_compounds: 'Amino acid cleanser, Niacinamide + Centella, Mineral Zinc Oxide SPF 50+.',
    clinical_protocol: 'Step 1: Cleanse with lukewarm water. Step 2: 3 drops serum. Step 3: Mineral SPF 50+.',
    dosage_timing: 'Every morning 15 minutes before UV exposure.',
    precautions: 'Reapply sun protection during prolonged high-altitude outdoor exposure.',
    pdf_file: 'assets/downloads/cderma-clinical-compendium-2025.pdf',
    is_published: 1,
    sort_order: 5
  },
  {
    code: 'CD-ADV-06',
    title: 'Why Nepal\'s Winter Air Damages Your Skin — And the Easy Fix',
    category: 'Hydration',
    read_time: '5 min read',
    date_text: 'Apr 2025',
    author: 'Dr. P. Bhattarai',
    summary: 'Cold, dry air pulls moisture right out of your skin. In Kathmandu, Pokhara, and high-altitude areas, this is a real problem from October to February. Here is how to protect your skin during those months.',
    content: 'Cold, dry air pulls moisture right out of your skin. In Kathmandu, Pokhara, and high-altitude areas, this is a real problem from October to February. High elevation combined with low ambient humidity rapidly increases transepidermal water loss.',
    image_url: 'assets/images/img_5db7864f4a5c.jpg',
    indication: 'Winter xerosis, high-altitude flaking, cold urticaria.',
    active_compounds: 'Ceramides NP/AP/EOP, Phytosphingosine, Squalane, Ectoin.',
    clinical_protocol: 'Layer lipid-replenishing ceramide barrier cream over hydrating serums morning and night.',
    dosage_timing: 'Morning and evening, plus spot reapplication to wind-chapped areas.',
    precautions: 'Avoid long steaming hot showers which further strip skin-protecting sebum.',
    pdf_file: 'assets/downloads/cderma-clinical-compendium-2025.pdf',
    is_published: 1,
    sort_order: 6
  }
];


// Default Hero Showcase Slider Slides
const defaultHeroSlides = [
  {
    title: 'Precision Dermatological Science. Pure Himalayan Bio-Actives.',
    subtitle: 'Doctor-formulated barrier repair, regenerative serums, and post-procedure dermatological care crafted in our Koshi cleanroom facility.',
    badge_text: 'Flagship Restorative Formula',
    formula_number: 'Formula No. 04 · Flagship',
    origin_text: 'Origin: Koshi Cleanroom Labs',
    specs_text: 'pH 5.4 · Pure Hydration',
    image_url: 'assets/images/img_282f9d7b4a1e.jpg',
    cta_url: 'product-detail.html',
    cta_text: 'Explore Face Care',
    sort_order: 1,
    is_active: 1
  },
  {
    title: 'Physiological Balancing. Ultra-Gentle Daily Purifier.',
    subtitle: 'Formulated with skin-identical amino acids to cleanse without stripping moisture, maintaining optimal physiological pH 5.5.',
    badge_text: 'Sulfate-Free Cleanser',
    formula_number: 'Formula No. 01 · Balancing Cleanser',
    origin_text: 'Origin: Koshi Cleanroom Labs',
    specs_text: 'pH 5.5 · Non-Stripping',
    image_url: 'assets/images/img_d04f5fd68ff7.jpg',
    cta_url: 'products.html',
    cta_text: 'Explore Cleanser',
    sort_order: 2,
    is_active: 1
  },
  {
    title: 'Deep Barrier Recovery. Multi-Ceramide Lipid Complex.',
    subtitle: 'Restores the stratum corneum with bio-identical Ceramides NP, AP, EOP, phytosphingosine, and pure high-altitude botanicals.',
    badge_text: 'Multi-Ceramide Recovery',
    formula_number: 'Formula No. 07 · Barrier Cream',
    origin_text: 'Origin: Koshi Cleanroom Labs',
    specs_text: 'pH 5.8 · Bio-Identical Lipids',
    image_url: 'assets/images/texture-swatch.png',
    cta_url: 'products.html',
    cta_text: 'Explore Barrier Cream',
    sort_order: 3,
    is_active: 1
  },
  {
    title: 'High-Altitude Protection. 100% Mineral UV Shield SPF 50+.',
    subtitle: 'Broad Spectrum PA++++ physical photoprotection engineered with non-nano Zinc Oxide and Ectoin for intense Himalayan sunlight.',
    badge_text: 'Broad Spectrum PA++++ SPF 50+',
    formula_number: 'Formula No. 09 · Photoprotection',
    origin_text: 'Origin: Koshi Cleanroom Labs',
    specs_text: 'Zero White Cast · 18.5% Zinc Oxide',
    image_url: 'assets/images/img_63acd4dd2bb8.jpg',
    cta_url: 'products.html',
    cta_text: 'Explore Sun Care',
    sort_order: 4,
    is_active: 1
  },
  {
    title: 'Cleanroom Formulation & Advanced Botanical Science.',
    subtitle: 'State-of-the-art ISO Class 7 cleanroom facility in Itahari, Nepal. Sterile air circulation, precision bio-active extraction, and pharmaceutical batch purity.',
    badge_text: 'Certified ISO Class 7 Cleanroom',
    formula_number: 'Cleanroom Facility · Itahari',
    origin_text: 'Exim: 3049904360114NP',
    specs_text: 'Hermetically Sealed · Sterile Cleanroom',
    image_url: 'assets/images/img_37f37477611e.jpg',
    cta_url: 'science.html',
    cta_text: 'Tour Cleanroom Science',
    sort_order: 5,
    is_active: 1
  }
];

// Merge curated natural Nepali translations
const {
  settingsNepali,
  productsNepali,
  heroSlidesNepali,
  monographsNepali,
  clinicsNepali
} = require('./seedDataNepali');

// Attach value_ne to defaultSettings
defaultSettings.forEach(s => {
  s.value_ne = settingsNepali[s.key] || '';
});

// Attach *_ne to defaultProducts
defaultProducts.forEach(p => {
  const ne = productsNepali[p.slug];
  if (ne) {
    Object.assign(p, ne);
  }
});

// Attach *_ne to defaultHeroSlides
defaultHeroSlides.forEach((slide, idx) => {
  const ne = heroSlidesNepali[idx];
  if (ne) {
    Object.assign(slide, ne);
  }
});

// Attach *_ne to defaultMonographs
defaultMonographs.forEach(m => {
  const ne = monographsNepali[m.code];
  if (ne) {
    Object.assign(m, ne);
  }
});

// Attach value_ne to defaultSettings
defaultSettings.forEach(s => {
  if (settingsNepali[s.key]) {
    s.value_ne = settingsNepali[s.key];
  }
});

// Attach *_ne to defaultClinics
defaultClinics.forEach(c => {
  const ne = clinicsNepali[c.name];
  if (ne) {
    Object.assign(c, ne);
  }
});

module.exports = {
  defaultHeroSlides,
  defaultSettings,
  defaultMedia,
  defaultProducts,
  defaultClinics,
  defaultMonographs
};
