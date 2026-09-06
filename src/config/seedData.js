/**
 * CDerma Nepal - Initial Seed Data
 * Contains comprehensive seed content for all site text, media slots, products, clinics, and monographs.
 */

const defaultSettings = [
  // General Brand Info
  { key: 'brand_name', value: 'CDerma Choice by Professional', category: 'General', label: 'Brand Name' },
  { key: 'brand_tagline', value: 'Choice by Professional', category: 'General', label: 'Tagline' },
  { key: 'topbar_announcement', value: 'Authorized Clinical Dispensaries Nationwide • Koshi Province Formulation Facility • ISO Class 7 Certified', category: 'General', label: 'Top Announcement Banner' },

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
  { key: 'faq_2_a', value: 'At our specialized ISO Class 7 pharmaceutical-grade cleanroom research facility located in Itahari Industrial Estate, Koshi Province, Nepal.', category: 'Home Page', label: 'FAQ 2 Answer' },
  { key: 'faq_3_q', value: 'How can licensed dermatologists request practitioner trial kits?', category: 'Home Page', label: 'FAQ 3 Question' },
  { key: 'faq_3_a', value: 'Practitioners and clinics can register via our B2B Wholesale Portal or contact clinical@cderma.com.np with their NMC registration number for immediate sample dispatch.', category: 'Home Page', label: 'FAQ 3 Answer' },

  // About & Science Story
  { key: 'about_heading', value: 'Rooted in Alpine Botany. Proven in Clinical Practice.', category: 'Science & About', label: 'About Section Headline' },
  { key: 'about_body', value: 'CDerma was founded to bring uncompromising pharmaceutical manufacturing rigor to skincare in Nepal. Combining high-altitude wild Centella Asiatica with bio-identical ceramides, peptides, and niacinamide for licensed dermatologists and aesthetic clinics.', category: 'Science & About', label: 'About Section Description' },
  { key: 'science_hero_badge', value: 'Cleanroom Protocol • Technical Monograph', category: 'Science & About', label: 'Science Hero Badge' },
  { key: 'science_hero_title', value: 'Formulated in Nepal with Cleanroom Precision', category: 'Science & About', label: 'Science Hero Title' },
  { key: 'science_hero_subtitle', value: 'Bridging pharmaceutical-grade dermatological actives with potent, sustainably harvested Himalayan botanicals. We built Nepal’s first certified dermocosmetics research cleanroom in Itahari, Koshi Province.', category: 'Science & About', label: 'Science Hero Subtitle' },
  { key: 'science_cleanroom_title', value: 'State-of-the-Art Pharmaceutical Cleanroom in Koshi Province', category: 'Science & About', label: 'Cleanroom Section Title' },
  { key: 'science_cleanroom_desc', value: 'Our facility in Itahari operates under ISO Class 7 (Class 10,000) air purity standards with positive HEPA filtration, automated batch traceability, and strict GMP protocols.', category: 'Science & About', label: 'Cleanroom Section Description' },
  { key: 'cleanroom_iso', value: 'ISO Class 7 (Class 10,000)', category: 'Science & About', label: 'Cleanroom ISO Grade' },
  { key: 'cleanroom_location', value: 'Itahari Formulation Facility, Koshi Province', category: 'Science & About', label: 'Facility Location' },
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
  { key: 'contact_email', value: 'clinical@cderma.com.np', category: 'Contact & Footer', label: 'Official Medical Email' },
  { key: 'contact_phone', value: '+977 1 4421098', category: 'Contact & Footer', label: 'Direct Medical Liaison Phone' },
  { key: 'contact_whatsapp', value: '+977 9801234567', category: 'Contact & Footer', label: 'Practitioner WhatsApp' },
  { key: 'contact_address', value: 'K&K Trading Concern, Industrial Estate, Itahari, Koshi Province, Nepal', category: 'Contact & Footer', label: 'Manufacturing & Corporate Address' },
  { key: 'corporate_reg', value: 'DDA / PAN: 609874123 • GMP Compliant Facility', category: 'Contact & Footer', label: 'Registration & Compliance Notice' },
  { key: 'footer_mission', value: 'Professional skincare, made with care in Itahari, Nepal. Supplying premier cosmetic stores, beauty retailers, certified clinics, and dermatologists across Nepal.', category: 'Contact & Footer', label: 'Footer Brand Mission Statement' },
  { key: 'footer_copyright', value: '© 2026 K&K Trading Concern. All rights reserved. Professional Formulation Facility, Itahari, Koshi Province.', category: 'Contact & Footer', label: 'Footer Copyright Notice' }
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
    address: 'Lazimpat, Kathmandu (Near Ambassador Hotel)',
    phone: '+977 1 4421098',
    email: 'info@kashmirskin.com.np',
    lead_doctor: 'Dr. S. Karki, MD (Dermatology)',
    is_verified: 1,
    status: 'active',
    sort_order: 1
  },
  {
    name: 'Lalitpur Dermal Aesthetics Center',
    category: 'Laser & Cosmetic Clinic',
    city: 'Lalitpur',
    province: 'Bagmati',
    address: 'Jawalakhel Chowk, Lalitpur',
    phone: '+977 1 5534211',
    email: 'contact@lalitpurderma.np',
    lead_doctor: 'Dr. Rashmi Lama, MD, NMC-9124',
    is_verified: 1,
    status: 'active',
    sort_order: 2
  },
  {
    name: 'Western Skin Clinic & Laser Center',
    category: 'Skin & Laser Specialty Clinic',
    city: 'Pokhara',
    province: 'Gandaki',
    address: 'New Road, Pokhara, Gandaki Province',
    phone: '+977 61 528741',
    email: 'pokhara@westernskin.com.np',
    lead_doctor: 'Dr. Pratima Bhattarai, MD',
    is_verified: 1,
    status: 'active',
    sort_order: 3
  },
  {
    name: 'Koshi Regional Medical Skin Outpost',
    category: 'Hospital Dispensary & Formulation Outpost',
    city: 'Biratnagar',
    province: 'Koshi',
    address: 'Hospital Road, Biratnagar, Koshi Province',
    phone: '+977 21 472190',
    email: 'koshi.dispensary@cderma.com.np',
    lead_doctor: 'Dr. Anish Shrestha, MS',
    is_verified: 1,
    status: 'active',
    sort_order: 4
  },
  {
    name: 'Chitwan Healthcare Dermatology Unit',
    category: 'Medical Skin Care Unit',
    city: 'Bharatpur',
    province: 'Bagmati',
    address: 'Chaubiskothi, Bharatpur, Chitwan',
    phone: '+977 56 523198',
    email: 'chitwan.skin@gmail.com',
    lead_doctor: 'Dr. B. K. Adhikari, MD',
    is_verified: 1,
    status: 'active',
    sort_order: 5
  }
];

const defaultMonographs = [
  {
    code: 'CD-MONO-01',
    title: 'Multi-Lamellar Stratum Corneum Biomimicry Using Koshi Centella Asiatica & Bio-Identical Ceramides in High-Altitude Cold Urticaria',
    category: 'Barrier Repair Protocol',
    indication: 'Severe winter xerosis, windburn, post-retinoid peeling, atopic barrier defects.',
    active_compounds: '5% Multi-Ceramides (NP/AP/EOP), 15% Koshi Centella Titrated Extract, 4% Niacinamide USP.',
    clinical_protocol: 'Apply BID directly following gentle cleansing. In cold urticaria cases, layer beneath an occlusive ceramide balm within 90 seconds of warm water contact.',
    dosage_timing: 'Morning & Evening application for minimum 21 days or until epidermal barrier conductance stabilizes above 45 μS.',
    precautions: 'Formulation is fragrance-free and hypoallergenic. Conduct 24-hr patch test on inner forearm prior to full facial protocol.',
    pdf_file: 'assets/downloads/cderma-clinical-compendium-2025.pdf',
    is_published: 1,
    sort_order: 1
  },
  {
    code: 'CD-MONO-02',
    title: 'Post-Fractional CO2 Laser & Deep Chemical Peeling Recovery Protocol',
    category: 'Procedural Recovery',
    indication: 'Ablative / Non-ablative laser recovery, trichloroacetic acid (TCA) peels, micro-needling erythema.',
    active_compounds: 'Centella Asiatica Triterpenes (Madecassoside 40%), Micronized Zinc, Panthenol 5%.',
    clinical_protocol: 'Begin 24 hours post-procedure once re-epithelialization starts. Avoid active AHAs, BHAs, and direct sunlight until complete barrier integrity is verified.',
    dosage_timing: 'Q4H (every 4 hours) for the first 72 hours, tapering to BID as erythema resolves.',
    precautions: 'Do not apply to open weeping wounds before initial coagulation.',
    pdf_file: 'assets/downloads/cderma-clinical-compendium-2025.pdf',
    is_published: 1,
    sort_order: 2
  },
  {
    code: 'CD-MONO-03',
    title: 'High-Altitude Ultraviolet Protection & Blue Light Radical Attenuation in Sensitive Skin',
    category: 'Photobiology Protocol',
    indication: 'Melasma prevention, post-inflammatory hyperpigmentation (PIH), alpine actinic damage.',
    active_compounds: 'Non-Nano Zinc Oxide 18.5%, Ectoin 1.5%, Edelweiss Leontopodic Acid.',
    clinical_protocol: 'Apply 2 mg/cm² to all sun-exposed areas 15 minutes prior to UV exposure. Essential co-therapy during hydroquinone or tranexamic acid regimens.',
    dosage_timing: 'Every 2 hours during continuous exposure above 1,400 meters altitude.',
    precautions: 'Re-apply after towel-drying or excessive transpiration.',
    pdf_file: 'assets/downloads/cderma-clinical-compendium-2025.pdf',
    is_published: 1,
    sort_order: 3
  }
];

module.exports = {
  defaultSettings,
  defaultMedia,
  defaultProducts,
  defaultClinics,
  defaultMonographs
};
