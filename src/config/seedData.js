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
  { key: 'faq_3_a', value: 'Practitioners and clinics can register via our B2B Wholesale Portal or contact us on WhatsApp (+977 9714547121) or email cdermanepal@gmail.com for immediate sample dispatch.', category: 'Home Page', label: 'FAQ 3 Answer' },

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
  { key: 'clinics_hero_title', value: 'Authorized Cosmetic Store & Clinic Directory', category: 'Clinics', label: 'Clinic Locator Headline', value_ne: 'अधिकृत कस्मेटिक स्टोर तथा क्लिनिक खोज्नुहोस्' },
  { key: 'clinics_hero_subtitle', value: 'Discover authorized beauty retailers, premium cosmetic stores, medical clinics, and aesthetic centers stocking official CDerma clinical formulations across Nepal.', category: 'Clinics', label: 'Clinic Locator Subtitle', value_ne: 'सिडर्माका क्लिनिकल उत्पादनहरू नेपालभरिका प्रमाणित कस्मेटिक स्टोर, ब्युटी रिटेलर, एस्थेटिक क्लिनिक र अस्पताल फार्मेसीहरूमा उपलब्ध छन्।' },
  { key: 'clinics_search_placeholder', value: 'Search by cosmetic store, clinic name, doctor, city (Kathmandu, Pokhara, Biratnagar)...', category: 'Clinics', label: 'Clinic Search Placeholder', value_ne: 'कस्मेटिक स्टोर, क्लिनिकको नाम, डाक्टर, शहर (काठमाडौं, पोखरा, विराटनगर) द्वारा खोज्नुहोस्...' },
  { key: 'clinics_dispatch_title', value: 'Direct Cleanroom Dispatch Protocol', category: 'Clinics', label: 'Dispatch Protocol Title', value_ne: 'प्रत्यक्ष क्लिनरूम वितरण प्रक्रिया' },
  { key: 'clinics_dispatch_desc', value: 'CDerma products are supplied directly from our Itahari and Biratnagar facilities under cold-chain quality standards to ensure maximum active potency and zero compromise.', category: 'Clinics', label: 'Dispatch Protocol Description', value_ne: 'CDerma का उत्पादनहरू अधिकतम सक्रिय गुणस्तर कायम राख्न इटहरी र विराटनगरबाट प्रत्यक्ष कोल्ड-चेन मापदण्डमा अस्पताल तथा अधिकृत स्टोरहरूमा पठाइन्छ।' },
  { key: 'clinics_steps_title', value: 'How Clinical Prescriptions & Dispensation Work', category: 'Clinics', label: 'Dispensation Steps Title', value_ne: 'क्लिनिकल सिफारिस र वितरण प्रक्रिया कसरी काम गर्छ' },
  { key: 'clinics_steps_desc', value: 'CDerma maintains an apothecary-level standard. Formulations are biologically active, unbuffered by synthetic fillers, and dispensed through trusted medical and retail partners.', category: 'Clinics', label: 'Dispensation Steps Description', value_ne: 'CDerma ले उच्च गुणस्तरीय मापदण्ड कायम राख्छ। हाम्रा उत्पादनहरू जैविक रूपमा सक्रिय हुन्छन् र अधिकृत साझेदारहरूमार्फत मात्र वितरण गरिन्छ।' },
  { key: 'clinics_facility_title', value: 'Himalayan Cleanroom Science · Manufactured in Nepal', category: 'Clinics', label: 'Facility Showcase Title', value_ne: 'हिमालयन क्लिनरूम विज्ञान · नेपालमै उत्पादित' },
  { key: 'clinics_facility_desc', value: 'Every CDerma bottle originates within our certified laboratory in Koshi Province, framed by the Himalayan ranges. We combine pure active ingredients with WHO-GMP and ISO certified standards.', category: 'Clinics', label: 'Facility Showcase Description', value_ne: 'CDerma का प्रत्येक उत्पादन कोशी प्रदेशस्थित प्रमाणित प्रयोगशालामा उच्च मापदण्डसहित तयार पारिन्छ।' },
  { key: 'clinics_facility_stat1_title', value: 'ISO 9001:2015', category: 'Clinics', label: 'Facility Stat 1 Title', value_ne: 'आईएसओ ९००१:२०१५' },
  { key: 'clinics_facility_stat1_desc', value: 'GMP Certified Plant', category: 'Clinics', label: 'Facility Stat 1 Desc', value_ne: 'जिएमपी प्रमाणित प्रयोगशाला' },
  { key: 'clinics_facility_stat2_title', value: '3,400+ MASL', category: 'Clinics', label: 'Facility Stat 2 Title', value_ne: '३,४००+ मिटर उचाइ' },
  { key: 'clinics_facility_stat2_desc', value: 'Ethical Foraging Altitude', category: 'Clinics', label: 'Facility Stat 2 Desc', value_ne: 'हिमाली संकलन उचाइ' },
  { key: 'clinics_cta_title', value: 'Are You a Licensed Medical Clinic or Cosmetic Retailer?', category: 'Clinics', label: 'Clinics Bottom CTA Title', value_ne: 'के तपाईं इजाजतपत्र प्राप्त क्लिनिक वा कस्मेटिक व्यवसायी हुनुहुन्छ?' },
  { key: 'clinics_cta_desc', value: 'Join the CDerma authorized hospital and retail network across Nepal. Ensure your patients and customers receive stable, high-potency formulations with protected margins.', category: 'Clinics', label: 'Clinics Bottom CTA Description', value_ne: 'नेपालभर CDerma को अधिकृत अस्पताल र रिटेल सञ्जालमा सामेल हुनुहोस्। आफ्ना ग्राहक र बिरामीहरूलाई भरपर्दो उत्पादन दिनुहोस्।' },
  { key: 'clinics_cta_btn', value: 'Register Your Practice / Store', category: 'Clinics', label: 'Clinics Bottom CTA Button', value_ne: 'आफ्नो व्यवसाय दर्ता गर्नुहोस्' },

  // Monographs & Guidance
  { key: 'monographs_hero_title', value: 'Honest Skincare Advice From Our Doctors', category: 'Monographs', label: 'Monographs Headline', value_ne: 'हाम्रा डाक्टरहरूबाट इमानदार छाला हेरचाह सल्लाह' },
  { key: 'monographs_hero_subtitle', value: 'We write these posts to help you understand your skin — no confusing words, no sales tricks. Just simple, practical advice from doctors who care about your skin health.', category: 'Monographs', label: 'Monographs Subtitle', value_ne: 'हामी तपाईंलाई आफ्नो छाला बुझ्न मद्दत गर्न यी लेखहरू लेख्छौँ — कुनै भ्रामक शब्द वा बिक्री प्रलोभन बिना, केवल व्यावहारिक र वैज्ञानिक सल्लाह।' },
  { key: 'monographs_doctor_quote', value: 'Most skin problems I see can be fixed with three things: a gentle cleanser, a good moisturiser, and sunscreen every single morning. You don\'t need 10 products — you need the right ones.', category: 'Monographs', label: 'Lead Doctor Quote', value_ne: 'मैले देख्ने अधिकांश छाला समस्या तीन कुराले समाधान गर्न सकिन्छ: कोमल क्लिन्जर, राम्रो मोइस्चराइजर, र हरेक बिहान सनस्क्रीन। तपाईंलाई १० वटा उत्पादन चाहिँदैन — सही उत्पादन चाहिन्छ।' },
  { key: 'monographs_doctor_name', value: 'Dr. S. Karki, MD', category: 'Monographs', label: 'Lead Doctor Name', value_ne: 'डा. एस. कार्की, एमडी' },
  { key: 'monographs_doctor_role', value: 'Dermatologist • Kathmandu Skin & Laser Hospital', category: 'Monographs', label: 'Lead Doctor Hospital Role', value_ne: 'कन्सल्टेन्ट डर्माटोलोजिस्ट • काठमाडौं स्किन एण्ड लेजर हस्पिटल' },
  { key: 'monographs_featured_badge', value: 'Featured Article This Month', category: 'Monographs', label: 'Featured Article Badge', value_ne: 'यस महिनाको प्रमुख लेख' },
  { key: 'monographs_featured_title', value: 'Why Your Skin Keeps Feeling Dry — Even After Moisturising', category: 'Monographs', label: 'Featured Article Title', value_ne: 'मोइस्चराइजर लगाउँदा पनि छाला किन सुख्खा भइरहन्छ?' },
  { key: 'monographs_featured_desc', value: 'If you\'ve tried three different creams and your face still feels tight and flaky, you\'re not alone. Many people in Nepal deal with this, especially in winter or at high altitude. The problem usually isn\'t your moisturiser — it\'s something happening deeper in your skin barrier.', category: 'Monographs', label: 'Featured Article Description', value_ne: 'यदि विभिन्न क्रिम लगाउँदा पनि अनुहार सुख्खा र तन्किएको महसुस हुन्छ भने कारण मोइस्चराइजर नभई छालाको सुरक्षात्मक पर्खाल (स्किन ब्यारियर) कमजोर हुनु हो।' },
  { key: 'monographs_featured_short_answer', value: 'Your skin has a natural protective layer called the skin barrier. Think of it like a brick wall — the bricks are your skin cells and the mortar between them is made of natural fats called ceramides. When that mortar breaks down, moisture escapes easily. The fix? Use products that rebuild that mortar with ceramides, niacinamide, and centella.', category: 'Monographs', label: 'Doctor Short Answer', value_ne: 'छालाको प्राकृतिक सुरक्षात्मक तह हुन्छ जसलाई स्किन ब्यारियर भनिन्छ। सिरामाइड, नियासिनामाइड र सेन्टेलायुक्त उत्पादनले यो तहलाई भित्रैबाट मजबुत बनाउँछन्।' },
  { key: 'monographs_disclaimer', value: 'Doctor\'s advice articles are written for educational guidance and skincare awareness across Nepal.', category: 'Monographs', label: 'Monographs Advisory', value_ne: 'डाक्टरको सल्लाह लेखहरू नेपालभर शैक्षिक मार्गदर्शन र छाला सचेतनाका लागि तयार पारिएका हुन्।' },

  // Flagship Face Care & Product Detail Section
  { key: 'flagship_sensorics_badge', value: 'Micro-Rheology & Feel', category: 'Flagship Face Care', label: 'Sensorics Badge', value_ne: 'अनुभूति र बनावट' },
  { key: 'flagship_sensorics_title', value: 'Weightless Absorption Meets Deep Barrier Nourishment', category: 'Flagship Face Care', label: 'Sensorics Headline', value_ne: 'हल्कापन र गहिरो पोषणको उत्कृष्ट सम्मिश्रण' },
  { key: 'flagship_sensorics_desc', value: 'No sticky feeling, no greasy residue, and no clogged pores. This lightweight serum sinks straight into your skin within seconds, leaving it soft, smooth, and deeply hydrated.', category: 'Flagship Face Care', label: 'Sensorics Description', value_ne: 'कुनै टाँसिने महसुस नहुने, तेलरहित र छिद्र बन्द नगर्ने। यो हल्का सीरम केही सेकेन्डमै छालामा समाहित भएर नरम र ओसिलो बनाउँछ।' },
  { key: 'flagship_sensorics_stat1_title', value: 'Fast Absorption', category: 'Flagship Face Care', label: 'Sensorics Stat 1 Title', value_ne: 'छिटो सोसिने' },
  { key: 'flagship_sensorics_stat1_val', value: 'Sinks In Within 15 Seconds', category: 'Flagship Face Care', label: 'Sensorics Stat 1 Val', value_ne: '१५ सेकेन्डमै छालामा समाहित' },
  { key: 'flagship_sensorics_stat2_title', value: 'Won\'t Clog Pores', category: 'Flagship Face Care', label: 'Sensorics Stat 2 Title', value_ne: 'छिद्र बन्द नगर्ने' },
  { key: 'flagship_sensorics_stat2_val', value: '100% Breathable & Light', category: 'Flagship Face Care', label: 'Sensorics Stat 2 Val', value_ne: '१००% हलुका र श्वासप्रश्वास अनुकूल' },
  { key: 'flagship_sensorics_stat3_title', value: 'Works Great With Makeup & Sunscreen', category: 'Flagship Face Care', label: 'Sensorics Stat 3 Title', value_ne: 'मेकअप र सनस्क्रीनसँग अनुकूल' },
  { key: 'flagship_sensorics_stat3_val', value: 'Zero Flaking / Pilling', category: 'Flagship Face Care', label: 'Sensorics Stat 3 Val', value_ne: 'कुनै पत्र नजम्ने वा नउप्किने' },
  { key: 'flagship_trials_badge', value: 'Proven Results in Nepal', category: 'Flagship Face Care', label: 'Trials Badge', value_ne: 'नेपालमा प्रमाणित परिणामहरू' },
  { key: 'flagship_trials_title', value: 'Real Results You Can See and Feel in 28 Days', category: 'Flagship Face Care', label: 'Trials Headline', value_ne: '२८ दिनमै देखिने र महसुस हुने वास्तविक नतिजा' },
  { key: 'flagship_trials_tested', value: 'Tested with 80 Nepali men & women in Kathmandu & Patan', category: 'Flagship Face Care', label: 'Trials Tested Note', value_ne: 'काठमाडौं र पाटनका ८० नेपाली पुरुष तथा महिलाहरूमा परीक्षण गरिएको' },
  { key: 'flagship_trials_study', value: '4-Week Visible Hydration Study', category: 'Flagship Face Care', label: 'Trials Study Note', value_ne: '४ हप्ताको प्रत्यक्ष मोइस्चर परीक्षण अध्ययन' },
  { key: 'flagship_trials_m1_val', value: '98.4%', category: 'Flagship Face Care', label: 'Trial Metric 1 Value', value_ne: '९८.४%' },
  { key: 'flagship_trials_m1_title', value: 'Fast Soothing Relief', category: 'Flagship Face Care', label: 'Trial Metric 1 Title', value_ne: 'तत्काल राहत र शितलता' },
  { key: 'flagship_trials_m1_desc', value: 'Calmed burning, itching, and redness caused by dust and strong mountain sun within 48 hours of use.', category: 'Flagship Face Care', label: 'Trial Metric 1 Desc', value_ne: 'धुलो र चर्को घामले गराउने पोल्ने र चिलाउने समस्या ४८ घण्टामै कम गर्दछ।' },
  { key: 'flagship_trials_m2_val', value: '-42.8%', category: 'Flagship Face Care', label: 'Trial Metric 2 Value', value_ne: '-४२.८%' },
  { key: 'flagship_trials_m2_title', value: 'Deep All-Day Hydration', category: 'Flagship Face Care', label: 'Trial Metric 2 Title', value_ne: 'दिनभर गहिरो ओसिलोपन' },
  { key: 'flagship_trials_m2_desc', value: 'Proven to lock in skin moisture and stop dryness from winter cold and air pollution.', category: 'Flagship Face Care', label: 'Trial Metric 2 Desc', value_ne: 'छालामा ओसिलोपन लक गरेर जाडोको सुख्खा हावाबाट छाला जोगाउँछ।' },
  { key: 'flagship_trials_m3_val', value: '94.6%', category: 'Flagship Face Care', label: 'Trial Metric 3 Value', value_ne: '९४.६%' },
  { key: 'flagship_trials_m3_title', value: 'Healthier, Bouncier Skin', category: 'Flagship Face Care', label: 'Trial Metric 3 Title', value_ne: 'स्वस्थ र चम्किलो छाला' },
  { key: 'flagship_trials_m3_desc', value: 'Fewer dry flaky spots around the nose and cheeks, smoother texture, and lasting radiant glow.', category: 'Flagship Face Care', label: 'Trial Metric 3 Desc', value_ne: 'गाला र नाक वरिपरिको सुख्खापन हटाई छालालाई नरम र चम्किलो बनाउँछ।' },
  { key: 'flagship_doctor_quote', value: 'Patients across Nepal experience chronic micro-inflammation stemming from winter dry inversions and heavy airborne particulate matter. CDerma\'s doctor-formulated face serums provide clinical efficacy with superior tolerability.', category: 'Flagship Face Care', label: 'Doctor Endorsement Quote', value_ne: 'नेपालको सुख्खा मौसम र धुलोका कारण छालाको अवरोध कमजोर हुन्छ। CDerma का डाक्टर-प्रमाणित सीरमहरूले छालालाई कुनै प्रतिकूल असर बिना बलियो र चम्किलो बनाउँछन्।' },
  { key: 'flagship_doctor_name', value: 'Dr. Arpana Karki, MD', category: 'Flagship Face Care', label: 'Doctor Endorsement Name', value_ne: 'डा. अर्पणा कार्की, एमडी' },
  { key: 'flagship_doctor_role', value: 'Consultant Dermatologist & Dermo-Surgeon', category: 'Flagship Face Care', label: 'Doctor Endorsement Role', value_ne: 'कन्सल्टेन्ट डर्माटोलोजिस्ट तथा डर्मो-सर्जन' },
  { key: 'flagship_doctor_reg', value: 'NMC Reg: 9482 / Kathmandu Skin Institute', category: 'Flagship Face Care', label: 'Doctor Registration Details', value_ne: 'एनएमसी दर्ता: ९४८२ / काठमाडौं स्किन इन्स्टिच्युट' },
  { key: 'flagship_inci_badge', value: '100% Disclosure Monograph', category: 'Flagship Face Care', label: 'INCI Monograph Badge', value_ne: '१००% पूर्ण सामग्री पारदर्शिता' },
  { key: 'flagship_inci_title', value: 'Formula Architecture & Quantitative Potency', category: 'Flagship Face Care', label: 'INCI Monograph Title', value_ne: 'फर्म्युला संरचना र सक्रिय शक्ति' },
  { key: 'flagship_b2b_title', value: 'Grow Your Cosmetic Store or Clinic with CDerma', category: 'Flagship Face Care', label: 'Detail B2B Teaser Title', value_ne: 'CDerma सँग आफ्नो कस्मेटिक स्टोर वा क्लिनिक विस्तार गर्नुहोस्' },
  { key: 'flagship_b2b_desc', value: 'Join 120+ premier beauty retailers, pharmacies, and skin clinics across Nepal. Enjoy protected margins, free tester stands, and guaranteed 24h dispatch.', category: 'Flagship Face Care', label: 'Detail B2B Teaser Description', value_ne: 'नेपालभरका १२०+ प्रतिष्ठित कस्मेटिक स्टोर, फार्मेसी र क्लिनिकहरूमा सामेल हुनुहोस्। उच्च मुनाफा र २४ घण्टे डेलिभरीको फाइदा लिनुहोस्।' },
  { key: 'flagship_b2b_btn', value: 'Request Wholesale Sample Kit', category: 'Flagship Face Care', label: 'Detail B2B Button', value_ne: 'थोक नमुना किट अनुरोध गर्नुहोस्' },

  { key: 'home_aeo_summary', value: "CDerma Nepal is a doctor-formulated face care manufacturer and clinical skincare supplier based in Itahari, Sunsari, Koshi Province. Crafted for Nepal’s high-altitude UV, urban pollution, and dry winters, CDerma synthesizes prescription-grade Centella barrier serums, bio-identical ceramide creams, and physiological cleansers for consumers and wholesale partners nationwide.", category: 'Home Page', label: 'AEO Clinical Brand Summary', value_ne: "CDerma नेपाल कोशी प्रदेश, सुनसरीको इटहरीमा अवस्थित डाक्टर-प्रमाणित फेस केयर उत्पादक तथा क्लिनिकल स्किनकेयर थोक आपूर्तिकर्ता हो। नेपालको उच्च उचाइको घाम, सहरी धुलो र सुख्खा जाडोलाई मध्यनजर गर्दै, CDerma ले प्रिस्क्रिप्शन-ग्रेड सेन्टेला ब्यारियर सीरम, बायो-आइडेन्टिकल सेरामाइड क्रिम र फिजियोलोजिकल क्लिन्जरहरू उत्पादन गर्दछ।" },
  { key: 'home_doctor_1_quote', value: "\"For patients undergoing barrier repair after intense seasonal weather shifts in Kathmandu, CDerma’s concentrate provides stable, non-irritating hydration without pore congestion.\"", category: 'Home Page', label: 'Doctor 1 Review Quote', value_ne: "\"काठमाडौंमा मौसम परिवर्तनका बेला छालाको सुरक्षात्मक तह कमजोर भएका बिरामीहरूका लागि, CDerma को कन्सन्ट्रेटले छिद्र बन्द नगरी स्थिर, जलनमुक्त ओसिलोपन प्रदान गर्दछ।\"" },
  { key: 'home_doctor_2_quote', value: "\"Having a world-class skincare laboratory in Itahari ensures batch freshness and immediate traceability that imported commercial brands simply cannot guarantee.\"", category: 'Home Page', label: 'Doctor 2 Review Quote', value_ne: "\"इटहरीमा विश्वस्तरीय स्किनकेयर प्रयोगशाला हुनुले ब्याचको ताजापन र तत्काल परीक्षण सुनिश्चित गर्दछ, जुन आयातित व्यावसायिक ब्रान्डहरूले दिन सक्दैनन्।\"" },
  { key: 'home_doctor_3_quote', value: "\"The omission of fragrance combined with high concentrations of Centella and Niacinamide makes this our first line recommendation for sensitised skin profiles.\"", category: 'Home Page', label: 'Doctor 3 Review Quote', value_ne: "\"सुगन्ध-रहित बनावटका साथ सेन्टेला र नियासिनामाइडको उच्च मात्राले गर्दा संवेदनशील छाला भएकाहरूका लागि यो हाम्रो पहिलो सिफारिस हो।\"" },
  { key: 'home_sensory_heading', value: "Featherlight Absorption Meets Deep Barrier Nourishment.", category: 'Home Page', label: 'Sensory Profile Heading', value_ne: "हल्का बनावटका साथ भित्रैसम्म गहिरो पोषण।" },
  { key: 'home_sensory_body', value: "Every CDerma product balances lipid richness with quick molecular absorption. Notice the distinct difference between our high-potency golden Centella serum and our velvety bio-identical ceramide cream—crafted to lock moisture in high-altitude environments without heaviness.", category: 'Home Page', label: 'Sensory Profile Description', value_ne: "CDerma का प्रत्येक उत्पादनले पोषण र छिटो अवशोषणको उत्कृष्ट सन्तुलन कायम गर्छ। हाम्रो सेन्टेला सीरम र सेरामाइड क्रिमले उच्च उचाइको सुख्खा वातावरणमा पनि छालालाई भारी नबनाई लामो समय ओसिलो राख्छ।" },
  { key: 'home_step_1_title', value: "Gentle Cleanse", category: 'Home Page', label: 'Regimen Step 1 Title', value_ne: "कोमल सफाइ (Gentle Cleanse)" },
  { key: 'home_step_1_desc', value: "Wash with lukewarm water and a pH-balanced cleanser to remove particulate dust without stripping moisture.", category: 'Home Page', label: 'Regimen Step 1 Description', value_ne: "मनतातो पानी र सन्तुलित pH भएको क्लिन्जरले छालाको ओसिलोपन नहटाई धुलो र फोहोर सफा गर्नुहोस्।" },
  { key: 'home_step_2_title', value: "Balance & Mist", category: 'Home Page', label: 'Regimen Step 2 Title', value_ne: "सन्तुलन र मिस्ट (Balance & Mist)" },
  { key: 'home_step_2_desc', value: "Lightly mist face with botanical balancing water to optimize stratum corneum absorption for active serums.", category: 'Home Page', label: 'Regimen Step 2 Description', value_ne: "सक्रिय सीरमलाई छालाको भित्री तहसम्म पुर्‍याउन बोटानिकल मिस्टले अनुहार हल्का ओसिलो बनाउनुहोस्।" },
  { key: 'home_step_3_title', value: "CDerma Serum", category: 'Home Page', label: 'Regimen Step 3 Title', value_ne: "CDerma सीरम (Active Treatment)" },
  { key: 'home_step_3_desc', value: "Dispense 3–4 drops of Flagship Concentrate onto fingertips. Smooth upward across face, neck, and decolletage.", category: 'Home Page', label: 'Regimen Step 3 Description', value_ne: "औंलामा ३-४ थोपा सीरम लिएर अनुहार र घाँटीमा माथितिर हल्का मालिस गर्दै लगाउनुहोस्।" },
  { key: 'home_step_4_title', value: "Lock & Shield", category: 'Home Page', label: 'Regimen Step 4 Title', value_ne: "सुरक्षा र लक (Lock & Shield)" },
  { key: 'home_step_4_desc', value: "Seal lipid barrier with cream in PM, or apply broad-spectrum high-altitude sunscreen during daytime hours.", category: 'Home Page', label: 'Regimen Step 4 Description', value_ne: "राती क्रिम लगाएर ओसिलोपन लक गर्नुहोस्, वा दिउँसोको समयमा चर्को घामबाट बच्न सनस्क्रीन लगाउनुहोस्।" },
  { key: 'home_range_title', value: "Dermatological Range", category: 'Home Page', label: 'Range Section Title', value_ne: "डर्माटोलोजिकल उत्पादन श्रृंखला" },
  { key: 'home_serum_retin_title', value: "1% Retinol Serum (Retin C)", category: 'Home Page', label: 'Serum 1 Card Title (Retin C)', value_ne: "१% रेटिनोल सिरम (रेटिन सी)" },
  { key: 'home_serum_retin_sub', value: "1% Retinol + Bakuchiol + Multi-Peptides", category: 'Home Page', label: 'Serum 1 Card Actives (Retin C)', value_ne: "१% रेटिनोल + बाकुचियोल + मल्टि-पेप्टाइड्स" },
  { key: 'home_serum_niacin_title', value: "10% Niacinamide Serum (Niacin C)", category: 'Home Page', label: 'Serum 2 Card Title (Niacin C)', value_ne: "१०% नियासिनामाइड सिरम (नियासिन सी)" },
  { key: 'home_serum_niacin_sub', value: "10% Niacinamide + Zinc PCA + Peptides", category: 'Home Page', label: 'Serum 2 Card Actives (Niacin C)', value_ne: "१०% नियासिनामाइड + जिंक पीसीए + पेप्टाइड्स" },
  { key: 'home_serum_alpha_title', value: "2% Alpha Arbutin Serum (Alpha C)", category: 'Home Page', label: 'Serum 3 Card Title (Alpha C)', value_ne: "२% अल्फा अरबुटिन सिरम (अल्फा सी)" },
  { key: 'home_serum_alpha_sub', value: "2% Alpha Arbutin + 1% Kojic Acid + Peptides", category: 'Home Page', label: 'Serum 3 Card Actives (Alpha C)', value_ne: "२% अल्फा अरबुटिन + १% कोजिक एसिड + पेप्टाइड्स" },
  { key: 'home_serum_azelyx_title', value: "10% Azelaic Acid Serum (Azelyx C)", category: 'Home Page', label: 'Serum 4 Card Title (Azelyx C)', value_ne: "१०% एजेलेइक एसिड सिरम (एजेलिक्स सी)" },
  { key: 'home_serum_azelyx_sub', value: "10% Azelaic Acid + Squalane + Multi-Peptides", category: 'Home Page', label: 'Serum 4 Card Actives (Azelyx C)', value_ne: "१०% एजेलेइक एसिड + स्क्वालेन + मल्टि-पेप्टाइड्स" },
  { key: 'faq_badge', value: "Clinical Inquiry", category: 'Home Page', label: 'FAQ Section Badge', value_ne: "क्लिनिकल जिज्ञासा र परामर्श" },
  { key: 'faq_subtitle', value: "Common questions from dermatologists, clinics, and skincare patients across Nepal.", category: 'Home Page', label: 'FAQ Section Subtitle', value_ne: "नेपालभरका छाला विशेषज्ञ, क्लिनिक र सेवाग्राहीहरूबाट बारम्बार सोधिने प्रश्नहरू।" },
  { key: 'home_bottom_badge', value: "Direct Distribution Inquiry", category: 'Home Page', label: 'Home Bottom CTA Badge', value_ne: "प्रत्यक्ष थोक तथा क्लिनिक सोधपुछ" },
  { key: 'science_pillars_badge', value: "Cleanroom Quality Standard", category: 'Science & About', label: 'Cleanroom Pillars Badge', value_ne: "क्लिनरूम गुणस्तर मापदण्ड" },
  { key: 'science_pillars_title', value: "The Five Pillars of CDerma Formulation", category: 'Science & About', label: 'Cleanroom Pillars Title', value_ne: "CDerma निर्माणका पाँच मुख्य स्तम्भहरू" },
  { key: 'science_pillars_desc', value: "From positive pressure cascading airlocks to regional stability testing under Nepal’s severe thermal contrasts.", category: 'Science & About', label: 'Cleanroom Pillars Description', value_ne: "पोजिटिभ प्रेसर एयरलकदेखि नेपालको भौगोलिक मौसम अनुसारको स्थिरता परीक्षणसम्म।" },
  { key: 'science_pillar_1_title', value: "Positive Pressure & HEPA H14", category: 'Science & About', label: 'Cleanroom Pillar 1 Title', value_ne: "सकारात्मक दबाब र HEPA H14 फिल्टर" },
  { key: 'science_pillar_1_desc', value: "Air cascaded at 25 Pascals over 4 clean zones ensures zero airborne spores, bacteria, or microparticulates settle during high-shear vacuum homogenization.", category: 'Science & About', label: 'Cleanroom Pillar 1 Description', value_ne: "४ वटा क्लिन जोनमा २५ पास्कलको हावाको दबाबले उत्पादनको समयमा हावामा हुने कुनै पनि ब्याक्टेरिया वा धुलो पर्न दिँदैन।" },
  { key: 'science_pillar_2_title', value: "3:1:1:1 Stratum Corneum Ratio", category: 'Science & About', label: 'Cleanroom Pillar 2 Title', value_ne: "३:१:१:१ छालाको प्राकृतिक अनुपात" },
  { key: 'science_pillar_2_desc', value: "Formulated to mirror human epidermal lipids exactly: Ceramide NP, Cholesterol, and Free Fatty Acids engineered in stoichiometric balance for rapid barrier biomimicry.", category: 'Science & About', label: 'Cleanroom Pillar 2 Description', value_ne: "मानव छालाको प्राकृतिक लिपिड संरचनासँग हुबहु मिल्ने गरी सेरामाइड, कोलेस्टेरोल र फ्याटी एसिडको सन्तुलित सम्मिश्रण।" },
  { key: 'science_pillar_3_title', value: "Altitude & Climate Stress Test", category: 'Science & About', label: 'Cleanroom Pillar 3 Title', value_ne: "उचाइ र मौसम अनुकूलता परीक्षण" },
  { key: 'science_pillar_3_desc', value: "Every formula undergoes cyclic thermal testing: cycling between 4°C Kathmandu chill and 42°C Terai humidity to preserve emulsion rheology across all 7 provinces.", category: 'Science & About', label: 'Cleanroom Pillar 3 Description', value_ne: "काठमाडौंको ४°C चिसोदेखि तराईको ४२°C गर्मीसम्म सबै ७ वटै प्रदेशको मौसममा उत्पादनको गुणस्तर स्थिर रहने परीक्षण।" },
  { key: 'science_pillar_4_title', value: "Zero-Tolerance Microbial Screening", category: 'Science & About', label: 'Cleanroom Pillar 4 Title', value_ne: "शून्य-सहनशीलता सूक्ष्मजीव परीक्षण" },
  { key: 'science_pillar_4_desc', value: "Pre-quarantine incubation for bacterial, fungal, and spore-forming microbes. ICP-MS mass spectrometry confirms zero heavy metals (Lead < 0.1ppm, Mercury < 0.01ppm).", category: 'Science & About', label: 'Cleanroom Pillar 4 Description', value_ne: "ब्याक्टेरिया, ढुसी र कुनै पनि हानिकारक धातु (Lead, Mercury) नभएको प्रमाणित गर्ने कडा प्रयोगशाला परीक्षण।" },
  { key: 'science_tour_title', value: "Physician Cleanroom Audits Welcome", category: 'Science & About', label: 'Doctor Audit Invitation Title', value_ne: "चिकित्सकहरूका लागि क्लिनरूम अवलोकन खुला" },
  { key: 'science_tour_desc', value: "Licensed dermatologists, cosmetic surgeons, and clinical pharmacists are invited to schedule an on-site audit of our Koshi formulation suites, air handling systems, and analytical records.", category: 'Science & About', label: 'Doctor Audit Invitation Description', value_ne: "प्रमाणित छाला विशेषज्ञ, सर्जन र फार्मासिस्टहरूलाई हाम्रो इटहरीस्थित प्रयोगशाला, हावा प्रणाली र परीक्षण अभिलेखहरूको स्थलगत निरीक्षण गर्न हार्दिक स्वागत गर्दछौं।" },
  { key: 'clinics_step_1_title', value: "Clinical Skin Evaluation", category: 'Clinics', label: 'Clinics Step 1 Title', value_ne: "क्लिनिकल छाला परीक्षण" },
  { key: 'clinics_step_1_desc', value: "Visit any authorized dermatologist or hospital aesthetic unit for barrier profiling, stratum corneum hydration testing, and dermatological consultation.", category: 'Clinics', label: 'Clinics Step 1 Description', value_ne: "छालाको अवस्था, ओसिलोपनको स्तर र व्यक्तिगत परामर्शका लागि आधिकारिक छाला विशेषज्ञ वा क्लिनिकमा जानुहोस्।" },
  { key: 'clinics_step_2_title', value: "Monograph & Lot Assignment", category: 'Clinics', label: 'Clinics Step 2 Title', value_ne: "फर्म्युला र ब्याच छनोट" },
  { key: 'clinics_step_2_desc', value: "Your clinician matches specific Himalayan phytochemical actives (Centella, Rhododendron anthopogon, Lichenic acids) and assigns a unique traceability lot code.", category: 'Clinics', label: 'Clinics Step 2 Description', value_ne: "डाक्टरले तपाईंको छाला अनुसार उपयुक्त सक्रिय तत्व छनोट गरी प्रमाणित ब्याच नम्बर सिफारिस गर्नुहुन्छ।" },
  { key: 'clinics_step_3_title', value: "Hospital Counter Collection", category: 'Clinics', label: 'Clinics Step 3 Title', value_ne: "काउन्टरबाट सिधै प्राप्त" },
  { key: 'clinics_step_3_desc', value: "Receive your freshly compounded formulation directly at the clinic's certified dispensary or authorized hospital pharmacy counter with tamper-evident nitrogen seals intact.", category: 'Clinics', label: 'Clinics Step 3 Description', value_ne: "क्लिनिकको डिस्पेनसरी वा अधिकृत फार्मेसी काउन्टरबाट सिलबन्दी गरिएको ताजा उत्पादन सिधै प्राप्त गर्नुहोस्।" },
  { key: 'products_hero_eyebrow', value: "Cleanroom Certified • Formulated in Itahari, Nepal", category: 'Products Page', label: 'Products Hero Eyebrow', value_ne: "क्लिनरूम प्रमाणित • इटहरी, नेपालमा निर्मित" },
  { key: 'flagship_texture_1_title', value: "Dew-Lock Texture", category: 'Flagship Face Care', label: 'Sensorics: Dew-Lock Title', value_ne: "ओसिलोपन लक गर्ने बनोट" },
  { key: 'flagship_texture_1_desc', value: "Silky golden drops that melt into your skin instantly upon gentle touch.", category: 'Flagship Face Care', label: 'Sensorics: Dew-Lock Description', value_ne: "हल्का छुँदा नै छालामा तुरुन्तै पग्लिने रेशमी सुनौलो थोपाहरू।" },
  { key: 'flagship_texture_2_title', value: "Natural Aroma", category: 'Flagship Face Care', label: 'Sensorics: Natural Aroma Title', value_ne: "प्राकृतिक सुगन्ध" },
  { key: 'flagship_texture_2_desc', value: "A gentle, clean herbal scent directly from pure fresh Himalayan centella leaf water.", category: 'Flagship Face Care', label: 'Sensorics: Natural Aroma Description', value_ne: "ताजा हिमाली सेन्टेला पातको पानीबाट प्राप्त हुने प्राकृतिक, सफा जडीबुटीको गन्ध।" },
  // Contact & Footer
  { key: 'contact_email', value: 'cdermanepal@gmail.com', category: 'Contact & Footer', label: 'Official Medical Email' },
  { key: 'contact_phone', value: '+977 9714547121', category: 'Contact & Footer', label: 'Direct Medical Liaison Phone' },
  { key: 'contact_whatsapp', value: '+977 9714547121', category: 'Contact & Footer', label: 'Practitioner WhatsApp' },
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
  { key: 'products_mandate_title', value: 'The CDerma Purity Mandate', category: 'Products Page', label: 'Mandate Section Title', value_ne: 'CDerma को शुद्धता मापदण्ड' },
  { key: 'products_mandate_1_title', value: 'Zero Synthetic Fragrance', category: 'Products Page', label: 'Mandate 1 Title', value_ne: 'शून्य कृत्रिम सुगन्ध' },
  { key: 'products_mandate_1_desc', value: 'No perfumes, essential oils, or masking agents that trigger contact dermatitis.', category: 'Products Page', label: 'Mandate 1 Desc', value_ne: 'छाला चिलाउने वा एलर्जी गराउने कुनै पनि अत्तर वा सुगन्ध प्रयोग गरिएको छैन।' },
  { key: 'products_mandate_2_title', value: 'Pure Cleanroom Standards', category: 'Products Page', label: 'Mandate 2 Title', value_ne: 'शुद्ध क्लिनरूम मापदण्ड' },
  { key: 'products_mandate_2_desc', value: 'ISO Class 7 cleanroom positive-pressure HEPA filtered manufacturing in Itahari.', category: 'Products Page', label: 'Mandate 2 Desc', value_ne: 'इटहरीमा सकारात्मक दबाब र हेपा फिल्टरसहितको आईएसओ क्लास ७ क्लिनरूम उत्पादन।' },
  { key: 'products_mandate_3_title', value: 'Wild Himalayan Botanicals', category: 'Products Page', label: 'Mandate 3 Title', value_ne: 'प्राकृतिक हिमाली जडीबुटी' },
  { key: 'products_mandate_3_desc', value: 'Cold-macerated sub-alpine Centella Asiatica harvested sustainably above 1,800m.', category: 'Products Page', label: 'Mandate 3 Desc', value_ne: '१,८०० मिटरभन्दा माथिको उचाइबाट संकलित कोल्ड-म्यासरेटेड सेन्टेला एसियाटिका।' },
  { key: 'products_mandate_4_title', value: 'Made for Nepal\'s Climate', category: 'Products Page', label: 'Mandate 4 Title', value_ne: 'नेपालको मौसम अनुकूल' },
  { key: 'products_mandate_4_desc', value: 'Targeted formulations for high-altitude UV, dry winter winds, and monsoon humidity.', category: 'Products Page', label: 'Mandate 4 Desc', value_ne: 'उच्च उचाइको घाम, सुख्खा जाडो र मनसुनी आर्द्रताका लागि विशेष फर्मुला।' },

  // Home Page - Climate & Daily Glow Banner
  { key: 'home_climate_badge', value: 'Crafted for Nepal Weather', category: 'Home Page', label: 'Climate Banner Badge', value_ne: 'नेपालको मौसम अनुकूल तयार पारिएको' },
  { key: 'home_climate_title', value: 'Made for Nepal’s Climate & Everyday Radiance.', category: 'Home Page', label: 'Climate Banner Title', value_ne: 'नेपालको हावापानी र दैनिक चम्किलो छालाका लागि निर्मित।' },
  { key: 'home_climate_desc', value: 'Designed for real daily life in Nepal — from dusty city roads to sunny afternoons and dry winter air. CDerma keeps your skin deeply hydrated, calm, and glowing without clogging pores or feeling sticky.', category: 'Home Page', label: 'Climate Banner Description', value_ne: 'नेपालको वास्तविक दैनिक जीवनका लागि उपयुक्त — धुलो, चर्को घाम र जाडोको सुख्खा हावाबाट जोगाउँछ। CDerma ले छालालाई टाँसिने नबनाई भित्रैबाट नरम र चम्किलो राख्छ।' },
  { key: 'home_climate_stat1_val', value: '98.4%', category: 'Home Page', label: 'Climate Stat 1 Value', value_ne: '९८.४%' },
  { key: 'home_climate_stat1_lbl', value: 'Felt soothing relief right away', category: 'Home Page', label: 'Climate Stat 1 Label', value_ne: 'पहिलो प्रयोगमै तत्काल आराम र शितलता' },
  { key: 'home_climate_stat2_val', value: '0%', category: 'Home Page', label: 'Climate Stat 2 Value', value_ne: '०%' },
  { key: 'home_climate_stat2_lbl', value: 'Artificial perfume or harsh parabens', category: 'Home Page', label: 'Climate Stat 2 Label', value_ne: 'कुनै हानिकारक सुगन्ध वा पाराबेन बिना' },
  { key: 'home_climate_cta', value: 'Explore Flagship Serum', category: 'Home Page', label: 'Climate Banner CTA Button', value_ne: 'फ्ल्यागशिप सीरम हेर्नुहोस्' },

  // Home Page - Ingredients & INCI Section
  { key: 'home_ingredients_badge', value: 'Botanical & Molecular Balance', category: 'Home Page', label: 'Ingredients Section Badge', value_ne: 'प्राकृतिक जडीबुटी र आधुनिक विज्ञानको सन्तुलन' },
  { key: 'home_ingredients_title', value: 'What Goes Into Your Skincare Matters.', category: 'Home Page', label: 'Ingredients Section Title', value_ne: 'तपाईंको छालामा के प्रयोग हुँदैछ भन्ने कुरा महत्त्वपूर्ण छ।' },
  { key: 'home_ingredients_desc', value: 'Every bottle is an uncompromised convergence of verified actives and pristine alpine botanicals. Full INCI transparency is our foundational baseline.', category: 'Home Page', label: 'Ingredients Section Description', value_ne: 'हाम्रो प्रत्येक बोतल प्रमाणित बायो-एक्टिभ र हिमालयन जडीबुटीहरूको शुद्ध सम्मिश्रण हो। पूर्ण सामग्री पारदर्शिता हाम्रो पहिलो प्रतिबद्धता हो।' },

  // Home Page - 4-Step Daily Regimen
  { key: 'home_regimen_badge', value: 'Dermatological Protocol', category: 'Home Page', label: 'Regimen Section Badge', value_ne: 'दैनिक डर्माटोलोजिकल प्रक्रिया' },
  { key: 'home_regimen_title', value: 'The 4-Step Daily Regimen', category: 'Home Page', label: 'Regimen Section Title', value_ne: '४-चरणको दैनिक स्किनकेयर तालिका' },
  { key: 'home_regimen_subtitle', value: 'Designed to harmonize with your skin’s natural circadian renewal cycles.', category: 'Home Page', label: 'Regimen Section Subtitle', value_ne: 'तपाईंको छालाको प्राकृतिक जैविक पुनर्निर्माण चक्रसँग तालमेल मिलाउन तयार गरिएको।' },
  { key: 'home_regimen_step1_title', value: '1. Gentle Cleanse', category: 'Home Page', label: 'Regimen Step 1 Title', value_ne: '१. कोमल सफाइ (Cleanse)' },
  { key: 'home_regimen_step1_desc', value: 'Wash away dust and impurities without stripping natural skin oils.', category: 'Home Page', label: 'Regimen Step 1 Desc', value_ne: 'छालाको प्राकृतिक तेल नहटाई धुलो र फोहोर गहिरिएर सफा गर्दछ।' },
  { key: 'home_regimen_step2_title', value: '2. Target with Serum', category: 'Home Page', label: 'Regimen Step 2 Title', value_ne: '२. सीरम उपचार (Target)' },
  { key: 'home_regimen_step2_desc', value: 'Apply active drops to target dark spots, fine lines, or barrier repair.', category: 'Home Page', label: 'Regimen Step 2 Desc', value_ne: 'कालो दाग, चाउरीपना वा कमजोर छालाको अवरोध मर्मत गर्न सक्रिय थोपाहरू।' },
  { key: 'home_regimen_step3_title', value: '3. Nourish & Moisturize', category: 'Home Page', label: 'Regimen Step 3 Title', value_ne: '३. पोषण र मोइस्चराइज (Nourish)' },
  { key: 'home_regimen_step3_desc', value: 'Lock in hydration and strengthen your moisture barrier all day.', category: 'Home Page', label: 'Regimen Step 3 Desc', value_ne: 'छालामा दिनभर गहिरो ओसिलोपन लक गरेर सुरक्षात्मक तह बलियो बनाउँछ।' },
  { key: 'home_regimen_step4_title', value: '4. Protect with SPF', category: 'Home Page', label: 'Regimen Step 4 Title', value_ne: '४. सनस्क्रीन सुरक्षा (Protect)' },
  { key: 'home_regimen_step4_desc', value: 'Shield against high-altitude Himalayan sun and environmental stress.', category: 'Home Page', label: 'Regimen Step 4 Desc', value_ne: 'उच्च उचाइको चर्को घाम र वातावरणीय विकिरणबाट पूर्ण सुरक्षा।' },

  // Home Page - Cleanroom & Standards
  { key: 'home_mfg_badge', value: 'Imported Actives & Sourcing Standards', category: 'Home Page', label: 'Manufacturing Badge', value_ne: 'गुणस्तरीय कच्चा पदार्थ र उत्पादन मापदण्ड' },
  { key: 'home_mfg_title', value: 'Imported High-Grade Formulations. Built Around Quality.', category: 'Home Page', label: 'Manufacturing Section Title', value_ne: 'प्रमाणित उच्च-स्तरीय फर्मुला। गुणस्तरमा आधारित।' },
  { key: 'home_mfg_desc', value: 'CDerma imports certified pharmaceutical-grade active ingredients, clinical compounds, and precision packaging from internationally accredited laboratories, formulated and cleanroom-batched at our Itahari facility under stringent quality quarantine.', category: 'Home Page', label: 'Manufacturing Description', value_ne: 'CDerma ले अन्तर्राष्ट्रिय प्रयोगशालाहरूबाट प्रमाणित फार्मास्युटिकल-ग्रेड सामग्री आयात गरी इटहरीस्थित क्लिनरूममा कडा गुणस्तर परीक्षणसहित ब्याचिङ गर्दछ।' },

  // Home Page - Supply Network
  { key: 'home_network_badge', value: 'Supply Network', category: 'Home Page', label: 'Network Section Badge', value_ne: 'देशव्यापी आपूर्ति सञ्जाल' },
  { key: 'home_network_title', value: 'From Itahari to Skincare Shelves Across Nepal.', category: 'Home Page', label: 'Network Section Title', value_ne: 'इटहरीदेखि नेपालभरका स्किनकेयर काउन्टरहरूसम्म।' },
  { key: 'home_network_desc', value: 'CDerma is distributed through premier cosmetic shops, beauty stores, clinics, and hospital pharmacies in Kathmandu, Pokhara, Biratnagar, Dharan, Butwal, and beyond.', category: 'Home Page', label: 'Network Section Description', value_ne: 'काठमाडौँ, पोखरा, विराटनगर, धरान, बुटवललगायत देशभरका प्रमुख कस्मेटिक स्टोरहरू, फार्मेसीहरू र स्किन क्लिनिकहरूमा उपलब्ध।' },

  // Home Page - B2B Teaser
  { key: 'home_b2b_badge', value: 'B2B Partnership', category: 'Home Page', label: 'Home B2B Badge', value_ne: 'बी२बी व्यावसायिक साझेदारी' },
  { key: 'home_b2b_title', value: 'Grow Your Business With CDerma.', category: 'Home Page', label: 'Home B2B Title', value_ne: 'CDerma सँग आफ्नो व्यवसाय विस्तार गर्नुहोस्।' },
  { key: 'home_b2b_desc', value: 'We partner with cosmetic store owners, beauty retailers, aesthetic clinics, and dermatologists across Nepal with high margins, fast delivery, and marketing support.', category: 'Home Page', label: 'Home B2B Description', value_ne: 'हामी नेपालभरका कस्मेटिक स्टोर सञ्चालक, ब्युटी रिटेलर्स, र छाला रोग विशेषज्ञहरूसँग उच्च मुनाफा र भरपर्दो डेलिभरीका साथ सहकार्य गर्दछौँ।' },
  { key: 'home_b2b_cta', value: 'Apply for Wholesale Partnership', category: 'Home Page', label: 'Home B2B CTA Button', value_ne: 'थोक साझेदारीका लागि आवेदन दिनुहोस्' },

  // Home Page - Bottom Call to Action
  { key: 'home_bottom_title', value: 'Elevate your daily regimen with doctor-recommended care.', category: 'Home Page', label: 'Bottom Banner Title', value_ne: 'डाक्टर-सिफारिस हेरचाहका साथ आफ्नो दैनिक स्किनकेयर बदल्नुहोस्।' },
  { key: 'home_bottom_desc', value: 'Discover medical-grade face care formulated for Nepal’s climate, or partner with us as an authorized retail stockist.', category: 'Home Page', label: 'Bottom Banner Description', value_ne: 'नेपालको मौसमका लागि तयार पारिएको मेडिकल-ग्रेड स्किनकेयर अनुभव गर्नुहोस्, वा अधिकृत रिटेल साझेदार बन्नुहोस्।' },
  { key: 'home_bottom_btn_products', value: 'Explore Full Range', category: 'Home Page', label: 'Bottom Banner Products Button', value_ne: 'सबै उत्पादनहरू हेर्नुहोस्' },
  { key: 'home_bottom_btn_partner', value: 'Partner With Us', category: 'Home Page', label: 'Bottom Banner Partner Button', value_ne: 'हामीसँग सहकार्य गर्नुहोस्' }
];

const defaultMedia = [
  {
    slot_key: 'site_logo',
    slot_label: 'Main Site Logo (Header & Light Surfaces)',
    page: 'Global',
    description: 'The official CDerma Choice by Professional logo in Pure Black (#000000) for navigation headers and light backgrounds.',
    image_url: '/assets/images/cderma-logo.png'
  },
  {
    slot_key: 'site_logo_white',
    slot_label: 'Inverted White Logo (Dark Surfaces & Admin)',
    page: 'Global',
    description: 'High-contrast Warm Alabaster (#FAF9F6) logo used on dark backgrounds like the Admin sidebar.',
    image_url: '/assets/images/cderma-logo-white.png'
  },
  {
    slot_key: 'hero_flagship_bottle',
    slot_label: 'Homepage Hero Dropper Bottle',
    page: 'Home Page',
    description: 'Ultra-luxury cosmetic packaging shot of the flagship frosted glass dropper bottle.',
    image_url: '/assets/images/product-packaging-dropper.png'
  },
  {
    slot_key: 'hero_model_portrait',
    slot_label: 'Radiant Skin Model Banner',
    page: 'Home Page',
    description: 'Editorial skincare photography featuring South Asian woman with radiant, healthy dewy bare skin.',
    image_url: '/assets/images/radiant-skin-model.png'
  },
  {
    slot_key: 'science_cleanroom',
    slot_label: 'Cleanroom Formulation Facility',
    page: 'Science & About',
    description: 'Architectural cleanroom photograph showing stainless steel bioreactors and cleanroom gowns in Itahari facility.',
    image_url: '/assets/images/cleanroom-facility.png'
  },
  {
    slot_key: 'science_botanical',
    slot_label: 'Centella Botanical Extraction Still-Life',
    page: 'Science & About',
    description: 'Alpine Centella Asiatica leaves and pristine water droplets resting on frosted laboratory glass.',
    image_url: '/assets/images/centella-botanical-extract.png'
  },
  {
    slot_key: 'science_texture',
    slot_label: 'Facial Cream & Serum Texture Swatch',
    page: 'Home & Products',
    description: 'Rich creamy velvety facial moisturizer droplet and silky golden serum texture smear on stone slab.',
    image_url: '/assets/images/texture-swatch.png'
  },
  {
    slot_key: 'science_doctor',
    slot_label: 'Consultant Dermatologist Portrait',
    page: 'Home & Science',
    description: 'Authentic portrait of consultant dermatologist doctor in white clinical coat.',
    image_url: '/assets/images/dr-karki-portrait.png'
  },
  {
    slot_key: 'b2b_banner',
    slot_label: 'B2B Wholesale Cleanroom Laboratory',
    page: 'B2B Portal',
    description: 'Wide laboratory cleanroom research and manufacturing overview banner.',
    image_url: '/assets/images/cleanroom-lab-wide.png'
  },
  {
    slot_key: 'testimonial_doctor_1',
    slot_label: 'Doctor Testimonial Portrait 1 (Dr. Karki)',
    page: 'Home Page',
    description: 'Physician headshot for first home page clinical endorsement.',
    image_url: '/assets/images/img_d8dddc0fbb21.jpg'
  },
  {
    slot_key: 'testimonial_doctor_2',
    slot_label: 'Doctor Testimonial Portrait 2 (Dr. Sharma)',
    page: 'Home Page',
    description: 'Physician headshot for second home page clinical endorsement.',
    image_url: '/assets/images/img_b7a64c067655.jpg'
  },
  {
    slot_key: 'product_cream_jar',
    slot_label: 'Flagship Barrier Cream Jar Packaging',
    page: 'Home & Products',
    description: 'Luxury frosted glass cream jar cosmetic packaging.',
    image_url: '/assets/images/img_623ee7600cd6.png'
  },
  {
    slot_key: 'science_microscope',
    slot_label: 'Laboratory Cellular Research Microscopy',
    page: 'Science & About',
    description: 'Dermatological laboratory microscope and cellular active extraction.',
    image_url: '/assets/images/img_3037b9a39d03.jpg'
  }
];

const defaultProducts = [
  {
    slug: 'retin-c-serum',
    title: '1% Retinol Serum with Multi-Peptides (Retin C Serum)',
    subtitle: 'Reveal Younger, Smoother, Firmer Skin • 1% Encapsulated Retinol + Multi-Peptides',
    category: 'Corrective Treatments',
    volume: '30 ml / 1.01 fl. oz.',
    price_npr: 2450,
    clinical_badge: 'Dermatologically Tested • Anti-Aging Formulation',
    summary: 'A high-performance anti-aging solution with 1% encapsulated retinol, bakuchiol, and multi-peptides to reduce fine lines, boost collagen, and refine skin texture without irritation.',
    description: 'Our 1% Retinol Serum with Multi-Peptides is a powerful yet gentle anti-aging solution designed to target fine lines, wrinkles, and uneven skin tone. Retinol boosts collagen production and speeds up skin cell turnover, while multi-peptides work to strengthen the skin barrier and improve firmness. Enhanced with bakuchiol, ceramides, niacinamide, and hyaluronic acid for maximum tolerance and deep hydration.',
    key_benefits: JSON.stringify([
      'Targets fine lines, wrinkles, and crow’s feet',
      'Boosts natural collagen production and cellular turnover',
      'Strengthens skin barrier with bio-identical multi-peptides',
      'Blended with Bakuchiol & Ceramides for optimal tolerance without excessive irritation',
      'Improves skin elasticity, firmness, and youthful radiance'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Encapsulated Retinol', concentration: '1.0%' },
      { name: 'Bakuchiol (Plant-Derived Retinol Alternative)', concentration: 'Active' },
      { name: 'Ceramide Complex (NP, AP, EOP)', concentration: 'Bio-Identical' },
      { name: 'Multi-Peptide Blend (Tetrapeptide-1 & 7)', concentration: 'Active' },
      { name: 'Niacinamide (Vitamin B3)', concentration: 'USP Grade' },
      { name: 'Hyaluronic Acid', concentration: 'Multi-Molecular' }
    ]),
    inci_full: 'Purified Water, Encapsulated Retinol (1%), Bakuchiol, Ceramide NP, Ceramide AP, Ceramide EOP, Niacinamide, Sodium Hyaluronate, Tocopheryl Acetate (Vitamin E), Tetrapeptide-1, Tetrapeptide-7, Glycerin, Butylene Glycol, Caprylic/Capric Triglyceride, Phenoxyethanol, Ethylhexylglycerin.',
    usage_instructions: 'Apply a small pea-sized amount to clean, dry skin in the evening. Begin using 2–3 times per week, gradually increasing frequency as tolerated. Follow with moisturizer. Always use broad-spectrum sunscreen (SPF 50+) during the day when using retinol products.',
    image_url: '/assets/images/cderma-retin-c-serum.jpg',
    is_featured: 1,
    sort_order: 1,
    status: 'active'
  },
  {
    slug: 'niacin-c-serum',
    title: '10% Niacinamide Serum with Multi-Peptides (Niacin C Serum)',
    subtitle: 'Stronger Skin, Healthier Glow • 10% Niacinamide + Zinc PCA + Peptides',
    category: 'Barrier Repair',
    volume: '30 ml / 1.01 fl. oz.',
    price_npr: 1950,
    clinical_badge: 'Dermatologically Tested • Pore Refining',
    summary: 'A lightweight, fast-absorbing formula with 10% pure Niacinamide, Zinc PCA, Tranexamic Acid, and Multi-Peptides to minimize pores, balance sebum, fade dark spots, and strengthen the epidermal barrier.',
    description: 'Our 10% Niacinamide Serum with Multi-Peptides is a lightweight, fast-absorbing formula designed to minimize pores, control excess oil, and brighten dull skin. Powered with high-strength 10% Niacinamide, it helps fade dark spots and even out skin tone, while Multi-Peptides repair and strengthen the skin barrier for long-term skin health. Infused with Tranexamic Acid, Allantoin, Panthenol, and Green Tea extract.',
    key_benefits: JSON.stringify([
      'Visibly minimizes enlarged pores and regulates excess sebum',
      'Fades dark spots, sun damage, and post-acne pigmentation',
      'Multi-peptides repair and reinforce compromised lipid barriers',
      'Calms facial redness and sensitivity with Allantoin & Panthenol',
      'Promotes a smoother, firmer, and more radiant complexion'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Niacinamide (Vitamin B3)', concentration: '10.0%' },
      { name: 'Zinc PCA', concentration: '1.0%' },
      { name: 'Tranexamic Acid', concentration: 'Active' },
      { name: 'Multi-Peptide Complex (Tetrapeptide-1 & 7)', concentration: 'Peptides' },
      { name: 'Allantoin & Panthenol (Pro-Vitamin B5)', concentration: 'Soothing' },
      { name: 'Hyaluronic Acid', concentration: 'Hydrating' }
    ]),
    inci_full: 'Purified Water, Niacinamide (Vitamin B3 10%), Zinc PCA, Tranexamic Acid, Allantoin, Sodium Hyaluronate, Panthenol (Pro-Vitamin B5), Tocopheryl Acetate (Vitamin E), Tetrapeptide-1, Tetrapeptide-7, Camellia Sinensis (Green Tea) Leaf Extract, Aloe Barbadensis Leaf Extract, Glycerin, Butylene Glycol, Phenoxyethanol, Ethylhexylglycerin.',
    usage_instructions: 'Apply 2–3 drops onto clean, dry face morning and evening. Gently press and pat into skin until fully absorbed. Follow with moisturizer and sunscreen during the day.',
    image_url: '/assets/images/cderma-niacin-c-serum.jpg',
    is_featured: 1,
    sort_order: 2,
    status: 'active'
  },
  {
    slug: 'alpha-c-serum',
    title: '2% Alpha Arbutin + 1% Kojic Acid Serum with Multi-Peptides (Alpha C Serum)',
    subtitle: 'Spotless Glow, Scientifically Proven • 2% Alpha Arbutin + 1% Kojic Acid',
    category: 'Corrective Treatments',
    volume: '30 ml / 1.01 fl. oz.',
    price_npr: 2250,
    clinical_badge: 'Dermatologically Tested • Pigmentation Care',
    summary: 'A potent clinical brightening formula with 2% Alpha Arbutin, 1% Kojic Acid, Glycolic Acid, and Multi-Peptides to fade stubborn dark spots, sun spots, melasma, and discoloration.',
    description: 'Our 2% Alpha Arbutin + 1% Kojic Acid Serum with Multi-Peptides is a powerful skin-brightening formula designed to fade dark spots, even skin tone, and give you a radiant complexion. Alpha Arbutin gently reduces pigmentation by inhibiting tyrosinase, Kojic Acid targets stubborn marks and discoloration, while Multi-Peptides help strengthen and repair the skin barrier.',
    key_benefits: JSON.stringify([
      'Fades hyperpigmentation, stubborn sun spots, and acne scars',
      'Inhibits melanin overproduction for an even, luminous skin tone',
      'Multi-peptides rebuild dermal elasticity and structural strength',
      'Lightweight, fast-absorbing water-based texture with zero grease',
      'Enriched with Ceramides, Hyaluronic Acid, and Glycolic Acid'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Alpha Arbutin', concentration: '2.0%' },
      { name: 'Kojic Acid', concentration: '1.0%' },
      { name: 'Ceramide Complex (NP)', concentration: 'Bio-Identical' },
      { name: 'Multi-Peptide Blend (Tetrapeptide-1 & 7)', concentration: 'Active' },
      { name: 'Glycolic Acid', concentration: 'Micro-Dosed' },
      { name: 'Allantoin & Panthenol', concentration: 'Soothing' }
    ]),
    inci_full: 'Purified Water, Alpha Arbutin (2%), Kojic Acid (1%), Ceramide NP, Sodium Hyaluronate, Glycolic Acid, Tocopheryl Acetate (Vitamin E), Tetrapeptide-1, Tetrapeptide-7, Camellia Sinensis (Green Tea) Leaf Extract, Aloe Barbadensis Leaf Extract, Allantoin, Panthenol, Glycerin, Butylene Glycol, Phenoxyethanol, Ethylhexylglycerin.',
    usage_instructions: 'Apply 2–3 drops to clean, dry skin once or twice daily, preferably before moisturizing. Gently press into areas of hyperpigmentation and across entire face. Follow with SPF in the morning.',
    image_url: '/assets/images/cderma-alpha-c-serum.jpg',
    is_featured: 1,
    sort_order: 3,
    status: 'active'
  },
  {
    slug: 'azelyx-c-serum',
    title: '10% Azelaic Acid Serum with Multi-Peptides (Azelyx C Serum)',
    subtitle: 'Your Daily Dose of Skin Clarity • 10% Azelaic Acid + Squalane + Ceramides',
    category: 'Corrective Treatments',
    volume: '30 ml / 1.01 fl. oz.',
    price_npr: 2150,
    clinical_badge: 'Dermatologically Tested • Fragrance-Free',
    summary: 'A gentle yet powerful multi-tasking serum powered by 10% Azelaic Acid, Multi-Peptides, Squalane, and Ceramides to unclog pores, soothe rosacea/redness, and clear post-acne blemishes.',
    description: 'Our 10% Azelaic Acid Serum with Multi-Peptides is a gentle yet powerful formula designed to calm irritation, fight blemishes, and fade dark spots. Azelaic Acid works to unclog pores, reduce redness, and even skin tone, while Multi-Peptides help repair and strengthen the skin barrier for a healthier complexion. Ideal for sensitive, acne-prone, or rosacea-prone skin.',
    key_benefits: JSON.stringify([
      'Clears active blemishes, blackheads, and unclogs congested pores',
      'Soothes facial redness, skin irritation, and rosacea symptoms',
      'Fades post-acne marks, hyperpigmentation, and uneven tone',
      'Multi-peptides and Ceramides rebuild and reinforce weakened barriers',
      'Fragrance-free, non-comedogenic, lightweight comfort for reactive skin'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Azelaic Acid', concentration: '10.0%' },
      { name: 'Plant-Derived Squalane', concentration: 'Pure' },
      { name: 'Ceramide Complex (NP)', concentration: 'Bio-Identical' },
      { name: 'Multi-Peptide Blend (Tetrapeptide-1 & 7)', concentration: 'Active' },
      { name: 'Salicylic Acid (BHA)', concentration: 'Micro-Dosed' },
      { name: 'Allantoin & Aloe Vera Extract', concentration: 'Botanical' }
    ]),
    inci_full: 'Purified Water, Azelaic Acid (10%), Niacinamide, Ceramide NP, Allantoin, Plant Squalane, Salicylic Acid, Tocopheryl Acetate (Vitamin E), Tetrapeptide-1, Tetrapeptide-7, Camellia Sinensis (Green Tea) Leaf Extract, Aloe Barbadensis Leaf Extract, Glycerin, Butylene Glycol, Polyacrylate Crosspolymer-6, Phenoxyethanol, Ethylhexylglycerin.',
    usage_instructions: 'Apply a pea-sized amount to clean, dry skin once or twice daily. Smooth over entire face or target areas prone to blemishes and redness. Follow with moisturizer and SPF during the day.',
    image_url: '/assets/images/cderma-azelyx-c-serum.jpg',
    is_featured: 1,
    sort_order: 4,
    status: 'active'
  },
  {
    slug: 'coco-c-oil',
    title: 'Coco C Oil — Extra Virgin Cold-Pressed Coconut Oil',
    subtitle: 'Cold-Pressed Goodness, Everyday Wellness • 100% Pure & Natural',
    category: 'Hydration',
    volume: '200 gm / 7.05 oz',
    price_npr: 950,
    clinical_badge: '100% Pure & Natural • Cold-Pressed',
    summary: '100% pure, unrefined cold-pressed extra virgin coconut oil for hair, face, and body. Packed with essential medium-chain fatty acids (Lauric acid) and natural antioxidants for everyday wellness.',
    description: 'Our Extra Virgin Coconut Oil is 100% pure, cold-pressed, and unrefined to retain all its natural goodness. Packed with essential fatty acids, antioxidants, and vitamins, this multipurpose oil deeply nourishes skin, strengthens hair, and supports overall wellness. Its light texture and natural aroma make it ideal for daily head-to-toe care with zero parabens or mineral oil.',
    key_benefits: JSON.stringify([
      'Strengthens hair roots & visibly reduces hair fall',
      'Deeply nourishes dry skin, rough patches, and cracked barrier areas',
      'Supports healthy scalp balance and soothing multi-purpose care',
      'Zero mineral oil, zero parabens, zero artificial fragrance',
      '100% cold-pressed and unrefined to preserve natural bioactive nutrients'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Pure Extra Virgin Coconut Oil (Cocos Nucifera)', concentration: '100%' },
      { name: 'Natural Lauric Acid (MCFA)', concentration: 'High-Density' },
      { name: 'Natural Vitamin E (Tocopherol)', concentration: 'Antioxidant' },
      { name: 'Caprylic & Capric Fatty Acids', concentration: 'Essential' }
    ]),
    inci_full: '100% Pure Cocos Nucifera (Extra Virgin Coconut) Oil. Cold-pressed, unrefined, zero mineral oil, zero parabens, zero synthetic fragrance.',
    usage_instructions: 'For Hair: Warm a small amount between palms and massage gently into scalp and hair strands. Leave on for at least 30 minutes before washing, or use overnight for deep conditioning. For Skin: Apply generously onto damp skin, elbows, knees, or face as a nourishing natural moisturizer after bathing.',
    image_url: '/assets/images/cderma-coco-c-oil.jpg',
    is_featured: 0,
    sort_order: 5,
    status: 'active'
  },
  {
    slug: 'moistin-c-moisturiser',
    title: 'Moistin C Moisturiser',
    subtitle: 'Ultra-Hydrating Moisturising Cream with Hyaluronic Acid & Ceramides',
    category: 'Hydration & Barrier Care',
    volume: '50 g',
    price_npr: 1950,
    clinical_badge: 'Deep Barrier Hydration',
    summary: 'For soft, healthy, radiant skin. Rich, non-greasy daily barrier cream that locks in moisture and guards against everyday dryness.',
    description: 'cDerma Moistin C Moisturiser is a daily hydrating cream developed to fortify the skin barrier and protect against dry climate conditions. Combining multi-weight Hyaluronic Acid with bio-identical Ceramide NP and soothing glycerin, it provides long-lasting, non-sticky hydration that leaves skin soft, calm, and radiant.',
    key_benefits: JSON.stringify([
      'Provides all-day deep hydration without heaviness or greasy residue',
      'Fortifies the skin barrier with essential ceramides to prevent moisture loss',
      'Leaves skin feeling soft, soothed, calm, and supple in all seasons'
    ]),
    active_ingredients: JSON.stringify([
      { name: 'Multi-Weight Hyaluronic Acid', concentration: '1.5%' },
      { name: 'Ceramide NP', concentration: '1.0%' },
      { name: 'Glycerin & Panthenol', concentration: '5.0%' }
    ]),
    inci_full: 'Aqua, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Sodium Hyaluronate, Panthenol, Butyrospermum Parkii Butter, Carbomer, Phenoxyethanol, Ethylhexylglycerin.',
    usage_instructions: 'Smooth a nickel-sized amount evenly over face and neck morning and evening as the final hydration step.',
    image_url: '/assets/images/product-packaging-dropper.png',
    is_featured: 0,
    sort_order: 6,
    status: 'active'
  },
  {
    slug: 'centella-barrier-restore-concentrate',
    title: 'Centella Barrier Restore Concentrate',
    subtitle: 'Flagship Face Care • 5% Multi-Ceramides + Sub-Alpine Centella',
    category: 'Barrier Repair',
    volume: '30 ml / 1.0 fl. oz.',
    price_npr: 3200,
    clinical_badge: 'Clinical Trial Verified',
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
    image_url: '/assets/images/product-packaging-dropper.png',
    is_featured: 0,
    sort_order: 7,
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
    image_url: '/assets/images/texture-swatch.png',
    is_featured: 0,
    sort_order: 8,
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
    inci_full: 'Aqua, Sodium Cocoyl Apple Amino Acids, Cocamidopropyl Betaine, Glycerin, Panthenol, Allantoin, Citric Acid, Sodium Benzoate, Potassium Sorbate.',
    usage_instructions: 'Lather a nickel-sized amount with lukewarm water in damp hands. Gently massage in circular motions across face for 60 seconds, then rinse thoroughly.',
    image_url: '/assets/images/cleanroom-lab-wide.png',
    is_featured: 0,
    sort_order: 9,
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
    image_url: '/assets/images/img_c732d632f5b9.jpg',
    is_featured: 0,
    sort_order: 10,
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
    image_url: '/assets/images/img_0230de97bf1f.jpg',
    is_featured: 0,
    sort_order: 11,
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
    image_url: '/assets/images/img_b3152a53b5c7.jpg',
    is_featured: 0,
    sort_order: 12,
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
    phone: '+977 9714547121',
    email: 'dispensary.ktm@cdermanepal.com',
    lead_doctor: 'Dr. A. Karki, MD Dermatology',
    doctor_nmc: 'NMC #9482 • Senior Consultant',
    doctor_image: '/assets/images/img_204637447def.jpg',
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
    doctor_image: '/assets/images/img_b7a64c067655.jpg',
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
    doctor_image: '/assets/images/img_d8dddc0fbb21.jpg',
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
    doctor_image: '/assets/images/dr-karki-portrait.png',
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
    doctor_image: '/assets/images/img_2bb12128dd04.jpg',
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
    phone: '+977 9714547121',
    email: 'itahari.store@cdermanepal.com',
    lead_doctor: 'Kavita Rai, Clinical Aesthetician',
    doctor_nmc: 'Certified Skin Practitioner',
    doctor_image: '/assets/images/radiant-skin-model.png',
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
    doctor_image: '/assets/images/img_204637447def.jpg',
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
    image_url: '/assets/images/img_7df877252467.jpg',
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
    image_url: '/assets/images/img_c0ee769d1620.jpg',
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
    image_url: '/assets/images/img_50a641f5031c.jpg',
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
    image_url: '/assets/images/img_b7a64c067655.jpg',
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
    image_url: '/assets/images/img_282f9d7b4a1e.jpg',
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
    image_url: '/assets/images/img_5db7864f4a5c.jpg',
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
    image_url: '/assets/images/img_282f9d7b4a1e.jpg',
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
    image_url: '/assets/images/img_d04f5fd68ff7.jpg',
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
    image_url: '/assets/images/texture-swatch.png',
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
    image_url: '/assets/images/img_63acd4dd2bb8.jpg',
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
    image_url: '/assets/images/img_37f37477611e.jpg',
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

// Attach value_ne to defaultSettings (preserving any inlined value_ne)
defaultSettings.forEach(s => {
  s.value_ne = settingsNepali[s.key] || s.value_ne || '';
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
