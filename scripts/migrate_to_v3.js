/**
 * Migration script: cDerma Premium Website Upgrade Plan - Version 3
 * Replaces fictional products with the 5 authentic products from V3 plan:
 * 1. Coco C Oil
 * 2. Alpha C Serum
 * 3. Niacin C Serum
 * 4. Retin C Serum
 * 5. Moistin C Moisturiser
 *
 * Removes unapproved doctor endorsements, fake testimonials, and unverified clinical percentages.
 * Sets approved brand settings and copy from Version 3 specification.
 */

const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

async function runMigration() {
  const SQL = await initSqlJs();
  const dbPath = path.join(__dirname, '../database.sqlite');
  const dbData = fs.readFileSync(dbPath);
  const db = new SQL.Database(dbData);

  console.log('--- Migrating Database to V3 Specification ---');

  // 1. Clear existing products and insert the 5 authentic cDerma products
  db.run('DELETE FROM products');

  const products = [
    {
      id: 1,
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
      description_ne: 'सिडर्मा कोको सी तेल दैनिक छाला र कपालको हेरचाहका लागि १००% शुद्ध र कोल्ड-प्रेस्ड एक्स्ट्रा भर्जिन नरिवल तेल हो। यसले छालालाई गहिरो मोइस्चर प्रदान गर्दछ र प्राकृतिक पोषण दिन्छ।',
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
      usage_instructions_ne: 'हत्केलामा थोरै तेल लिएर सफा छाला वा कपालमा हलुका मसाज गर्नुहोस्। दैनिक बिहान वा साँझ प्रयोग गर्न सकिन्छ।',
      image_url: 'assets/images/photoshoot-3063.jpg',
      is_featured: 1,
      sort_order: 1,
      status: 'active'
    },
    {
      id: 2,
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
      description_ne: 'अल्फा सी सिरम २% अल्फा आर्बुटिन, १% कोजिक एसिड र मल्टि-पेप्टाइड्सले बनेको हल्का सिरम हो जसले कालो दाग र असमान टोनलाई हलुका बनाउँछ।',
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
      usage_instructions_ne: 'सफा र सुख्खा अनुहारमा ३-४ थोपा बिहान र बेलुका क्रिम लगाउनुअघि लगाउनुहोस्। बिहान सनस्क्रिन अवश्य प्रयोग गर्नुहोस्।',
      image_url: 'assets/images/photoshoot-3120.jpg',
      is_featured: 1,
      sort_order: 2,
      status: 'active'
    },
    {
      id: 3,
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
      description_ne: '१०% नायसिनामाइड र जिंक पीसीएले बनेको नायसिन सी सिरमले अतिरिक्त तेल नियन्त्रण गर्छ, ठूला छिद्रहरू घटाउँछ र छालालाई शान्त राख्छ।',
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
      usage_instructions_ne: 'बिहान र बेलुकी अनुहारमा २-३ थोपा लगाएर हलुका थपथपाउनुहोस्। त्यसपछि मोइस्चराइजर प्रयोग गर्नुहोस्।',
      image_url: 'assets/images/photoshoot-3093.jpg',
      is_featured: 1,
      sort_order: 3,
      status: 'active'
    },
    {
      id: 4,
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
      summary_ne: 'नरम र जवान देखिने छालाको लागि। ०.२% रेटिनोल र पेप्टाइड्सले छालाको सतहलाई नयाँ, चम्किलो र स्वस्थ बनाउँछ।',
      description: 'cDerma Retin C Serum brings a gentle, thoughtfully calibrated 0.2% retinol concentration paired with nourishing peptides and squalane. It gently encourages natural cell turnover to soften early fine lines, refine uneven texture, and reveal smooth, refreshed skin with minimal irritation.',
      description_ne: 'रेटिन सी सिरमले कोमल ०.२% रेटिनोल र पेप्टाइड्सको सहयोगले छालाको प्राकृतिक कोष नवीकरणलाई गति दिन्छ र छालालाई कोमल बनाउँछ।',
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
      usage_instructions_ne: 'बेलुकी मात्र २-३ थोपा सफा र सुख्खा अनुहारमा लगाउनुहोस्। सुरुमा हप्तामा २-३ पटक मात्र प्रयोग गर्नुहोस्। दिउँसो सनस्क्रिन अनिवार्य लगाउनुहोस्।',
      image_url: 'assets/images/photoshoot-3063.jpg',
      is_featured: 1,
      sort_order: 4,
      status: 'active'
    },
    {
      id: 5,
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
      summary_ne: 'नरम, स्वस्थ र चम्किलो छालाको लागि। सुख्खापनबाट बचाउने र छालालाई दिनभर मोइस्चराइज्ड राख्ने नन-ग्रेसी दैनिक क्रिम।',
      description: 'cDerma Moistin C Moisturiser is a daily hydrating cream developed to fortify the skin barrier and protect against dry climate conditions. Combining multi-weight Hyaluronic Acid with bio-identical Ceramide NP and soothing glycerin, it provides long-lasting, non-sticky hydration that leaves skin soft, calm, and radiant.',
      description_ne: 'मोइस्टिन सी मोइस्चराइजर छालाको प्राकृतिक सुरक्षा तहलाई बलियो बनाउन र दिनभर नरम राख्न तयार गरिएको दैनिक क्रिम हो।',
      key_benefits: JSON.stringify([
        'Provides all-day deep hydration without heaviness or greasy residue',
        'Fortifies the skin barrier with essential ceramides to prevent moisture loss',
        'Leaves skin feeling soft, soothed, calm, and supple in all seasons'
      ]),
      key_benefits_ne: JSON.stringify([
        'कुनै चिपचिपाहट बिना दिनभर गहिरो ओस र हाइड्रेशन दिन्छ',
        'सेरामाइड्सले छालाको सुरक्षा तहलाई बलियो र सुरक्षित बनाउँछ',
        'हरेक मौसममा छालालाई नरम, स्वस्थ र चम्किलो राख्छ'
      ]),
      active_ingredients: JSON.stringify([
        { name: 'Multi-Weight Hyaluronic Acid', concentration: '1.5%', role: 'Draws moisture deep into epidermal layers' },
        { name: 'Ceramide NP', concentration: '1.0%', role: 'Restores and strengthens lipid barrier matrix' },
        { name: 'Glycerin & Panthenol', concentration: '5.0%', role: 'Prevents transepidermal dryness and soothes skin' }
      ]),
      inci_full: 'Aqua, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Sodium Hyaluronate, Panthenol, Butyrospermum Parkii Butter, Carbomer, Phenoxyethanol, Ethylhexylglycerin.',
      usage_instructions: 'Smooth a nickel-sized amount evenly over face and neck morning and evening as the final hydration step.',
      usage_instructions_ne: 'बिहान र बेलुकी आवश्यक मात्रामा अनुहार र घाँटीमा हलुका मसाज गर्नुहोस्। दैनिक प्रयोगका लागि उत्तम।',
      image_url: 'assets/images/photoshoot-3163.jpg',
      is_featured: 1,
      sort_order: 5,
      status: 'active'
    }
  ];

  for (const p of products) {
    db.run(
      `INSERT INTO products (
        id, slug, title, title_ne, subtitle, subtitle_ne, category, category_ne,
        volume, price_npr, clinical_badge, clinical_badge_ne, summary, summary_ne,
        description, description_ne, key_benefits, key_benefits_ne, active_ingredients,
        inci_full, usage_instructions, usage_instructions_ne, image_url, is_featured, sort_order, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        p.id, p.slug, p.title, p.title_ne, p.subtitle, p.subtitle_ne, p.category, p.category_ne,
        p.volume, p.price_npr, p.clinical_badge, p.clinical_badge_ne, p.summary, p.summary_ne,
        p.description, p.description_ne, p.key_benefits, p.key_benefits_ne, p.active_ingredients,
        p.inci_full, p.usage_instructions, p.usage_instructions_ne, p.image_url, p.is_featured, p.sort_order, p.status
      ]
    );
  }
  console.log(`Inserted ${products.length} authentic cDerma products.`);

  // 2. Update site_settings table with Version 3 directives
  const settingsToUpsert = [
    { key: 'brand_name', value: 'cDerma', value_ne: 'सिडर्मा' },
    { key: 'brand_tagline', value: 'Skin Science. Professional Care.', value_ne: 'छाला विज्ञान। व्यावसायिक हेरचाह।' },
    { key: 'hero_title', value: 'Science-led skincare for healthier skin.', value_ne: 'स्वस्थ छालाका लागि विज्ञान-सम्मत छाला हेरचाह।' },
    { key: 'hero_subtitle', value: 'Thoughtfully formulated with a professional approach.', value_ne: 'व्यावसायिक दृष्टिकोणका साथ सोचविचारपूर्वक तयार गरिएको।' },
    { key: 'hero_badge', value: 'cDerma | SKIN SCIENCE', value_ne: 'सिडर्मा | स्किन साइन्स' },
    { key: 'hero_cta_primary', value: 'Explore Our Products', value_ne: 'हाम्रा उत्पादनहरू हेर्नुहोस्' },
    { key: 'hero_cta_secondary', value: 'For Professionals', value_ne: 'स्वास्थ्यकर्मी तथा क्लिनिकका लागि' },
    { key: 'why_title', value: 'Why cDerma', value_ne: 'सिडर्मा किन?' },
    { key: 'why_pillar_1_title', value: 'Science-Based Approach', value_ne: 'विज्ञानमा आधारित दृष्टिकोण' },
    { key: 'why_pillar_1_desc', value: 'Formulations built around purposeful ingredients.', value_ne: 'उद्देश्यपूर्ण र प्रभावकारी तत्वहरूका आधारमा निर्मित फर्मुलेसन।' },
    { key: 'why_pillar_2_title', value: 'Quality Focused', value_ne: 'गुणस्तरमा केन्द्रित' },
    { key: 'why_pillar_2_desc', value: 'Product quality and thoughtful formulation at the centre.', value_ne: 'उत्पादन गुणस्तर र विचारशील फर्मुलेसन हाम्रो केन्द्रमा।' },
    { key: 'why_pillar_3_title', value: 'Professional Approach', value_ne: 'व्यावसायिक दृष्टिकोण' },
    { key: 'why_pillar_3_desc', value: 'Designed around modern skincare needs.', value_ne: 'आधुनिक छालाको वास्तविक आवश्यकतालाई मध्यनजर गरी डिजाइन गरिएको।' },
    { key: 'products_heading', value: 'Simple Solutions for Healthier Skin.', value_ne: 'स्वस्थ छालाका लागि सरल समाधानहरू।' },
    { key: 'products_subheading', value: 'Show only current, real cDerma products with original packaging.', value_ne: 'मौलिक प्याकेजिङका साथ सक्कली सिडर्मा उत्पादनहरू।' },
    { key: 'concerns_heading', value: 'Find Care by Skin Concern.', value_ne: 'छालाको समस्या अनुसार हेरचाह रोज्नुहोस्।' },
    { key: 'pro_heading', value: 'Partnering for Better Skin Care.', value_ne: 'उत्कृष्ट छाला हेरचाहका लागि साझेदारी।' },
    { key: 'pro_desc', value: 'Clear product information and professional support for dermatologists, clinics, pharmacies and other healthcare professionals.', value_ne: 'छाला रोग विशेषज्ञ, क्लिनिक, फार्मेसी र स्वास्थ्यकर्मीहरूका लागि स्पष्ट उत्पादन जानकारी र व्यावसायिक सहयोग।' },
    { key: 'pro_cta', value: 'Professional Enquiry', value_ne: 'व्यावसायिक सोधपुछ' },
    { key: 'about_heading', value: 'Science-Led Skincare. Professional Approach.', value_ne: 'विज्ञान-सम्मत छाला हेरचाह। व्यावसायिक दृष्टिकोण।' },
    { key: 'about_text_1', value: 'cDerma is a dermatology-focused skincare brand by K&K Trading Concern, created to provide thoughtful, science-led skincare solutions for common and challenging skin concerns.', value_ne: 'सिडर्मा के एण्ड के ट्रेडिङ कन्सर्नको एक डर्माटोलोजी-केन्द्रित ब्रान्ड हो, जसले सामान्य तथा जटिल छाला समस्याहरूको लागि विज्ञान-सम्मत समाधान प्रदान गर्दछ।' },
    { key: 'about_text_2', value: 'Our formulations are developed with a strong focus on active ingredients, skin compatibility and practical dermatological care. We aim to provide products that can complement the skincare approach of dermatologists and other healthcare professionals while remaining simple and understandable for consumers.', value_ne: 'हाम्रा फर्मुलेसनहरू सक्रिय तत्व, छाला अनुकूलता र व्यावहारिक डर्माटोलोजिकल हेरचाहमा ध्यान दिएर विकास गरिन्छ।' },
    { key: 'about_text_3', value: 'From acne and pigmentation to sensitive skin, hydration, skin-barrier support and sun protection, cDerma focuses on solutions designed around real skincare needs.', value_ne: 'डण्डीफोर र पिग्मेन्टेसनदेखि संवेदनशील छाला, हाइड्रेशन, ब्यारियर सुरक्षा र घामबाट बचाउसम्म, सिडर्मा वास्तविक छालाको आवश्यकतामा केन्द्रित छ।' },
    { key: 'about_text_4', value: 'We believe strong dermatological skincare is built on science, quality, transparency and responsible formulation. Our goal is to continuously improve our products through current ingredient knowledge, professional feedback and evolving skincare science.', value_ne: 'हामी विश्वास गर्छौं कि गुणस्तरीय छाला हेरचाह विज्ञान, गुणस्तर, पारदर्शिता र जिम्मेवार फर्मुलेसनमा आधारित हुन्छ।' },
    { key: 'about_text_5', value: 'As cDerma grows in Nepal, we aim to build meaningful relationships with dermatologists, healthcare professionals, clinics and pharmacies, while keeping better skin health at the centre of everything we do.', value_ne: 'नेपालभर विस्तार हुँदै गर्दा, हामी स्वास्थ्यकर्मी, क्लिनिक र फार्मेसीहरूसँग अर्थपूर्ण सम्बन्ध निर्माण गर्दै सबैको छाला स्वास्थ्यलाई प्राथमिकतामा राख्छौं।' },
    { key: 'about_tagline', value: 'cDerma - Skin Science. Professional Care.', value_ne: 'सिडर्मा - स्किन साइन्स। प्रोफेसनल केयर।' }
  ];

  for (const s of settingsToUpsert) {
    db.run(
      `INSERT INTO site_settings (key, value, value_ne, category, label, updated_at)
       VALUES (?, ?, ?, 'V3_Specification', ?, CURRENT_TIMESTAMP)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value, value_ne = excluded.value_ne, updated_at = CURRENT_TIMESTAMP`,
      [s.key, s.value, s.value_ne, s.key]
    );
  }
  console.log(`Upserted ${settingsToUpsert.length} V3 settings.`);

  // Save changes to database.sqlite
  const exported = db.export();
  fs.writeFileSync(dbPath, Buffer.from(exported));
  console.log('Database saved successfully to database.sqlite.');
}

runMigration().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
