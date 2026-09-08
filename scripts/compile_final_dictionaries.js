const fs = require('fs');
const path = require('path');

// Read existing cderma-client.js
const clientJs = fs.readFileSync('assets/js/cderma-client.js', 'utf8');

// Extract current CDERMA_NEPALI_DICTIONARY
const dictMatch = clientJs.match(/const CDERMA_NEPALI_DICTIONARY = \{([\s\S]*?)\n\};/);
const currentDict = eval("({" + dictMatch[1] + "})");

// Extract current CDERMA_NEPALI_HTML
const htmlDictMatch = clientJs.match(/const CDERMA_NEPALI_HTML = \{([\s\S]*?)\n\};/);
const currentHtmlDict = htmlDictMatch ? eval("({" + htmlDictMatch[1] + "})") : {};

const newTranslations = require('../scratch/translated_phrases.json');

const additionalPhrases = {
  // Missing 24 pure paragraphs and long text
  "Every CDerma product balances lipid richness with quick molecular absorption. Notice the distinct difference between our high-potency golden Centella serum and our velvety bio-identical ceramide cream—crafted to lock moisture in high-altitude environments without heaviness.": "सिडर्माका प्रत्येक उत्पादनले लिपिड पोषण र द्रुत अवशोषण बीच सन्तुलन कायम गर्दछ। हाम्रो उच्च-सक्रिय सुनौलो सेन्टेला सिरम र रेशमी बायो-आइडेन्टिकल सेरामाइड क्रिम बीचको भिन्नता अनुभव गर्नुहोस्—जसले कुनै चिपचिपापन बिना उच्च हिमाली वातावरणमा आद्रता सुरक्षित राख्दछ।",
  "Niacinamide 5% + Centella Extract": "५% नियासिनामाइड + सेन्टेला अर्क",
  "Amino Acids + Chamomile Hydrosol": "अमिनो एसिड + क्यामोमाइल हाइड्रोसोल",
  "Tri-Ceramides + Botanical Squalane": "ट्राइ-सेरामाइड्स + बोटानिकल स्क्वालेन",
  "All doctors citing or recommending CDerma are registered under the Nepal Medical Council (NMC). We do not pay for endorsements; practitioners independently evaluate our batch Certificates of Analysis, physiological active percentages, and patient barrier response.": "सिडर्मा सिफारिस गर्ने सबै चिकित्सकहरू नेपाल मेडिकल काउन्सिल (NMC) मा दर्ता हुनुहुन्छ। हामी कुनै सशुल्क विज्ञापन गर्दैनौं; चिकित्सकहरूले हाम्रो ब्याच विश्लेषण प्रमाणपत्र (COA) र बिरामीको नतिजाका आधारमा स्वतन्त्र रूपमा सिफारिस गर्नुहुन्छ।",
  "Yes. We regularly host scheduled audit walkthroughs for registered clinic partners, cosmetic physicians, and official distributors to inspect our cleanrooms, HEPA ventilation protocols, and storage archives in Sunsari.": "हो। हामी दर्ता भएका क्लिनिक साझेदार, चर्मरोग विशेषज्ञ र अधिकृत वितरकहरूका लागि सुनसरीस्थित हाम्रो क्लिनरुम, हेपा भेन्टिलेसन र भण्डारण केन्द्रको नियमित निरीक्षण भ्रमण आयोजना गर्दछौं।",
  "Our products hold a sealed shelf-life of 24 months from manufacture date, and 6 to 12 months after opening (PAO). Our frosted amber glass packaging guards botanical actives from oxidative photodegradation.": "हाम्रा उत्पादनहरूको सिलबन्दी अवस्थामा उत्पादन मितिबाट २४ महिना र खोलेपछि ६ देखि १२ महिना (PAO) सम्म प्रयोग गर्न सकिन्छ। हाम्रो एम्बर ग्लास प्याकेजिङले सक्रिय वनस्पति तत्वहरूलाई घामको किरणबाट जोगाउँछ।",
  "Nepal’s skin concerns are uniquely driven by high altitude ultraviolet exposure, pervasive winter dry spells, and intense summer dust particulate. CDerma formulas prioritize rapid calming with Centella while reinforcing intercellular ceramide bonds without clogging pores.": "नेपालमा उच्च उचाइको कडा घाम, सुख्खा जाडो मौसम र सहरी धुलोले गर्दा छालाका समस्याहरू धेरै देखिन्छन्। सिडर्माका फर्मुलाहरूले छिद्र नथुनी सेन्टेलाद्वारा जलन तुरुन्तै शान्त पार्ने र सेरामाइड जोड्ने कार्यलाई प्राथमिकता दिन्छन्।",
  "CDerma Nepal's flagship clinical formulation for wholesale B2B supply to pharmacies, cosmetic retailers, salons, and dermatology clinics. Manufactured in Itahari featuring 5% ultra-pure Madecassoside, wild alpine Centella Asiatica, and a 3-part bio-identical Ceramide complex (NP, AP, EOP).": "फार्मेसी, कस्मेटिक बिक्रेता, सैलुन तथा क्लिनिकहरूका लागि सिडर्मा नेपालको प्रमुख क्लिनिकल फर्मुलेशन। इटहरीमा उत्पादित यसमा ५% शुद्ध मेडकासोसाइड, हिमाली सेन्टेला र ३ प्रकारका सेरामाइडहरू समावेश छन्।",
  "Professional Retail & Clinical Protocol Standard": "व्यावसायिक खुद्रा तथा क्लिनिकल प्रोटोकल मापदण्ड",
  "Silky golden drops that melt into your skin instantly upon gentle touch.": "रेशमी सुनौला थोपाहरू जसले कोमल स्पर्शमै छालामा तुरुन्तै समाहित हुन्छ।",
  "Aqua (Himalayan Spring Distillate), Niacinamide, Centella Asiatica Leaf Extract, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Sodium Hyaluronate (Multi-Fraction), D-Panthenol, Glycerin (Vegetable), Allantoin, Xanthan Gum, Sodium Lauroyl Lactylate, Carbomer, Phenoxyethanol, Ethylhexylglycerin.": "एक्वा (हिमालयन स्प्रिङ डिस्टिलेट), नियासिनामाइड, सेन्टेला एसियाटिका पातको अर्क, सेरामाइड NP, सेरामाइड AP, सेरामाइड EOP, फाइटोस्फिङ्गोसाइन, कोलेस्ट्रोल, सोडियम हायलुरोनेट, डी-प्यान्थेनोल, ग्लिसरिन, एलान्टोइन, ज्यान्थन गम।",
  "Sun - Fri, 9:00 AM - 6:00 PM NPT": "आइत - शुक्र, बिहान ९:०० - साँझ ६:००",
  "Centella Barrier Restore Concentrate": "सेन्टेला ब्यारियर रिस्टोर कन्सन्ट्रेट",
  "Doctor Grade • Available In Stores & Clinics": "डाक्टर ग्रेड • स्टोर तथा क्लिनिकहरूमा उपलब्ध",
  "Stores & Clinics Across Nepal": "नेपालभरिका स्टोर तथा क्लिनिकहरू",
  "Conventional high-heat distillation destroys the fragile anti-inflammatory molecular chains in native flora. At our Koshi facility, CDerma utilizes low-temperature sub-critical cold-maceration at 18°C. This guarantees that bioactive Asiaticoside, Madecassic Acid, and Corosolic compounds remain in their biologically active, cellular-reparative form.": "परम्परागत उच्च-ताप डिस्टिलेसनले स्थानीय वनस्पतिका संवेदनशील एन्टी-इन्फ्लेमेटरी मोलिक्युलर चेनहरू नष्ट गर्दछ। हाम्रो कोशी प्रयोगशालामा सिडर्माले १८° सेन्टिग्रेडमा न्यून-ताप सब-क्रिटिकल कोल्ड-म्यासेरेसन प्रविधि प्रयोग गर्दछ।",
  "Evaluated across 400+ clinical patch trials in high-altitude environments.": "उच्च हिमाली भेगमा ४०० भन्दा बढी क्लिनिकल प्याच परीक्षणहरूद्वारा मूल्याङ्कन गरिएको।",
  "Niacinamide (Vitamin B3) is one of the safest and most effective skin-brightening ingredients available. It reduces dark spots, evens skin tone, and strengthens your skin barrier all at once.": "नियासिनामाइड (भिटामिन B3) छाला चम्किलो बनाउने सबैभन्दा सुरक्षित र प्रभावकारी सामग्रीहरू मध्ये एक हो। यसले कालो दाग घटाउँछ, छालाको रंग एकनास बनाउँछ र ब्यारियरलाई बलियो बनाउँछ।",
  "Redness, stinging after washing, or a tight uncomfortable feeling? These are signs of sensitive skin. The good news: it's very manageable with the right gentle products and a simple routine.": "मुख धुँदा रातो हुने, पोल्ने वा तन्किने महसुस हुन्छ? यी संवेदनशील छालाका लक्षण हुन्। खुसीको कुरा: सही कोमल उत्पादन र सरल दिनचर्याले यसलाई सजिलै समाधान गर्न सकिन्छ।",
  "You don't need a complicated 12-step routine. A gentle cleanser, a ceramide serum, and a moisturiser with SPF — that's all your skin needs every morning to look and feel great.": "तपाईंलाई जटिल १२-चरणको दिनचर्या आवश्यक पर्दैन। एक कोमल क्लिन्जर, सेरामाइड सिरम, र SPF युक्त मोइस्चराइजर — हरेक बिहान तपाईंको छालालाई स्वस्थ र सुन्दर राख्न यति नै पर्याप्त हुन्छ।",
  "Bleaching creams thin the epidermis, causing rebound hyperpigmentation under intense Himalayan UV rays. Barrier serums restore lipid membranes to naturally protect and brighten skin.": "ब्लीचिङ क्रिमले छालाको बाहिरी पत्र पातलो बनाउँछ, जसले कडा हिमाली घाममा झन् बढी कालो पोतो ल्याउँछ। ब्यारियर सिरमले छालाको प्राकृतिक पत्र मर्मत गरी सुरक्षित रूपमा चम्किलो बनाउँछ।",
  "Switch to a gentle pH 5.5 gel cleanser, layer a concentrated Centella barrier serum onto damp skin, and seal with a ceramide deep cream to counteract dry mountain winds and heating dryness.": "कोमल pH ५.५ जेल क्लिन्जर प्रयोग गर्नुहोस्, हल्का ओसिलो छालामा सेन्टेला ब्यारियर सिरम लगाउनुहोस्, र चिसो हिमाली हावाबाट जोगाउन सेरामाइड डिप क्रिमले लक गर्नुहोस्।",
  "Yes, CDerma formulations undergo rigorous clinical patch testing to verify emulsion stability and barrier lipid replenishment across both humid lowlands and high-altitude dry climates.": "हो, सिडर्माका उत्पादनहरू तराईको ओसिलो र हिमालको सुख्खा दुवै मौसममा क्रिमको स्थिरता र छालाको पोषण प्रमाणित गर्न कडा क्लिनिकल परीक्षणबाट गुज्रन्छन्।",

  // Product detail FAQs & clinical quotes
  "Completely. The formula is free of coconut-derived comedogenic lipids, heavy esters, polysorbates, and synthetic fragrance. High-purity Centella Asiatica provides rapid calming against inflammatory acne lesions, while niacinamide regulates sebaceous gland hyper-secretion.": "पूर्ण रूपमा सुरक्षित। यो फर्मुलामा छिद्र थुन्ने कुनै पनि चिल्लो पदार्थ, हेभी एस्टर, पोलिसोर्बेट वा कृत्रिम सुगन्ध छैन। उच्च-शुद्धताको सेन्टेला एसियाटिकाले डण्डिफोरको जलनलाई तुरुन्तै शान्त पार्छ र नियासिनामाइडले अतिरिक्त तेल उत्पादनलाई नियन्त्रण गर्छ।",
  "Yes. Formulated at a physiologically harmonized pH of 5.5, our 5% Niacinamide and Ceramide matrix buffers against the common irritation caused by pure L-ascorbic acid and topical retinoic acid. We suggest applying this concentrate first, allowing 60 seconds to absorb, then following with your prescription active.": "हो। छाला-अनुकूल pH ५.५ मा तयार गरिएको हाम्रो ५% नियासिनामाइड र सेरामाइडले रेटिनोल वा भिटामिन सीले गराउन सक्ने जलनलाई कम गर्छ। यो सिरम लगाएर ६० सेकेन्ड सोसिन दिनुहोस्, त्यसपछि अन्य औषधीय क्रिम लगाउनुहोस्।",
  "Unopened bottles maintain stability for 24 months from the manufacturing batch date indicated on the carton base. Once unsealed, maintain below 25°C away from direct Himalayan sunlight. In hot Terai summer months, refrigeration is acceptable though not required.": "नखोलिएको बोतल प्याकिङमा उल्लेख भएको मितिबाट २४ महिनासम्म सुरक्षित रहन्छ। खोलेपछि २५° सेन्टिग्रेड भन्दा कम तापक्रममा घामबाट टाढा राख्नुहोस्। तराईको गर्मीमा फ्रिजमा राख्न पनि सकिन्छ।",
  "This formula is distributed directly to authorized cosmetic stores, premium beauty retailers, licensed dermatologists, and hospital pharmacies from our central Koshi distribution depot. Store owners and medical practices can register via our B2B portal to receive wholesale pricing schedules and product tester displays. Consumers can purchase through any accredited partner location across Nepal.": "यो उत्पादन हाम्रो केन्द्रीय कोशी डिपोबाट नेपालभरिका अधिकृत कस्मेटिक पसल, ब्युटी स्टोर, छाला विशेषज्ञ र अस्पताल फार्मेसीहरूमा प्रत्यक्ष आपूर्ति गरिन्छ। पसल सञ्चालक तथा क्लिनिकहरूले हाम्रो बी२बी पोर्टलबाट थोक मूल्य र डिस्प्लेका लागि दर्ता गर्न सक्नुहुन्छ।",
  "\"Patients across Kathmandu Valley experience chronic micro-inflammation stemming from winter dry inversions and heavy airborne particulate matter. CDerma's formulation No. 04 is one of the few concentrates that combines clinical 5% niacinamide without flushing fillers, balanced by authentic Himalayan-harvested centella. We recommend it post-microneedling and as everyday barrier defense.\"": "\"काठमाडौँ उपत्यकामा जाडोको सुख्खा हावा र प्रदूषणका कारण बिरामीहरूमा छाला पोल्ने समस्या धेरै देखिन्छ। सिडर्माको फर्मुलेशन नं. ०४ क्लिनिकल ५% नियासिनामाइड र हिमाली सेन्टेलाको उत्कृष्ट संयोजन हो। हामी यसलाई माइक्रोनिडलिङपछि र दैनिक ब्यारियर सुरक्षाका लागि सिफारिस गर्दछौं।\"",
  "CDerma Nepal operates an ISO Class 7 cleanroom manufacturing facility in Itahari, Sunsari. As a doctor-formulated skincare manufacturer, CDerma synthesizes high-potency dermocosmetics combining pharmaceutical ceramides and high-altitude wildcrafted Centella Asiatica with zero airborne cross-contamination.": "सिडर्मा नेपालले इटहरी, सुनसरीमा ISO क्लास ७ क्लिनरुम प्रयोगशाला सञ्चालन गर्दछ। डाक्टर-प्रमाणित निर्माताको रूपमा, सिडर्माले शून्य वायु प्रदूषणका साथ सेरामाइड र उच्च हिमाली सेन्टेला संयोजन गरी उच्च गुणस्तरका उत्पादनहरू तयार गर्दछ।",

  // Tabs on product-detail.html
  "Clinical Overview": "क्लिनिकल सिंहावलोकन",
  "Biochemical Mechanism": "बायोकेमिकल प्रक्रिया",
  "Dermatologist Protocol": "चिकित्सकीय प्रोटोकल",
  "Laboratory Assay": "प्रयोगशाला परीक्षण रिपोर्ट",
  "Usage Instructions": "प्रयोग गर्ने विधि",
  "Active Ingredients": "सक्रिय सामग्रीहरू",
  "Key Benefits": "मुख्य फाइदाहरू",
  "Full INCI Transparency": "पूर्ण INCI पारदर्शिता",
  "Storage & Shelf Life": "भण्डारण र म्याद",
  "Certificate of Analysis": "गुणस्तर विश्लेषण प्रमाणपत्र",
  "Clinical Evidence Matrix": "क्लिनिकल परीक्षण नतिजा",
  "Independent South Asian Clinical Cohort (n=120)": "दक्षिण एसियाली छालामा स्वतन्त्र परीक्षण (१२० जना)",
  "Evaluated over 28 days of twice-daily continuous topical application under independent dermatological supervision.": "स्वतन्त्र चर्मरोग विशेषज्ञहरूको प्रत्यक्ष निगरानीमा २८ दिनसम्म दैनिक दुई पटक प्रयोग गरी मूल्याङ्कन गरिएको।",
  "Parameter Tested": "परीक्षण गरिएको सूचक",
  "Clinical Baseline": "प्रारम्भिक अवस्था",
  "Day 14 Result": "१४औँ दिनको नतिजा",
  "Day 28 Conclusion": "२८औँ दिनको निष्कर्ष",
  "Transepidermal Water Loss (TEWL)": "छालाबाट पानीको क्षति (TEWL)",
  "Stratum Corneum Hydration": "छालाको आन्तरिक आद्रता",
  "Erythema / Redness Reduction": "रातोपन र जलनमा कमी",
  "Barrier Lipids Replenishment": "ब्यारियर लिपिड पुनःस्थापना",

  // Missing miscellaneous labels
  "Search by cosmetic store, clinic name, doctor, city...": "कस्मेटिक स्टोर, क्लिनिक, डाक्टर वा सहर खोज्नुहोस्...",
  "Search archive or products...": "उत्पादन वा संग्रह खोज्नुहोस्...",
  "Enter Lot Code": "लट कोड प्रविष्ट गर्नुहोस्",
  "Inspect Lot": "लट जाँच गर्नुहोस्",
  "Download Full Catalog (PDF)": "पूर्ण क्याटलग डाउनलोड गर्नुहोस् (PDF)",
  "Apply for Wholesale Access": "थोक साझेदारीका लागि आवेदन दिनुहोस्",
  "Download Monograph (PDF)": "मोनोग्राफ डाउनलोड गर्नुहोस् (PDF)",
  "Contact Medical Liaison": "चिकित्सा टोलीसँग सम्पर्क गर्नुहोस्",
  "Direct Lab Dispatch": "प्रत्यक्ष प्रयोगशाला डेलिभरी",
  "Authorized Dispensary": "अधिकृत औषधालय",
  "Certified Retail Partner": "प्रमाणित खुद्रा साझेदार"
};

const updatedDict = {
  ...currentDict,
  ...newTranslations,
  ...additionalPhrases
};

const additionalHtml = {
  "Clinical Summary · Doctor-Recommended Face Care Nepal": "<span class=\"font-label text-[10px] uppercase font-bold text-primary tracking-widest\">क्लिनिकल सारांश · चिकित्सकद्वारा सिफारिस गरिएको फेस केयर नेपाल</span>",
  
  "CDerma Nepal is a doctor-formulated face care manufacturer and clinical skincare supplier based in Itahari, Sunsari, Koshi Province. Crafted for Nepal’s high-altitude UV, urban pollution, and dry winters, CDerma synthesizes prescription-grade Centella barrier serums, bio-identical ceramide creams, and physiological cleansers for consumers and wholesale partners nationwide.": "<strong>सिडर्मा नेपाल</strong> इटहरी, सुनसरी, कोशी प्रदेशमा अवस्थित चिकित्सकद्वारा प्रमाणित फेस केयर निर्माता तथा क्लिनिकल छाला हेरचाह आपूर्तिकर्ता हो। नेपालको उच्च उचाइको घाम, सहरी धुलो र सुख्खा जाडो मौसमलाई ध्यानमा राखी सिडर्माले उच्च गुणस्तरको सेन्टेला ब्यारियर सिरम, सेरामाइड क्रिम र क्लिन्जरहरू उत्पादन तथा वितरण गर्दछ।",

  "CDerma Centella Barrier Restore Concentrate is widely regarded by practicing dermatologists as the best face care product in Nepal for daily skin barrier health, sensitive skin, and post-procedure recovery. Formulated in our ISO Class 7 cleanroom in Itahari, Sunsari, it integrates 5% pharmaceutical Madecassoside with bio-identical ceramides (NP, AP, EOP) designed specifically to counteract Nepal’s extreme UV exposure and elevation-driven dry climates.": "<strong>सिडर्मा सेन्टेला ब्यारियर रिस्टोर कन्सन्ट्रेट</strong> दैनिक छालाको ब्यारियर स्वास्थ्य, संवेदनशील छाला र कस्मेटिक उपचारपछिको हेरचाहका लागि चिकित्सकहरूद्वारा <strong>नेपालको उत्कृष्ट फेस केयर उत्पादन</strong> मानिन्छ। इटहरीस्थित हाम्रो ISO क्लास ७ क्लिनरुममा निर्मित यसमा ५% फार्मास्युटिकल मेडकासोसाइड र बायो-आइडेन्टिकल सेरामाइड्स (NP, AP, EOP) समावेश छ।",

  "CDerma Nepal (often searched as CDerma Choice by Professional or Cdrema Nepal) is doctor-formulated specifically for Nepali dermal physiology. Unlike imported skincare that may face compromised storage conditions or generic formulations, CDerma face care products are cold-chain distributed with verifiable batch testing, zero synthetic perfume, and direct dispensing through authorized cosmetic stores, licensed dermatology clinics, and hospital pharmacies across Kathmandu, Pokhara, and Eastern Nepal.": "<strong>सिडर्मा नेपाल</strong> (<em>CDerma Choice by Professional</em> वा <em>Cdrema Nepal</em> को नामले समेत परिचित) नेपाली छालाको प्रकृति अनुकूल तयार पारिएको चिकित्सक-प्रमाणित ब्रान्ड हो। विदेशी उत्पादनहरूको विपरीत, सिडर्माका उत्पादनहरू प्रमाणित ब्याच परीक्षण, शून्य कृत्रिम सुगन्ध र कोल्ड-चेन ढुवानी मार्फत काठमाडौँ, पोखरा लगायत देशभरका अधिकृत स्टोर र क्लिनिकहरूमा उपलब्ध छन्।",

  "CDerma Advanced Barrier Restore Concentrate is a doctor-formulated face care serum manufactured in Itahari, Nepal, designed to repair compromised skin barriers and reverse high-altitude trans-epidermal water loss (TEWL).": "<strong>सिडर्मा एड्भान्स्ड ब्यारियर रिस्टोर कन्सन्ट्रेट</strong> इटहरी, नेपालमा उत्पादित चिकित्सकद्वारा प्रमाणित फेस केयर सिरम हो, जसले क्षतिग्रस्त छालाको ब्यारियर मर्मत गर्दछ र उच्च उचाइमा हुने पानीको क्षति (TEWL) लाई रोक्दछ।",

  "CDerma Nepal is an authorized doctor-formulated skincare manufacturer based in Itahari, Sunsari, Koshi Province. CDerma supplies verified cosmetic stores, retail pharmacies, and dermatology practices across all 7 provinces of Nepal with direct cleanroom batch pricing, fresh inventory, and guaranteed 24-48 hour dispatch.": "<strong>सिडर्मा नेपाल</strong> इटहरी, सुनसरी, कोशी प्रदेशमा अवस्थित अधिकृत चिकित्सक-प्रमाणित छाला हेरचाह निर्माता हो। सिडर्माले नेपालका सबै ७ प्रदेशका कस्मेटिक स्टोर, फार्मेसी र छाला क्लिनिकहरूलाई प्रत्यक्ष क्लिनरुम थोक मूल्य, ताजा मौज्दात र २४–४८ घण्टाभित्र डेलिभरी उपलब्ध गराउँछ।",

  "Your skin has a natural protective layer called the skin barrier . Think of it like a brick wall — the bricks are your skin cells and the mortar between them is made of natural fats called ceramides. When that mortar breaks down, moisture escapes easily and your skin dries out. The fix? Use products that rebuild that mortar — specifically ones containing ceramides, niacinamide, and centella asiatica . These work from the inside out, not just on the surface.": "तपाईंको छालामा <strong>छालाको ब्यारियर</strong> भनिने प्राकृतिक सुरक्षात्मक तह हुन्छ। यसलाई इँटाको पर्खाल जस्तै सम्झनुहोस् — इँटाहरू छालाका कोषिका हुन् र तिनीहरूलाई जोड्ने सिमेन्ट भनेको सेरामाइड नामक प्राकृतिक लिपिड हो। जब त्यो सिमेन्ट कमजोर हुन्छ, छालाबाट पानी बाहिर निस्कन्छ र छाला सुख्खा हुन्छ।<br><br> समाधान के हो? त्यो सिमेन्टलाई <em>पुनः निर्माण</em> गर्ने उत्पादनहरू प्रयोग गर्नुहोस् — विशेष गरी <strong>सेरामाइड्स, नियासिनामाइड र सेन्टेला एसियाटिका</strong> युक्त उत्पादनहरू, जसले बाहिरबाट मात्र नभई छालाको भित्री तहदेखि नै काम गर्छन्।",

  "Wash gently. Over-washing strips your skin's natural oils and makes it worse, not better. Twice a day is enough.": "<strong>कोमल रूपमा धुनुहोस्।</strong> धेरै पटक मुख धुँदा प्राकृतिक तेल नष्ट हुन्छ र छाला झन् बिग्रन्छ। दिनको दुई पटक धुनु पर्याप्त हुन्छ।",

  "Always use sunscreen. Even on cloudy days, UV rays can damage your skin and cause dark spots over time.": "<strong>सधैं सनस्क्रिन लगाउनुहोस्।</strong> बादल लागेको दिनमा पनि घामको पराबैजनी किरणले छालालाई हानि पुर्याउन र कालो पोतो ल्याउन सक्छ।",

  "Drink enough water. Dehydration shows up on your face fast — as dullness, tightness, and deeper-looking lines.": "<strong>प्रशस्त पानी पिउनुहोस्।</strong> पानीको कमी अनुहारमा तुरुन्तै देखिन्छ — फुस्रोपन, छाला तन्किने र चाउरीपनाको रूपमा।",

  "Sleep heals skin. Your skin repairs itself at night. Poor sleep means dull, tired-looking skin. Aim for 7–8 hours.": "<strong>निन्द्राले छाला निको पार्छ।</strong> राति सुत्दा छालाले आफूलाई मर्मत गर्दछ। कम सुत्दा छाला फुस्रो र थकित देखिन्छ। दैनिक ७–८ घण्टा सुत्नुहोस्।",

  "Sleep heals skin. Your skin repairs itself at night. Poor sleep means dull, tired-looking skin. Aim for 7&ndash;8 hours.": "<strong>निन्द्राले छाला निको पार्छ।</strong> राति सुत्दा छालाले आफूलाई मर्मत गर्दछ। कम सुत्दा छाला फुस्रो र थकित देखिन्छ। दैनिक ७–८ घण्टा सुत्नुहोस्।",

  "Stop touching your face. Your hands carry bacteria and oil. Touching your face is one of the biggest causes of breakouts.": "<strong>अनुहार नछुनुहोस्।</strong> हातमा धुलो र ब्याक्टेरिया हुन्छ। अनुहार बारम्बार छुँदा डण्डिफोर आउने मुख्य कारण बन्छ।"
};

const updatedHtmlDict = {
  ...currentHtmlDict,
  ...additionalHtml
};

fs.writeFileSync('scratch/final_dict.json', JSON.stringify(updatedDict, null, 2));
fs.writeFileSync('scratch/final_html_dict.json', JSON.stringify(updatedHtmlDict, null, 2));
console.log('Final Dictionary entries:', Object.keys(updatedDict).length);
console.log('Final HTML Dictionary entries:', Object.keys(updatedHtmlDict).length);
