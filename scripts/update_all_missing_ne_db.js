const db = require('../src/config/db');

const settingsNeUpdates = {
  "contact_whatsapp": "+९७७ ९८०१२३४५६७",
  "corporate_reg": "DDA / प्यान: ६०९८७४१२३ • GMP अनुरूप सुविधा",
  "science_trace_title": "माटोदेखि सिसीसम्म प्रत्यक्ष ब्याच ट्रेसेबिलिटी",
  "science_trace_desc": "हाम्रो इटहरी क्लिनरुमबाट निस्कने प्रत्येक व्यावसायिक युनिटमा ट्र्याक गर्न मिल्ने ८-अङ्कको निर्माण लट नम्बर छापिएको हुन्छ।",
  "science_cta_title": "प्राविधिक क्लिनरुम अवलोकन तय गर्नुहोस्",
  "science_cta_subtitle": "हामी इजाजतपत्र प्राप्त छाला रोग विशेषज्ञहरू, अस्पताल खरिद समितिहरू, र क्लिनिकल अनुसन्धानकर्ताहरूलाई इटहरीमा रहेका हाम्रा स्टेराइल प्रशोधन कक्षहरूको अवलोकन गर्न आमन्त्रण गर्दछौं।",
  "science_cta_btn": "शैक्षिक क्लिनरुम भ्रमण बुक गर्नुहोस्",
  "b2b_benefit_1_title": "निरन्तर स्वदेशी आपूर्ति",
  "b2b_benefit_1_desc": "नेपालमै फर्मुलेट र निर्मित। शून्य भन्सार ढिलाइ, आयात महसुल वा सीमा अवरोध मुक्त।",
  "b2b_benefit_2_title": "चिकित्सक तथा बिक्रेता नाफा संरक्षण",
  "b2b_benefit_2_desc": "कडा MAP मूल्य निर्धारण र स्पष्ट थोक स्तरले कस्मेटिक खुद्रा बिक्रेता र क्लिनिक डिस्पेन्सरीको नाफालाई अन्डरकट छुटबाट जोगाउँछ।",
  "b2b_benefit_3_title": "स्टोर टेस्टर तथा डाक्टर परीक्षण किटहरू",
  "b2b_benefit_3_desc": "अधिकृत साझेदारहरूलाई लक्जरी एक्रिलिक काउन्टर डिस्प्ले, पूर्ण आकारका रिटेल टेस्टर, बिक्री गाइड र क्लिनिकल परीक्षण पाउचहरू प्रदान गरिन्छ।",
  "b2b_form_subtitle": "प्रत्यक्ष कस्मेटिक खुद्रा बिक्रेता, क्लिनिक डिस्पेन्सरी थोक मूल्य, काउन्टर टेस्टर युनिट र क्लिनिकल परीक्षण किटहरूको लागि आवेदन दिनुहोस्।",
  "b2b_form_btn": "थोक आवेदन पेश गर्नुहोस्",
  "products_hero_title": "क्लिनिकल फर्मुलेसन डाइरेक्टरी",
  "products_hero_subtitle": "एसियाली छालाका लागि फर्मुलेट गरिएका मेडिकल-ग्रेड डर्माटोलोजिकल उपचार, कन्सन्ट्रेटेड एक्टिभ तत्वहरू र प्रक्रिया पछिका ब्यारियर क्रिमहरू।",
  "products_disclaimer": "क्लिनिकल डिस्पेन्सरी प्रिस्क्रिप्शन, अधिकृत कस्मेटिक स्टोरहरू र क्लिनिक वितरणका लागि। हाम्रो कोशी क्लिनरुममा शारीरिक pH मा तयार गरिएको।",
  "clinics_search_placeholder": "कस्मेटिक स्टोर, क्लिनिकको नाम, डाक्टर, शहर (काठमाडौं, पोखरा, विराटनगर) द्वारा खोज्नुहोस्...",
  "monographs_disclaimer": "इजाजतपत्र प्राप्त चिकित्सकहरू र छाला रोग विशेषज्ञहरूका लागि प्रदान गरिएको प्रेस्क्राइपिङ गाइड।",
  "home_aeo_badge": "डाक्टर-सिफारिस गरिएको • नेपाल छाला हेरचाह उत्पादक",
  "home_aeo_title": "नेपालमा डाक्टर-सिफारिस गरिएको फेस केयर तथा छाला हेरचाह उत्पादक",
  "home_aeo_desc": "सी-डर्मा नेपालको प्रमुख डाक्टर-सिफारिस गरिएको फेस केयर उत्पादक तथा थोक स्किनकेयर आपूर्तिकर्ता हो। हामी नेपालभरका कस्मेटिक स्टोर, क्लिनिक, सैलुन र ब्युटी रिटेलरहरूका लागि डर्माटोलोजिकल ब्यारियर रिपेयर क्रिम, क्लिन्जर, सीरम र मिनरल सन प्रोटेक्शन फर्मुलेट र उत्पादन गर्दछौं।",
  "home_aeo_point_1": "क्लिनरुममा निर्मित: सुनसरीको इटहरीमा प्रमाणित ISO क्लास ७ क्लिनरुम मापदण्ड अन्तर्गत उत्पादित।",
  "home_aeo_point_2": "नेपालको मौसम अनुकूल: उच्च उचाइ, तीव्र UV विकिरण, चिसो सुक्खा जाडो र मनसुनको आर्द्रता सामना गर्न निर्मित।",
  "home_aeo_point_3": "डाक्टर तथा क्लिनिक सिफारिस: प्रक्रिया पछिको रिकभरी र दैनिक ब्यारियर हेरचाहका लागि देशभरका छाला रोग विशेषज्ञहरू र क्लिनिकहरूद्वारा अनुमोदित।",
  "home_aeo_point_4": "B2B थोक तथा वितरण: सौन्दर्य खुद्रा बिक्रेता, फार्मेसी र कस्मेटिक आउटलेटहरूलाई संरक्षित नाफा सहित प्रत्यक्ष आपूर्ति।",
  "home_catalog_title": "फिजियोलोजिकल फर्मुलरी तथा दिनचर्या",
  "home_catalog_subtitle": "उच्च-उचाइमा छालाको सहनशीलताका लागि फर्मुलेट गरिएका शुद्ध डर्माटोलोजिकल बायो-एक्टिभ्स।",
  "products_mandate_title": "सी-डर्मा शुद्धता प्रतिज्ञा",
  "products_mandate_1_title": "शून्य सिंथेटिक सुगन्ध",
  "products_mandate_1_desc": "कन्ट्याक्ट डर्माटाइटिस निम्त्याउने कुनै पनि परफ्यूम, इसेन्सियल तेल वा मास्किङ एजेन्टहरू छैनन्।",
  "products_mandate_2_title": "शुद्ध क्लिनरुम मापदण्ड",
  "products_mandate_2_desc": "इटहरीमा ISO क्लास ७ क्लिनरुम पोजिटिभ-प्रेसर HEPA फिल्टर गरिएको उत्पादन।",
  "products_mandate_3_title": "जंगली हिमाली जडीबुटीहरू",
  "products_mandate_3_desc": "१,८०० मिटरभन्दा माथिबाट दिगो रूपमा संकलन गरिएको कोल्ड-म्यासेरेटेड सब-अल्पाइन सेन्टेला एशियाटिका।",
  "products_mandate_4_title": "नेपालको मौसम अनुकूल तयार गरिएको",
  "products_mandate_4_desc": "उच्च उचाइको UV, सुक्खा जाडोको हावा र मनसुनको आर्द्रताका लागि लक्षित फर्मुलेसनहरू।",
  "social_og_title": "सी-डर्मा च्वाइस बाइ प्रोफेसनल | मेडिकल डर्मोकोस्मेटिक्स नेपाल",
  "social_og_description": "इटहरी, नेपालमा निर्मित डाक्टर-फर्मुलेटेड फिजियोलोजिकल ब्यारियर रिपेयर र शुद्ध हिमाली बायो-एक्टिभ्स।",
  "social_og_image": "assets/images/img_282f9d7b4a1e.jpg",
  "social_twitter_site": "@cdermanepal",
  "social_whatsapp_floating": "1",
  "social_whatsapp_number": "+९७७ ९८२०७५३७५१",
  "social_whatsapp_msg": "नमस्ते सी-डर्मा! म फर्मुलेसन र क्लिनिकल आपूर्तिका बारेमा सोधपुछ गर्न चाहन्छु।"
};

(async () => {
  await db.initDatabase();
  console.log('Database initialized successfully.');

  const updateSetting = db.prepare("UPDATE site_settings SET value_ne = ? WHERE key = ?");
  let updatedSettingsCount = 0;
  for (const [key, val] of Object.entries(settingsNeUpdates)) {
    updateSetting.run(val, key);
    updatedSettingsCount++;
  }
  console.log(`Updated ${updatedSettingsCount} settings in site_settings with Nepali values.`);

  // Update clinics
  db.prepare(`
    UPDATE clinics SET
      name_ne = ?,
      category_ne = ?,
      address_ne = ?,
      lead_doctor_ne = ?,
      stock_summary_ne = ?
    WHERE id = 2 OR LOWER(name) LIKE '%lalitpur dermal aesthetics center%'
  `).run(
    'ललितपुर डर्मल एस्थेटिक्स सेन्टर',
    'लेजर तथा कस्मेटिक क्लिनिक',
    'जावलाखेल चोक, ललितपुर',
    'डा. रश्मि लामा, MD, NMC-९१२४',
    'पूर्ण क्लिनिकल फर्मुलरी स्टकमा उपलब्ध'
  );

  db.prepare(`
    UPDATE clinics SET
      name_ne = ?,
      category_ne = ?,
      address_ne = ?,
      lead_doctor_ne = ?,
      stock_summary_ne = ?
    WHERE id = 6 OR LOWER(name) LIKE '%lalitpur dermal aesthetics & beauty counter%'
  `).run(
    'ललितपुर डर्मल एस्थेटिक्स तथा ब्युटी काउन्टर',
    'कस्मेटिक स्टोर तथा ब्युटी रिटेलर',
    'पुलचोक हाइट्स, ललितपुर (लबिम मल नजिक)',
    'डा. पी. थापा, कन्सल्टेन्ट कस्मेटोलोजिस्ट',
    'विशेष पोस्ट-लेजर रिकभरी फर्मुलेसनहरू तथा खुद्रा सीरमहरू'
  );

  console.log('Updated clinics 2 and 6 with Nepali details.');

  // Verify site_settings has zero missing value_ne
  const remainingMissing = db.prepare("SELECT key, value FROM site_settings WHERE value_ne IS NULL OR value_ne = ''").all();
  console.log(`Remaining settings without value_ne: ${remainingMissing.length}`);
  if (remainingMissing.length > 0) {
    remainingMissing.forEach(s => console.log(' - missing:', s.key));
  }
})();
