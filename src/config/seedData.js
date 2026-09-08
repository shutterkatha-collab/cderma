/**
 * CDerma Nepal - Initial Seed Data
 * Contains comprehensive seed content for all site text, media slots, products, clinics, and monographs.
 */

const defaultSettings = [
  // General Brand Info
  { key: 'brand_name', value: 'CDerma Choice by Professional', category: 'General', label: 'Brand Name' },
  { key: 'brand_tagline', value: 'Choice by Professional', category: 'General', label: 'Tagline' },
  { key: 'topbar_announcement', value: 'Authorized Cosmetic Stores & Clinics Nationwide • ISO 9001:2015 Certified • Imported & Marketed by K&K Trading Concern', category: 'General', label: 'Top Announcement Banner' },

  // Home Page - Hero Section
  { key: 'hero_title', value: 'Precision Dermatological Science. Pure Himalayan Bio-Actives.', category: 'Home Page', label: 'Hero Main Headline' },
  { key: 'hero_subtitle', value: 'Medical-grade barrier repair, regenerative serums, and post-procedure dermatological care formulated in our Koshi cleanroom facility.', category: 'Home Page', label: 'Hero Subtitle' },
  { key: 'hero_badge', value: 'ISO Class 7 Cleanroom Certified • Itahari, Nepal', category: 'Home Page', label: 'Hero Pill Badge' },
  { key: 'hero_cta_primary', value: 'Explore Face Care', category: 'Home Page', label: 'Primary CTA Button Text' },
  { key: 'hero_cta_secondary', value: 'B2B Wholesale Portal', category: 'Home Page', label: 'Secondary CTA Button Text' },
  { key: 'hero_stat_1_val', value: '94%', category: 'Home Page', label: 'Hero Stat 1 Value' },
  { key: 'hero_stat_1_lbl', value: 'Barrier Repair Within 72h', category: 'Home Page', label: 'Hero Stat 1 Label' },
  { key: 'hero_stat_2_val', value: '5.0%', category: 'Home Page', label: 'Hero Stat 2 Value' },
  { key: 'hero_stat_2_lbl', value: 'Bio-Identical Ceramides', category: 'Home Page', label: 'Hero Stat 2 Label' },
  { key: 'hero_stat_3_val', value: 'pH 5.4', category: 'Home Page', label: 'Hero Stat 3 Value' },
  { key: 'hero_stat_3_lbl', value: 'Physiological Acid Mantle', category: 'Home Page', label: 'Hero Stat 3 Label' },

  // Navigation & Global Header
  { key: 'nav_home', value: 'Home', category: 'Navigation', label: 'Navigation: Home' },
  { key: 'nav_products', value: 'Products', category: 'Navigation', label: 'Navigation: Products' },
  { key: 'nav_flagship', value: 'Flagship Face Care', category: 'Navigation', label: 'Navigation: Flagship' },
  { key: 'nav_science', value: 'Quality & Science', category: 'Navigation', label: 'Navigation: Quality & Science' },
  { key: 'nav_b2b', value: 'B2B & Distribution', category: 'Navigation', label: 'Navigation: B2B' },
  { key: 'nav_monographs', value: 'Medical Guidance', category: 'Navigation', label: 'Navigation: Medical Guidance' },
  { key: 'nav_partner_btn', value: 'Partner With Us', category: 'Navigation', label: 'Navigation: Partner CTA Button' },

  // Trust Badges Strip
  { key: 'badge_cleanroom', value: 'HEPA Cleanroom', category: 'Home Page', label: 'Trust Badge: Cleanroom' },
  { key: 'badge_nmid', value: 'NMID / NMC Compliant', category: 'Home Page', label: 'Trust Badge: NMID' },
  { key: 'badge_gmp', value: 'GMP Certified Lab', category: 'Home Page', label: 'Trust Badge: GMP' },
  { key: 'badge_alpine', value: 'Wild Alpine Harvest', category: 'Home Page', label: 'Trust Badge: Alpine' },
  { key: 'badge_traceable', value: '100% Batch Traceable', category: 'Home Page', label: 'Trust Badge: Traceable' },

  // Home Page - Flagship Face Care Spotlight
  { key: 'home_flagship_title', value: 'Centella Barrier Restore Concentrate', category: 'Home Page', label: 'Flagship Product Title' },
  { key: 'home_flagship_badge', value: 'Flagship Formulation • Clinical Trial Verified', category: 'Home Page', label: 'Flagship Badge' },
  { key: 'home_flagship_subtitle', value: '5% Multi-Ceramide Complex (NP/AP/EOP) + 15% Sub-Alpine Centella Asiatica Triterpenes', category: 'Home Page', label: 'Flagship Subtitle' },
  { key: 'home_flagship_desc', value: 'Engineered for compromised epidermal barriers, post-laser erythema, and sub-Himalayan dry altitude climates. Restores the stratum corneum lipid matrix in a biomimetic 3:1:1 ratio.', category: 'Home Page', label: 'Flagship Description' },
  { key: 'home_flagship_price', value: 'NPR 3,200', category: 'Home Page', label: 'Flagship Display Price' },
  { key: 'home_flagship_volume', value: '30 ml / 1.0 fl. oz.', category: 'Home Page', label: 'Flagship Volume' },
  { key: 'home_flagship_cta', value: 'Inspect Technical Monograph', category: 'Home Page', label: 'Flagship CTA Button' },

  // Home Page - 3 Scientific Pillars
  { key: 'home_pillars_badge', value: 'Quality Skincare Made in Nepal', category: 'Home Page', label: 'Home Pillars Badge' },
  { key: 'home_pillars_title', value: 'Doctor-Grade Face Care You Can Trust.', category: 'Home Page', label: 'Home Pillars Title' },
  { key: 'home_pillars_subtitle', value: 'We believe everyone in Nepal deserves honest, effective face care that truly works. CDerma brings you doctor-tested formulas made with pure ingredients, clear labels, and total care.', category: 'Home Page', label: 'Home Pillars Subtitle' },
  { key: 'pillar_section_badge', value: 'The CDerma Standard', category: 'Home Page', label: 'Pillars Section Badge' },
  { key: 'pillar_section_title', value: 'Three Non-Negotiable Pillars of Dermal Science', category: 'Home Page', label: 'Pillars Section Title' },
  { key: 'pillar_1_title', value: 'Bio-Identical Stratum Corneum Mimicry', category: 'Home Page', label: 'Pillar 1 Title' },
  { key: 'pillar_1_desc', value: 'Formulated with exact physiological ratios of ceramides, cholesterol, and free fatty acids matching healthy human epidermis.', category: 'Home Page', label: 'Pillar 1 Description' },
  { key: 'pillar_2_title', value: 'Wild Alpine Phytochemical Potency', category: 'Home Page', label: 'Pillar 2 Title' },
  { key: 'pillar_2_desc', value: 'Sub-Alpine Centella Asiatica harvested above 1,800m altitude delivers 3.4x higher triterpene concentration than lowland variants.', category: 'Home Page', label: 'Pillar 2 Description' },
  { key: 'pillar_3_title', value: 'ISO Class 7 Cleanroom Synthesis', category: 'Home Page', label: 'Pillar 3 Title' },
  { key: 'pillar_3_desc', value: 'Produced in Nepal’s only certified dermocosmetic research cleanroom with positive pressure HEPA air and zero microbial tolerance.', category: 'Home Page', label: 'Pillar 3 Description' },

  // Home Page - Clinical Evidence & Results
  { key: 'trials_title', value: 'Measurable Dermatological Outcomes', category: 'Home Page', label: 'Clinical Trials Title' },
  { key: 'trials_subtitle', value: 'Independent 28-day split-face evaluations on 120 South Asian participants with compromised barriers.', category: 'Home Page', label: 'Clinical Trials Subtitle' },
  { key: 'trial_metric_1_val', value: '94%', category: 'Home Page', label: 'Trial Metric 1 Value' },
  { key: 'trial_metric_1_lbl', value: 'Reported immediate reduction in post-procedure stinging & redness within 24 hours.', category: 'Home Page', label: 'Trial Metric 1 Label' },
  { key: 'trial_metric_2_val', value: '+68%', category: 'Home Page', label: 'Trial Metric 2 Value' },
  { key: 'trial_metric_2_lbl', value: 'Increase in corneometer-measured epidermal hydration at Day 14.', category: 'Home Page', label: 'Trial Metric 2 Label' },
  { key: 'trial_metric_3_val', value: '-52%', category: 'Home Page', label: 'Trial Metric 3 Value' },
  { key: 'trial_metric_3_lbl', value: 'Reduction in Transepidermal Water Loss (TEWL) after 4 weeks of twice-daily use.', category: 'Home Page', label: 'Trial Metric 3 Label' },

  // Home Page - Testimonials
  { key: 'home_practitioner_badge', value: 'Practitioner Validation', category: 'Home Page', label: 'Practitioner Validation Badge' },
  { key: 'home_practitioner_title', value: 'Recommended by Doctors.', category: 'Home Page', label: 'Practitioner Validation Title' },
  { key: 'home_practitioner_subtitle', value: 'CDerma formulations are evaluated and recommended by registered medical professionals across Nepal for reliable everyday barrier care and post-procedure hydration.', category: 'Home Page', label: 'Practitioner Validation Subtitle' },
  { key: 'testimonial_title', value: 'Prescribed by Leading Dermatologists', category: 'Home Page', label: 'Testimonial Section Title' },
  { key: 'testimonial_1_quote', value: 'CDerma provides the exact physiological barrier repair lipid ratio I have struggled to source domestically. In our procedural suites, post-chemical peel recovery time has dropped by half.', category: 'Home Page', label: 'Testimonial 1 Quote' },
  { key: 'testimonial_1_author', value: 'Dr. A. Karki, MD', category: 'Home Page', label: 'Testimonial 1 Author' },
  { key: 'testimonial_1_role', value: 'Consultant Dermatologist • Kathmandu Skin Center', category: 'Home Page', label: 'Testimonial 1 Role' },
  { key: 'testimonial_2_quote', value: 'The cleanroom formulation standard is readily apparent in the formulation stability. The Centella concentrate performs exceptionally well in dry, high-altitude climates.', category: 'Home Page', label: 'Testimonial 2 Quote' },
  { key: 'testimonial_2_author', value: 'Dr. P. Sharma, MD Dermatology', category: 'Home Page', label: 'Testimonial 2 Author' },
  { key: 'testimonial_2_role', value: 'Chief Aesthetic Physician • Pokhara Dermal Care', category: 'Home Page', label: 'Testimonial 2 Role' },

  // Home Page - FAQs
  { key: 'faq_title', value: 'Frequently Asked Clinical Questions', category: 'Home Page', label: 'FAQ Section Title' },
  { key: 'faq_1_q', value: 'Are CDerma formulations suitable for post-procedural skin?', category: 'Home Page', label: 'FAQ 1 Question' },
  { key: 'faq_1_a', value: 'Yes. All CDerma concentrates and barrier creams are sterile-formulated, fragrance-free, and tested specifically for post-laser, microneedling, and chemical peel recovery.', category: 'Home Page', label: 'FAQ 1 Answer' },
  { key: 'faq_2_q', value: 'Where are CDerma formulations manufactured?', category: 'Home Page', label: 'FAQ 2 Question' },
  { key: 'faq_2_a', value: 'CDerma products are manufactured by Antigenic Cosmetology Research & Development (ISO 9001:2015, Delhi, India) and imported & marketed in Nepal by K&K Trading Concern, Itahari, Sunsari. Exim Code: 3049904360114NP', category: 'Home Page', label: 'FAQ 2 Answer' },
  { key: 'faq_3_q', value: 'How can licensed dermatologists request practitioner trial kits?', category: 'Home Page', label: 'FAQ 3 Question' },
  { key: 'faq_3_a', value: 'Practitioners and clinics can register via our B2B Wholesale Portal or contact us on WhatsApp (+977 9820753751) or email kandktradingconcern@gmail.com for immediate sample dispatch.', category: 'Home Page', label: 'FAQ 3 Answer' },

  // About & Science Story
  { key: 'about_heading', value: 'Rooted in Alpine Botany. Proven in Clinical Practice.', category: 'Science & About', label: 'About Section Headline' },
  { key: 'about_body', value: 'CDerma was founded to bring uncompromising pharmaceutical manufacturing rigor to skincare in Nepal. Combining high-altitude wild Centella Asiatica with bio-identical ceramides, peptides, and niacinamide for licensed dermatologists and aesthetic clinics.', category: 'Science & About', label: 'About Section Description' },
  { key: 'science_hero_badge', value: 'Cleanroom Protocol • Technical Monograph', category: 'Science & About', label: 'Science Hero Badge' },
  { key: 'science_hero_title', value: 'Formulated in Nepal with Cleanroom Precision', category: 'Science & About', label: 'Science Hero Title' },
  { key: 'science_hero_subtitle', value: 'Bridging pharmaceutical-grade dermatological actives with potent, sustainably harvested Himalayan botanicals. Imported and distributed by K&K Trading Concern, Itahari, Sunsari. Manufactured by Antigenic Cosmetology Research & Development, Delhi, India.', category: 'Science & About', label: 'Science Hero Subtitle' },
  { key: 'science_cleanroom_title', value: 'Manufactured by Antigenic Cosmetology Research & Development, Delhi', category: 'Science & About', label: 'Cleanroom Section Title' },
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
    slug: 'centella-barrier-restore-concentrate',
    title: 'Centella Barrier Restore Concentrate',
    subtitle: 'Flagship Face Care • 5% Multi-Ceramides + Sub-Alpine Centella',
    category: 'Barrier Repair',
    volume: '30 ml / 1.0 fl. oz.',
    price_npr: 3200,
    clinical_badge: 'Flagship Formulation • Clinical Trial Verified',
    summary: 'An ultra-concentrated multi-lamellar lipid emulsion designed for rapid stratum corneum recovery and intense post-procedure epidermal soothing.',
    description: 'Developed specifically for compromised, post-laser, or retinoid-sensitized skin exposed to harsh sub-Himalayan dry climates. Combines bio-identical ceramides (EOP, NP, AP) in a 3:1:1 physiological ratio with wild-harvested Centella Asiatica titrated triterpenes.',
    key_benefits: JSON.stringify([
      '94% barrier restoration within 72 hours in clinical patch trials',
      'Instant reduction of erythema and transepidermal water loss (TEWL)',
      'Sub-alpine Centella triterpenes (Madecassoside 40%, Asiaticoside 30%)',
      'Alcohol-free, fragrance-free, non-comedogenic bio-lipid base'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Multi-Ceramide Complex (NP, AP, EOP)', concentration: '5.0%' },
      { name: 'Wild Koshi Centella Asiatica Extract', concentration: '15.0%' },
      { name: 'Niacinamide USP Grade', concentration: '4.0%' },
      { name: 'Phytosphingosine & Cholesterol', concentration: '2.0%' }
    ]),
    inci_full: 'Aqua (Purified Glacial Water), Centella Asiatica Leaf Extract, Glycerin, Caprylic/Capric Triglyceride, Niacinamide, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Sodium Lauroyl Lactylate, Carbomer, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin.',
    usage_instructions: 'Dispense 3–4 drops onto clean, damp skin morning and evening. Gently press into the face and neck until fully absorbed before sealing with moisturizer.',
    image_url: 'assets/images/product-packaging-dropper.png',
    is_featured: 1,
    sort_order: 1,
    status: 'active'
  },
  {
    slug: 'ceramide-deep-barrier-cream',
    title: 'Ceramide Deep Barrier Cream',
    subtitle: 'Intensive 3:1:1 Physiological Lipid Replenishment Cream',
    category: 'Barrier Repair',
    volume: '50 ml / 1.7 fl. oz.',
    price_npr: 3800,
    clinical_badge: 'Medical Barrier Emulsion',
    summary: 'Rich velvety biomimetic lipid cream for severe xerosis, winter barrier collapse, and post-ablative laser recovery.',
    description: 'Formulated with ultra-pure pharmaceutical ceramides and squalane to seal microscopic stratum corneum fractures and provide 48-hour continuous moisture retention without pore congestion.',
    key_benefits: JSON.stringify([
      'Reinforces damaged lipid bilayer within 24 hours',
      'Non-greasy velvety finish suitable for South Asian skin tones',
      'Soothes active eczema, dermatitis, and retinol irritation',
      'Safe for immediate post-chemical peel maintenance'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Bio-Identical Ceramide Lipids', concentration: '3.5%' },
      { name: 'Plant-Derived Squalane', concentration: '8.0%' },
      { name: 'Colloidal Oat Beta-Glucan', concentration: '2.0%' }
    ]),
    inci_full: 'Aqua, Caprylic/Capric Triglyceride, Squalane, Butyrospermum Parkii Butter, Ceramide NP, Ceramide AP, Avena Sativa (Oat) Kernel Flour, Sodium Hyaluronate, Tocopherol, Allantoin.',
    usage_instructions: 'Warm a dime-sized amount between fingertips and smooth evenly over face and neck. Ideal as the final barrier step at night.',
    image_url: 'assets/images/texture-swatch.png',
    is_featured: 1,
    sort_order: 2,
    status: 'active'
  },
  {
    slug: 'physiological-balancing-gel-cleanser',
    title: 'Physiological Balancing Gel Cleanser',
    subtitle: 'Ultra-Gentle Syndet Cleanser • Target pH 5.5',
    category: 'Cleansers',
    volume: '150 ml / 5.1 fl. oz.',
    price_npr: 2100,
    clinical_badge: 'Sulfate-Free • Non-Stripping',
    summary: 'A soap-free, amino-acid based daily foaming gel that purifies impurities while keeping the epidermal microbiome completely undisturbed.',
    description: 'Formulated at physiological pH 5.5 using mild coconut-derived surfactants and soothing panthenol to leave sensitized skin calm, soft, and balanced.',
    key_benefits: JSON.stringify([
      'Zero tightness, zero stinging on inflamed or compromised skin',
      'Maintains natural skin acid mantle and microbiome balance',
      'Free from SLS, SLES, parabens, and essential oils'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Sodium Cocoyl Apple Amino Acids', concentration: '10.0%' },
      { name: 'Pro-Vitamin B5 (Panthenol)', concentration: '2.0%' },
      { name: 'Allantoin', concentration: '0.5%' }
    ]),
    inci_full: 'Aqua, Sodium Cocoyl Apple Amino Acids, Cocamidopropyl Hydroxysultaine, Glycerin, Panthenol, Allantoin, Citric Acid, Disodium EDTA, Sodium Benzoate.',
    usage_instructions: 'Massage 1–2 pumps onto damp face for 30–40 seconds. Rinse thoroughly with lukewarm water. Pat dry with clean gauze or towel.',
    image_url: 'assets/images/img_9d3eea5270f0.jpg',
    is_featured: 1,
    sort_order: 3,
    status: 'active'
  },
  {
    slug: 'high-altitude-mineral-shield-spf50',
    title: 'High-Altitude Mineral Shield SPF 50+ PA++++',
    subtitle: '100% Non-Nano Micronized Zinc Oxide • Photostable UV Protection',
    category: 'Photoprotection',
    volume: '60 ml / 2.0 fl. oz.',
    price_npr: 3500,
    clinical_badge: 'Broad Spectrum UVA/UVB/HEV Shield',
    summary: 'Medical-grade mineral sunscreen engineered for extreme high-altitude Himalayan ultraviolet radiation and post-laser skin vulnerability.',
    description: 'Features micronized, non-nano zinc oxide with zero white cast on South Asian skin. Infused with ectoin and alpine edelweiss extract to neutralize high-elevation blue light and free radicals.',
    key_benefits: JSON.stringify([
      'Critical UV protection for extreme elevations (>1,400m)',
      'Invisible sheer finish without chalky residue on South Asian skin',
      'Immediate physical barrier against UV and environmental pollution'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Non-Nano Zinc Oxide USP', concentration: '18.5%' },
      { name: 'Ectoin Cellular Protectant', concentration: '1.5%' },
      { name: 'Himalayan Edelweiss Extract', concentration: '1.0%' }
    ]),
    inci_full: 'Zinc Oxide, Aqua, Isododecane, Caprylic/Capric Triglyceride, Butyloctyl Salicylate, Silica, Ectoin, Leontopodium Alpinum Extract, Polyhydroxystearic Acid, Iron Oxides.',
    usage_instructions: 'Apply generously 15 minutes before sun exposure as the final morning step. Reapply every 2 hours during prolonged outdoor activity or after sweating.',
    image_url: 'assets/images/img_c732d632f5b9.jpg',
    is_featured: 0,
    sort_order: 4,
    status: 'active'
  },
  {
    slug: 'multi-depth-hyaluronic-hydrating-mist',
    title: 'Multi-Depth Hyaluronic Hydrating Mist',
    subtitle: '5-Molecular Weight HA + Himalayan Glacier Mineral Water',
    category: 'Hydration',
    volume: '100 ml / 3.4 fl. oz.',
    price_npr: 2400,
    clinical_badge: 'Immediate Epidermal Plumping',
    summary: 'Micro-fine aerosolized clinical tonic that delivers instant multi-depth hydration and restores osmotic balance.',
    description: 'Penetrates from the stratum corneum down to deep dermal layers through five distinct molecular weights of hyaluronic acid, amplified by mineral electrolytes.',
    key_benefits: JSON.stringify([
      'Instant osmotic hydration surge in dry altitude atmospheres',
      'Enhances penetration of subsequent active serums',
      'Calms redness after dermatological procedures'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Multi-Molecular Hyaluronic Acid', concentration: '2.5%' },
      { name: 'Glacial Mineral Electrolytes', concentration: '1.0%' },
      { name: 'Centella Asiatica Leaf Water', concentration: '20.0%' }
    ]),
    inci_full: 'Aqua, Centella Asiatica Leaf Water, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium Acetylated Hyaluronate, Potassium Chloride, Zinc Gluconate.',
    usage_instructions: 'Mist generously over face and neck after cleansing or throughout the day whenever skin feels tight or dehydrated.',
    image_url: 'assets/images/img_0230de97bf1f.jpg',
    is_featured: 0,
    sort_order: 5,
    status: 'active'
  },
  {
    slug: 'overnight-cellular-resurfacing-elixir',
    title: 'Overnight Cellular Resurfacing Elixir',
    subtitle: '0.1% Micro-Encapsulated Retinaldehyde + 5% Niacinamide',
    category: 'Corrective Treatments',
    volume: '30 ml / 1.0 fl. oz.',
    price_npr: 4200,
    clinical_badge: 'Next-Gen Vitamin A • Zero Downtime',
    summary: 'A dermatological night treatment that accelerates epidermal cell turnover without the typical retinization peeling or irritation.',
    description: 'Encapsulated retinaldehyde converts 11x faster to active retinoic acid than standard retinol, paired with soothing bisabolol and ceramides.',
    key_benefits: JSON.stringify([
      'Smooths irregular texture and fades stubborn post-acne erythema',
      'Stimulates dermal collagen synthesis and structural firmness',
      'Liposomal encapsulation minimizes transepidermal peeling'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Encapsulated Retinaldehyde', concentration: '0.1%' },
      { name: 'Niacinamide USP', concentration: '5.0%' },
      { name: 'Bisabolol', concentration: '1.0%' }
    ]),
    inci_full: 'Aqua, Niacinamide, Glycerin, Phospholipids, Retinaldehyde, Ceramide NP, Bisabolol, Squalane, Allantoin, Caprylyl Glycol.',
    usage_instructions: 'Apply 2–3 pumps in the evening to dry skin 2–3 times per week, gradually increasing frequency as tolerated. Always follow with sunscreen the next morning.',
    image_url: 'assets/images/img_b3152a53b5c7.jpg',
    is_featured: 0,
    sort_order: 6,
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
    email: 'dispensary.ktm@cderma.com.np',
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
    email: 'koshi.outpost@cderma.com.np',
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
    email: 'pokhara.laser@cderma.com.np',
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
    email: 'lalitpur.retail@cderma.com.np',
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
    email: 'chitwan.dispensary@cderma.com.np',
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
    email: 'itahari.store@cderma.com.np',
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
    email: 'dharan.dispensary@cderma.com.np',
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
