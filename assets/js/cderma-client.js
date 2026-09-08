/**
 * CDerma Nepal - Client-Side Dynamic Synchronization
 * Connects frontend pages to the Node.js backend CMS APIs
 */

// Active scroll protection: guarantees page is always scrollable
function ensureScrollable() {
  if (document.body) {
    if (document.body.classList.contains('antigravity-scroll-lock')) {
      document.body.classList.remove('antigravity-scroll-lock');
    }
  }
  if (document.documentElement) {
    if (document.documentElement.classList.contains('antigravity-scroll-lock')) {
      document.documentElement.classList.remove('antigravity-scroll-lock');
    }
  }
  const lockStyle = document.getElementById('antigravity-scroll-lock-style');
  if (lockStyle) lockStyle.remove();

  // Strip any injected style tags containing scroll-lock or overflow: hidden
  document.querySelectorAll('style').forEach(st => {
    if (st.id === 'antigravity-scroll-lock-style' || (st.textContent && st.textContent.includes('antigravity-scroll-lock') && st.textContent.includes('overflow: hidden'))) {
      st.remove();
    }
  });

  const drawerBackdrop = document.getElementById('cderma-mobile-backdrop');
  const isDrawerOpen = drawerBackdrop && !drawerBackdrop.classList.contains('opacity-0') && !drawerBackdrop.classList.contains('pointer-events-none');

  if (!isDrawerOpen) {
    if (document.body && (document.body.style.overflow === 'hidden' || document.body.style.overflowY === 'hidden')) {
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
    }
    if (document.documentElement && (document.documentElement.style.overflow === 'hidden' || document.documentElement.style.overflowY === 'hidden')) {
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ensureScrollable);
} else {
  ensureScrollable();
}
window.addEventListener('load', ensureScrollable);

try {
  const scrollObserver = new MutationObserver(() => {
    ensureScrollable();
  });
  if (document.body) {
    scrollObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] });
  }
  if (document.documentElement) {
    scrollObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] });
  }
  if (document.head) {
    scrollObserver.observe(document.head, { childList: true, subtree: true });
  }
} catch (e) {}

// ==========================================
// Universal Language Switcher (EN / नेपाली)
// ==========================================
const CDERMA_LANG_KEY = 'cderma_lang';

function getActiveLanguage() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const qLang = (urlParams.get('lang') || '').toLowerCase();
    if (qLang === 'ne' || qLang === 'en') return qLang;
  } catch (e) {}

  try {
    const match = document.cookie.match(/(?:^|;\s*)cderma_lang=([^;]*)/);
    if (match && (match[1] === 'ne' || match[1] === 'en')) return match[1];
  } catch (e) {}

  try {
    const stored = localStorage.getItem(CDERMA_LANG_KEY);
    if (stored === 'ne' || stored === 'en') return stored;
  } catch (e) {}

  return 'en';
}

function setActiveLanguage(lang) {
  if (lang !== 'ne' && lang !== 'en') lang = 'en';
  document.cookie = `cderma_lang=${lang};path=/;max-age=31536000;SameSite=Lax`;
  try {
    localStorage.setItem(CDERMA_LANG_KEY, lang);
  } catch (e) {}
  document.documentElement.lang = lang;

  updateLanguageTogglesUI(lang);
  applyBodyTranslations(lang);

  try {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.location.href = url.toString();
  } catch (e) {
    window.location.reload();
  }
}

function updateLanguageTogglesUI(activeLang) {
  const isNe = activeLang === 'ne';
  document.querySelectorAll('.cderma-lang-toggle').forEach(container => {
    const isDrawer = container.closest('#cderma-mobile-drawer') !== null;
    const enBtn = container.querySelector('[data-lang-btn="en"]');
    const neBtn = container.querySelector('[data-lang-btn="ne"]');
    if (!enBtn || !neBtn) return;

    if (isNe) {
      // EN is inactive
      enBtn.className = isDrawer
        ? 'px-2.5 py-1 rounded-full font-medium transition-all text-[#4b4639] hover:text-[#887635] bg-transparent shadow-none cursor-pointer'
        : 'px-2.5 py-1 rounded-full font-medium transition-all text-on-surface-variant hover:text-primary bg-transparent shadow-none cursor-pointer';
      enBtn.setAttribute('aria-pressed', 'false');

      // NE is active
      neBtn.className = isDrawer
        ? 'px-2.5 py-1 rounded-full font-bold transition-all text-[#887635] bg-white shadow-xs cursor-default'
        : 'px-2.5 py-1 rounded-full font-bold transition-all text-primary bg-white shadow-xs cursor-default';
      neBtn.setAttribute('aria-pressed', 'true');
    } else {
      // EN is active
      enBtn.className = isDrawer
        ? 'px-2.5 py-1 rounded-full font-bold transition-all text-[#887635] bg-white shadow-xs cursor-default'
        : 'px-2.5 py-1 rounded-full font-bold transition-all text-primary bg-white shadow-xs cursor-default';
      enBtn.setAttribute('aria-pressed', 'true');

      // NE is inactive
      neBtn.className = isDrawer
        ? 'px-2.5 py-1 rounded-full font-medium transition-all text-[#4b4639] hover:text-[#887635] bg-transparent shadow-none cursor-pointer'
        : 'px-2.5 py-1 rounded-full font-medium transition-all text-on-surface-variant hover:text-primary bg-transparent shadow-none cursor-pointer';
      neBtn.setAttribute('aria-pressed', 'false');
    }
  });
}


// ==========================================
// Comprehensive Nepali Translation Dictionary
// ==========================================
const CDERMA_NEPALI_DICTIONARY = {
  "Home": "गृहपृष्ठ",
  "Products": "उत्पादनहरू",
  "Flagship Face Care": "प्रमुख फेस केयर",
  "Quality & Science": "गुणस्तर र विज्ञान",
  "B2B & Distribution": "बी२बी तथा थोक वितरण",
  "Doctor's Advice": "चिकित्सकीय सल्लाह",
  "Explore Face Care": "फेस केयर हेर्नुहोस्",
  "WhatsApp": "ह्वाट्सएप",
  "About Us": "हाम्रो बारेमा",
  "Quality Standards": "गुणस्तर मापदण्ड",
  "Manufacturing Facility": "उत्पादन तथा वितरण केन्द्र",
  "Careers & Research": "अनुसन्धान तथा करियर",
  "Face Care Systems": "फेस केयर प्रणाली",
  "Hydrating Serums": "हाइड्रेटिङ सिरम",
  "Restorative Creams": "रिस्टोरेटिभ क्रिम",
  "Body Care Formulations": "छाला हेरचाह फर्मुलेसन",
  "Cosmetic Store Wholesale": "कस्मेटिक स्टोर थोक आपूर्ति",
  "Become a Distributor": "अधिकृत वितरक बन्नुहोस्",
  "Salon & Pharmacy Supply": "सैलुन तथा फार्मेसी आपूर्ति",
  "Dermatologist Portal": "छाला विशेषज्ञ पोर्टल",
  "Skincare Guides": "छाला हेरचाह गाइड",
  "Verified Ingredients": "प्रमाणित सामग्रीहरू",
  "Verification & Transparency": "प्रमाणीकरण र पारदर्शिता",
  "Clinical FAQs": "क्लिनिकल प्रश्नोत्तर",
  "Legal & Compliance": "कानुनी र अनुपालन",
  "Follow & Connect With Us": "हामीसँग जोडिनुहोस्",
  "REGION / LANGUAGE:": "क्षेत्र / भाषा:",
  "Display Language": "भाषा चयन गर्नुहोस्",
  "Navigation": "नेभिगेसन",
  "Direct Connect": "प्रत्यक्ष सम्पर्क",
  "WhatsApp Quick Consult": "ह्वाट्सएप परामर्श",
  "Find In Stores & Clinics": "स्टोर तथा क्लिनिक खोज्नुहोस्",
  "B2B Wholesale Onboarding": "बी२बी थोक साझेदारी",
  "Company": "कम्पनी",
  "B2B Partners": "बी२बी साझेदार",
  "Resources": "स्रोतहरू",
  "View Products": "उत्पादनहरू हेर्नुहोस्",
  "B2B Wholesale": "बी२बी थोक वितरण",
  "Explore Flagship Serum": "फ्ल्यागशिप सिरम हेर्नुहोस्",
  "Details": "विवरण हेर्नुहोस्",
  "View Details": "विवरण हेर्नुहोस्",
  "Bottle": "बोतल",
  "Lab Report": "ल्याब रिपोर्ट",
  "Lab Report (PDF)": "ल्याब रिपोर्ट (PDF)",
  "Hover to Inspect Bottle": "बोतल हेर्न कर्सर लैजानुहोस्",
  "Certificate of Quality": "गुणस्तर प्रमाणपत्र",
  "TEST PASSED": "परीक्षण सफल",
  "All Skin Types": "सबै प्रकारका छालाको लागि",
  "Skin Compatibility": "छाला अनुकूलता",
  "Moisture Power": "मोइस्चर क्षमता",
  "24 Hours": "२४ घण्टा",
  "Locks in deep moisture all day long": "दिनभर गहिरो ओस सुरक्षित राख्छ",
  "Texture & Feel": "बनावट र अनुभूति",
  "Light & Non-Greasy": "हल्का र चिल्लोरहित",
  "Absorbs quickly with a silky finish": "रेशमी फिनिशसहित छिट्टै छालामा समाहित हुन्छ",
  "Gentle on sensitive, dry, or oily skin": "संवेदनशील, सुख्खा वा तैलीय सबै छालामा कोमल",
  "Why Your Skin Will Love It": "तपाईंको छालाले किन मन पराउँछ",
  "Recommended by skin doctors for dry, irritated skin": "सुख्खा र चिलाउने छालाका लागि छाला विशेषज्ञहरूद्वारा सिफारिस गरिएको",
  "Free from artificial perfume, parabens, and harsh alcohols": "कृत्रिम सुगन्ध, प्याराबेन र कडा अल्कोहल रहित",
  "Made to protect against Nepal’s dust, sun, and winter dry air": "नेपालको धुलो, कडा घाम र जाडोको सुख्खा हावाबाट जोगाउन निर्मित",
  "Freshly made and quality tested in our Itahari facility": "हाम्रो इटहरी केन्द्रमा ताजा तयार तथा गुणस्तर परीक्षण गरिएको",
  "Cosmetic Store & Clinic Wholesale": "कस्मेटिक स्टोर तथा क्लिनिक थोक",
  "Available at leading cosmetic stores, beauty shops & clinics": "नेपालका प्रमुख कस्मेटिक स्टोर, ब्युटी शप तथा क्लिनिकहरूमा उपलब्ध",
  "Crafted for Nepal Weather": "नेपालको मौसम अनुकूल तयार पारिएको",
  "Skin In Its Truest State": "प्राकृतिक र स्वस्थ छाला",
  "Fresh, Non-Sticky Daily Hydration": "ताजा, नटाँसिने दैनिक मोइस्चराइजर",
  "Kathmandu & Koshi Stores": "काठमाडौँ तथा कोशीका स्टोरहरू",
  "Daily Healthy Glow": "दैनिक स्वस्थ चमक",
  "Made for Nepal’s Climate & Everyday Radiance.": "नेपालको मौसम र दैनिक चमकका लागि विशेष निर्मित।",
  "Designed for real daily life in Nepal — from dusty city roads to sunny afternoons and dry winter air. CDerma keeps your skin deeply hydrated, calm, and glowing without clogging pores or feeling sticky.": "नेपालको वास्तविक दैनिक जीवनका लागि डिजाइन गरिएको — धुलोयुक्त सडक, तीव्र घाम र सुख्खा जाडो हावाबाट जोगाउँछ। सिडर्माले छालाका छिद्रहरू बन्द नगरी वा चिपचिपा नबनाई गहिरो मोइस्चराइज, शान्त र चम्किलो राख्छ।",
  "Felt soothing relief right away": "तत्काल शान्त र आरामदायी महसुस गरे",
  "Artificial perfume or harsh parabens": "कृत्रिम सुगन्ध वा हानिकारक प्याराबेन रहित",
  "Clinical Summary · Doctor-Recommended Face Care Nepal": "क्लिनिकल सारांश · चिकित्सकद्वारा सिफारिस गरिएको फेस केयर नेपाल",
  "CDerma Nepal is a doctor-formulated face care manufacturer and clinical skincare supplier based in Itahari, Sunsari, Koshi Province. Crafted for Nepal’s high-altitude UV, urban pollution, and dry winters, CDerma synthesizes prescription-grade Centella barrier serums, bio-identical ceramide creams, and physiological cleansers for consumers and wholesale partners nationwide.": "सिडर्मा नेपाल इटहरी, सुनसरी, कोशी प्रदेशमा अवस्थित चिकित्सकद्वारा प्रमाणित फेस केयर निर्माता तथा क्लिनिकल छाला हेरचाह आपूर्तिकर्ता हो। नेपालको उच्च उचाइको घाम, सहरी धुलो र सुख्खा जाडो मौसमलाई ध्यानमा राखी सिडर्माले उच्च गुणस्तरको सेन्टेला ब्यारियर सिरम, सेरामाइड क्रिम र क्लिन्जरहरू उत्पादन तथा वितरण गर्दछ।",
  "Daily Restorative Face Serum": "दैनिक रिस्टोरेटिभ फेस सिरम",
  "30ml Dropper Bottle · For Smooth, Radiant Skin": "३० मिलि ड्रपर बोतल · नरम, चम्किलो छालाको लागि",
  "Vitamin B3 (Niacinamide)": "भिटामिन B3 (नियासिनामाइड)",
  "Skin-Friendly pH": "छाला-अनुकूल pH",
  "Microbial Purity": "माइक्रोबियल शुद्धता",
  "Heavy Metals Check": "हेभी मेटल जाँच",
  "Zero Detected": "शून्य पत्ता लाग्यो (१००% शुद्ध)",
  "Not Detected": "पत्ता लागेन (१००% सुरक्षित)",
  "Lead Chemist: S. Pokharel": "प्रमुख केमिस्ट: एस. पोखरेल",
  "Quality Skincare Made in Nepal": "नेपालमा निर्मित गुणस्तरीय छाला हेरचाह",
  "Doctor-Grade Face Care You Can Trust.": "तपाईंले भरोसा गर्न सक्ने चिकित्सक-स्तरीय फेस केयर।",
  "We believe everyone in Nepal deserves honest, effective face care that truly works. CDerma brings you doctor-tested formulas made with pure ingredients, clear labels, and total care.": "हामी विश्वास गर्छौं कि नेपालमा सबैले इमानदार र प्रभावकारी छाला हेरचाह पाउनुपर्छ। सिडर्माले शुद्ध सामग्री, स्पष्ट लेबल र पूर्ण सुरक्षाका साथ डाक्टर-परीक्षित फर्मुलाहरू प्रस्तुत गर्दछ।",
  "Authorized Nepal Importer & Central Logistics Hub": "अधिकृत नेपाल आयातकर्ता तथा केन्द्रीय आपूर्ति केन्द्र",
  "100% Genuine Imported Formulation": "१००% वास्तविक आयातित फर्मुलेशन",
  "Authorized Batch Quarantine & Verification": "अधिकृत ब्याच क्वारेन्टाइन तथा प्रमाणीकरण",
  "Direct Brand Authorization & Certified International Labs": "प्रत्यक्ष ब्रान्ड प्राधिकरण तथा प्रमाणित अन्तर्राष्ट्रिय प्रयोगशाला",
  "ISO & NMC Aligned": "ISO र NMC मापदण्ड अनुरूप",
  "Cleanroom Precision In Every Single Drop.": "प्रत्येक थोपामा क्लिनरुम शुद्धता र सटीकता।",
  "Pillar 01": "पिलर ०१",
  "Pillar 02": "पिलर ०२",
  "Pillar 03": "पिलर ०३",
  "Pillar 04": "पिलर ०४",
  "Pillar 05": "पिलर ०५",
  "Pillar 06": "पिलर ०६",
  "Professional Guidance": "व्यावसायिक चिकित्सा मार्गदर्शन",
  "Curated alongside practicing medical professionals and certified cosmetologists to introduce clinically backed international dermocosmetics tailored for Nepali skin profiles.": "नेपाली छालाको प्रकृति अनुकूल क्लिनिकली प्रमाणित अन्तर्राष्ट्रिय डर्मोकोस्मेटिक्स उपलब्ध गराउन चिकित्सकहरूसँग सहकार्य गरिएको।",
  "Dermatologist Selected": "छाला विशेषज्ञहरूद्वारा छनोट गरिएको",
  "Quality-Focused Formulation": "गुणस्तर-केन्द्रित फर्मुलेशन",
  "Bio-compatible actives formulated in world-class international certified laboratories, fully supported by peer-reviewed clinical dermatological data.": "विश्वस्तरीय प्रमाणित अन्तर्राष्ट्रिय प्रयोगशालाहरूमा तयार गरिएका बायो-कम्प्याटिबल एक्टिभ्स, क्लिनिकल डेटाद्वारा पूर्ण समर्थित।",
  "Clinically Standardized": "क्लिनिकली मानकीकृत",
  "Thoughtful Ingredients": "सुरक्षित र शुद्ध सामग्री",
  "Zero questionable fillers, unverified compounds, or volatile dyes. Complete INCI transparency with verified international Certificates of Analysis (COA).": "शंकास्पद मिसावट, अप्रमाणित रसायन वा हानिकारक रंग रहित। अन्तर्राष्ट्रिय COA प्रमाणपत्रसहित पूर्ण पारदर्शिता।",
  "Non-Comedogenic & Verified Clean": "छिद्र नथुन्ने र प्रमाणित शुद्ध",
  "Authorized Direct Import": "अधिकृत प्रत्यक्ष आयात",
  "Imported directly from certified global manufacturing facilities with official manufacturer authorization, tamper-evident seals, and customs clearance.": "आधिकारिक निर्माता अनुमति, सिलबन्दी प्याकेजिङ र भन्सार प्रक्रिया पूरा गरी प्रमाणित विश्वव्यापी केन्द्रहरूबाट प्रत्यक्ष आयात।",
  "Authorized Exclusive Importer": "अधिकृत विशिष्ट आयातकर्ता",
  "Trusted Supply Chain": "विश्वसनीय आपूर्ति सञ्जाल",
  "Direct temperature-monitored cold-chain import and nationwide distribution for certified cosmetic stores, dermatology clinics, hospital pharmacies, and aesthetic salons across Nepal.": "तापक्रम नियन्त्रित कोल्ड-चेन आयात र नेपालभरका प्रमाणित कस्मेटिक पसल, छाला क्लिनिक, फार्मेसी तथा सैलुनहरूमा सुरक्षित वितरण।",
  "Direct Batch Traceability": "प्रत्यक्ष ब्याच ट्र्याकिङ",
  "Selected for Nepal’s Climate": "नेपालको हावापानी अनुकूल",
  "Carefully evaluated and imported specifically to protect against urban dust, intense high-altitude Himalayan UV, and sharp climatic variances.": "सहरी धुलो, हिमालको उच्च उचाइको कडा UV किरण र जलवायु परिवर्तनबाट सुरक्षा प्रदान गर्न विशेष रूपमा छनोट गरिएको।",
  "Regional Climate Defense": "क्षेत्रीय मौसम सुरक्षा",
  "Practitioner Validation": "चिकित्सकीय प्रमाणीकरण",
  "Recommended by Doctors.": "डाक्टरहरूद्वारा सिफारिस गरिएको।",
  "CDerma formulations are evaluated and recommended by registered medical professionals across Nepal for reliable everyday barrier care and post-procedure hydration.": "दैनिक ब्यारियर मर्मत र छाला उपचारपछिको मोइस्चराइजिङका लागि नेपालभरका दर्तावाल चिकित्सकहरूद्वारा सिडर्मा सिफारिस गरिन्छ।",
  "Compliance Status": "अनुपालन स्थिति",
  "Strict Claims Policy & NMC Registry Aligned": "कडा दाबी नीति तथा NMC दर्ता अनुरूप",
  "Verified Medical Practitioner": "प्रमाणित चिकित्सक",
  "\"For patients undergoing barrier repair after intense seasonal weather shifts in Kathmandu, CDerma’s concentrate provides stable, non-irritating hydration without pore congestion.\"": "\"काठमाडौँको तीव्र मौसमी परिवर्तनपछि ब्यारियर मर्मत गर्नुपर्ने बिरामीहरूका लागि सिडर्माको कन्सन्ट्रेटले छिद्र नथुनी स्थिर र जलनमुक्त मोइस्चराइजिङ प्रदान गर्दछ।\"",
  "Dr. S. Karki, MD": "डा. एस. कार्की, एमडी",
  "Consultant Dermatologist": "कन्सल्टेन्ट डर्माटोलोजिस्ट",
  "Kathmandu Aesthetic & Skin Care Hospital": "काठमाडौँ एस्थेटिक एण्ड स्किन केयर हस्पिटल",
  "\"Having a world-class skincare laboratory in Itahari ensures batch freshness and immediate traceability that imported commercial brands simply cannot guarantee.\"": "\"इटहरीमा विश्वस्तरीय स्किनकेयर प्रयोगशाला हुनुले ब्याचको ताजगी र तत्काल ट्र्याकिङ सुनिश्चित गर्दछ, जुन आयातित सामान्य ब्रान्डहरूले दिन सक्दैनन्।\"",
  "Dr. P. Sharma, MD Dermatology": "डा. पी. शर्मा, एमडी डर्माटोलोजी",
  "Clinical Skin & Laser Physician": "क्लिनिकल स्किन एण्ड लेजर फिजिसियन",
  "Koshi Regional Medical Institute, Biratnagar": "कोशी क्षेत्रीय मेडिकल इन्स्टिच्युट, विराटनगर",
  "\"The omission of fragrance combined with high concentrations of Centella and Niacinamide makes this our first line recommendation for sensitised skin profiles.\"": "\"सुगन्ध-रहित हुनु र सेन्टेला तथा नियासिनामाइडको उच्च मात्रा हुनुले संवेदनशील छालाका लागि यो हाम्रो पहिलो रोजाइ बनेको छ।\"",
  "Dr. B. Thapa, MBBS, MD": "डा. बी. थापा, एमबीबीएस, एमडी",
  "Dermatology & Venereology Specialist": "डर्माटोलोजी तथा भेनेरोलोजी विशेषज्ञ",
  "Pokhara Skin & Laser Care Center": "पोखरा स्किन एण्ड लेजर केयर सेन्टर",
  "Simple Daily Routine": "दैनिक सरल छाला हेरचाह दिनचर्या",
  "The 4-Step Daily Regimen": "दैनिक ४-चरणको छाला हेरचाह दिनचर्या",
  "Our 4 Daily Steps for Healthy Skin.": "स्वस्थ छालाका लागि ४ दैनिक चरणहरू।",
  "A complete, easy routine designed to give your skin moisture, balance, and all-day protection.": "तपाईंको छालालाई ओस, सन्तुलन र दिनभर सुरक्षा प्रदान गर्न डिजाइन गरिएको पूर्ण र सजिलो दिनचर्या।",
  "Designed to harmonize with your skin’s natural circadian renewal cycles.": "तपाईंको छालाको प्राकृतिक जैविक चक्रसँग मेल खाने गरी तयार पारिएको।",
  "Featherlight Absorption Meets Deep Barrier Nourishment.": "हल्का अवशोषण र गहिरो ब्यारियर पोषणको अनुपम संगम।",
  "Step 01": "चरण ०१",
  "Step 02": "चरण ०२",
  "Step 03": "चरण ०३",
  "Step 04": "चरण ०४",
  "Gentle Cleanse": "कोमल क्लिन्जिङ",
  "Gentle Morning Cleanse": "कोमल बिहानी क्लिन्जिङ",
  "Balance & Mist": "सन्तुलन र मिस्ट",
  "Sub-Alpine Centella Serum": "सब-अल्पाइन सेन्टेला सिरम",
  "CDerma Serum": "सिडर्मा सिरम",
  "Deep Barrier Ceramide Cream": "डिप ब्यारियर सेरामाइड क्रिम",
  "Lock & Shield": "सुरक्षा र सनस्क्रिन",
  "Daily Mineral Photoprotection": "दैनिक मिनरल सनस्क्रिन",
  "Wash with lukewarm water and a pH-balanced cleanser to remove particulate dust without stripping moisture.": "छालाको ओस नखोसी धुलो हटाउन मनतातो पानी र pH-सन्तुलित क्लिन्जरले मुख धुनुहोस्।",
  "Lightly mist face with botanical balancing water to optimize stratum corneum absorption for active serums.": "सक्रिय सिरमको अवशोषण क्षमता बढाउन बोटानिकल ब्यालेन्सिङ मिस्ट हल्का स्प्रे गर्नुहोस्।",
  "Dispense 3–4 drops of Flagship Concentrate onto fingertips. Smooth upward across face, neck, and decolletage.": "औंलाको टुप्पोमा ३–४ थोपा फ्ल्यागशिप कन्सन्ट्रेट लिनुहोस् र अनुहार तथा घाँटीमा बिस्तारै लगाउनुहोस्।",
  "Seal lipid barrier with cream in PM, or apply broad-spectrum high-altitude sunscreen during daytime hours.": "राती क्रिम लगाएर ब्यारियर सुरक्षित गर्नुहोस् वा दिउँसोको समयमा उच्च-उचाइ सनस्क्रिन लगाउनुहोस्।",
  "What Goes Into Your Skincare Matters.": "तपाईंको छाला हेरचाहमा के प्रयोग गरिन्छ भन्ने कुरा महत्त्वपूर्ण छ।",
  "Transparent Science": "पारदर्शी विज्ञान",
  "Pure Ingredients, Transparent Formulations.": "शुद्ध सामग्री, पारदर्शी फर्मुलेशन।",
  "What goes onto your face matters. Every bottle clearly states its ingredients, percentage strengths, and certified test results.": "तपाईंको अनुहारमा के लगाइन्छ भन्ने कुरा महत्त्वपूर्ण छ। प्रत्येक बोतलमा यसका सामग्री, प्रतिशत र परीक्षण नतिजा स्पष्ट उल्लेख हुन्छ।",
  "Every bottle is an uncompromised convergence of verified actives and pristine alpine botanicals. Full INCI transparency is our foundational baseline.": "प्रत्येक बोतल प्रमाणित सक्रिय तत्वहरू र शुद्ध हिमाली जडीबुटीहरूको सम्मिश्रण हो। पूर्ण INCI पारदर्शिता हाम्रो आधारभूत प्रतिबद्धता हो।",
  "Botanical Active": "वानस्पतिक सक्रिय तत्व",
  "Active Compound": "सक्रिय बायो-कम्पाउन्ड",
  "Clinical Vitamin": "क्लिनिकल भिटामिन",
  "Niacinamide (Vitamin B3)": "नियासिनामाइड (भिटामिन B3)",
  "Multi-Depth Hyaluronic Acid": "मल्टि-डेप्थ हायलुरोनिक एसिड",
  "Centella Asiatica": "सेन्टेला एसियाटिका (घोडताप्रे)",
  "Bio-Identical Ceramides": "बायो-आइडेन्टिकल सिरामाइड्स",
  "Sub-Alpine Centella Asiatica": "सब-अल्पाइन सेन्टेला एसियाटिका",
  "Sub-Micron Ceramide NP": "सब-माइक्रोन सेरामाइड NP",
  "5% Vitamin B3 Niacinamide": "५% भिटामिन B3 नियासिनामाइड",
  "Refines cellular pore appearance, regulates sebum production, and fortifies epidermal cohesion.": "छालाका छिद्रहरू सफा गर्छ, तेल सन्तुलन गर्छ र छालाको बाहिरी तहलाई बलियो बनाउँछ।",
  "Triple-weight bio-fermented fractions that penetrate multiple epidermal layers for deep hydration.": "गहिरो आद्रताका लागि छालाका विभिन्न तहसम्म पुग्ने तीन तहको बायो-फर्मेन्टेड हायलुरोनिक एसिड।",
  "Hand-harvested botanical extracts providing rapid calming of redness and cellular oxidative recovery.": "रातोपन छिटो शान्त पार्ने र कोषिकाको पुनःस्थापना गर्ने हातले संकलन गरिएको वानस्पतिक अर्क।",
  "Ceramide NP, AP, and EOP complex replenishing the natural intercellular cement of the skin barrier.": "छालाको ब्यारियरलाई बलियो बनाउने सेरामाइड NP, AP, र EOP कम्प्लेक्सको प्राकृतिक संयोजन।",
  "Every batch undergoes rigorous microbial, pH, and heavy-metal stability screening at our Koshi facility.": "प्रत्येक ब्याचको हाम्रो कोशी केन्द्रमा माइक्रोबियल, pH र हेभी मेटल स्थिरताको कडा परीक्षण गरिन्छ।",
  "Real Feedback": "ग्राहकहरूको वास्तविक अनुभव",
  "Loved by Skincare Enthusiasts Across Nepal.": "नेपालभरिका छाला प्रेमीहरूद्वारा मन पराइएको।",
  "See how CDerma is helping people maintain clear, comfortable, and well-hydrated skin.": "सिडर्माले मानिसहरूलाई कसरी सफा, आरामदायी र हाइड्रेटेड छाला राख्न मद्दत गरिरहेको छ हेर्नुहोस्।",
  "Verified Buyer · Pokhara": "प्रमाणित खरिदकर्ता · पोखरा",
  "Verified Buyer · Kathmandu": "प्रमाणित खरिदकर्ता · काठमाडौँ",
  "Verified Buyer · Biratnagar": "प्रमाणित खरिदकर्ता · विराटनगर",
  "Verified Buyer · Butwal": "प्रमाणित खरिदकर्ता · बुटवल",
  "Calmed burning, itching, and redness caused by Kathmandu dust and strong mountain sun within 48 hours of use.": "काठमाडौँको धुलो र कडा हिमाली घामले गर्दा भएको पोलाइ, चिलाउने र रातोपन ४८ घण्टाभित्र शान्त भयो।",
  "Fewer dry flaky spots around the nose and cheeks, smoother texture, and lasting radiant glow.": "नाक र गाला वरिपरिको फुस्रोपन हरायो, छाला नरम भयो र प्राकृतिक चमक आयो।",
  "Proven to lock in skin moisture and stop dryness from winter cold and air pollution.": "जाडोको चिसो हावा र वायु प्रदूषणबाट छालालाई जोगाएर दिनभर ओसिलो राख्न प्रमाणित।",
  "No sticky feeling, no greasy residue, and no clogged pores. This lightweight serum sinks straight into your skin within seconds, leaving it soft, smooth, and deeply hydrated.": "कुनै टाँसिने वा चिल्लो अवशेष रहँदैन, छिद्रहरू बन्द हुँदैनन्। यो हल्का सिरम केही सेकेन्डमै छालामा सोसिन्छ र छालालाई कोमल तथा हाइड्रेटेड बनाउँछ।",
  "Imported High-Grade Formulations. Built Around Quality.": "उच्च गुणस्तरीय आयातित फर्मुलेशन। गुणस्तरमा आधारित।",
  "CDerma imports certified pharmaceutical-grade active ingredients, clinical compounds, and precision packaging from internationally accredited laboratories, formulated and cleanroom-batched at our Itahari facility under stringent quality quarantine.": "सिडर्माले अन्तर्राष्ट्रिय मान्यता प्राप्त प्रयोगशालाहरूबाट प्रमाणित फर्मास्युटिकल-ग्रेड सक्रिय तत्वहरू, क्लिनिकल कम्पाउन्डहरू र प्याकेजिङ आयात गरी इटहरीस्थित हाम्रो क्लिनरुममा कडा गुणस्तर क्वारेन्टाइन अन्तर्गत तयार गर्दछ।",
  "Certified Global Imports": "प्रमाणित विश्वव्यापी आयात",
  "Active ingredients and peptides imported directly from certified ISO-GMP synthesis laboratories in Europe and Asia.": "युरोप र एसियाका प्रमाणित ISO-GMP प्रयोगशालाहरूबाट प्रत्यक्ष आयात गरिएका सक्रिय तत्व र पेप्टाइडहरू।",
  "Gravimetric Accuracy": "ग्राभिमेट्रिक शुद्धता",
  "Micrometer dosing scales ensuring exact active concentrations down to 0.01g variances per 100L vat.": "प्रत्येक १०० लिटर भ्याटमा ०.०१ ग्रामसम्मको शुद्धता सुनिश्चित गर्ने डिजिटल डोजिङ स्केल।",
  "Stability Incubation": "स्थिरता परीक्षण कक्ष",
  "45-day thermal acceleration chambers simulating regional altitude and heat variations across Nepal.": "नेपालका विभिन्न उचाइ र मौसमी तापक्रम अनुकरण गर्ने ४५ दिने थर्मल परीक्षण च्याम्बर।",
  "Traceability QR": "ट्र्याकिङ QR कोड",
  "Individual serialized tamper-proof seals linking directly to certified laboratory release paperwork.": "आधिकारिक प्रयोगशाला कागजातसँग प्रत्यक्ष जोडिएका सुरक्षित सिरियलाइज्ड सिलहरू।",
  "Manufacturing & Distribution": "उत्पादन तथा वितरण केन्द्र",
  "Formulated with Care in Our Itahari Facility.": "हाम्रो इटहरी केन्द्रमा पूर्ण सावधानीका साथ तयार पारिएको।",
  "State-of-the-art cleanroom environment following international cosmetic standards. Controlled temperature, sterile air filtration, and strict quality checks.": "अन्तर्राष्ट्रिय मापदण्ड पालना गर्ने अत्याधुनिक क्लिनरुम वातावरण। नियन्त्रित तापक्रम, फिल्टर गरिएको हावा र कडा गुणस्तर जाँच।",
  "Standard: Cleanroom ISO Class 7": "मापदण्ड: क्लिनरुम ISO क्लास ७",
  "From Itahari to Skincare Shelves Across Nepal.": "इटहरीदेखि नेपालभरका स्किनकेयर काउन्टरहरूसम्म।",
  "Our temperature-monitored logistics network ensures prompt weekly stock replenishment for verified pharmacies, physician practices, and beauty establishments throughout the nation.": "हाम्रो तापक्रम नियन्त्रित आपूर्ति सञ्जालले देशभरका प्रमाणित फार्मेसी, क्लिनिक र ब्युटी स्टोरहरूमा साप्ताहिक स्टक पुनःपूर्ति सुनिश्चित गर्दछ।",
  "Grow Your Business With CDerma.": "सिडर्मासँग आफ्नो व्यवसाय विस्तार गर्नुहोस्।",
  "We partner with premier cosmetic stores, beauty retailers, licensed dermatologists, aesthetic clinics, and retail pharmacies across Nepal. Access structured wholesale pricing, tester units, luxury counter merchandisers, and staff product education.": "हामी नेपालभरका प्रतिष्ठित कस्मेटिक स्टोर, ब्युटी रिटेलर, छाला विशेषज्ञ, एस्थेटिक क्लिनिक र फार्मेसीहरूसँग सहकार्य गर्दछौं। विशेष थोक मूल्य, टेस्टर युनिट, काउन्टर डिस्प्ले र कर्मचारी तालिम प्राप्त गर्नुहोस्।",
  "Wholesale Inquiry Form": "थोक सोधपुछ फारम",
  "Wholesale Partnerships": "थोक साझेदारी",
  "Partner with CDerma for Your Store or Clinic.": "आफ्नो पसल वा क्लिनिकका लागि सिडर्मासँग साझेदारी गर्नुहोस्।",
  "We supply genuine, certified skincare to cosmetic shops, beauty stores, pharmacies, and skin clinics across Nepal. Enjoy official retailer benefits, marketing materials, and dedicated supply support.": "हामी नेपालभरका कस्मेटिक पसल, ब्युटी स्टोर, फार्मेसी र छाला क्लिनिकहरूमा प्रमाणित छाला हेरचाह उत्पादनहरू आपूर्ति गर्छौं। आधिकारिक खुद्रा विक्रेता लाभ, प्रचार सामग्री र समर्पित समर्थन प्राप्त गर्नुहोस्।",
  "Register as a Retail Partner": "खुद्रे साझेदारको रूपमा दर्ता हुनुहोस्",
  "Order Wholesale on WhatsApp": "ह्वाट्सएपमा थोक अर्डर गर्नुहोस्",
  "Official Wholesale Pricing": "आधिकारिक थोक मूल्य",
  "Guaranteed Genuine Products": "१००% असली उत्पादनको ग्यारेन्टी",
  "Fast Delivery Across Nepal": "नेपालभर द्रुत डेलिभरी",
  "Cosmetic stores, beauty retailers, and clinics can request wholesale onboarding kits and tester displays.": "कस्मेटिक स्टोर, ब्युटी रिटेलर र क्लिनिकहरूले थोक अनबोर्डिङ किट र टेस्टर डिस्प्ले मगाउन सक्नुहुन्छ।",
  "Transparency & Clinical FAQs": "पारदर्शिता र क्लिनिकल प्रश्नोत्तर",
  "Frequently Asked Questions": "धेरै सोधिने प्रश्नहरू",
  "Everything you need to know about our products, ingredients, and delivery.": "हाम्रा उत्पादनहरू, सामग्री र डेलिभरीका बारेमा जान्नुपर्ने सबै कुरा।",
  "Clear answers regarding our formulations, safety evaluations, and facility operations.": "हाम्रा फर्मुलेसन, सुरक्षा मूल्याङ्कन र प्रयोगशाला सञ्चालन सम्बन्धी स्पष्ट उत्तरहरू।",
  "Where can I buy CDerma products in Nepal?": "नेपालमा सिडर्माका उत्पादनहरू कहाँ किन्न सकिन्छ?",
  "CDerma products are available through authorized cosmetic stores, beauty retailers, and partner skin clinics in Kathmandu, Lalitpur, Pokhara, Biratnagar, Itahari, Butwal, and other major cities. You can also order directly via WhatsApp at +977 9820753751.": "सिडर्माका उत्पादनहरू काठमाडौँ, ललितपुर, पोखरा, विराटनगर, इटहरी, बुटवल लगायतका प्रमुख सहरहरूका अधिकृत कस्मेटिक पसल, ब्युटी रिटेलर र छाला क्लिनिकहरूमा उपलब्ध छन्। तपाईंले +९७७ ९८२०७५३७५१ मा ह्वाट्सएप मार्फत प्रत्यक्ष अर्डर पनि गर्न सक्नुहुन्छ।",
  "Are CDerma products suitable for sensitive skin?": "के सिडर्माका उत्पादनहरू संवेदनशील छालाका लागि उपयुक्त छन्?",
  "Yes. Every CDerma formula is dermatologically formulated to be gentle, fragrance-free, paraben-free, and non-comedogenic (won’t clog pores).": "हो। प्रत्येक सिडर्मा फर्मुला कोमल, सुगन्ध-रहित, प्याराबेन-रहित र छिद्र नथुन्ने (नन-कमेडोजेनिक) हुने गरी बनाइएको छ।",
  "How can my cosmetic shop or clinic become an authorized retailer?": "मेरो कस्मेटिक पसल वा क्लिनिक कसरी अधिकृत बिक्रेता बन्न सक्छ?",
  "Visit our B2B page or contact us on WhatsApp (+977 9820753751). We offer competitive wholesale rates, display stands, and promotional materials for certified stores across Nepal.": "हाम्रो बी२बी पृष्ठमा जानुहोस् वा ह्वाट्सएप (+९७७ ९८२०७५३७५१) मा सम्पर्क गर्नुहोस्। हामी नेपालभरका प्रमाणित पसलहरूका लागि आकर्षक थोक मूल्य, डिस्प्ले स्ट्यान्ड र प्रचार सामग्री प्रदान गर्दछौं।",
  "Where are CDerma products manufactured and tested?": "सिडर्माका उत्पादनहरू कहाँ निर्माण र परीक्षण गरिन्छ?",
  "CDerma products are imported and formulated at our facility in Itahari, Sunsari, Koshi Province, Nepal. Each batch undergoes rigorous testing for pH balance, microbial purity, and heavy metal safety.": "सिडर्माका उत्पादनहरू इटहरी, सुनसरी, कोशी प्रदेशमा रहेको हाम्रो केन्द्रमा तयार गरिन्छ। प्रत्येक ब्याचको pH सन्तुलन, माइक्रोबियल शुद्धता र हेभी मेटल सुरक्षाको कडा परीक्षण गरिन्छ।",
  "Elevate your daily regimen with doctor-recommended care.": "डाक्टरद्वारा सिफारिस गरिएको गुणस्तरीय छाला हेरचाह अपनाउनुहोस्।",
  "Experience clinical purity formulated right here in Nepal. Formulations are accessible through certified dermatology clinics, physician networks, and authorized hospital pharmacies nationwide.": "नेपालमै विशेष रूपमा तयार गरिएको क्लिनिकल शुद्धता अनुभव गर्नुहोस्। हाम्रा उत्पादनहरू देशभरिका प्रमाणित छाला क्लिनिक, चिकित्सक सञ्जाल र अधिकृत फार्मेसीहरूमा उपलब्ध छन्।",
  "Professional skincare, made with care in Itahari, Nepal. Supplying premier cosmetic stores, beauty retailers, certified clinics, and dermatologists across Nepal.": "इटहरी, नेपालमा विशेष सावधानीका साथ उत्पादित व्यावसायिक छाला हेरचाह। नेपालभरका प्रमुख कस्मेटिक स्टोर, ब्युटी रिटेलर, क्लिनिक र छाला विशेषज्ञहरूलाई आपूर्ति गरिन्छ।",
  "Doctor-Recommended Face Care Formulations": "चिकित्सकद्वारा सिफारिस गरिएको फेस केयर संग्रह",
  "Prescription-Grade Barrier Serums, Restorative Creams & Photoprotection": "उच्च गुणस्तरको ब्यारियर सिरम, रिस्टोरेटिभ क्रिम र सन केयर",
  "Our Complete Face Care & Daily Essentials": "हाम्रो पूर्ण फेस केयर तथा दैनिक संग्रह",
  "The CDerma Purity Mandate": "सिडर्मा शुद्धता प्रतिबद्धता",
  "Zero compromise on clinical safety and ingredient transparency.": "क्लिनिकल सुरक्षा र सामग्रीको पारदर्शितामा कुनै सम्झौता छैन।",
  "All Products": "सबै उत्पादनहरू",
  "Barrier Repair": "ब्यारियर मर्मत",
  "Hydration": "हाइड्रेशन",
  "Cleansers": "क्लिन्जर",
  "Photoprotection": "सन केयर",
  "Corrective Treatments": "उपचारात्मक सिरम",
  "Sun Care & Photoprotection": "सन केयर तथा फोटोप्रोटेक्सन",
  "Pure cica and 5% niacinamide to quickly calm redness, soothe irritation, and protect the skin barrier.": "रातोपन छिट्टै शान्त पार्न, जलन कम गर्न र छालाको ब्यारियर जोगाउन शुद्ध सिका र ५% नियासिनामाइड।",
  "Specially created to deeply soothe damaged skin, calm irritation after sunburn or cosmetic treatments, and rebuild the natural protective barrier.": "क्षतिग्रस्त छालालाई गहिरो शान्ति दिन, घामले डढेको वा कस्मेटिक उपचारपछिको जलन कम गर्न र छालाको सुरक्षात्मक तह पुनः निर्माण गर्न विशेष निर्मित।",
  "Dew-Lock Texture": "ओसिलो मखमली बनावट",
  "Natural Aroma": "प्राकृतिक सुगन्ध",
  "Fast Soothing Relief": "तत्काल शान्त र आराम",
  "Deep All-Day Hydration": "दिनभर गहिरो हाइड्रेशन",
  "Healthier, Bouncier Skin": "स्वस्थ, लचिलो र चम्किलो छाला",
  "Post-Treatment Care Protocol": "उपचारपछिको हेरचाह प्रोटोकल",
  "Clinical Efficacy & Results": "प्रमाणित क्लिनिकल प्रभावकारिता",
  "Key Bioactive Ingredients": "प्रमुख सक्रिय सामग्रीहरू",
  "How To Apply": "प्रयोग गर्ने तरिका",
  "Full Ingredients (INCI)": "सम्पूर्ण सामग्री सूची (INCI)",
  "Frequently Asked Questions About This Product": "यस उत्पादन सम्बन्धी प्रायः सोधिने प्रश्नहरू",
  "Dispense 3-4 drops directly onto dry fingertips. Press gently across forehead, cheeks, and neck until fully absorbed.": "सुख्खा औंलाको टुप्पोमा ३–४ थोपा लिनुहोस्। पूर्ण रूपमा नसोसिउञ्जेल निधार, गाला र घाँटीमा बिस्तारै थिच्नुहोस्।",
  "Precision Formulation & Purity Standards": "सटीक फर्मुलेशन र शुद्धता मापदण्ड",
  "The science behind CDerma: pure Himalayan bio-actives, pharmaceutical-grade cleanroom compounding, and verified dermatological safety.": "सिडर्माको पछाडिको विज्ञान: शुद्ध हिमालयन बायो-एक्टिभ्स, फर्मास्यूटिकल-ग्रेड क्लिनरुम उत्पादन र प्रमाणित डर्माटोलोजिकल सुरक्षा।",
  "The Five Pillars of CDerma Formulation": "सिडर्मा फर्मुलेसनका पाँच आधारभूत सिद्धान्तहरू",
  "Koshi Alpine Extraction: Preserving Delicate Triterpenoids": "कोशी अल्पाइन निष्कर्षण: ट्राइटरपेनोइड्सको सुरक्षा",
  "Conventional high-heat distillation destroys the fragile anti-inflammatory triterpenoids in Centella Asiatica. CDerma uses a sub-critical botanical extraction process at our Sunsari laboratory that preserves 98.4% of natural bioactive potency.": "परम्परागत उच्च तापक्रमको डिस्टिलेसनले सेन्टेला एसियाटिकामा रहेका कमजोर एन्टि-इन्फ्लेमेटरी ट्राइटरपेनोइड्स नष्ट गर्दछ। सिडर्माले सुनसरीस्थित प्रयोगशालामा सब-क्रिटिकल बोटानिकल निष्कर्षण प्रक्रिया प्रयोग गरी ९८.४% प्राकृतिक सक्रियता सुरक्षित राख्छ।",
  "Sustainably foraged between 1,400m and 2,200m altitude in Eastern Nepal.": "पूर्वी नेपालको १,४०० देखि २,२०० मिटरको उच्च भूभागबाट दिगो रूपमा संकलित।",
  "Guaranteed price stability paid directly to indigenous cultivators across Koshi.": "कोशी क्षेत्रका स्थानीय कृषकहरूलाई सिधै उचित मूल्य भुक्तानीको ग्यारेन्टी।",
  "Authorized Clinics & Store Locator": "अधिकृत क्लिनिक तथा स्टोर लोकेटर",
  "Find genuine CDerma products at verified dermatology clinics and authorized cosmetic retailers across Nepal.": "नेपालभरका प्रमाणित छाला क्लिनिक र अधिकृत कस्मेटिक पसलहरूमा असली सिडर्मा उत्पादनहरू प्राप्त गर्नुहोस्।",
  "Search by cosmetic store, clinic, city, or district...": "कस्मेटिक पसल, क्लिनिक, शहर वा जिल्ला खोज्नुहोस्...",
  "All Locations": "सबै स्थानहरू",
  "Kathmandu Valley": "काठमाडौँ उपत्यका",
  "Koshi Province": "कोशी प्रदेश",
  "Gandaki & West": "गण्डकी तथा पश्चिम",
  "Become a Stockist": "अधिकृत बिक्रेता बन्नुहोस्",
  "How Clinical Prescriptions & Dispensation Work": "क्लिनिकल सिफारिस र वितरण कसरी काम गर्छ",
  "Clinical Skin Evaluation": "क्लिनिकल छाला परीक्षण",
  "Visit any authorized dermatologist or hospital aesthetic unit for barrier health analysis.": "ब्यारियर स्वास्थ्य परीक्षणका लागि कुनै पनि अधिकृत छाला विशेषज्ञ वा अस्पताल एस्थेटिक युनिटमा जानुहोस्।",
  "Personalized Regimen": "व्यक्तिगत छाला हेरचाह तालिका",
  "Receive a customized CDerma product routine tailored to your specific dermal condition.": "आफ्नो छालाको अवस्था अनुसार व्यक्तिगत सिडर्मा दिनचर्या प्राप्त गर्नुहोस्।",
  "Verified Dispensation": "प्रमाणित आधिकारिक वितरण",
  "Purchase exclusively from authorized pharmacy and clinic dispensary points across Nepal.": "नेपालभरिका अधिकृत फार्मेसी र क्लिनिक वितरण केन्द्रहरूबाट मात्र खरिद गर्नुहोस्।",
  "Cold-chain authenticated batches guaranteed": "कोल्ड-चेन प्रमाणित ब्याचहरूको १००% ग्यारेन्टी",
  "B2B Distribution & Wholesale Partnership": "बी२बी वितरण तथा थोक साझेदारी",
  "Direct manufacturer pricing for cosmetic stores, pharmacies, beauty salons, and dermatology clinics across all 7 provinces of Nepal.": "नेपालका सबै ७ प्रदेशका कस्मेटिक स्टोर, फार्मेसी, सैलुन र छाला क्लिनिकहरूका लागि प्रत्यक्ष उत्पादक थोक मूल्य।",
  "Engineered for Cosmetic Retailers, Practitioners & Patient Trust": "कस्मेटिक खुद्रा बिक्रेता, चिकित्सक र ग्राहक विश्वासका लागि निर्मित",
  "Unlike imported dermaceuticals prone to erratic border holdups and grey-market diversion, CDerma provides verifiable, batch-authenticated inventory distributed from our central formulation hub in Itahari. Every SKU ships with complete Certificate of Analysis documentation.": "आयातित उत्पादनहरूमा हुने सीमा अवरोध र नक्कली सामानको जोखिमविपरीत, सिडर्माले इटहरीस्थित केन्द्रीय वितरण केन्द्रबाट ब्याच-प्रमाणित सामान उपलब्ध गराउँछ। प्रत्येक उत्पादनसँग आधिकारिक गुणस्तर प्रमाणपत्र (COA) समावेश हुन्छ।",
  "Apply for Wholesale Account": "थोक खाताका लागि आवेदन दिनुहोस्",
  "Request Sample Kit": "नमुना किट अनुरोध गर्नुहोस्",
  "Daily replenishment in Tier 1 & 2 hubs": "प्रमुख सहरहरूमा दैनिक स्टक पुनःपूर्ति",
  "Prescribed across procedural suites": "क्लिनिकल प्रक्रियाहरूमा चिकित्सकद्वारा सिफारिस",
  "Direct from Koshi GMP manufacturing lab": "कोशी GMP उत्पादन केन्द्रबाट सिधै आपूर्ति",
  "Zero cross-border supply bottlenecks": "कुनै सीमा अवरोधबिना भरपर्दो निरन्तर आपूर्ति",
  "Business Name": "व्यवसाय / फर्मको नाम",
  "PAN / VAT Registration Number": "प्यान / भ्याट दर्ता नम्बर",
  "Business Type": "व्यवसायको प्रकार",
  "Contact Person": "सम्पर्क व्यक्तिको नाम",
  "Work Email": "इमेल ठेगाना",
  "Mobile / WhatsApp Number": "मोबाइल / ह्वाट्सएप नम्बर",
  "Province": "प्रदेश",
  "Estimated Monthly Volume": "अनुमानित मासिक परिमाण",
  "Request CDerma Professional Sample Kit (Includes tester bottles & monographs)": "सिडर्मा व्यावसायिक नमुना किट अनुरोध गर्नुहोस् (टेस्टर र मोनोग्राफ समावेश)",
  "Submit Wholesale Application": "थोक साझेदारी आवेदन पेश गर्नुहोस्",
  "Submitting Application...": "आवेदन पेश हुँदैछ...",
  "Clinical Monographs & Doctor's Advice": "क्लिनिकल मोनोग्राफ तथा डाक्टरको सल्लाह",
  "Peer-reviewed dermatological guides, ingredient monographs, and clinical treatment protocols for healthcare professionals and skincare enthusiasts in Nepal.": "नेपालका स्वास्थ्यकर्मी तथा छाला प्रेमीहरूका लागि प्रमाणित डर्माटोलोजिकल गाइड, सामग्री मोनोग्राफ र क्लिनिकल उपचार प्रोटोकल।",
  "5 Things Doctors Want You to Know About Your Skin": "डाक्टरहरू तपाईंले आफ्नो छालाबारे जान्न चाहने ५ कुराहरू",
  "Why Your Skin Keeps Feeling Dry — Even After Moisturising": "मोइस्चराइजर लगाउँदा पनि तपाईंको छाला किन सुख्खा भइरहन्छ",
  "All Articles": "सबै लेखहरू",
  "The Best Time to Apply Your Moisturiser (Most People Get This Wrong)": "मोइस्चराइजर लगाउने सही समय (धेरैले यहाँ गल्ती गर्छन्)",
  "Timing matters more than you think. Applying moisturiser on damp skin locks in 3x more water than applying on dry skin.": "समयको महत्त्व तपाईंले सोचेभन्दा बढी छ। ओसिलो छालामा मोइस्चराइजर लगाउँदा सुख्खा छालाको तुलनामा ३ गुणा बढी पानी सुरक्षित रहन्छ।",
  "What Actually Causes Pimples — And What You Can Do About It": "डण्डीफोर आउनुको वास्तविक कारण र यसको प्रभावकारी समाधान",
  "Read Article": "लेख पढ्नुहोस्",
  "5 min read": "५ मिनेट पढाइ",
  "4 min read": "४ मिनेट अध्ययन",
  "6 min read": "६ मिनेट अध्ययन",
  "7 min read": "७ मिनेट अध्ययन",
  "Medical Guidance": "चिकित्सकीय मार्गदर्शन",
  "Clinical Dermatology": "क्लिनिकल डर्माटोलोजी",
  "Post-Procedure Care": "उपचारपछिको हेरचाह",
  "Verify NMC Credentials": "NMC परिचयपत्र प्रमाणीकरण",
  "Dermatological Range": "डर्माटोलोजिकल उत्पादन दायरा",
  "Barrier Support Serum": "ब्यारियर सपोर्ट सिरम",
  "Balancing Gel Cleanser": "ब्यालेन्सिङ जेल क्लिन्जर",
  "Ceramide Deep Cream": "सिरामाइड डिप क्रिम",
  "High-Altitude Shield SPF 50": "हाई-अल्टिच्यूड शिल्ड SPF 50",
  "Non-nano Zinc + Ectoin Shield": "नन-नानो जिंक + एक्टोइन सुरक्षा",
  "Spec COA (PDF)": "विस्तृत COA रिपोर्ट (PDF)",
  "LOT NO. 0442-NP": "ब्याच नं. 0442-NP",
  "Batch Integrity Verified": "ब्याच शुद्धता प्रमाणित",
  "Dermatologist Evaluated": "छाला विशेषज्ञद्वारा मूल्याङ्कन गरिएको",
  "Cold-Chain Bottled · Koshi": "कोल्ड-चेन बोटलिङ · कोशी",
  "Sensory Formulation Profile": "संवेदी बनावट विशेषता",
  "Tactile Finish: Zero Grease": "अनुभूति: शून्य चिल्लोपन",
  "Micro-Emulsion Tech": "माइक्रो-इमल्सन प्रविधि",
  "Silky Golden Serum:": "रेशमी गोल्डेन सिरम:",
  "Instant Calming": "तत्काल शान्त",
  "Velvet Ceramide Cream:": "मखमली सिरामाइड क्रिम:",
  "24h Barrier Seal": "२४ घण्टे ब्यारियर सुरक्षा",
  "Preparation": "तयारी",
  "Step 1": "चरण १",
  "Step 2": "चरण २",
  "Step 3": "चरण 3",
  "Step 4": "चरण ४",
  "Treatment": "उपचार",
  "Moisture Lock": "ओस सुरक्षा",
  "Environmental Defense": "वातावरणीय सुरक्षा",
  "Dermatological Protocol": "डर्माटोलोजिकल प्रोटोकल",
  "VERIFIED THROUGH CDERMA CLINICAL REGISTRY · ID #BRT-441": "सिडर्मा क्लिनिकल रजिस्ट्री मार्फत प्रमाणित · आईडी #BRT-441",
  "VERIFIED THROUGH CDERMA CLINICAL REGISTRY · ID #PKR-302": "सिडर्मा क्लिनिकल रजिस्ट्री मार्फत प्रमाणित · ID #PKR-302",
  "VERIFIED THROUGH CDERMA CLINICAL REGISTRY · ID #KTM-891": "सिडर्मा क्लिनिकल रजिस्ट्री मार्फत प्रमाणित · ID #KTM-891",
  "Western Skin Clinic, Pokhara": "वेस्टर्न स्किन क्लिनिक, पोखरा",
  "Dr. A. Bastola, MD": "डा. ए. बास्तोला, एमडी",
  "Home / Products": "गृहपृष्ठ / उत्पादनहरू",
  "Filter by Concern:": "समस्या अनुसार छान्नुहोस्:",
  "Physiological Balancing Gel Cleanser": "फिजियोलोजिकल ब्यालेन्सिङ जेल क्लिन्जर",
  "Ceramide Deep Barrier Cream": "सिरामाइड डिप ब्यारियर क्रिम",
  "High-Altitude Mineral Shield SPF 50+": "हाई-अल्टिच्यूड मिनरल शिल्ड SPF 50+",
  "Multi-Depth Hyaluronic Hydrating Mist": "मल्टि-डेप्थ हायलुरोनिक हाइड्रेटिङ मिस्ट",
  "Overnight Cellular Resurfacing Elixir": "ओभरनाइट सेल्युलर रिसर्फेसिङ एलिक्जिर",
  "150ml Pump Bottle · Ultra-Gentle Daily Purifier": "१५० मिलि पम्प बोतल · कोमल दैनिक क्लिन्जर",
  "50ml Jar · Multi-Ceramide Lipid Complex": "५० मिलि जार · मल्टि-सिरामाइड लिपिड कम्प्लेक्स",
  "50ml Tube · 18.5% Zinc Oxide & Ectoin": "५० मिलि ट्युब · १८.५% जिंक अक्साइड र एक्टोइन",
  "100ml Fine Mist · Osmotic Cellular Rehydration": "१०० मिलि मिस्ट · कोषीय गहिरो हाइड्रेशन",
  "30ml Pipette Bottle · Encapsulated Retinaldehyde": "३० मिलि बोतल · क्याप्सुलेटेड रेटिनालडिहाइड",
  "Formula No. 01": "फर्मुला नं. ०१",
  "Formula No. 04": "फर्मुला नं. ०४",
  "Formula No. 07": "फर्मुला नं. ०७",
  "Formula No. 09": "फर्मुला नं. ०९",
  "Formula No. 11": "फर्मुला नं. ११",
  "Formula No. 14": "फर्मुला नं. १४",
  "Sulfate-Free Cleanser": "सल्फेट-रहित क्लिन्जर",
  "Flagship Restorative Formula": "प्रमुख पुनःस्थापना फर्मुला",
  "Deep Daily Moisture": "दैनिक गहिरो मोइस्चर",
  "Broad Spectrum PA++++": "ब्रड स्पेक्ट्रम PA++++",
  "Cellular Barrier Mist": "कोषीय ब्यारियर मिस्ट",
  "Night Resurfacing Serum": "रात्रिकालीन उपचारात्मक सिरम",
  "Non-stripping amino acid formula that purifies while preserving natural skin pH.": "छालाको प्राकृतिक pH कायम राख्दै कोमलताका साथ सफा गर्ने अमिनो एसिड फर्मुला।",
  "Deep lipid-barrier restoration with bio-identical ceramides and sub-alpine Centella.": "बायो-आइडेन्टिकल सिरामाइड र सब-अल्पाइन सेन्टेलाद्वारा गहिरो ब्यारियर मर्मत।",
  "3:1:1 physiological lipid ratio locking in 48-hour moisture in harsh climates.": "कडा मौसममा पनि ४८ घण्टासम्म ओस सुरक्षित राख्ने ३:१:१ प्राकृतिक लिपिड अनुपात।",
  "Physical mineral UV shield with zero white cast, crafted for high UV index climates.": "उच्च घामको विकिरणबाट जोगाउने र कुनै सेतो दाग नछोड्ने मिनरल सनस्क्रिन।",
  "Multi-weight hyaluronic acid for instant barrier plumping and hydration recharge.": "तत्काल ब्यारियर प्लम्पिङ र हाइड्रेशनका लागि बहु-आणविक हायलुरोनिक एसिड।",
  "Gentle micro-encapsulated retinal accelerating cellular turnover without peeling.": "छाला नउप्किने गरी कोषिका नवीकरण तीव्र बनाउने कोमल क्याप्सुलेटेड रेटिनाल।",
  "pH 5.5 · Physiological": "pH ५.५ · प्राकृतिक",
  "pH 5.4 · Pure Hydration": "pH ५.४ · शुद्ध हाइड्रेशन",
  "pH 5.8 · Bio-Identical": "pH ५.८ · बायो-आइडेन्टिकल",
  "SPF 50+ · Zero Cast": "SPF ५०+ · कुनै सेतो दाग छैन",
  "pH 5.6 · Osmotic Balance": "pH ५.६ · अस्मोटिक सन्तुलन",
  "pH 6.0 · Micro-Liposomal": "pH ६.० · माइक्रो-लिपोसोमल",
  "Explore Formulation": "फर्मुलेशन हेर्नुहोस्",
  "Download Clinical Monograph": "क्लिनिकल मोनोग्राफ डाउनलोड गर्नुहोस्",
  "Request Clinic Samples": "क्लिनिक नमुना अनुरोध गर्नुहोस्",
  "Catalog / Face Care / Centella Barrier Restore Concentrate": "क्याटलग / फेस केयर / सेन्टेला ब्यारियर रिस्टोर कन्सन्ट्रेट",
  "5% Niacinamide + Alpine Centella": "५% नियासिनामाइड + अल्पाइन सेन्टेला",
  "Clinical Face Care · 30ml / 1.0 fl. oz.": "क्लिनिकल फेस केयर · ३० मिलि",
  "Batch Authenticated": "ब्याच प्रमाणित",
  "In Stock · Direct Dispense": "उपलब्ध · प्रत्यक्ष वितरण",
  "Clinical Summary": "क्लिनिकल सारांश",
  "Key Benefits": "मुख्य फाइदाहरू",
  "Clinical Efficacy": "क्लिनिकल प्रभावकारिता",
  "How to Use": "प्रयोग विधि",
  "Full INCI": "सम्पूर्ण सामग्री",
  "Downloads": "कागजात",
  "94%": "९४%",
  "Barrier Recovery in 72h": "७२ घण्टामा ब्यारियर मर्मत",
  "5.0%": "५.०%",
  "Pure Niacinamide": "शुद्ध नियासिनामाइड",
  "pH 5.4": "pH ५.४",
  "Physiological Match": "प्राकृतिक छाला अनुकूल",
  "100%": "१००%",
  "Fragrance-Free": "सुगन्ध-रहित",
  "Find an Authorized Clinic": "अधिकृत क्लिनिक खोज्नुहोस्",
  "Request Wholesale Samples": "थोक नमुना अनुरोध गर्नुहोस्",
  "Clinical Routine Placement": "क्लिनिकल दिनचर्या तालिका",
  "Formulated as Step 3 in your restorative regimen. Safe for morning and evening post-cleanse application.": "तपाईंको छाला पुनःस्थापना दिनचर्यामा चरण ३ को रूपमा प्रयोग गर्नुहोस्। बिहान र बेलुका सुरक्षित प्रयोग गर्न सकिने।",
  "Purify": "सफा गर्नुहोस्",
  "Prepare": "तयारी गर्नुहोस्",
  "Barrier Restore Concentrate": "ब्यारियर रिस्टोर कन्सन्ट्रेट",
  "Occlude & Protect": "सुरक्षा र सनस्क्रिन",
  "Gentle Amino-Acid Hydrating Foam Cleanser (pH 5.5).": "कोमल अमिनो-एसिड हाइड्रेटिङ फोम क्लिन्जर (pH ५.५)।",
  "Himalayan Botanical Calming Mist or Dermal Toner.": "हिमालयन बोटानिकल काल्मिङ मिस्ट वा डर्मल टोनर।",
  "Lipid Repair Balm at night, Mineral Broad-Spectrum SPF 50 during daylight.": "राती लिपिड रिपेयर बाम र दिउँसो मिनरल सनस्क्रिन SPF ५० प्रयोग गर्नुहोस्।",
  "For compromised skin post-microneedling, laser resurfacing, or harsh tretinoin acclimation: apply 2 drops morning and evening directly after a sterile water rinse. Avoid AHA/BHA exfoliants during the initial 7 days of barrier restoration.": "माइक्रोनिडलिङ, लेजर वा कडा औषधीपछिको संवेदनशील छालाका लागि: सफा पानीले मुख धोएर बिहान र बेलुका २ थोपा लगाउनुहोस्। सुरुवाती ७ दिनसम्म अन्य कडा एक्सफोलिएन्ट प्रयोग नगर्नुहोस्।",
  "Formula Architecture & Quantitative Potency": "फर्मुला संरचना र सक्रिय क्षमता",
  "In alignment with our clinical ethics, every bioactive percentage is transparently declared. No proprietary filler blends or obfuscated fragrance masking.": "हाम्रो क्लिनिकल नैतिकता अनुसार प्रत्येक सक्रिय तत्वको प्रतिशत पारदर्शी रूपमा खुलाइएको छ। कुनै अनावश्यक मिसावट वा कृत्रिम सुगन्ध छैन।",
  "Real Results You Can See and Feel in 28 Days": "२८ दिनमै देख्न र महसुस गर्न सकिने वास्तविक नतिजा",
  "Tested with 80 Nepali men & women in Kathmandu & Patan": "काठमाडौँ र पाटनका ८० नेपाली महिला तथा पुरुषहरूमा परीक्षण गरिएको",
  "4-Week Visible Hydration Study": "४-हप्ते देखिने हाइड्रेशन अध्ययन",
  "Consultant Dermatologist & Dermo-Surgeon": "कन्सल्टेन्ट डर्माटोलोजिस्ट तथा डर्मो-सर्जन",
  "NMC Reg: 9482 / Kathmandu Skin Institute": "NMC दर्ता: ९४८२ / काठमाडौँ स्किन इन्स्टिच्युट",
  "Dr. Arpana Karki, MD": "डा. अर्पणा कार्की, एमडी",
  "Koshi Cleanroom Formulation Facility": "कोशी क्लिनरुम उत्पादन केन्द्र",
  "Cleanroom Protocols": "क्लिनरुम प्रोटोकलहरू",
  "Active Fraction Analyzed": "सक्रिय अंश विश्लेषण",
  "Centella Asiatica (Gotu Kola)": "सेन्टेला एसियाटिका (घोडताप्रे)",
  "Positive Pressure & HEPA H14": "पोजिटिभ प्रेसर र HEPA H14 फिल्टर",
  "3:1:1:1 Stratum Corneum Ratio": "३:१:१:१ प्राकृतिक ब्यारियर अनुपात",
  "Altitude & Climate Stress Test": "उचाइ र मौसमी दबाब परीक्षण",
  "Zero-Tolerance Microbial Screening": "शून्य-सहनशीलता माइक्रोबियल जाँच",
  "Direct Clinic Cold-Chain Distribution": "प्रत्यक्ष क्लिनिक कोल्ड-चेन वितरण",
  "Public Batch Verification & Assay Portal": "सार्वजनिक ब्याच प्रमाणीकरण तथा परीक्षण पोर्टल",
  "Schedule a Technical Cleanroom Inspection": "क्लिनरुम अवलोकन तालिका बनाउनुहोस्",
  "We welcome dermatologists, plastic surgeons, clinical pharmacists, and healthcare enterprise partners to inspect our facilities in Itahari, Koshi Province.": "हामी छाला विशेषज्ञ, प्लास्टिक सर्जन, क्लिनिकल फार्मासिस्ट र अस्पताल साझेदारहरूलाई इटहरी, कोशी प्रदेशस्थित हाम्रो केन्द्रको भ्रमण गर्न स्वागत गर्दछौं।",
  "Air cascaded at 25 Pascals over 4 clean zones ensures zero air contaminants during active filling.": "४ वटा सफा जोनहरूमा २५ पास्कलको हावा प्रवाहले बोटलिङको समयमा शून्य प्रदूषण सुनिश्चित गर्दछ।",
  "Formulated to mirror human epidermal lipids exactly: Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, and Free Fatty Acids.": "मानव छालाको प्राकृतिक लिपिड संरचनासँग हुबहु मिल्ने: सिरामाइड NP, AP, EOP, फाइटोस्फिङ्गोसिन र फ्याटी एसिड।",
  "Every formula undergoes cyclic thermal testing: cycling between 4°C and 45°C across 90 days to guarantee stability across high mountain and Terai heat.": "तराईको गर्मीदेखि हिमालको चिसोसम्मको स्थिरताका लागि प्रत्येक फर्मुला ४°C देखि ४५°C सम्म ९० दिनसम्म परीक्षण गरिन्छ।",
  "Pre-quarantine incubation for bacterial, fungal, and spore-forming contaminants with 0.00 CFU/ml acceptance threshold.": "ब्याक्टेरिया, ढुसी र सूक्ष्म जीवाणुहरूका लागि शून्य सहनशीलतासहित पूर्व-क्वारेन्टाइन परीक्षण।",
  "Potent medical botanicals lose efficacy under hot transport conditions. CDerma batches travel in temperature-regulated insulated units nationwide.": "गर्मीमा जडीबुटीको सक्रियता घट्न नदिन सिडर्माका उत्पादनहरू देशभर तापक्रम नियन्त्रित सुरक्षित युनिटहरूमा ढुवानी गरिन्छ।",
  "Every commercial unit leaving our Itahari cleanroom is stamped with an immutable batch identifier linking to full GC-MS spectral releases.": "हाम्रो इटहरी केन्द्रबाट बाहिरिने प्रत्येक उत्पादनमा आधिकारिक ब्याच कोड र परीक्षण विवरण छापिएको हुन्छ।",
  "Predictable Domestic Supply": "भरपर्दो स्वदेशी आपूर्ति",
  "Protected Retail & Clinical Margins": "संरक्षित खुद्रा तथा क्लिनिकल नाफा",
  "Tester Units, Displays & Doctor Kits": "टेस्टर युनिट, काउन्टर डिस्प्ले र डाक्टर किट",
  "Staff, Esthetician & Beauty Advisor Training": "कर्मचारी र ब्युटी एडभाइजर तालिम",
  "Store & Clinic Locator Listing": "स्टोर तथा क्लिनिक लोकेटरमा सूचीकरण",
  "MD Consultant Dermatologist & Dermal Surgeon": "एमडी कन्सल्टेन्ट डर्माटोलोजिस्ट तथा डर्मल सर्जन",
  "Clinical Advisor, Dermal Barrier Restoration Panel": "क्लिनिकल सल्लाहकार, ब्यारियर रिस्टोरेसन प्यानल",
  "Evaluated across 400+ clinical patch trials in high-altitude terrain.": "उच्च हिमाली भेगमा ४०० भन्दा बढी क्लिनिकल परीक्षणहरूमा मूल्याङ्कन गरिएको।",
  "The Physician Choice Across Kathmandu, Pokhara & Koshi": "काठमाडौँ, पोखरा र कोशीका चिकित्सकहरूको प्रमुख रोजाइ",
  "“CDerma’s Himalayan lipid-barrier complex has transformed our post-procedure recovery protocol. Downtime after fractional CO2 laser is noticeably shortened.”": "“सिडर्माको लिपिड-ब्यारियर कम्प्लेक्सले हाम्रो लेजरपछिको रिकभरी समय उल्लेख्य रूपमा घटाएको छ।”",
  "“Our retail hospital pharmacy dispatches CDerma daily. Patients appreciate having a physician-grade formula manufactured domestically with verified batch testing.”": "“हाम्रो अस्पताल फार्मेसीबाट सिडर्मा दैनिक वितरण हुन्छ। बिरामीहरूले नेपालमै उत्पादित प्रमाणित ब्याच भएको औषधि-स्तरीय फर्मुला निकै रुचाएका छन्।”",
  "Open Your Clinical Wholesale Account": "आफ्नो आधिकारिक थोक खाता खोल्नुहोस्",
  "Join over 160+ medical clinics, dermatology practices, and certified cosmetic retailers dispensing CDerma across Nepal.": "नेपालभर सिडर्मा वितरण गर्ने १६० भन्दा बढी क्लिनिक, फार्मेसी र अधिकृत कस्मेटिक पसलहरूको सञ्जालमा जोडिनुहोस्।",
  "24-Hour Callback Guarantee": "२४-घण्टाभित्र सम्पर्कको ग्यारेन्टी",
  "Complimentary Evaluation Box": "निःशुल्क मूल्याङ्कन किट",
  "Certified clinics receive full-sized retail testers alongside complete technical monographs and patient counseling materials.": "प्रमाणित साझेदारहरूले पूर्ण साइजका टेस्टर, प्राविधिक मोनोग्राफ र बिरामी परामर्श सामग्री निःशुल्क प्राप्त गर्नुहुन्छ।",
  "Application Received": "आवेदन प्राप्त भयो",
  "Thank you for partnering with CDerma Nepal. Your regional territory manager will contact you within 24 business hours.": "सिडर्मा नेपालसँग साझेदारी गर्नुभएकोमा धन्यवाद। हाम्रा क्षेत्रीय प्रबन्धकले २४ घण्टाभित्र सम्पर्क गर्नुहुनेछ।",
  "Direct Dispatch From Koshi Production Labs": "कोशी उत्पादन केन्द्रबाट सिधै आपूर्ति",
  "Continuous temperature-regulated cold dispatch preserving sensitive bioactive triterpenoids across all 7 provinces of Nepal.": "नेपालका सबै ७ प्रदेशहरूमा तापक्रम नियन्त्रित सुरक्षित ढुवानी।",
  "Biratnagar, Dharan & Itahari": "विराटनगर, धरान र इटहरी",
  "Direct courier hand-off from formulation laboratory facility within 12 hours.": "उत्पादन केन्द्रबाट १२ घण्टाभित्र सिधै डेलिभरी।",
  "Kathmandu, Lalitpur & Bhaktapur": "काठमाडौँ, ललितपुर र भक्तपुर",
  "Handled via Naxal Central Depot with dedicated pharmaceutical cold-chain vans.": "नक्साल केन्द्रीय डिपो मार्फत सुरक्षित कोल्ड-चेन भ्यानद्वारा आपूर्ति।",
  "Pokhara, Chitwan, Butwal & Nepalgunj": "पोखरा, चितवन, बुटवल र नेपालगञ्ज",
  "Insulated shock-proof packaging preserving emulsion integrity across mountain highway transit.": "पहाडी सडकको यात्रामा पनि गुणस्तर सुरक्षित राख्ने विशेष इन्सुलेटेड प्याकेजिङ।",
  "2025 CDerma Nepal Formulations Monograph & Price List": "सिडर्मा नेपाल फर्मुलेशन मोनोग्राफ तथा मूल्य सूची",
  "Complete active ingredient profiles, lab pH metrics, clinical contraindications, wholesale slab tiers, and retail dispenser margins.": "सम्पूर्ण सक्रिय सामग्री विवरण, ल्याब pH, थोक मूल्य र खुद्रा नाफा मार्जिन।",
  "Monograph & Lot Assignment": "मोनोग्राफ र ब्याच छनोट",
  "Hospital Counter Collection": "अस्पताल काउन्टरबाट संकलन",
  "Receive your freshly compounded formulation directly at the clinic pharmacy dispensary counter.": "क्लिनिक वा फार्मेसी काउन्टरबाट सिधै ताजा ब्याच प्राप्त गर्नुहोस्।",
  "Your clinician matches specific Himalayan phytochemical actives to your transepidermal water loss (TEWL) score.": "तपाईंको चिकित्सकले छालाको ओसको आवश्यकता अनुसार उपयुक्त सक्रिय फर्मुला छनोट गर्नुहुन्छ।",
  "Himalayan Cleanroom Science Manufactured in Biratnagar": "विराटनगर तथा इटहरीमा उत्पादित हिमालयन क्लिनरुम विज्ञान",
  "Every CDerma bottle originates within our Class 10,000 cleanroom synthesis laboratories in Eastern Nepal.": "सिडर्माको प्रत्येक बोतल पूर्वी नेपालस्थित हाम्रो क्लास १०,००० क्लिनरुम प्रयोगशालामा तयार हुन्छ।",
  "Biratnagar Central Extraction Laboratory": "विराटनगर केन्द्रीय निष्कर्षण प्रयोगशाला",
  "Lot Testing Facility • Koshi Province": "ब्याच परीक्षण केन्द्र • कोशी प्रदेश",
  "Are You a Licensed Medical Clinic or Dermatologist?": "के तपाईं दर्तावाल क्लिनिक वा छाला विशेषज्ञ हुनुहुन्छ?",
  "Join the CDerma authorized hospital and dispensary network. Receive clinical trial sets, monograph binders, and wholesale clinic pricing.": "सिडर्मा अधिकृत अस्पताल तथा क्लिनिक सञ्जालमा आबद्ध हुनुहोस्। क्लिनिकल नमुना, मोनोग्राफ र थोक मूल्य सुविधा पाउनुहोस्।",
  "Wash gently. Over-washing strips your skin's natural oils and makes it produce more oil.": "कोमलताका साथ मुख धुनुहोस्। धेरै पटक धुँदा प्राकृतिक तेल नष्ट भई छाला अझ तैलीय बन्न सक्छ।",
  "Always use sunscreen. Even on cloudy days, UV rays can damage your skin barrier.": "सनस्क्रिन सधैं प्रयोग गर्नुहोस्। बादल लागेको दिनमा पनि UV किरणले छालाको ब्यारियरलाई क्षति पुर्याउन सक्छ।",
  "Drink enough water. Dehydration shows up on your face fast — keep yourself hydrated throughout the day.": "प्रशस्त पानी पिउनुहोस्। शरीरमा पानीको कमी अनुहारमा तुरुन्तै देखिन्छ — दिनभर पर्याप्त पानी पिउनुहोस्।",
  "Sleep heals skin. Your skin repairs itself at night. Poor sleep means a weaker, duller skin barrier.": "निन्द्राले छाला निको पार्छ। राती छालाले कोषिका मर्मत गर्छ। कम निन्द्राले छाला कमजोर र फुस्रो बन्दछ।",
  "Stop touching your face. Your hands carry bacteria and oil. Keep hands off to reduce breakouts.": "अनुहारमा पटक-पटक हात नलगाउनुहोस्। हातका ब्याक्टेरियाले डण्डीफोर निम्त्याउन सक्छन्।",
  "Not Sure What Your Skin Needs? Talk to Our Team.": "तपाईंको छालालाई के चाहिन्छ थाहा छैन? हाम्रो टिमसँग कुरा गर्नुहोस्।",
  "Whether you run a cosmetic store, a clinic, or you just have a question about your own skin, we're here to help.": "तपाईं कस्मेटिक पसल चलाउनुहुन्छ, क्लिनिक वा आफ्नो छालाबारे सल्लाह चाहनुहुन्छ भने हामी सहयोग गर्न तयार छौं।",
  "Ask on WhatsApp": "ह्वाट्सएपमा सोध्नुहोस्",
  "For Cosmetic Stores & Clinics": "कस्मेटिक स्टोर तथा क्लिनिकका लागि",
  "Clinical Monographs": "क्लिनिकल मोनोग्राफ",
  "Niacinamide: The Simple Ingredient That Brightens Skin Without Irritation": "नियासिनामाइड: जलनबिना छाला चम्किलो बनाउने सुरक्षित तत्व",
  "Niacinamide (Vitamin B3) is one of the safest and most effective ingredients in skincare. Here is why doctors recommend it for almost every skin type.": "नियासिनामाइड (भिटामिन B3) छाला हेरचाहमा सबैभन्दा सुरक्षित र प्रभावकारी सामग्री हो। डाक्टरहरूले यसलाई किन सिफारिस गर्छन् जान्नुहोस्।",
  "5 Signs Your Skin Is Sensitive — And How to Calm It Down Fast": "छाला संवेदनशील भएको देखाउने ५ लक्षणहरू र तुरुन्त शान्त पार्ने उपाय",
  "Redness, stinging after washing, or a tight uncomfortable feeling? Your skin is telling you something. Learn the 5 signs and the simple fix.": "रातोपन, मुख धुँदा पोल्ने वा छाला तन्किने समस्या छ? ५ लक्षणहरू र यसको सजिलो समाधान जान्नुहोस्।",
  "Your Perfect Morning Skincare Routine — 3 Steps, 5 Minutes, Done": "तपाईंको उत्तम बिहानी छाला हेरचाह — ३ चरण, ५ मिनेटमै सम्पन्न",
  "You don't need a complicated 12-step routine. A gentle cleanse, a targeted serum, and a reliable sunscreen are all you need for glowing skin.": "तपाईंलाई लामो १२-चरणको झन्झट चाहिँदैन। कोमल क्लिन्जर, उपयुक्त सिरम र भरपर्दो सनस्क्रिन नै पर्याप्त छ।",
  "Why Nepal's Winter Air Damages Your Skin — And the Easy Fix": "नेपालको जाडो हावाले छालालाई किन असर गर्छ — र यसको सजिलो समाधान",
  "Cold, dry air pulls moisture right out of your skin. In Kathmandu and across Nepal, winter means tight, flaky cheeks. Here is how to fix it.": "चिसो र सुख्खा हावाले छालाको आद्रता खोस्छ। जाडोमा छाला फुस्रो हुन नदिन अपनाउनुपर्ने उपायहरू जान्नुहोस्।",
  "Pimples happen when your pores get blocked by oil and dead skin cells. Learn what really works — and the common mistakes that make acne worse.": "छिद्रहरू तेल र मृत छालाले बन्द हुँदा डण्डीफोर आउँछ। के ले वास्तवमा काम गर्छ र के गल्तीहरूले यसलाई बढाउँछन् जान्नुहोस्।",
  "No articles in this category yet. Check back soon!": "यस वर्गमा अहिले कुनै लेख छैन। चाँडै नयाँ लेख थपिनेछ!",
  "CDerma Nepal's complete wholesale formulation catalog. Doctor-recommended clinical face care systems — Centella barrier serums, pH-balanced cleansers, and mineral sunscreens — available for B2B distribution to cosmetic stores, pharmacies, salons, and dermatology clinics across Nepal.": "सिडर्मा नेपालको पूर्ण थोक फर्मुलेशन क्याटलग। चिकित्सकद्वारा सिफारिस गरिएको क्लिनिकल फेस केयर प्रणाली — सेन्टेला ब्यारियर सिरम, pH-सन्तुलित क्लिन्जर र मिनरल सनस्क्रिन — नेपालभरिका कस्मेटिक स्टोर, फार्मेसी, सैलुन तथा छाला क्लिनिकहरूमा बी२बी वितरणका लागि उपलब्ध।",
  "Order an authenticated Retail & Practitioner Onboarding Sample Kit containing all 6 formulations, complete Certificate of Analysis (COA) batch monographs, cosmetic counter displays, and product guidance brochures.": "सबै ६ वटा उत्पादनहरू, पूर्ण प्रयोगशाला विश्लेषण प्रमाणपत्र (COA), काउन्टर डिस्प्ले र उत्पादन ब्रोसरहरू समावेश भएको आधिकारिक खुद्रा तथा चिकित्सक अनबोर्डिङ स्याम्पल किट अर्डर गर्नुहोस्।",
  "CDerma’s Doctor's Advice portal provides peer-reviewed dermatological guidance on skin barrier restoration, acne care, high-altitude sun protection, and physiological hydration customized for individuals living in Nepal's varied climate zones.": "सिडर्माको डाक्टर परामर्श पोर्टलले नेपालका विभिन्न हावापानी क्षेत्रहरूमा बसोबास गर्ने व्यक्तिहरूका लागि छालाको ब्यारियर मर्मत, डण्डिफोरको हेरचाह, उच्च-उचाइको घामबाट सुरक्षा र आद्रता सन्तुलन सम्बन्धी प्रमाण-आधारित मार्गदर्शन प्रदान गर्दछ।",
  "Authentic CDerma products are available online with direct cold-chain dispatch from our Itahari laboratory, and through authorized cosmetic stores and hospital pharmacies across Kathmandu, Pokhara, Biratnagar, and Dharan.": "असली सिडर्मा उत्पादनहरू हाम्रो इटहरी प्रयोगशालाबाट प्रत्यक्ष कोल्ड-चेन डेलिभरी मार्फत अनलाइन उपलब्ध छन्, साथै काठमाडौँ, पोखरा, विराटनगर र धरानका अधिकृत कस्मेटिक पसल तथा अस्पताल फार्मेसीहरूमा पाइन्छन्।",
  "If you've tried three different creams and your face still feels tight and flaky, you're not alone. Many people in Nepal deal with this, especially in winter or at high altitude. The problem usually isn't your moisturiser — it's something happening deeper in your skin barrier.": "यदि तपाईंले विभिन्न क्रिमहरू प्रयोग गर्दा पनि अनुहार तन्किने र फुस्रो हुने समस्या छ भने तपाईं एक्लो हुनुहुन्न। नेपालमा विशेष गरी जाडोयाम र उच्च हिमाली भेगमा धेरै मानिसहरू यस समस्याबाट पीडित छन्। यसको मुख्य कारण मोइस्चराइजर नभई छालाको सुरक्षात्मक पर्खाल (ब्यारियर) कमजोर हुनु हो।",
  "If you've tried three different creams and your face still feels tight and flaky, you're not alone. Many people in Nepal deal with this, especially in winter or at high altitude. The problem usually isn't your moisturiser &mdash; it's something happening deeper in your skin barrier.": "यदि तपाईंले विभिन्न क्रिमहरू प्रयोग गर्दा पनि अनुहार तन्किने र फुस्रो हुने समस्या छ भने तपाईं एक्लो हुनुहुन्न। नेपालमा विशेष गरी जाडोयाम र उच्च हिमाली भेगमा धेरै मानिसहरू यस समस्याबाट पीडित छन्। यसको मुख्य कारण मोइस्चराइजर नभई छालाको सुरक्षात्मक पर्खाल (ब्यारियर) कमजोर हुनु हो।",
  ". Think of it like a brick wall — the bricks are your skin cells and the mortar between them is made of natural fats called ceramides. When that mortar breaks down, moisture escapes easily and your skin dries out.": "यसलाई इँटाको पर्खाल जस्तै सम्झनुहोस् — इँटाहरू छालाका कोषिका हुन् र तिनीहरूलाई जोड्ने सिमेन्ट भनेको सेरामाइड नामक प्राकृतिक लिपिड हो। जब यो सिमेन्ट कमजोर हुन्छ, छालाबाट पानी बाहिर निस्कन्छ र छाला सुख्खा हुन्छ।",
  ". Think of it like a brick wall &mdash; the bricks are your skin cells and the mortar between them is made of natural fats called ceramides. When that mortar breaks down, moisture escapes easily and your skin dries out.": "यसलाई इँटाको पर्खाल जस्तै सम्झनुहोस् — इँटाहरू छालाका कोषिका हुन् र तिनीहरूलाई जोड्ने सिमेन्ट भनेको सेरामाइड नामक प्राकृतिक लिपिड हो। जब यो सिमेन्ट कमजोर हुन्छ, छालाबाट पानी बाहिर निस्कन्छ र छाला सुख्खा हुन्छ।",
  "Cold, dry air pulls moisture right out of your skin. In Kathmandu, Pokhara, and high-altitude areas, this is a real problem from October to February. Here is how to protect your skin during those months.": "चिसो र सुख्खा हावाले छालाको आद्रता तुरुन्तै खोस्छ। काठमाडौँ, पोखरा र हिमाली भेगमा असोजदेखि फागुनसम्म यो ठूलो समस्या बन्छ। ती महिनाहरूमा छालालाई सुरक्षित राख्ने उपायहरू यहाँ प्रस्तुत छन्।",
  "CDerma formulas use 5% bio-active Centella Asiatica and physiological ceramides without artificial perfumes, harsh bleaching agents, or steroid fillers, preventing rebound irritation in Nepal's climate.": "सिडर्माका उत्पादनहरूमा ५% जैविक सेन्टेला एसियाटिका र सेरामाइड प्रयोग गरिन्छ, जसमा कुनै कृत्रिम सुगन्ध, हानिकारक ब्लीच वा स्टेरोइड हुँदैन। यसले नेपालको मौसममा छालालाई जलनबाट जोगाउँछ।",
  "Pimples happen when your pores get blocked by oil and dead skin cells. The key to preventing them is keeping your skin clean but not over-washing — and choosing products that won't clog pores.": "छालाका छिद्रहरू अतिरिक्त तेल र मृत कोषिकाहरूले बन्द हुँदा डण्डिफोर आउँछन्। यसबाट बच्न छालालाई सफा राख्ने तर अत्यधिक नधुने र छिद्र नथुन्ने उत्पादनहरू प्रयोग गर्नुपर्छ।",
  "Pimples happen when your pores get blocked by oil and dead skin cells. The key to preventing them is keeping your skin clean but not over-washing &mdash; and choosing products that won't clog pores.": "छालाका छिद्रहरू अतिरिक्त तेल र मृत कोषिकाहरूले बन्द हुँदा डण्डिफोर आउँछन्। यसबाट बच्न छालालाई सफा राख्ने तर अत्यधिक नधुने र छिद्र नथुन्ने उत्पादनहरू प्रयोग गर्नुपर्छ।",
  "Whether you run a cosmetic store, a clinic, or you just have questions about your skin — we are happy to help. Send us a message on WhatsApp and we will get back to you with honest advice.": "तपाईं कस्मेटिक स्टोर चलाउनुहुन्छ, क्लिनिक सञ्चालन गर्नुहुन्छ वा छाला सम्बन्धी व्यक्तिगत जिज्ञासा छ भने हामी सहयोग गर्न सधैं तत्पर छौं। हामीलाई ह्वाट्सएपमा सन्देश पठाउनुहोस्, हामी इमानदार सल्लाह दिनेछौं।",
  "Whether you run a cosmetic store, a clinic, or you just have questions about your skin &mdash; we are happy to help. Send us a message on WhatsApp and we will get back to you with honest advice.": "तपाईं कस्मेटिक स्टोर चलाउनुहुन्छ, क्लिनिक सञ्चालन गर्नुहुन्छ वा छाला सम्बन्धी व्यक्तिगत जिज्ञासा छ भने हामी सहयोग गर्न सधैं तत्पर छौं। हामीलाई ह्वाट्सएपमा सन्देश पठाउनुहोस्, हामी इमानदार सल्लाह दिनेछौं।",
  "CDerma Nepal supplies over 198 authorized cosmetic stores, dermatology practices, aesthetic clinics, and hospital pharmacies in Kathmandu, Lalitpur, Pokhara, Biratnagar, Dharan, and Itahari. All locations carry verified fresh batches manufactured in Koshi Province.": "सिडर्मा नेपालले काठमाडौँ, ललितपुर, पोखरा, विराटनगर, धरान र इटहरीका १९८ भन्दा बढी अधिकृत कस्मेटिक स्टोर, छाला क्लिनिक र अस्पताल फार्मेसीहरूमा आपूर्ति गर्दछ। सबै स्थानमा कोशी प्रदेशमा निर्मित ताजा ब्याचहरू उपलब्ध छन्।",
  "Every CDerma bottle originates within our Class 10,000 cleanroom research facility in Koshi Province, framed by the Himalayan ranges. We combine indigenous high-altitude botanical extracts with ISO 9001:2015 certified quality standards.": "सिडर्माको प्रत्येक बोतल कोशी प्रदेशस्थित हाम्रो क्लास १०,००० क्लिनरुम प्रयोगशालामा उत्पादन गरिन्छ। हामी उच्च हिमाली जडीबुटीका अर्कलाई ISO ९००१:२०१५ प्रमाणित गुणस्तर मापदण्डसँग संयोजन गर्दछौं।",
  "CDerma products cannot be purchased online without physician monograph verification. Hospital dispensaries receive direct bi-weekly shipments sealed in nitrogen-purged containers from our Biratnagar facility.": "सिडर्माका उत्पादनहरू अस्पताल र क्लिनिकहरूमा नाइट्रोजन-सिलबन्दी कन्टेनरहरूमा पाक्षिक रूपमा सिधै आपूर्ति गरिन्छ।",
  "CDerma clinical actives are available through certified cosmetic stores, premium beauty retailers, aesthetic clinics, tertiary hospital dispensaries, and compounding pharmacy partners across Nepal.": "सिडर्माका क्लिनिकल उत्पादनहरू नेपालभरिका प्रमाणित कस्मेटिक स्टोर, ब्युटी रिटेलर, एस्थेटिक क्लिनिक र अस्पताल फार्मेसी साझेदारहरू मार्फत उपलब्ध छन्।",
  "Join the CDerma authorized hospital and dispensary network. Ensure your patients receive stable, active domestic cosmeceuticals formulated specifically for Nepalese cutaneous phenotypes.": "सिडर्माको अधिकृत अस्पताल तथा औषधालय सञ्जालमा आबद्ध हुनुहोस्। आफ्ना बिरामीहरूलाई नेपाली छालाको प्रकृति अनुकूल तयार पारिएका गुणस्तरीय उत्पादनहरू उपलब्ध गराउनुहोस्।",
  "Potent medical botanicals lose efficacy under hot transport cargo holds. CDerma manages direct climate-controlled cold-chain logistics from our Koshi formulation center directly to clinic apothecaries in Kathmandu, Pokhara, Biratnagar, and beyond.": "कडा घाम र गर्मीमा ढुवानी गर्दा जडीबुटीको गुणस्तर घट्न सक्छ। त्यसैले सिडर्माले कोशी केन्द्रबाट काठमाडौँ, पोखरा, विराटनगर लगायत देशभरका क्लिनिकहरूमा तापक्रम-नियन्त्रित कोल्ड-चेन ढुवानी गर्दछ।",
  "Every commercial unit leaving our Itahari cleanroom is stamped with a traceable 8-digit manufacturing lot ID. Enter your bottle's code below to inspect the actual analytical laboratory certificate signed by our head chemist.": "हाम्रो इटहरी क्लिनरुमबाट निस्कने प्रत्येक बोतलमा ८-अङ्कको ब्याच लट आईडी हुन्छ। हाम्रो प्रमुख केमिस्टद्वारा प्रमाणित प्रयोगशाला प्रमाणपत्र हेर्न आफ्नो बोतलको कोड प्रविष्ट गर्नुहोस्।",
  "We welcome dermatologists, plastic surgeons, clinical pharmacists, and institutional procurement teams to inspect our HEPA HVAC systems, analytical spectroscopy setups, and aseptic staging rooms in Itahari.": "हामी चर्मरोग विशेषज्ञ, प्लास्टिक सर्जन, क्लिनिकल फार्मासिस्ट र अस्पताल खरिद समितिलाई इटहरीस्थित हाम्रो हेपा फिल्टर, स्पेक्ट्रोस्कोपी ल्याब र क्लिनरुम निरीक्षण गर्न हार्दिक स्वागत गर्दछौं।",
  "Bridging pharmaceutical-grade dermatological actives with potent, sustainably harvested Himalayan botanicals. We built Nepal’s first certified dermocosmetics research cleanroom in Itahari, Sunsari.": "फर्मास्युटिकल-ग्रेड सक्रिय तत्वहरू र दिगो रूपमा संकलित हिमाली जडीबुटीको संगम। हामीले इटहरी, सुनसरीमा नेपालकै पहिलो प्रमाणित डर्मोकोस्मेटिक्स क्लिनरुम निर्माण गरेका छौं।",
  "is an authorized doctor-formulated skincare manufacturer based in Itahari, Sunsari, Koshi Province. CDerma supplies verified cosmetic stores, retail pharmacies, and dermatology practices across all 7 provinces of Nepal with direct cleanroom batch pricing, fresh inventory, and guaranteed 24-48 hour dispatch.": "इटहरी, सुनसरी, कोशी प्रदेशमा अवस्थित अधिकृत चिकित्सक-प्रमाणित छाला हेरचाह निर्माता हो। सिडर्माले नेपालका सबै ७ प्रदेशका कस्मेटिक स्टोर, फार्मेसी र छाला क्लिनिकहरूलाई प्रत्यक्ष क्लिनरुम थोक मूल्य, ताजा मौज्दात र २४–४८ घण्टाभित्र डेलिभरी उपलब्ध गराउँछ।",
  "“CDerma’s Himalayan lipid-barrier complex has transformed our post-fractional laser outcomes. The non-comedogenic base prevents rebound erythema without aggravating congested skin. Having guaranteed domestic stock within 24 hours removes our clinic’s reliance on inconsistent third-party couriers.”": "“सिडर्माको लिपिड-ब्यारियर कम्प्लेक्सले लेजर उपचारपछिको नतिजामा उल्लेख्य सुधार ल्याएको छ। यसले छाला रातो हुन दिँदैन र छिद्र बन्द गर्दैन। २४ घण्टाभित्र नेपालमै ताजा स्टक प्राप्त हुनाले हाम्रो क्लिनिकको काम धेरै सहज भएको छ।”",
  "We supply premier cosmetic stores, retail beauty dispensaries, certified dermatology clinics, aesthetic laser centers, and hospital pharmacies across all seven provinces of Nepal with reliable domestic stock, protected retail margins, and accredited partner support.": "हामी नेपालका सबै सात प्रदेशका प्रतिष्ठित कस्मेटिक स्टोर, ब्युटी शप, छाला क्लिनिक, लेजर सेन्टर र अस्पताल फार्मेसीहरूलाई भरपर्दो स्टक, सुरक्षित मुनाफा र व्यावसायिक समर्थन प्रदान गर्दछौं।",
  "“Our retail hospital pharmacy dispatches CDerma daily. Patient adherence is exceptionally high because the textures are elegant, and the batch freshness is palpable compared to stale foreign consignments.”": "“हाम्रो अस्पताल फार्मेसीबाट सिडर्मा दैनिक रूपमा बिक्री हुन्छ। यसको बनावट अत्यन्तै हल्का र ताजा हुनाले बिरामीहरूले यसलाई धेरै रुचाएका छन्।”",
  "Formulated and packaged in Koshi Province under ISO 9001:2015 certified quality protocols. Eliminate customs holds, import tariff surcharges, and compromised heat-exposed shipments.": "कोशी प्रदेशमा ISO ९००१:२०१५ गुणस्तर मापदण्ड अन्तर्गत उत्पादित। भन्सार झन्झट, चर्को कर र गर्मीमा बिग्रने विदेशी उत्पादनको समस्याबाट मुक्त।",
  "Strict Minimum Advertised Price (MAP) enforcement prevents undercut pricing online. Tiered wholesale pricing unlocks sustainable returns for cosmetic stores and clinical practices.": "कडा मूल्य नीतिका कारण अनलाइनमा अस्वस्थ प्रतिस्पर्धा रोकिन्छ। तहगत थोक मूल्यले कस्मेटिक स्टोर र क्लिनिकहरूलाई दिगो नाफा सुनिश्चित गर्दछ।",
  "Thank you for partnering with CDerma Nepal. Your regional territory representative will verify your business credentials and transmit the wholesale price schedule within 24 hours.": "सिडर्मा नेपालसँग साझेदारी गर्नुभएकोमा धन्यवाद। हाम्रा क्षेत्रीय प्रतिनिधिले तपाईंको व्यवसाय प्रमाणीकरण गरी २४ घण्टाभित्र थोक मूल्य तालिका पठाउनुहुनेछ।",
  "Join over 160+ medical clinics, dermatology practices, and certified retail pharmacies. Enjoy wholesale bracket pricing, direct batch dispatch, and physician marketing toolkits.": "१६० भन्दा बढी मेडिकल क्लिनिक, छाला उपचार केन्द्र र फार्मेसीहरूको सञ्जालमा जोडिनुहोस्। आकर्षक थोक मूल्य, प्रत्यक्ष ब्याच डेलिभरी र मार्केटिङ सामग्री प्राप्त गर्नुहोस्।",
  "Our formulation scientists host interactive training covering barrier restoration biochemistry, cosmetic retail consultations, laser aftercare protocols, and regimen pairing.": "हाम्रा वैज्ञानिकहरूले छालाको ब्यारियर विज्ञान, कस्मेटिक परामर्श, लेजरपछिको हेरचाह र उत्पादन सिफारिस सम्बन्धी विशेष तालिम प्रदान गर्दछन्।",
  "Unlike imported dermaceuticals prone to erratic border holdups and grey market diversion, CDerma guarantees pristine stability, authentic origin, and domestic continuity.": "सिमानामा रोकिने र नक्कली सामान आउने विदेशी ब्रान्डहरूको विपरीत, सिडर्माले १००% गुणस्तर, असली स्रोत र निरन्तर आपूर्तिको ग्यारेन्टी दिन्छ।",
  "Complimentary 15ml post-procedure trial sachets, luxury cosmetic counter acrylic displays, and patient regimen journals delivered with every opening volume order.": "प्रत्येक पहिलो थोक अर्डरसँगै १५ मिलि परीक्षण स्यासे, काउन्टर डिस्प्ले स्ट्यान्ड र बिरामी हेरचाह पुस्तिका निःशुल्क प्रदान गरिन्छ।",
  "Verified cosmetic store and clinic partners receive targeted customer referrals through CDerma's national portal and geolocated partner network.": "प्रमाणित कस्मेटिक स्टोर र क्लिनिक साझेदारहरूले सिडर्माको राष्ट्रिय वेबसाइट मार्फत ग्राहक सिफारिस प्राप्त गर्दछन्।",
  "Complete active ingredient profiles, lab pH metrics, clinical case imagery, and unit wholesale breakdown (24 Pages, PDF, 4.2 MB).": "सक्रिय तत्वहरूको विवरण, प्रयोगशाला pH मापन, क्लिनिकल तस्बिरहरू र थोक मूल्य विवरण (२४ पृष्ठ, PDF, ४.२ MB)।",
  "Continuous temperature-regulated cold dispatch preserving sensitive active botanicals across mountain and lowland territories.": "पहाडी तथा तराईका सबै भूभागमा संवेदनशील जडीबुटी सुरक्षित राख्न निरन्तर तापक्रम-नियन्त्रित ढुवानी।",
  "Direct courier hand-off from formulation laboratory facility. Immediate stock replacement for intensive clinical consumption.": "प्रयोगशाला केन्द्रबाट सिधै कुरियर डेलिभरी। क्लिनिकहरूको आवश्यकता अनुसार तत्काल स्टक पुनःपूर्ति।",
  "Handled via Naxal Central Depot with dedicated pharmaceutical logistics personnel and insured door-to-pharmacy drop.": "नक्साल केन्द्रीय डिपो मार्फत समर्पित फार्मास्युटिकल कर्मचारीहरूद्वारा फार्मेसीसम्म सुरक्षित र बीमा गरिएको डेलिभरी।",
  "Insulated shock-proof packaging preserving emulsion integrity across transit altitudes and varying thermal zones.": "ढुवानीको समयमा उचाइ र तापक्रम परिवर्तनबाट जोगाउने सुरक्षित इन्सुलेटेड प्याकेजिङ।",
  "A dedicated regional enterprise manager will provide the trade wholesale tier within one business day.": "हाम्रा समर्पित क्षेत्रीय प्रबन्धकले एक कार्यदिनभित्र थोक मूल्य तालिका उपलब्ध गराउनुहुनेछ।",
  "Certified clinics receive full-sized retail testers alongside Certificate of Analysis (COA) files.": "प्रमाणित क्लिनिकहरूले प्रयोगशाला परीक्षण रिपोर्ट (COA) सहित पूर्ण आकारका टेस्टरहरू प्राप्त गर्दछन्।",
  "Include Tester Sample Kit, display stand, and full COA testing verification files.": "टेस्टर स्याम्पल किट, डिस्प्ले स्ट्यान्ड र पूर्ण COA परीक्षण फाइलहरू समावेश गर्नुहोस्।",
  "Specially created to deeply soothe damaged skin, calm irritation after facials or sun exposure, and lock in moisture against cold dry air and sun. Made with calming cica and natural skin-repairing ceramides.": "क्षतिग्रस्त छालालाई गहिरो शान्ति दिन, फेसियल वा घामको जलन कम गर्न र चिसो सुख्खा हावाबाट जोगाउन विशेष निर्मित। शान्त पार्ने सिका र सेरामाइडयुक्त।",
  "Carefully blended and bottled in our certified laboratory in Itahari, Nepal, under strict hygiene and air-filtered conditions.": "हाम्रो इटहरीस्थित प्रमाणित प्रयोगशालामा कडा सरसफाइ र फिल्टर गरिएको हावायुक्त वातावरणमा तयार पारिएको।",
  "No artificial scents or harsh perfumes that cause irritation or burning. Safe and soothing for even the most sensitive skin.": "जलन वा पोलाइ गराउने कुनै कृत्रिम सुगन्ध नभएको। अति संवेदनशील छालाका लागि पनि पूर्ण सुरक्षित।",
  "Lightweight daily mineral sunscreen with SPF 50+ protection that leaves zero white cast and protects against sun spots.": "SPF ५०+ सुरक्षा दिने हल्का दैनिक मिनरल सनस्क्रिन, जसले कुनै सेतो दाग छोड्दैन र कालो पोतोबाट जोगाउँछ।",
  "Tested to keep your skin hydrated, clear, and glowing through dry winter winds, summer sun, and city dust across Nepal.": "नेपालको जाडोको हावा, गर्मीको घाम र सहरी धुलोमा पनि छालालाई ओसिलो, सफा र चम्किलो राख्न परीक्षण गरिएको।",
  "Gentle night facial oil that smooths fine lines and restores radiant, firm skin overnight without peeling or redness.": "छाला नखुम्चिने गरी रातभरिमा चाउरीपना हटाउने र प्राकृतिक चमक दिने कोमल रात्रिकालीन फेसियल तेल।",
  "Pure natural plant extracts like centella and seabuckthorn sustainably harvested from high-altitude valleys in Nepal.": "नेपालका उच्च हिमाली उपत्यकाहरूबाट दिगो रूपमा संकलित सेन्टेला र सीबकथोर्न जस्ता शुद्ध प्राकृतिक जडीबुटी।",
  "Rich, soothing moisturizer that locks in deep hydration all day and shields skin from cold dry winds and pollution.": "दिनभर गहिरो ओस सुरक्षित राख्ने र चिसो हावा तथा प्रदूषणबाट जोगाउने पोषणयुक्त मोइस्चराइजर।",
  "Pure cica and 5% niacinamide to quickly calm redness, soothe irritation, and rebuild your skin's moisture barrier.": "रातोपन छिट्टै शान्त पार्न, जलन कम गर्न र छालाको ब्यारियर पुनः निर्माण गर्न शुद्ध सिका र ५% नियासिनामाइड।",
  "Refreshing face mist packed with multi-layer hyaluronic acid to instantly quench dry, dehydrated skin on the go.": "सुख्खा छालालाई तत्काल ताजा र ओसिलो बनाउन मल्टि-लेयर हायलुरोनिक एसिडयुक्त फेस मिस्ट।",
  "Gentle foaming wash that clears daily dirt and pollution without making your skin feel tight, dry, or stripped.": "छालालाई नतन्काई वा नसुकाई दैनिक धुलो र प्रदूषण सफा गर्ने कोमल फोमिङ फेस वास।",
  "Available at leading cosmetic stores, beauty retailers, and certified skin clinics across Nepal.": "नेपालभरिका प्रमुख कस्मेटिक स्टोर, ब्युटी रिटेलर र प्रमाणित छाला क्लिनिकहरूमा उपलब्ध छन्।",
  "Pre-quarantine incubation for bacterial, fungal, and spore-forming microbes. ICP-MS mass spectrometry confirms zero heavy metals (Lead < 0.1ppm, Mercury < 0.01ppm).": "ब्याक्टेरिया र ढुसीको सूक्ष्म जाँच। मास स्पेक्ट्रोमेट्री परीक्षणबाट शून्य हेभी मेटल (सिसा < ०.१ppm, पारो < ०.०१ppm) प्रमाणित।",
  "Pre-quarantine incubation for bacterial, fungal, and spore-forming microbes. ICP-MS mass spectrometry confirms zero heavy metals (Lead &lt; 0.1ppm, Mercury &lt; 0.01ppm).": "ब्याक्टेरिया र ढुसीको सूक्ष्म जाँच। मास स्पेक्ट्रोमेट्री परीक्षणबाट शून्य हेभी मेटल (सिसा < ०.१ppm, पारो < ०.०१ppm) प्रमाणित।",
  "Formulated to mirror human epidermal lipids exactly: Ceramide NP, Cholesterol, and Free Fatty Acids engineered in stoichiometric balance for rapid barrier biomimicry.": "मानव छालाको प्राकृतिक लिपिड संरचनासँग हुबहु मेल खाने: सेरामाइड NP, कोलेस्ट्रोल र फ्याटी एसिडको वैज्ञानिक सन्तुलन।",
  "Every formula undergoes cyclic thermal testing: cycling between 4°C Kathmandu chill and 42°C Terai humidity to preserve emulsion rheology across all 7 provinces.": "चक्रीय थर्मल परीक्षण: सबै ७ प्रदेशमा क्रिमको गुणस्तर कायम राख्न काठमाडौँको ४° सेन्टिग्रेड चिसो र तराईको ४२° सेन्टिग्रेड तापक्रममा परीक्षण।",
  "Air cascaded at 25 Pascals over 4 clean zones ensures zero airborne spores, bacteria, or microparticulates settle during high-shear vacuum homogenization.": "४ वटा क्लिन जोनमा २५ पास्कलको वायु दबाबले उत्पादनको क्रममा हावाबाट कुनै पनि धुलो वा ब्याक्टेरिया पर्न दिँदैन।",
  "Sustainably foraged between 1,400m and 2,200m altitude in Eastern Nepal by smallholder collective cooperatives.": "पूर्वी नेपालको १,४०० देखि २,२०० मिटर उचाइमा साना किसान सहकारीहरूद्वारा दिगो रूपमा संकलित।",
  "Guaranteed price stability paid directly to indigenous cultivators across Dhankuta and Sankhuwasabha districts.": "धनकुटा र संखुवासभा जिल्लाका स्थानीय कृषकहरूलाई उचित मूल्यको ग्यारेन्टी।",
  "From positive pressure cascading airlocks to regional stability testing under Nepal’s severe thermal contrasts.": "पोजिटिभ प्रेसर एयरलकदेखि नेपालको तीव्र मौसमी भिन्नतामा क्षेत्रीय स्थिरता परीक्षणसम्म।",
  "All clinic retail cartons carry direct micro-QR codes linking directly to this immutable assay ledger.": "सबै बट्टामा डिजिटल क्युआर कोड रहेको छ जसबाट सिधै प्रयोगशाला परीक्षण रिपोर्ट हेर्न सकिन्छ।",
  "PASSED ALL TESTS": "सबै परीक्षणहरू सफल",
  "Download PDF COA": "PDF रिपोर्ट डाउनलोड गर्नुहोस्",
  "Batch Traceability": "ब्याच ट्र्याकिङ",
  "Fair Trade Ledger": "उचित व्यापार अभिलेख",
  "Clinic Direct SLA": "क्लिनिक प्रत्यक्ष आपूर्ति सम्झौता",
  "Try test batches:": "परीक्षण नमुनाहरू हेर्नुहोस्:",
  "Wild Harvest": "जंगली जडीबुटी संकलन",
  "Batch Result": "ब्याच नतिजा",
  "Verify": "प्रमाणीकरण गर्नुहोस्",
  "Days": "दिन",
  "Std": "मापदण्ड",
  "≥ 90.0% by HPLC": "≥ ९०.०% HPLC विधिबाट",
  "94.20% [Pass]": "९४.२०% [सफल]",
  "5.42 pH [Pass]": "५.४२ pH [सफल]",
  "+68% Retention": "+६८% आद्रता सुरक्षा",
  "< 10 CFU/g": "< १० CFU/ग्राम",
  "&lt; 10 CFU/g": "< १० CFU/ग्राम",
  "CDerma maintains an apothecary-level standard. Formulations are biologically active, unbuffered by synthetic fillers, and require structured medical oversight.": "सिडर्माले उच्च औषधीय मापदण्ड कायम राख्छ। हाम्रा फर्मुलेसनहरू जैविक रूपमा सक्रिय छन् र कुनै कृत्रिम मिसावट छैन।",
  "Receive your freshly compounded formulation directly at the clinic's certified dispensary or authorized hospital pharmacy counter with tamper-evident nitrogen seals intact.": "आफ्नो ताजा तयार पारिएको उत्पादन क्लिनिकको प्रमाणित औषधालय वा अस्पताल फार्मेसीबाट सुरक्षित नाइट्रोजन सिलसहित प्राप्त गर्नुहोस्।",
  "Your clinician matches specific Himalayan phytochemical actives (Centella, Rhododendron anthopogon, Lichenic acids) and assigns a unique traceability lot code.": "तपाईंको चिकित्सकले हिमाली वनस्पति सक्रिय तत्वहरू छानेर उत्पादनको ब्याच लट कोड प्रमाणीकरण गर्नुहुन्छ।",
  "Visit any authorized dermatologist or hospital aesthetic unit for barrier profiling, stratum corneum hydration testing, and dermatological consultation.": "छालाको ब्यारियर परीक्षण र परामर्शका लागि कुनै पनि अधिकृत छाला विशेषज्ञ वा अस्पतालमा जानुहोस्।",
  "Locate an Authorized Store or Clinic": "अधिकृत स्टोर वा क्लिनिक खोज्नुहोस्",
  "All Outlets": "सबै आउटलेटहरू",
  "Cosmetic Stores": "कस्मेटिक स्टोरहरू",
  "Dermatology Clinics": "डर्माटोलोजी क्लिनिकहरू",
  "Hospital Pharmacies": "अस्पताल फार्मेसीहरू",
  "Aesthetic Centers": "एस्थेटिक सेन्टरहरू",
  "All 7 Provinces": "सबै ७ प्रदेशहरू",
  "Search by cosmetic store, clinic name, doctor, city (Kathmandu, Pokhara, Biratnagar)...": "कस्मेटिक स्टोर, क्लिनिकको नाम, चिकित्सक वा सहरबाट खोज्नुहोस्...",
  "Only show locations with verified in-stock batches": "स्टक प्रमाणित भएका आउटलेटहरू मात्र देखाउनुहोस्",
  "Reset Map": "नक्सा रिसेट गर्नुहोस्",
  "Selected Hub": "चयन गरिएको केन्द्र",
  "Batch Inventory:": "ब्याच मौज्दात:",
  "Cold-Chain Temp:": "कोल्ड-चेन तापक्रम:",
  "Dispensary Hours:": "खुल्ने समय:",
  "148 Units Verified": "१४८ युनिट प्रमाणित",
  "18.4°C Controlled": "१८.४° सेन्टिग्रेड नियन्त्रित",
  "Verified Dispensary Node": "प्रमाणित औषधालय केन्द्र",
  "Authorized Outlet Node": "अधिकृत आउटलेट केन्द्र",
  "Licensed Chief Pharmacist": "इजाजतपत्र प्राप्त मुख्य फार्मासिस्ट",
  "Direct Lab Outpost": "प्रत्यक्ष प्रयोगशाला शाखा",
  "Same-Day Dispatch": "सोही दिन डेलिभरी",
  "Express Cold-Chain 24h": "२४ घण्टे एक्सप्रेस कोल्ड-चेन",
  "Koshi Lab Transit:": "कोशी ल्याब ढुवानी:",
  "Contact Store": "स्टोरमा सम्पर्क गर्नुहोस्",
  "Book Consultation": "परामर्श बुक गर्नुहोस्",
  "Directions": "दिशा निर्देशन",
  "In Stock": "स्टकमा उपलब्ध",
  "Allocated": "रिजर्भ गरिएको",
  "Batch Availability": "ब्याच उपलब्धता",
  "Verified In-Stock": "स्टक प्रमाणित",
  "Sorted: Priority": "प्राथमिकता अनुसार",
  "All Outlets (": "सबै आउटलेटहरू (",
  "Cosmetic Stores (": "कस्मेटिक स्टोरहरू (",
  "Dermatology (": "डर्माटोलोजी (",
  "Hospitals (": "अस्पतालहरू (",
  "Aesthetic (": "एस्थेटिक (",
  "NMID Audit 2024": "NMID अडिट २०२४",
  "3,400+ MASL": "३,४००+ मिटर उचाइ",
  "Laboratory Swatch No. 044: Rapid spreadability test on calibrated high-porosity slate substrate.": "प्रयोगशाला स्वाच नं. ०४४: उच्च-छिद्रयुक्त सतहमा द्रुत फैलावट परीक्षण।",
  "Deep hydration: tiny molecules hydrate deep below, while larger ones lock water on top.": "गहिरो आद्रता: सूक्ष्म अणुहरूले छालाको गहिराइसम्म पोषण दिन्छन् र ठूला अणुहरूले बाहिरी सतहमा ओस सुरक्षित राख्छन्।",
  "A gentle, clean herbal scent directly from pure fresh Himalayan centella leaf water.": "ताजा हिमाली सेन्टेला पातको पानीबाट प्राप्त शुद्ध र कोमल प्राकृतिक जडीबुटी सुगन्ध।",
  "Softens rough texture, speeds up skin healing, and boosts bounce and elasticity.": "फुस्रोपन हटाई छाला नरम बनाउँछ, निको हुने गति बढाउँछ र प्राकृतिक लचिलोपन दिन्छ।",
  "Won't Clog Pores": "छिद्र बन्द गर्दैन (नन-कमेडोजेनिक)",
  "Active Potency": "सक्रिय प्रभावकारिता",
  "pH 5.4 - 5.8": "pH ५.४ - ५.८",
  "Fast Absorption": "द्रुत अवशोषण",
  "Dewy Serum Finish": "प्राकृतिक चम्किलो फिनिश",
  "Alpine Flora": "हिमाली वनस्पति",
  "30 ml Dropper": "३० मिलि ड्रपर",
  "Source": "स्रोत",
  "Strength": "मात्रा",
  "Lab Sealed": "ल्याब सिलबन्दी",
  "Cold Chain": "कोल्ड चेन",
  "Clinical Guidance Notice": "क्लिनिकल मार्गदर्शन सूचना",
  "Dispensed through authorized cosmetic stores, beauty retailers, licensed dermatology clinics, and hospital pharmacies across Nepal.": "नेपालभरिका अधिकृत कस्मेटिक स्टोर, ब्युटी रिटेलर, छाला क्लिनिक र अस्पताल फार्मेसीहरूबाट उपलब्ध।",
  "Have questions regarding your specific skin condition, prescription compatibility, or hospital order batching? Our pharmacological team is on standby.": "आफ्नो छालाको अवस्था, अन्य औषधिसँगको अनुकूलता वा अस्पताल अर्डर सम्बन्धी कुनै प्रश्न छन्? हाम्रो विज्ञ टोली सहयोगका लागि तयार छ।",
  "Available through authorized aesthetic & dermatology centers in Pokhara, Biratnagar, Chitwan & Butwal.": "पोखरा, विराटनगर, चितवन र बुटवलका अधिकृत एस्थेटिक तथा डर्माटोलोजी केन्द्रहरूमा उपलब्ध।",
  "Clinical Batch: Verified": "क्लिनिकल ब्याच: प्रमाणित",
  "ISO Class 7": "आईएसओ क्लास ७",
  "Product Details": "उत्पादन विवरण",
  "Find In Stores": "स्टोरहरूमा खोज्नुहोस्",
  "Centella Barrier Restore Concentrate — Doctor-Recommended Face Care for Wholesale Distribution": "सेन्टेला ब्यारियर रिस्टोर कन्सन्ट्रेट — थोक वितरणका लागि चिकित्सक सिफारिस फेस केयर",
  "Centella Barrier Restore Serum | Doctor-Recommended Face Care Nepal | CDerma Wholesale": "सेन्टेला ब्यारियर रिस्टोर सिरम | चिकित्सक सिफारिस फेस केयर नेपाल | सिडर्मा थोक",
  "is a doctor-formulated face care serum manufactured in Itahari, Nepal, designed to repair compromised skin barriers and reverse high-altitude trans-epidermal water loss (TEWL).": "इटहरी, नेपालमा उत्पादित चिकित्सकद्वारा प्रमाणित फेस केयर सिरम हो, जसले क्षतिग्रस्त छालाको ब्यारियर मर्मत गर्दछ र उच्च उचाइमा हुने पानीको क्षतिलाई रोक्दछ।",
  "We write these posts to help you understand your skin — no confusing words, no sales tricks. Just simple, practical advice from doctors who care about your skin health.": "हामी तपाईंलाई आफ्नो छाला बुझ्न मद्दत गर्न यी लेखहरू लेख्छौं — कुनै अप्ठ्यारो शब्द वा व्यापारिक दाउपेच बिना। केवल तपाईंको छालाको स्वास्थ्य चाहने डाक्टरहरूको सरल र व्यावहारिक सल्लाह।",
  "We write these posts to help you understand your skin &mdash; no confusing words, no sales tricks. Just simple, practical advice from doctors who care about your skin health.": "हामी तपाईंलाई आफ्नो छाला बुझ्न मद्दत गर्न यी लेखहरू लेख्छौं — कुनै अप्ठ्यारो शब्द वा व्यापारिक दाउपेच बिना। केवल तपाईंको छालाको स्वास्थ्य चाहने डाक्टरहरूको सरल र व्यावहारिक सल्लाह।",
  "Timing matters more than you think. Applying moisturiser on damp skin — right after washing your face — locks in up to 3x more water than applying it on dry skin.": "समय तपाईंले सोचेभन्दा बढी महत्त्वपूर्ण हुन्छ। मुख धोएपछि हल्का ओसिलो छालामा मोइस्चराइजर लगाउँदा सुख्खा छालामा भन्दा ३ गुणा बढी पानी सुरक्षित रहन्छ।",
  "Timing matters more than you think. Applying moisturiser on damp skin &mdash; right after washing your face &mdash; locks in up to 3x more water than applying it on dry skin.": "समय तपाईंले सोचेभन्दा बढी महत्त्वपूर्ण हुन्छ। मुख धोएपछि हल्का ओसिलो छालामा मोइस्चराइजर लगाउँदा सुख्खा छालामा भन्दा ३ गुणा बढी पानी सुरक्षित रहन्छ।",
  "Direct answers from our consultant dermatologists regarding barrier restoration, Nepal's climate challenges, and daily application.": "छालाको ब्यारियर मर्मत, नेपालको हावापानीका चुनौतीहरू र दैनिक प्रयोग सम्बन्धी हाम्रा कन्सल्टेन्ट छाला विशेषज्ञहरूबाट प्रत्यक्ष जवाफ।",
  "Your skin repairs itself at night. Poor sleep means dull, tired-looking skin. Aim for 7–8 hours.": "राति सुत्दा छालाले आफूलाई मर्मत गर्दछ। कम सुत्दा छाला फुस्रो र थकित देखिन्छ। दैनिक ७–८ घण्टा सुत्नुहोस्।",
  "Your skin repairs itself at night. Poor sleep means dull, tired-looking skin. Aim for 7&ndash;8 hours.": "राति सुत्दा छालाले आफूलाई मर्मत गर्दछ। कम सुत्दा छाला फुस्रो र थकित देखिन्छ। दैनिक ७–८ घण्टा सुत्नुहोस्।",
  "Over-washing strips your skin's natural oils and makes it worse, not better. Twice a day is enough.": "धेरै पटक मुख धुँदा प्राकृतिक तेल नष्ट हुन्छ र छाला झन् बिग्रन्छ। दिनको दुई पटक धुनु पर्याप्त हुन्छ।",
  "Dehydration shows up on your face fast — as dullness, tightness, and deeper-looking lines.": "पानीको कमी अनुहारमा तुरुन्तै देखिन्छ — फुस्रोपन, छाला तन्किने र चाउरीपनाको रूपमा।",
  "Dehydration shows up on your face fast &mdash; as dullness, tightness, and deeper-looking lines.": "पानीको कमी अनुहारमा तुरुन्तै देखिन्छ — फुस्रोपन, छाला तन्किने र चाउरीपनाको रूपमा।",
  "Your hands carry bacteria and oil. Touching your face is one of the biggest causes of breakouts.": "हातमा धुलो र ब्याक्टेरिया हुन्छ। अनुहार बारम्बार छुँदा डण्डिफोर आउने मुख्य कारण बन्छ।",
  "Even on cloudy days, UV rays can damage your skin and cause dark spots over time.": "बादल लागेको दिनमा पनि घामको पराबैजनी किरणले छालालाई हानि पुर्याउन र कालो पोतो ल्याउन सक्छ।",
  "Quick Doctor Tips": "चिकित्सकका उपयोगी सुझावहरू",
  "Sleep heals skin.": "निन्द्राले छाला निको पार्छ।",
  "Wash gently.": "कोमल रूपमा धुनुहोस्।",
  "Read Full Article": "पूरा लेख पढ्नुहोस्",
  "Talk to Our Team.": "हाम्रो टोलीसँग कुरा गर्नुहोस्।",
  "From Our Doctors": "हाम्रा चिकित्सकहरूबाट",
  "Acne & Pimples": "डण्डिफोर र दाग",
  "Sensitive Skin": "संवेदनशील छाला",
  "Daily Routine": "दैनिक दिनचर्या",
  "Editor's Pick": "सम्पादकको रोजाइ",
  "Brightening": "छालाको चमक",
  "All Topics": "सबै विषयहरू",
  "Read": "पढ्नुहोस्",
  "Dr. P. Bhattarai": "डा. पी. भट्टराई",
  "Dr. R. Shrestha": "डा. आर. श्रेष्ठ",
  "Dr. S. Karki": "डा. एस. कार्की",
  "skin barrier": "छालाको ब्यारियर",
  "March 2025": "मार्च २०२५",
  "Jan 2025": "जनवरी २०२५",
  "Feb 2025": "फेब्रुअरी २०२५",
  "Mar 2025": "मार्च २०२५",
  "Apr 2025": "अप्रिल २०२५",
  "Q:": "प्र:",
  "VERIFIED THROUGH CDERMA CLINICAL REGISTRY · ID #KTM-109": "सिडर्मा क्लिनिकल रजिस्ट्री मार्फत प्रमाणित · आईडी #KTM-109",
  "VERIFIED THROUGH CDERMA CLINICAL REGISTRY · ID #PKR-208": "सिडर्मा क्लिनिकल रजिस्ट्री मार्फत प्रमाणित · आईडी #PKR-208",
  "Doctor-Recommended Face Care Nepal | Skincare Manufacturer & Wholesale Supplier | CDerma": "नेपालमा डाक्टरद्वारा सिफारिस गरिएको फेस केयर | छाला हेरचाह निर्माता तथा थोक आपूर्तिकर्ता | सिडर्मा",
  "Skincare Products Nepal | CDerma Wholesale Formulations Catalog for Retailers & Clinics": "छाला हेरचाह उत्पादनहरू नेपाल | बिक्रेता तथा क्लिनिकहरूका लागि थोक क्याटलग",
  "We maintain accessible introductory tiers for local independent businesses starting from 24 units across mixed SKUs, complete with counter displays and tester units.": "हामी स्थानीय स्वतन्त्र पसलहरूका लागि २४ युनिटबाट सुरु हुने सरल प्रारम्भिक योजना प्रदान गर्दछौं, जसमा काउन्टर डिस्प्ले र टेस्टर युनिटहरू समावेश छन्।",
  "Kathmandu (24h)": "काठमाडौँ (२४ घण्टा)",
  "Pokhara (36h)": "पोखरा (३६ घण्टा)",
  "Itahari Hub": "इटहरी केन्द्र",
  "Eastern Hubs": "पूर्वी केन्द्रहरू",
  "Partner With Us": "हामीसँग सहकार्य गर्नुहोस्",
  "LOT: NP-ITH-0442": "लट: NP-ITH-0442",
  "LOT-24-0442": "लट-२४-०४४२",
  "LOT-24-0389": "लट-२४-०३८९",
  "(Completely Safe)": "(पूर्ण रूपमा सुरक्षित)",
  "(Gentle on Face)": "(अनुहारका लागि कोमल)",
  "(100% Sterile)": "(१००% जीवाणुरहित)",
  "Face Care · 30ml": "फेस केयर · ३० मिलि",
  "Cleansers · 150ml": "क्लिन्जर · १५० मिलि",
  "Rx / Clinic Only": "क्लिनिक तथा अस्पतालका लागि",
  "Prescription Info": "चिकित्सकीय परामर्श जानकारी",
  "Low-Grade Fillers": "कम गुणस्तरको मिसावट",
  "Aesthetic Clinics": "एस्थेटिक क्लिनिकहरू",
  "Equilibrium": "सन्तुलन",
  "Fast Absorb": "छिटो सोसिने",
  "pH 5.5 Calm": "pH ५.५ शान्त",
  "Standard 01": "मापदण्ड ०१",
  "Standard 02": "मापदण्ड ०२",
  "Standard 03": "मापदण्ड ०३",
  "Standard 04": "मापदण्ड ०४",
  "Lipid Rich": "लिपिड युक्त",
  "Biratnagar": "विराटनगर",
  "Itahari HQ": "इटहरी मुख्य कार्यालय",
  "Dhangadhi": "धनगढी",
  "Kathmandu": "काठमाडौं",
  "Pokhara": "पोखरा",
  "Chitwan": "चितवन",
  "Butwal": "बुटवल",
  "Dharan": "धरान",
  "All (12)": "सबै (१२)",
  "Serums": "सिरमहरू",
  "Moisturizers": "मोइस्चराइजरहरू",
  "SPF 50+": "एसपीएफ ५०+",
  "Zinc PCA": "जिंक पिसिए",
  "Allantoin": "एलान्टोइन",
  "Chamomile Water": "क्यामोमाइल पानी",
  "Snow Mushroom": "स्नो मशरुम",
  "Bakuchiol 1%": "बाकुचियोल १%",
  "Apple Amino Acids": "स्याउ अमिनो एसिड",
  "Seabuckthorn Seed": "सीबकथोर्न बीउ",
  "Ectoin": "एक्टोइन",
  "5% Niacinamide": "५% नियासिनामाइड",
  "Phytoceramides": "फाइटोसेरामाइड्स",
  "D-Panthenol 2%": "डी-प्यान्थेनोल २%",
  "Broad Spectrum": "ब्रॉड स्पेक्ट्रम",
  "98.4% Soothing": "९८.४% शान्त पार्ने",
  "Gentle On Skin": "छालामा कोमल",
  "Sulfate-Free": "सल्फेटरहित",
  "Doctor Grade": "डाक्टर ग्रेड",
  "Catalog Standard": "क्याटलग मापदण्ड",
  "Formulation Base": "फर्मुलेशन बेस",
  "Primary Concern:": "मुख्य समस्या:",
  "Review Lab Trials": "ल्याब परीक्षण हेर्नुहोस्",
  "Gentle Night Care": "कोमल रात्रिकालीन हेरचाह",
  "Hyperpigmentation": "कालो पोतो र दाग",
  "Skin Type:": "छालाको प्रकार:",
  "Key Actives": "मुख्य सक्रिय तत्वहरू",
  "5.4 Balance": "५.४ सन्तुलन",
  "pH 5.2": "pH ५.२",
  "pH 5.5": "pH ५.५",
  "pH 5.8": "pH ५.८",
  "Serial 01 • 150ml": "सिरियल ०१ • १५० मिलि",
  "Serial 02 • 100ml": "सिरियल ०२ • १०० मिलि",
  "Serial 04 • 30ml": "सिरियल ०४ • ३० मिलि",
  "Serial 07 • 50ml": "सिरियल ०७ • ५० मिलि",
  "Serial 08 • 30ml": "सिरियल ०८ • ३० मिलि",
  "Serial 09 • 50ml": "सिरियल ०९ • ५० मिलि",
  "18.5% Zinc Oxide": "१८.५% जिंक अक्साइड",
  "© 2025 K&K Trading Concern. Imported & Marketed in Nepal | Itahari, Sunsari | Exim Code: 3049904360114NP": "© २०२५ के एण्ड के ट्रेडिङ कन्सर्न। नेपालमा अधिकृत आयात तथा वितरण | इटहरी, सुनसरी | एग्जिम कोड: 3049904360114NP",
  "© 2026 K&K Trading Concern. Imported & Marketed in Nepal | Itahari, Sunsari | Exim Code: 3049904360114NP": "© २०२६ के एण्ड के ट्रेडिङ कन्सर्न। नेपालमा अधिकृत आयात तथा वितरण | इटहरी, सुनसरी | एग्जिम कोड: 3049904360114NP",
  "Contact Phone": "सम्पर्क फोन",
  "Hydration Vehicle": "हाइड्रेशन माध्यम",
  "Supply Network": "आपूर्ति सञ्जाल",
  "Koshi Dispatch": "कोशी डेलिभरी",
  "Hero Formulation": "प्रमुख फर्मुलेशन",
  "Molecular Active": "आणविक सक्रिय तत्व",
  "Alpine Botanical": "हिमाली वनस्पति",
  "Structural Lipid": "संरचनात्मक लिपिड",
  "Direct Treatment": "प्रत्यक्ष उपचार",
  "Matrix Complex": "म्याट्रिक्स कम्प्लेक्स",
  "City": "सहर",
  "Zero": "शून्य",
  "or": "वा",
  "Cdrema Nepal": "सिडर्मा नेपाल",
  "Business Legal Name *": "व्यवसायको कानुनी नाम *",
  "Registration / PAN Number *": "दर्ता / प्यान नम्बर *",
  "Contact Person Name *": "सम्पर्क व्यक्तिको नाम *",
  "Primary Mobile / WhatsApp *": "मोबाइल / ह्वाट्सएप नम्बर *",
  "Official Email *": "आधिकारिक इमेल *",
  "Facility Category *": "संस्थाको वर्ग *",
  "Select Facility Category": "संस्थाको वर्ग चयन गर्नुहोस्",
  "Cosmetic Store / Retail Outlet": "कस्मेटिक पसल / खुद्रा बिक्रेता",
  "Dermatology / Aesthetic Clinic": "छाला तथा एस्थेटिक क्लिनिक",
  "Hospital Pharmacy / Dispensary": "अस्पताल फार्मेसी / औषधालय",
  "Salon & Spa / Aesthetician": "सैलुन, स्पा तथा एस्थेटिसियन",
  "Wholesale Stockist / Regional Distributor": "थोक बिक्रेता / क्षेत्रीय वितरक",
  "Primary Province *": "मुख्य प्रदेश *",
  "Select Province": "प्रदेश चयन गर्नुहोस्",
  "Koshi Province (Immediate Dispatch)": "कोशी प्रदेश (तत्काल डेलिभरी)",
  "Madhesh Province": "मधेश प्रदेश",
  "Bagmati Province (Kathmandu / Lalitpur)": "बागमती प्रदेश (काठमाडौँ / ललितपुर)",
  "Gandaki Province (Pokhara)": "गण्डकी प्रदेश (पोखरा)",
  "Lumbini Province (Butwal / Bhairahawa)": "लुम्बिनी प्रदेश (बुटवल / भैरहवा)",
  "Karnali Province": "कर्णाली प्रदेश",
  "Sudurpashchim Province": "सुदूरपश्चिम प्रदेश",
  "Complete Physical Address *": "पूरा ठेगाना *",
  "Estimated Initial Order Volume *": "अनुमानित प्रारम्भिक अर्डर मात्रा *",
  "Starter Order (24 - 48 Units)": "सुरुवाती अर्डर (२४ - ४८ थान)",
  "Mid-Tier Clinic Stock (50 - 150 Units)": "क्लिनिक मध्यम स्टक (५० - १५० थान)",
  "Institutional Supply (200+ Units)": "संस्थागत आपूर्ति (२००+ थान)",
  "Additional Clinical or Business Inquiries": "थप क्लिनिकल वा व्यावसायिक सोधपुछ",
  "Apply for direct cosmetic retailer, clinic dispensary wholesale pricing, counter tester units, and clinical trial kits.": "प्रत्यक्ष खुद्रा विक्रेता, क्लिनिक थोक मूल्य, काउन्टर टेस्टर र क्लिनिकल परीक्षण किटका लागि आवेदन दिनुहोस्।",
  "Modules Included": "समावेश मोड्युलहरू",
  "Express Dispatch": "द्रुत डेलिभरी",
  "Zone 1: Koshi Belt": "क्षेत्र १: कोशी क्षेत्र",
  "Zone 2: Kathmandu Valley": "क्षेत्र २: काठमाडौँ उपत्यका",
  "Zone 3: Western Hubs": "क्षेत्र ३: पश्चिम क्षेत्र",
  "Manufacturing Base": "उत्पादन केन्द्र",
  "Cleanroom Standard": "क्लिनरुम मापदण्ड",
  "Same-Day Courier": "सोही दिन डेलिभरी",
  "NMC Reg: 11482": "NMC दर्ता: ११४८२",
  "24 - 48 Hours": "२४ - ४८ घण्टा",
  "NMC Compliant": "NMC अनुरूप",
  "Regional Centers:": "क्षेत्रीय केन्द्रहरू:",
  "Facility:": "संस्था:",
  "Locate an": "खोज्नुहोस्",
  "& Clinic": "र क्लिनिक",
  "Same-Day": "सोही दिन",
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
  "Completely. The formula is free of coconut-derived comedogenic lipids, heavy esters, polysorbates, and synthetic fragrance. High-purity Centella Asiatica provides rapid calming against inflammatory acne lesions, while niacinamide regulates sebaceous gland hyper-secretion.": "पूर्ण रूपमा सुरक्षित। यो फर्मुलामा छिद्र थुन्ने कुनै पनि चिल्लो पदार्थ, हेभी एस्टर, पोलिसोर्बेट वा कृत्रिम सुगन्ध छैन। उच्च-शुद्धताको सेन्टेला एसियाटिकाले डण्डिफोरको जलनलाई तुरुन्तै शान्त पार्छ र नियासिनामाइडले अतिरिक्त तेल उत्पादनलाई नियन्त्रण गर्छ।",
  "Yes. Formulated at a physiologically harmonized pH of 5.5, our 5% Niacinamide and Ceramide matrix buffers against the common irritation caused by pure L-ascorbic acid and topical retinoic acid. We suggest applying this concentrate first, allowing 60 seconds to absorb, then following with your prescription active.": "हो। छाला-अनुकूल pH ५.५ मा तयार गरिएको हाम्रो ५% नियासिनामाइड र सेरामाइडले रेटिनोल वा भिटामिन सीले गराउन सक्ने जलनलाई कम गर्छ। यो सिरम लगाएर ६० सेकेन्ड सोसिन दिनुहोस्, त्यसपछि अन्य औषधीय क्रिम लगाउनुहोस्।",
  "Unopened bottles maintain stability for 24 months from the manufacturing batch date indicated on the carton base. Once unsealed, maintain below 25°C away from direct Himalayan sunlight. In hot Terai summer months, refrigeration is acceptable though not required.": "नखोलिएको बोतल प्याकिङमा उल्लेख भएको मितिबाट २४ महिनासम्म सुरक्षित रहन्छ। खोलेपछि २५° सेन्टिग्रेड भन्दा कम तापक्रममा घामबाट टाढा राख्नुहोस्। तराईको गर्मीमा फ्रिजमा राख्न पनि सकिन्छ।",
  "This formula is distributed directly to authorized cosmetic stores, premium beauty retailers, licensed dermatologists, and hospital pharmacies from our central Koshi distribution depot. Store owners and medical practices can register via our B2B portal to receive wholesale pricing schedules and product tester displays. Consumers can purchase through any accredited partner location across Nepal.": "यो उत्पादन हाम्रो केन्द्रीय कोशी डिपोबाट नेपालभरिका अधिकृत कस्मेटिक पसल, ब्युटी स्टोर, छाला विशेषज्ञ र अस्पताल फार्मेसीहरूमा प्रत्यक्ष आपूर्ति गरिन्छ। पसल सञ्चालक तथा क्लिनिकहरूले हाम्रो बी२बी पोर्टलबाट थोक मूल्य र डिस्प्लेका लागि दर्ता गर्न सक्नुहुन्छ।",
  "\"Patients across Kathmandu Valley experience chronic micro-inflammation stemming from winter dry inversions and heavy airborne particulate matter. CDerma's formulation No. 04 is one of the few concentrates that combines clinical 5% niacinamide without flushing fillers, balanced by authentic Himalayan-harvested centella. We recommend it post-microneedling and as everyday barrier defense.\"": "\"काठमाडौँ उपत्यकामा जाडोको सुख्खा हावा र प्रदूषणका कारण बिरामीहरूमा छाला पोल्ने समस्या धेरै देखिन्छ। सिडर्माको फर्मुलेशन नं. ०४ क्लिनिकल ५% नियासिनामाइड र हिमाली सेन्टेलाको उत्कृष्ट संयोजन हो। हामी यसलाई माइक्रोनिडलिङपछि र दैनिक ब्यारियर सुरक्षाका लागि सिफारिस गर्दछौं।\"",
  "CDerma Nepal operates an ISO Class 7 cleanroom manufacturing facility in Itahari, Sunsari. As a doctor-formulated skincare manufacturer, CDerma synthesizes high-potency dermocosmetics combining pharmaceutical ceramides and high-altitude wildcrafted Centella Asiatica with zero airborne cross-contamination.": "सिडर्मा नेपालले इटहरी, सुनसरीमा ISO क्लास ७ क्लिनरुम प्रयोगशाला सञ्चालन गर्दछ। डाक्टर-प्रमाणित निर्माताको रूपमा, सिडर्माले शून्य वायु प्रदूषणका साथ सेरामाइड र उच्च हिमाली सेन्टेला संयोजन गरी उच्च गुणस्तरका उत्पादनहरू तयार गर्दछ।",
  "Clinical Overview": "क्लिनिकल सिंहावलोकन",
  "Biochemical Mechanism": "बायोकेमिकल प्रक्रिया",
  "Dermatologist Protocol": "चिकित्सकीय प्रोटोकल",
  "Laboratory Assay": "प्रयोगशाला परीक्षण रिपोर्ट",
  "Usage Instructions": "प्रयोग गर्ने विधि",
  "Active Ingredients": "सक्रिय सामग्रीहरू",
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
  "Certified Retail Partner": "प्रमाणित खुद्रा साझेदार",
  ") is doctor-formulated specifically for Nepali dermal physiology. Unlike imported skincare that may face compromised storage conditions or generic formulations, CDerma face care products are cold-chain distributed with verifiable batch testing, zero synthetic perfume, and direct dispensing through authorized cosmetic stores, licensed dermatology clinics, and hospital pharmacies across Kathmandu, Pokhara, and Eastern Nepal.": ") नेपाली छालाको शारीरिक बनावटका लागि विशेष रूपमा डाक्टर-फर्मुलेट गरिएको हो। आयातित स्किनकेयरको विपरीत जुन प्रतिकूल भण्डारण अवस्था वा सामान्य फर्मुलेसनमा हुन सक्छन्, सी-डर्माका फेस केयर उत्पादनहरू प्रमाणित ब्याच परीक्षण, शून्य कृत्रिम सुगन्ध, र काठमाडौं, पोखरा तथा पूर्वी नेपालभर अधिकृत कस्मेटिक स्टोर, इजाजतपत्र प्राप्त डर्मेटोलोजी क्लिनिक र अस्पताल फार्मेसीहरू मार्फत कोल्ड-चेन वितरण गरिन्छन्।",
  "is a doctor-formulated face care manufacturer and clinical skincare supplier based in Itahari, Sunsari, Koshi Province. Crafted for Nepal’s high-altitude UV, urban pollution, and dry winters, CDerma synthesizes prescription-grade Centella barrier serums, bio-identical ceramide creams, and physiological cleansers for consumers and wholesale partners nationwide.": "इटहरी, सुनसरी, कोशी प्रदेशमा अवस्थित डाक्टर-फर्मुलेटेड फेस केयर उत्पादक तथा क्लिनिकल स्किनकेयर आपूर्तिकर्ता हो। नेपालको उच्च-उचाइको UV, सहरी प्रदूषण र सुक्खा जाडोका लागि तयार गरिएको, सी-डर्माले देशभरका उपभोक्ता र थोक साझेदारहरूका लागि प्रिस्क्रिप्शन-ग्रेड सेन्टेला ब्यारियर सीरम, बायो-आइडेन्टिकल सिरामाइड क्रिम र शारीरिक क्लिन्जरहरू उत्पादन गर्दछ।",
  "for daily skin barrier health, sensitive skin, and post-procedure recovery. Formulated in our ISO Class 7 cleanroom in Itahari, Sunsari, it integrates 5% pharmaceutical Madecassoside with bio-identical ceramides (NP, AP, EOP) designed specifically to counteract Nepal’s extreme UV exposure and elevation-driven dry climates.": "दैनिक छाला ब्यारियर स्वास्थ्य, संवेदनशील छाला र प्रक्रिया पछिको रिकभरीका लागि। इटहरी, सुनसरी स्थित हाम्रो ISO क्लास ७ क्लिनरुममा फर्मुलेट गरिएको, यसमा ५% फार्मास्युटिकल मेडकासोसाइड र बायो-आइडेन्टिकल सिरामाइड्स (NP, AP, EOP) समावेश छ, जुन विशेष रूपमा नेपालको अत्यधिक घाम र उचाइका कारण हुने सुक्खा मौसमको सामना गर्न डिजाइन गरिएको हो।",
  "\"Most skin problems I see can be fixed with three things: a gentle cleanser, a good moisturiser, and sunscreen every single morning. You don't need 10 products — you need the right ones.\"": "\"मैले देख्ने अधिकांश छालाका समस्याहरू तीन चीजले समाधान गर्न सकिन्छ: एक कोमल क्लिन्जर, राम्रो मोइस्चराइजर, र हरेक बिहान सनस्क्रिन। तपाईंलाई १० थरी उत्पादन चाहिँदैन — सही उत्पादन चाहिन्छ।\"",
  "Are you a cosmetic store retailer, licensed dermatologist, or aesthetic clinic?": "के तपाईं कस्मेटिक स्टोर खुद्रा बिक्रेता, इजाजतपत्र प्राप्त छाला रोग विशेषज्ञ, वा एस्थेटिक क्लिनिक हुनुहुन्छ?",
  "Why do doctors in Nepal recommend barrier repair serums over bleaching creams?": "नेपालका डाक्टरहरूले ब्लिचिङ क्रिमभन्दा ब्यारियर रिपेयर सीरम किन सिफारिस गर्छन्?",
  "Are CDerma formulations safe for daily use in high-altitude regions of Nepal?": "के नेपालका उच्च-उचाई भएका क्षेत्रहरूमा दैनिक प्रयोगका लागि सी-डर्मा फर्मुलेसनहरू सुरक्षित छन्?",
  "Boosts hydration, fades dark spots and acne marks, and evens out skin tone.": "हाइड्रेशन बढाउँछ, कालो दाग र डण्डीफोरका खतहरू हटाउँछ, र छालाको रंग समान बनाउँछ।",
  "What is the Minimum Order Quantity (MOQ) for regional salons & pharmacies?": "क्षेत्रीय सैलुन तथा फार्मेसीहरूका लागि न्यूनतम अर्डर परिमाण (MOQ) कति हो?",
  "Fast soothing for redness, sunburn, facial irritation, and sensitive skin.": "रातोपन, घामले डढेको, अनुहारको जलन, र संवेदनशील छालाको लागि द्रुत शीतलता प्रदान गर्दछ।",
  "Replaces natural skin lipids to repair damaged barriers and stop peeling.": "क्षतिग्रस्त ब्यारियर मर्मत गर्न र छाला उप्किनबाट रोक्न प्राकृतिक लिपिड पुनःस्थापना गर्छ।",
  "GMP Facility Registration • Itahari Science Campus, Koshi Province, Nepal": "GMP प्रयोगशाला दर्ता • इटहरी साइन्स क्याम्पस, कोशी प्रदेश, नेपाल",
  "What makes CDerma the best face care product in Nepal for sensitive skin?": "संवेदनशील छालाका लागि सिडर्मालाई नेपालको उत्कृष्ट फेस केयर के ले बनाउँछ?",
  "Partner details strictly preserved under Nepal Data Privacy Regulations.": "साझेदारहरूको विवरण नेपालको गोपनीयता कानुन बमोजिम पूर्ण सुरक्षित राखिन्छ।",
  "How should I adapt my skincare routine during Nepal's dry winter season?": "नेपालको सुख्खा जाडो मौसममा छाला हेरचाह दिनचर्या कसरी परिवर्तन गर्ने?",
  "Consistent 28-day regimen yields permanent lipid bilayer strengthening": "नियमित २८ दिने प्रयोगले छालाको लिपिड तहलाई स्थायी रूपमा मजबुत बनाउँछ",
  "Skincare Manufacturer & Cosmetic Wholesale Supplier Nepal | CDerma B2B": "छाला हेरचाह निर्माता तथा कस्मेटिक थोक आपूर्तिकर्ता नेपाल | सिडर्मा B2B",
  "Empower Your Cosmetic Store & Practice With Doctor-Formulated Skincare": "आफ्नो कस्मेटिक स्टोर र क्लिनिकलाई डाक्टर-प्रमाणित स्किनकेयरबाट सशक्त बनाउनुहोस्",
  "Where can I buy authentic doctor-recommended CDerma products in Nepal?": "नेपालमा डाक्टरद्वारा सिफारिस गरिएको असली सिडर्मा उत्पादन कहाँ किन्न सकिन्छ?",
  "Can this concentrate be layered with Active Retinoids and Vitamin C?": "के यो कन्सन्ट्रेटलाई रेटिनोइड र भिटामिन सीसँग मिलाएर प्रयोग गर्न सकिन्छ?",
  "AEO Quick Summary · Skincare Manufacturer & Wholesale Supplier Nepal": "AEO संक्षिप्त सारांश · छाला हेरचाह निर्माता तथा थोक आपूर्तिकर्ता नेपाल",
  "Which is the best face care product in Nepal for daily skin repair?": "दैनिक छाला मर्मतका लागि नेपालको उत्कृष्ट फेस केयर उत्पादन कुन हो?",
  "Refrigerated express door delivery to enrolled aesthetics practices": "सूचीकृत क्लिनिकहरूमा तापक्रम-नियन्त्रित द्रुत डेलिभरी",
  "Why is CDerma Nepal recommended over imported face care products?": "विदेशी उत्पादन भन्दा सिडर्मा नेपाल किन बढी सिफारिस गरिन्छ?",
  "How does cosmetic store wholesale and clinic batch ordering work?": "कस्मेटिक स्टोर थोक र क्लिनिक ब्याच अर्डर कसरी काम गर्छ?",
  "Authorized Retailer certificate & national store locator listing": "अधिकृत बिक्रेता प्रमाणपत्र र राष्ट्रिय स्टोर सूचीमा दर्ता",
  "Why is CDerma specifically suited for Nepali skin and climate?": "सिडर्मा नेपाली छाला र हावापानीका लागि किन विशेष अनुकूल छ?",
  "Regional Offices: Naxal, Kathmandu & Traffic Chowk, Biratnagar": "क्षेत्रीय कार्यालयहरू: नक्साल, काठमाडौँ र ट्राफिक चोक, विराटनगर",
  "Can pharmacists and clinic owners visit the Itahari facility?": "के फार्मासिस्ट र क्लिनिक सञ्चालकहरूले इटहरी प्रयोगशाला भ्रमण गर्न सक्छन्?",
  "Is this safe for acne-prone, fungal acne, and sensitive skin?": "के यो डण्डिफोर आउने र संवेदनशील छालाका लागि सुरक्षित छ?",
  "What is the shelf-life and proper storage in Nepal's climate?": "नेपालको मौसममा यसको म्याद र उचित भण्डारण विधि के हो?",
  "Direct continuous cold-chain fleet departs 06:00 NST daily.": "प्रत्यक्ष कोल्ड-चेन ढुवानी दैनिक बिहान ६:०० बजे प्रस्थान गर्दछ।",
  "Skincare & Face Care Products Nepal — Wholesale B2B Catalog": "छाला तथा अनुहार हेरचाह उत्पादनहरू नेपाल — थोक B2B क्याटलग",
  "Authorized Enterprise, Cosmetic Store & Healthcare Channel": "अधिकृत व्यावसायिक, कस्मेटिक स्टोर तथा स्वास्थ्य संस्था च्यानल",
  ". These work from the inside out, not just on the surface.": ", जसले बाहिरबाट मात्र नभई छालाको भित्री तहदेखि नै काम गर्छन्।",
  "What is the shelf life and stability of CDerma face care?": "सिडर्मा फेस केयरको म्याद र स्थिरता कति हुन्छ?",
  "Authorized Cosmetic Store & Clinic Locator | CDerma Nepal": "अधिकृत कस्मेटिक स्टोर तथा क्लिनिक खोजी | सिडर्मा नेपाल",
  "Live Sensor: 19.4°C • 41% RH • 0.00 Particles ≥0.5μm/ft³": "प्रत्यक्ष सेन्सर: १९.४° सेन्टिग्रेड • ४१% RH • ०.०० कणहरू ≥०.५μm/ft³",
  "Doctor's Advice & Skincare Tips in Nepal | CDerma Nepal": "नेपालमा डाक्टरको सल्लाह र छाला हेरचाह सुझावहरू | सिडर्मा नेपाल",
  "Tester displays, cosmetic counter units & sample packs": "टेस्टर डिस्प्ले, काउन्टर युनिट र परीक्षण नमुना प्याकहरू",
  "is widely regarded by practicing dermatologists as the": "चिकित्सकहरूद्वारा व्यापक रूपमा मानिएको",
  "Weightless Absorption Meets Deep Barrier Nourishment": "हल्का अवशोषण र गहिरो ब्यारियर पोषणको संगम",
  "Cleanroom Quality & Botanical Science | CDerma Nepal": "क्लिनरुम गुणस्तर तथा वानस्पतिक विज्ञान | सिडर्मा नेपाल",
  "Nepal Pharmacopeia & Cold-Chain Logistical Assurance": "नेपाल फर्माकोपिया र कोल्ड-चेन ढुवानी सुनिश्चितता",
  "Dermatologist • Kathmandu Skin & Laser Hospital": "चर्मरोग विशेषज्ञ • काठमाडौँ स्किन एण्ड लेजर हस्पिटल",
  "Dermatologist &bull; Kathmandu Skin & Laser Hospital": "चर्मरोग विशेषज्ञ • काठमाडौँ स्किन एण्ड लेजर हस्पिटल",
  "Your skin has a natural protective layer called the": "तपाईंको छालामा प्राकृतिक सुरक्षात्मक तह हुन्छ जसलाई",
  "Dedicated retail & clinic account support manager": "समर्पित खुद्रा तथा क्लिनिक ग्राहक सहायता प्रबन्धक",
  "Live Provincial Registry • 198 Authorized Outlets": "प्रत्यक्ष प्रादेशिक दर्ता • १९८ अधिकृत आउटलेटहरू",
  "Enterprise, Cosmetic Store & Healthcare Channel": "व्यावसायिक, कस्मेटिक स्टोर तथा स्वास्थ्य संस्था च्यानल",
  "How are CDerma doctor recommendations verified?": "सिडर्माका डाक्टर सिफारिसहरू कसरी प्रमाणित गरिन्छन्?",
  "NMC Licensed Dermatologists & Cosmetic Surgeons": "NMC इजाजत प्राप्त चर्मरोग विशेषज्ञ तथा कस्मेटिक सर्जन",
  "Registered Clinics, Salons & Cosmetic Retailers": "दर्ता भएका क्लिनिक, सैलुन तथा कस्मेटिक पसलहरू",
  "Cleanroom Quality Assurance & Cold Chain Supply": "क्लिनरुम गुणस्तर सुनिश्चितता र कोल्ड-चेन आपूर्ति",
  "Best Face Care Products in Nepal: Complete Guide": "नेपालमा उत्कृष्ट फेस केयर उत्पादनहरू: पूर्ण निर्देशिका",
  "Direct Cold-Chain Dispatch from Koshi Facility": "कोशी केन्द्रबाट प्रत्यक्ष तापक्रम-नियन्त्रित ढुवानी",
  "CDerma Advanced Barrier Restore Concentrate": "सिडर्मा एड्भान्स्ड ब्यारियर रिस्टोर कन्सन्ट्रेट",
  "CDerma Centella Barrier Restore Concentrate": "सिडर्मा सेन्टेला ब्यारियर रिस्टोर कन्सन्ट्रेट",
  "Certificate of Analysis (COA) Guarantee": "प्रयोगशाला विश्लेषण प्रमाणपत्र (COA) ग्यारेन्टी",
  "best face care product in Nepal": "नेपालको उत्कृष्ट फेस केयर उत्पादन",
  "CDerma Choice by Professional": "सिडर्मा च्वाइस बाइ प्रोफेसनल",
  "Batch #NP-ITH-0442 / Koshi Facility": "ब्याच #NP-ITH-0442 / कोशी केन्द्र",
  "FORMULATION SPEC // INCI TRANSPARENCY": "फर्मुलेशन विवरण // INCI पारदर्शिता",
  "Immediate Stratum Assimilation": "छालाको बाहिरी पत्रमा तत्काल अवशोषण",
  "Purity Grade: 99.4% Clinical USP": "शुद्धता ग्रेड: ९९.४% क्लिनिकल USP",
  "Alpine Purity & Active Synergy": "हिमाली शुद्धता र सक्रिय तत्वहरूको तालमेल",
  "Botanical & Molecular Balance": "वानस्पतिक तथा आणविक सन्तुलन",
  "Phyto-Active + Molecular Matrix": "फाइटो-एक्टिभ + आणविक म्याट्रिक्स",
  "Dr. R. Shrestha, MBBS, DDVL": "डा. आर. श्रेष्ठ, MBBS, DDVL",
  "Bio-Fermented Sourced": "बायो-फर्मेन्टेड स्रोतबाट प्राप्त",
  "High Altitude Sourced": "उच्च हिमाली भेगबाट संकलित",
  "Press Gently Into Skin": "छालामा बिस्तारै थिचेर लगाउनुहोस्",
  "Zero White-Cast Mineral": "सेतो दाग नछोड्ने मिनरल सनस्क्रिन",
  "Apothecary Collection": "क्लिनिकल फेस केयर संग्रह",
  "View Clinical Monograph": "क्लिनिकल मोनोग्राफ हेर्नुहोस्",
  "Photoprotection · 50ml": "सन केयर · ५० मिलि",
  "Velvet Barrier Melt": "रेशमी ब्यारियर मल्ट",
  "Hydrating Gel Lather": "हाइड्रेटिङ जेल लेदर",
  "Daily Solar Defense": "दैनिक घामबाट सुरक्षा",
  "AM / PM · 60 Seconds": "बिहान / साँझ · ६० सेकेन्ड",
  "(Even Tone & Clarity)": "(सफा र एकनास छाला)",
  "Moisturizers · 50ml": "मोइस्चराइजर · ५० मिलि",
  "Clinical Monograph": "क्लिनिकल मोनोग्राफ",
  "Supervising Physician:": "निरीक्षक चिकित्सक:",
  "Dr. A. Karki (NMC 9482)": "डा. ए. कार्की (NMC ९४८२)",
  "Consultant Dermatologist &bull; Kathmandu Skin Center": "कन्सल्टेन्ट डर्माटोलोजिस्ट • काठमाडौं स्किन सेन्टर",
  "Consultant Dermatologist • Kathmandu Skin Center": "कन्सल्टेन्ट डर्माटोलोजिस्ट • काठमाडौं स्किन सेन्टर",
  "Chief Aesthetic Physician &bull; Pokhara Dermal Care": "प्रमुख एस्थेटिक फिजिसियन • पोखरा डर्मल केयर",
  "Chief Aesthetic Physician • Pokhara Dermal Care": "प्रमुख एस्थेटिक फिजिसियन • पोखरा डर्मल केयर",
  "Cleanroom Facility • Koshi Province": "क्लिनरुम प्रयोगशाला • कोशी प्रदेश",
  "ISO 9001:2015 Registered Facility": "ISO ९००१:२०१५ दर्ता प्राप्त प्रयोगशाला",
  "ISO 9001:2015 Certified Cleanroom": "ISO ९००१:२०१५ प्रमाणित क्लिनरुम",
  "ISO Class 7 Cleanroom Protocol": "ISO क्लास ७ क्लिनरुम प्रोटोकल",
  "Class 10,000 Cleanroom Certified": "क्लास १०,००० क्लिनरुम प्रमाणित",
  "Air-Filtered Sterile Staging": "फिल्टर गरिएको जीवाणुरहित वातावरण",
  "Positive Air Pressure Cascades": "पोजिटिभ प्रेसर एयर भेन्टिलेसन",
  "HEPA Air Filtration & Airlocks": "हेपा एयर फिल्टरेशन र एयरलक प्रणाली",
  "Microbial & Heavy Metal Purity": "माइक्रोबियल तथा हेभी मेटल शुद्धता",
  "Independent Batch Verification": "स्वतन्त्र ब्याच प्रमाणीकरण",
  "Zero Microbial Tolerance": "शून्य माइक्रोबियल सहनशीलता",
  "Tamper-Evident Safety Seals": "सुरक्षित सिलबन्दी प्याकेजिङ",
  "Batch Traceability System": "ब्याच ट्र्याकिङ प्रणाली",
  "Cold-Chain Logistics Network": "कोल्ड-चेन ढुवानी सञ्जाल",
  "Direct From Itahari Facility": "हाम्रो इटहरी केन्द्रबाट सिधै",
  "Made for South Asian Skin": "दक्षिण एसियाली छालाका लागि विशेष निर्मित",
  "Doctor Formulated Skincare": "चिकित्सकद्वारा प्रमाणित छाला हेरचाह",
  "Physiological pH Balanced": "प्राकृतिक pH सन्तुलित",
  "Gentle & Fragrance-Free": "कोमल तथा सुगन्ध-रहित",
  "Sterile & Non-Comedogenic": "जीवाणुरहित र नन-कमेडोजेनिक",
  "100% Vegan & Cruelty-Free": "१००% भेजान र क्रुरता-रहित",
  "Safe Post-Procedure Care": "उपचारपछिको सुरक्षित हेरचाह",
  "Clinically Tested in Nepal": "नेपालमै क्लिनिकली परीक्षण गरिएको",
  "Centella Asiatica Leaf Water": "सेन्टेला एसियाटिका पातको पानी",
  "Ceramide NP, AP, EOP": "सेरामाइड NP, AP, EOP",
  "Botanical Squalane (Olive)": "बोटानिकल स्क्वालेन (जैतुन)",
  "Zinc Oxide & Mineral Screen": "जिंक अक्साइड र मिनरल शिल्ड",
  "Soothing Gel Cleanser": "शान्त पार्ने जेल क्लिन्जर",
  "Barrier Repair Serum": "ब्यारियर मर्मत सिरम",
  "Deep Hydration Cream": "गहिरो आद्रता क्रिम",
  "Daily Mineral Sunscreen": "दैनिक मिनरल सनस्क्रिन",
  "Clarifying Face Wash": "सफा गर्ने फेस वास",
  "Restorative Night Oil": "रात्रिकालीन पुनर्स्थापना तेल",
  "Refreshing Face Mist": "ताजगी दिने फेस मिस्ट",
  "Exfoliating Treatment": "एक्सफोलिएटिंग ट्रिटमेन्ट",
  "Soothing Lip Treatment": "कोमल ओठको मर्मत",
  "Post-Laser Recovery Balm": "लेजरपछिको रिकभरी बाम",
  "Hydrating Toner Essence": "हाइड्रेटिङ टोनर इसेन्स",
  "Nourishing Eye Cream": "आँखा वरिपरिको पोषण क्रिम",
  "Brightening Serum": "चमक दिने सिरम",
  "Calming Face Mask": "शान्त पार्ने फेस मास्क",
  "Wholesale Portal": "थोक पोर्टल",
  "Retail Onboarding": "खुद्रा अनबोर्डिङ",
  "Clinic Dispensary": "क्लिनिक औषधालय",
  "Order Sample Kit": "स्याम्पल किट मगाउनुहोस्",
  "Request Price List": "मूल्य सूची अनुरोध गर्नुहोस्",
  "Apply for Partnership": "साझेदारीका लागि आवेदन दिनुहोस्",
  "Become an Authorized Retailer": "अधिकृत बिक्रेता बन्नुहोस्",
  "Download B2B Catalog": "B2B क्याटलग डाउनलोड गर्नुहोस्",
  "View Certificates of Analysis": "COA रिपोर्ट हेर्नुहोस्",
  "Track Your Batch": "आफ्नो ब्याच ट्र्याक गर्नुहोस्",
  "Find Nearest Clinic": "नजिकको क्लिनिक खोज्नुहोस्",
  "Contact Support Team": "ग्राहक सहायता टोलीसँग सम्पर्क गर्नुहोस्",
  "Chat on WhatsApp": "ह्वाट्सएपमा कुरा गर्नुहोस्",
  "Email Medical Liaison": "चिकित्सा टोलीलाई इमेल गर्नुहोस्",
  "Call Our Itahari Office": "हाम्रो इटहरी कार्यालयमा फोन गर्नुहोस्",
  "Visit Our Facility": "हाम्रो प्रयोगशाला भ्रमण गर्नुहोस्",
  "Monday - Friday, 9am - 5pm": "सोमबार - शुक्रबार, बिहान ९ - साँझ ५",
  "Sunday - Friday, 9am - 6pm": "आइतबार - शुक्रबार, बिहान ९ - साँझ ६",
  "Emergency Inquiries": "आपतकालीन सोधपुछ",
  "Press & Media Relations": "प्रेस तथा मिडिया सम्बन्ध",
  "Career Opportunities": "रोजगारीका अवसरहरू",
  "Privacy Policy": "गोपनीयता नीति",
  "Terms of Service": "सेवाका सर्तहरू",
  "Compliance & Standards": "अनुपालन र मापदण्डहरू",
  "Site Map & Directory": "साइट म्याप र निर्देशिका",
  "All Rights Reserved": "सर्वाधिकार सुरक्षित",
  "Choice by Professional": "विज्ञहरूको विश्वासिलो रोजाइ",
  "CDerma Nepal": "सिडर्मा नेपाल",
  "Face Care": "फेस केयर",
  "View Monograph": "मोनोग्राफ हेर्नुहोस्",
  "Download Report": "रिपोर्ट डाउनलोड गर्नुहोस्",
  "Apply Now": "अहिले आवेदन दिनुहोस्",
  "Get In Touch": "सम्पर्क गर्नुहोस्",
  "Learn More": "थप जान्नुहोस्",
  "Explore": "अन्वेषण गर्नुहोस्",
  "View All": "सबै हेर्नुहोस्",
  "Back to Top": "माथि जानुहोस्",
  "Close": "बन्द गर्नुहोस्",
  "Submit": "पेश गर्नुहोस्",
  "Search": "खोज्नुहोस्",
  "Filter": "फिल्टर",
  "Clear All": "सबै खाली गर्नुहोस्",
  "Loading...": "लोड हुँदैछ...",
  "Please Wait": "कृपया पर्खनुहोस्",
  "Success!": "सफल भयो!",
  "Thank You": "धन्यवाद",
  "Standard Store / Clinic Supply (50 - 150 Units)": "मानक स्टोर / क्लिनिक आपूर्ति (५० - १५० थान)",
  "Tiered volume pricing with predictable margins": "पूर्वानुमानित नाफा सहितको परिमाणमा आधारित मूल्य",
  "GPS: Kathmandu Valley (27.7172° N, 85.3240° E)": "GPS: काठमाडौं उपत्यका (२७.७१७२° N, ८५.३२४०° E)",
  "Frequently Asked Questions: Face Care in Nepal": "प्रायः सोधिने प्रश्नहरू: नेपालमा फेस केयर",
  "Dispatched before 11:00 AM arrives by 4:00 PM": "बिहान ११:०० अघि पठाइए दिउँसो ४:०० बजेसम्म आइपुग्छ",
  "ceramides, niacinamide, and centella asiatica": "सिरामाइड्स, नियासिनामाइड र सेन्टेला एशियाटिका",
  "6 articles &bull; Written by verified doctors": "६ लेखहरू • प्रमाणित डाक्टरहरूद्वारा लिखित",
  "6 articles • Written by verified doctors": "६ लेखहरू • प्रमाणित डाक्टरहरूद्वारा लिखित",
  "Cosmetic Store & Clinical Dispensary Channel": "कस्मेटिक स्टोर तथा क्लिनिकल डिस्पेन्सरी च्यानल",
  "Stocked at 32 certified hospital pharmacies.": "३२ प्रमाणित अस्पताल फार्मेसीहरूमा उपलब्ध।",
  "Formulated in Nepal with Cleanroom Precision": "क्लिनरुम शुद्धताका साथ नेपालमै फर्मुलेट गरिएको",
  "CDerma Sub-Critical Extraction: 88.4% Active": "सी-डर्मा सब-क्रिटिकल निकासी: ८८.४% सक्रिय",
  "Verified Retail & Dispensary Network • Nepal": "प्रमाणित खुद्रा तथा डिस्पेन्सरी सञ्जाल • नेपाल",
  "Written by doctors &bull; Easy to understand": "डाक्टरहरूद्वारा लिखित • बुझ्न सजिलो",
  "Written by doctors • Easy to understand": "डाक्टरहरूद्वारा लिखित • बुझ्न सजिलो",
  "Applied Chemistry &bull; CDerma Lab, Itahari": "एप्लाइड केमिस्ट्री • सी-डर्मा ल्याब, इटहरी",
  "Applied Chemistry • CDerma Lab, Itahari": "एप्लाइड केमिस्ट्री • सी-डर्मा ल्याब, इटहरी",
  "High-Altitude Mineral Shield SPF 50+ PA++++": "उच्च-उचाइ मिनरल शिल्ड SPF 50+ PA++++",
  "Extraction Yield Purity vs Thermal Baseline": "निकासी शुद्धता बनाम तापीय आधार रेखा",
  "Cosmetic Store / Practice / Business Name *": "कस्मेटिक स्टोर / क्लिनिक / व्यवसायको नाम *",
  "AEO Quick Summary · Clinic & Store Locator:": "AEO द्रुत सारांश · क्लिनिक र स्टोर लोकेटर:",
  "Urgent Clinical Orders / WhatsApp Dispatch": "तत्काल क्लिनिकल अर्डर / ह्वाट्सएप डिस्प्याच",
  "Available Locations (7 Authorized Outlets)": "उपलब्ध स्थानहरू (७ अधिकृत आउटलेटहरू)",
  "that mortar — specifically ones containing": "त्यो मोर्टार — विशेष गरी समावेश भएका",
  "Actives: 5% Madecassoside + Ceramide Trio": "सक्रिय तत्वहरू: ५% मेडकासोसाइड + सिरामाइड त्रयी",
  "Lead Formulation Pharmacist • Itahari Lab": "प्रमुख फर्मुलेसन फार्मासिस्ट • इटहरी ल्याब",
  "Pure · Disciplined · Domestic Excellence": "शुद्ध · अनुशासित · स्वदेशी उत्कृष्टता",
  "Dispensing & Distribution Classification": "वितरण तथा आपूर्ति वर्गीकरण",
  "Cleanroom Protocol • Technical Monograph": "क्लिनरुम प्रोटोकल • प्राविधिक मोनोग्राफ",
  "Medical Practitioners & Clinic Directors": "चिकित्सक तथा क्लिनिक निर्देशकहरू",
  "Premium Cosmetic Store / Beauty Boutique": "प्रिमियम कस्मेटिक स्टोर / ब्युटी बुटिक",
  "Sunsari District, Koshi Province, Nepal": "सुनसरी जिल्ला, कोशी प्रदेश, नेपाल",
  "Cosmetic Store / Business / Clinic Name": "कस्मेटिक स्टोर / व्यवसाय / क्लिनिकको नाम",
  "Cleanroom Verified: Koshi Province Labs": "क्लिनरुम प्रमाणित: कोशी प्रदेश प्रयोगशाला",
  "Birat Heart & Health Center, Biratnagar": "विराट हार्ट एण्ड हेल्थ सेन्टर, विराटनगर",
  "Cosmetic Store, Clinic, Doctor, or City": "कस्मेटिक स्टोर, क्लिनिक, डाक्टर वा शहर",
  "Formulated Under Professional Guidance": "व्यावसायिक मार्गदर्शनमा तयार गरिएको",
  "Clinical Batch Tested & INCI Compliant": "क्लिनिकल ब्याच परीक्षण गरिएको र INCI अनुरूप",
  "Institutional / Bulk (150 - 500 Units)": "संस्थागत / थोक (१५० - ५०० थान)",
  "Bagmati (Kathmandu, Lalitpur, Chitwan)": "बागमती (काठमाडौं, ललितपुर, चितवन)",
  "Imported Actives & Sourcing Standards": "आयातित सक्रिय तत्वहरू र संकलन मापदण्ड",
  "Kathmandu & Pokhara Clinical Standard": "काठमाडौं र पोखरा क्लिनिकल मापदण्ड",
  "Skin Type: Sensitive, Dry, Acne-Prone": "छालाको प्रकार: संवेदनशील, सुक्खा, डण्डीफोर आउने",
  "Optimal pH: 5.4 - 5.8 (Physiological)": "उत्कृष्ट pH: ५.४ - ५.८ (प्राकृतिक)",
  "Calibrated Data-Logger on Every Crate": "प्रत्येक क्रेटमा क्यालिब्रेटेड डेटा-लगर",
  "Submit Wholesale & Retail Application": "थोक तथा खुद्रा आवेदन पेश गर्नुहोस्",
  "Air-cargo priority dispatch available": "हवाई कार्गो प्राथमिकता ढुवानी उपलब्ध",
  "Updated regularly by our medical team": "हाम्रो मेडिकल टोलीद्वारा नियमित रूपमा अद्यावधिक",
  "Advanced Barrier Restore Concentrate": "एडभान्स्ड ब्यारियर रिस्टोर कन्सन्ट्रेट",
  "Standard Solvent Boiling: 32% Active": "मानक विलायक उमाल्ने: ३२% सक्रिय",
  "Centella Intensive Repair Serum 30ml": "सेन्टेला इन्टेन्सिभ रिपेयर सीरम ३० मि.लि.",
  "Lot: LOT-24-0442 • Mfd: Nov 12, 2024": "लट: LOT-24-0442 • उत्पादन: १२ नोभेम्बर २०२४",
  "Zero E-Commerce Diversion Guaranteed": "कुनै ई-कमर्स विचलन नहुने ग्यारेन्टी",
  "Itahari Industrial Formulation Park": "इटहरी औद्योगिक फर्मुलेसन पार्क",
  "Flagship Restorative Formula No. 04": "प्रमुख पुनर्स्थापना फर्मुला नं. ०४",
  "Guaranteed Authentic & Batch-Tested": "प्रमाणित वास्तविक र ब्याच-परीक्षण गरिएको",
  "Works Great With Makeup & Sunscreen": "मेकअप र सनस्क्रिनसँग उत्कृष्ट काम गर्छ",
  "Frequently Asked Clinical Questions": "प्रायः सोधिने क्लिनिकल प्रश्नहरू",
  "Madhesh Province (Birgunj/Janakpur)": "मधेश प्रदेश (वीरगञ्ज/जनकपुर)",
  "Koshi (Biratnagar, Itahari, Dharan)": "कोशी (विराटनगर, इटहरी, धरान)",
  "Request Wholesale & Retail Samples": "थोक तथा खुद्रा नमूना अनुरोध गर्नुहोस्",
  "USP 61 / 62 Microbiological Passed": "USP ६१ / ६२ माइक्रोबायोलोजिकल उत्तीर्ण",
  "Assayed by Dr. P. Bhattarai, Ph.D.": "डा. पी. भट्टराई, Ph.D. द्वारा परीक्षण गरिएको",
  "Koshi Province (Biratnagar/Dharan)": "कोशी प्रदेश (विराटनगर/धरान)",
  "Trial Starter Pack (25 - 50 Units)": "परीक्षण प्रारम्भिक प्याक (२५ - ५० थान)",
  "Authorized Retail & Clinic Network": "अधिकृत खुद्रा तथा क्लिनिक सञ्जाल",
  "Nepal Provincial Distribution Grid": "नेपाल प्रादेशिक वितरण सञ्जाल",
  "Direct Cleanroom Dispatch Protocol": "प्रत्यक्ष क्लिनरुम ढुवानी प्रोटोकल",
  "Lot Tracked via Koshi Cleanroom QA": "कोशी क्लिनरुम QA मार्फत लट ट्र्याकिङ",
  "The Short Answer (From the Doctor)": "संक्षिप्त जवाफ (डाक्टरबाट)",
  "Zero airborne cross-contamination": "शून्य हावाजन्य क्रस-प्रदूषण",
  "Indigenous Bio-Active Procurement": "स्थानीय जैविक-सक्रिय तत्व संकलन",
  "CDerma Certified Analytical Assay": "सी-डर्मा प्रमाणित विश्लेषणात्मक परीक्षण",
  "Download Wholesale Schedule (PDF)": "थोक मूल्यसूची डाउनलोड गर्नुहोस् (PDF)",
  "Dermatological Integrity Protocol": "छाला सम्बन्धी अखण्डता प्रोटोकल",
  "NMC Registered Practitioners Only": "NMC दर्ता प्राप्त चिकित्सकहरू मात्र",
  "Read Cleanroom Quality Whitepaper": "क्लिनरुम गुणस्तर श्वेतपत्र पढ्नुहोस्",
  "Practitioner Dispensing Inquiries": "चिकित्सक वितरण सोधपुछ",
  "Apply for Retail & Clinic Supply": "खुद्रा तथा क्लिनिक आपूर्तिका लागि आवेदन दिनुहोस्",
  "Serum Concentrate • 30ml Dropper": "सीरम कन्सन्ट्रेट • ३० मि.लि. ड्रपर",
  "Combination / Dysregulated Sebum": "मिश्रित / असन्तुलित सेबम",
  "Apothecary Prescription Standard": "एपोथेकेरी प्रिस्क्रिप्शन मापदण्ड",
  "Kathmandu, Lalitpur & Bhaktapur:": "काठमाडौं, ललितपुर र भक्तपुर:",
  "Alpine Centella Asiatica Extract": "हिमाली सेन्टेला एशियाटिका अर्क",
  "Application Ritual & Integration": "प्रयोग विधि र दिनचर्या",
  "Interactive 4K Remote Video Tour": "अन्तर्क्रियात्मक 4K भिडियो भ्रमण",
  "Apply for Store / Clinic Account": "स्टोर / क्लिनिक खाताका लागि आवेदन दिनुहोस्",
  "Patan Skin Specialists, Lalitpur": "पाटन स्किन स्पेसलिस्ट्स, ललितपुर",
  "Regional Wholesaler (500+ Units)": "क्षेत्रीय थोक बिक्रेता (५००+ थान)",
  "Multi-Molecular Hyaluronic Acid": "मल्टी-मोलिक्युलर हाइलुरोनिक एसिड",
  "Full INCI Technical Declaration": "पूर्ण INCI प्राविधिक घोषणा",
  "PAN / Business / NMC Reg Number": "प्यान / व्यवसाय / NMC दर्ता नम्बर",
  "Daily scheduled courier transit": "दैनिक निर्धारित कुरियर ढुवानी",
  "Domestic Manufacturing Standard": "स्वदेशी उत्पादन मापदण्ड",
  "Selected Hub: Itahari Facility": "छनोट गरिएको हब: इटहरी प्लान्ट",
  "REPLY WITHIN 24 BUSINESS HOURS": "२४ कार्यघण्टाभित्र जवाफ पठाइनेछ",
  "Formula No. 04 — Medical Grade": "फर्मुला नं. ०४ — मेडिकल ग्रेड",
  "Clinical TL;DR / Quick Summary": "क्लिनिकल TL;DR / द्रुत सारांश",
  "Soothing After Facials & Peels": "फेसियल र पिलिङ पछिको शीतलता",
  "Dryness & Damaged Skin Barrier": "सुक्खापन र क्षतिग्रस्त छाला ब्यारियर",
  "Ceramide Complex (NP, AP, EOP)": "सिरामाइड कम्प्लेक्स (NP, AP, EOP)",
  "Thermal Envelope: -5°C to 45°C": "थर्मल दायरा: -५°C देखि ४५°C",
  "Post-Procedure Protocol Guides": "प्रक्रिया पछिको प्रोटोकल गाइडहरू",
  "Chief Pharmacist, DDA Verified": "प्रमुख फार्मासिस्ट, DDA प्रमाणित",
  "B2B WhatsApp: +977 982-0753751": "B2B ह्वाट्सएप: +९७७ ९८२-०७५३७५१",
  "Not Sure What Your Skin Needs?": "तपाईंको छालालाई के चाहिन्छ थाहा छैन?",
  "Step 03 • Concentrated Active": "चरण ०३ • कन्सन्ट्रेटेड एक्टिभ",
  "ISO 7 / Class 10,000 Verified": "ISO ७ / क्लास १०,००० प्रमाणित",
  "Simulated sub-Himalayan aging": "उप-हिमाली मौसम उमेर सिमुलेशन",
  "Protected Integrity Guarantee": "सुरक्षित गुणस्तर ग्यारेन्टी",
  "Heavy Metal Screen (Pb/Hg/As)": "हेभी मेटल परीक्षण (Pb/Hg/As)",
  "Cosmetic Counter Sales Manual": "कस्मेटिक काउन्टर बिक्री पुस्तिका",
  "Senior Aesthetic Practitioner": "वरिष्ठ एस्थेटिक विशेषज्ञ",
  "Clinical FAQ & Search Queries": "क्लिनिकल FAQ र खोज प्रश्नहरू",
  "Nepal Clinical Pharmacopoeia": "नेपाल क्लिनिकल फार्माकोपिया",
  "Gentle Cleansers & Mists (2)": "कोमल क्लिन्जर तथा मिस्टहरू (२)",
  "100% Artificial Perfume Free": "१००% कृत्रिम परफ्यूम रहित",
  "D-Panthenol (Pro-Vitamin B5)": "डी-प्यान्थेनोल (प्रो-भिटामिन B5)",
  "NMID Monitored Active Series": "NMID अनुगमन गरिएको सक्रिय श्रृंखला",
  "Particle Count: Class 10,000": "कण गणना: क्लास १०,०००",
  "Cosmetic Stores & Pharmacies": "कस्मेटिक स्टोर तथा फार्मेसीहरू",
  "Zero Cost Merchandising Kits": "निःशुल्क मर्चेन्डाइजिङ किटहरू",
  "Hospital Associated Pharmacy": "अस्पताल सम्बद्ध फार्मेसी",
  "Retail Pharmacy / Dispensary": "खुद्रा फार्मेसी / डिस्पेन्सरी",
  "Medical Spa & Wellness Suite": "मेडिकल स्पा तथा वेलनेस सुइट",
  "Anticipated Monthly Volume *": "अनुमानित मासिक परिमाण *",
  "Face Care Products in Nepal": "नेपालमा फेस केयर उत्पादनहरू",
  "Clinical Batch: #IT-2025-08": "क्लिनिकल ब्याच: #IT-2025-08",
  "Clinical Batch: #IT-2025-02": "क्लिनिकल ब्याच: #IT-2025-02",
  "Clinical Batch: #IT-2025-05": "क्लिनिकल ब्याच: #IT-2025-05",
  "Clinical Batch: #IT-2025-11": "क्लिनिकल ब्याच: #IT-2025-11",
  "Clinical Batch: #IT-2025-03": "क्लिनिकल ब्याच: #IT-2025-03",
  "Clinical Batch: #IT-2025-09": "क्लिनिकल ब्याच: #IT-2025-09",
  "Shipped from Koshi Province": "कोशी प्रदेशबाट पठाइएको",
  "Fresh Batch No: Lot 24-0442": "ताजा ब्याच नं: लट २४-०४४२",
  "Clinician Consultation Line": "चिकित्सक परामर्श लाइन",
  "Analytical balance accuracy": "विश्लेषणात्मक ब्यालेन्स शुद्धता",
  "Soil-to-vial digital ledger": "माटोदेखि सिसीसम्मको डिजिटल लेजर",
  "Centrifugal Phase Stability": "सेन्ट्रीफ्युगल फेज स्थिरता",
  "Full INCI Dossiers Provided": "पूर्ण INCI डोजियर उपलब्ध",
  "DDA Registered Formulations": "DDA दर्ता गरिएका फर्मुलेसनहरू",
  "Lumbini (Butwal/Bhairahawa)": "लुम्बिनी (बुटवल/भैरहवा)",
  "Himalayan Cleanroom Science": "हिमाली क्लिनरुम विज्ञान",
  "Request Clinical Sample Kit": "क्लिनिकल नमूना किट अनुरोध गर्नुहोस्",
  "From the Lead Doctor's Desk": "प्रमुख डाक्टरको डेस्कबाट",
  "Featured Article This Month": "यस महिनाको विशेष लेख",
  "Certified Imported Actives": "प्रमाणित आयातित सक्रिय तत्वहरू",
  "Download B2B Catalog (PDF)": "B2B क्याटलग डाउनलोड गर्नुहोस् (PDF)",
  "B2B & Retail Priority Desk": "B2B तथा खुद्रा प्राथमिकता डेस्क",
  "Sinks In Within 15 Seconds": "१५ सेकेन्डभित्र छालामा समाहित हुन्छ",
  "Cleanroom Quality Standard": "क्लिनरुम गुणस्तर मापदण्ड",
  "Enter 8-Digit Batch Lot ID": "८-अङ्कको ब्याच लट नम्बर प्रविष्ट गर्नुहोस्",
  "Active Asiaticoside Purity": "सक्रिय एशियाटिकोसाइड शुद्धता",
  "Microbial Bioburden (TAMC)": "माइक्रोबियल बायोबर्डन (TAMC)",
  "ISO Class 7 (Class 10,000)": "ISO क्लास ७ (क्लास १०,०००)",
  "35% – 48% Margin Structure": "३५% – ४८% नाफा संरचना",
  "35% - 48% Margin Structure": "३५% – ४८% नाफा संरचना",
  "Dermatologist Endorsements": "छाला रोग विशेषज्ञहरूको सिफारिस",
  "Third-Party Micro-Screened": "तेस्रो-पक्षीय माइक्रो-परीक्षण गरिएको",
  "Beauty Salon & Skin Lounge": "ब्युटी सैलुन तथा स्किन लाउन्ज",
  "Direct Mobile / WhatsApp *": "प्रत्यक्ष मोबाइल / ह्वाट्सएप *",
  "Bagmati (Kathmandu Valley)": "बागमती (काठमाडौं उपत्यका)",
  "Domestic Distribution Grid": "स्वदेशी वितरण सञ्जाल",
  "Madhesh (Janakpur/Birgunj)": "मधेश (जनकपुर/वीरगञ्ज)",
  "Manufactured in Biratnagar": "विराटनगरमा निर्मित",
  "The fix? Use products that": "समाधान? त्यस्ता उत्पादनहरू प्रयोग गर्नुहोस् जसले",
  "Zero Artificial Fragrance": "शून्य कृत्रिम सुगन्ध",
  "Face Serums & Elixirs (2)": "फेस सीरम र अमृतहरू (२)",
  "High-Altitude Dehydration": "उच्च-उचाइको डिहाइड्रेशन",
  "Hypersensitive / Reactive": "अत्यधिक संवेदनशील / प्रतिक्रियात्मक",
  "Wild Himalayan Botanicals": "जंगली हिमाली जडीबुटीहरू",
  "Doctor Protocol Certified": "डाक्टर प्रोटोकल प्रमाणित",
  "100% Disclosure Monograph": "१००% खुलासा मोनोग्राफ",
  "Analytical Test Parameter": "विश्लेषणात्मक परीक्षण मापदण्ड",
  "Request Practitioner Tour": "चिकित्सक अवलोकन भ्रमण अनुरोध",
  "Download Clinical Dossier": "क्लिनिकल डोजियर डाउनलोड गर्नुहोस्",
  "Enterprise Infrastructure": "इन्टरप्राइज पूर्वाधार",
  "Cleanroom Batch Certified": "क्लिनरुम ब्याच प्रमाणित",
  "Dermatology / Skin Clinic": "छाला रोग / स्किन क्लिनिक",
  "Authorized Cosmetic Store": "अधिकृत कस्मेटिक स्टोर",
  "Koshi Lab Transit: Direct": "कोशी ल्याब ढुवानी: प्रत्यक्ष",
  "Ethical Foraging Altitude": "नैतिक संकलन उचाइ",
  "h by k&k trading concern": "के एन्ड के ट्रेडिङ कन्सर्नद्वारा",
  "Gentle on Sensitive Skin": "संवेदनशील छालाका लागि कोमल",
  "Deep Moisture Creams (1)": "डिप मोइस्चर क्रिमहरू (१)",
  "Pharmacological Standard": "औषधिविज्ञान सम्बन्धी मापदण्ड",
  "Zero Synthetic Fragrance": "शून्य सिंथेटिक सुगन्ध",
  "Pure Cleanroom Standards": "शुद्ध क्लिनरुम मापदण्ड",
  "Made for Nepal's Climate": "नेपालको मौसम अनुकूल तयार गरिएको",
  "Protected Retail Pricing": "संरक्षित खुद्रा मूल्य निर्धारण",
  "Solukhumbu Wild Centella": "सोलुखुम्बुको जंगली सेन्टेला",
  "142 Clinical Evaluations": "१४२ क्लिनिकल मूल्यांकनहरू",
  "Redness & Sensitive Skin": "रातोपन र संवेदनशील छाला",
  "Request Wholesale Sample": "थोक नमूना अनुरोध गर्नुहोस्",
  "High-Altitude Solukhumbu": "उच्च-उचाइ सोलुखुम्बु",
  "Gravimetric Micro-Dosing": "ग्राभिमेट्रिक माइक्रो-डोजिङ",
  "Physiological pH Balance": "शारीरिक pH सन्तुलन",
  "Aesthetic & Laser Center": "एस्थेटिक तथा लेजर सेन्टर",
  "Gandaki (Pokhara Valley)": "गण्डकी (पोखरा उपत्यका)",
  "PHASE 03 // DISPENSATION": "चरण ०३ // वितरण (DISPENSATION)",
  "Stop touching your face.": "आफ्नो अनुहार नछुनुहोस्।",
  "Rx / Clinical Formulary": "Rx / क्लिनिकल फर्मुलरी",
  "Find In Store or Clinic": "स्टोर वा क्लिनिकमा फेला पार्नुहोस्",
  "Dry to Severely Xerotic": "सुक्खा देखि अत्यधिक सुक्खा (जेरोटिक)",
  "Sun Damage & Tan Relief": "घामको असर र ट्यानबाट राहत",
  "100% Breathable & Light": "१००% सास फेर्ने र हलुका",
  "Proven Results in Nepal": "नेपालमा प्रमाणित नतिजाहरू",
  "94.2% Pure Asiaticoside": "९४.२% शुद्ध एशियाटिकोसाइड",
  "Bio-Identical Bio-Layer": "बायो-आइडेन्टिकल बायो-लेयर",
  "Itahari, Koshi Province": "इटहरी, कोशी प्रदेश",
  "INCI Science Monographs": "INCI विज्ञान मोनोग्राफहरू",
  "Fast-Track Registration": "द्रुत दर्ता प्रक्रिया",
  "Select Facility Type...": "सुविधाको प्रकार छान्नुहोस्...",
  "Contact Person & Role *": "सम्पर्क व्यक्ति र पद *",
  "Inquiry Ref: CD-2025-NP": "सोधपुछ सन्दर्भ: CD-2025-NP",
  "Zone 3: Western & Hills": "जोन ३: पश्चिमी तथा पहाडी क्षेत्र",
  "Province / Jurisdiction": "प्रदेश / कार्यक्षेत्र",
  "Karnali & Sudurpashchim": "कर्णाली तथा सुदूरपश्चिम",
  "09:00 - 19:30 (Sun-Fri)": "०९:०० - १९:३० (आइत-शुक्र)",
  "PHASE 02 // FORMULATION": "चरण ०२ // फर्मुलेसन (FORMULATION)",
  "Dr. P. Bhattarai, Ph.D.": "डा. पी. भट्टराई, Ph.D.",
  "Central Koshi Dispatch": "केन्द्रीय कोशी ढुवानी",
  "Zero Synthetic Perfume": "शून्य सिंथेटिक परफ्यूम",
  "Sun Care & SPF 50+ (1)": "सन केयर तथा SPF 50+ (१)",
  "All Tolerance Profiles": "सबै प्रकारको सहनशीलता प्रोफाइल",
  "Dermatologist Approved": "छाला रोग विशेषज्ञद्वारा अनुमोदित",
  "Zero Flaking / Pilling": "कुनै पत्र ननिस्कने / नउप्किने",
  "Zero Sticky Thickeners": "कुनै चिपचिपा बाक्लोपन नभएको",
  "How It Helps Your Skin": "यसले तपाईंको छालालाई कसरी मद्दत गर्छ",
  "Download Lab COA (PDF)": "ल्याब COA डाउनलोड गर्नुहोस् (PDF)",
  "AEO Cleanroom Summary:": "AEO क्लिनरुम सारांश:",
  "Class 10,000 Cleanroom": "क्लास १०,००० क्लिनरुम",
  "Zero Separation [Pass]": "कुनै विभाजन नभएको [उत्तीर्ण]",
  "Nepal Customs Immunity": "नेपाल भन्सार झन्झटमुक्त",
  "Direct Customer Inflow": "प्रत्यक्ष ग्राहक आगमन",
  "Zone 2: Valley Central": "जोन २: उपत्यका केन्द्र",
  "Store & Clinic Locator": "स्टोर तथा क्लिनिक लोकेटर",
  "Aesthetic Institutes (": "एस्थेटिक इन्स्टिच्युटहरू (",
  "Register Your Practice": "आफ्नो क्लिनिक दर्ता गर्नुहोस्",
  "Honest Skincare Advice": "इमानदार छाला हेरचाह सल्लाह",
  "Live Logistics Matrix": "प्रत्यक्ष ढुवानी तालिका",
  "Submit Direct Inquiry": "प्रत्यक्ष सोधपुछ पठाउनुहोस्",
  "Inquiries & Assurance": "सोधपुछ तथा आश्वासन",
  "5% Niacinamide + Cica": "५% नियासिनामाइड + सिका",
  "Green Tea Polyphenols": "ग्रीन टी पोलिफेनल्स",
  "45+ Aesthetic Clinics": "४५+ एस्थेटिक क्लिनिकहरू",
  "Micro-Rheology & Feel": "माइक्रो-रियोलोजी र अनुभूति",
  "Moisture Barrier Test": "मोइस्चर ब्यारियर परीक्षण",
  "&lt; 1.0 ppm Combined": "< १.० ppm संयुक्त",
  "< 1.0 ppm Combined": "< १.० ppm संयुक्त",
  "In-Person Walkthrough": "प्रत्यक्ष अवलोकन भ्रमण",
  "Registration Required": "दर्ता आवश्यक",
  "Dermatology Centers (": "छाला रोग केन्द्रहरू (",
  "Hospital Pharmacies (": "अस्पताल फार्मेसीहरू (",
  "CDerma Cleanroom Node": "सी-डर्मा क्लिनरुम नोड",
  "PHASE 01 // DIAGNOSIS": "चरण ०१ // निदान (DIAGNOSIS)",
  "AEO Clinical Summary:": "AEO क्लिनिकल सारांश:",
  "Always use sunscreen.": "सधैं सनस्क्रिन प्रयोग गर्नुहोस्।",
  "Have a Skin Question?": "छाला सम्बन्धी प्रश्न छ?",
  "Contact Itahari Team": "इटहरी टोलीलाई सम्पर्क गर्नुहोस्",
  "View Product Details": "उत्पादन विवरण हेर्नुहोस्",
  "All Formulations (6)": "सबै फर्मुलेसनहरू (६)",
  "Ceramides 1, 3, 6-II": "सिरामाइड्स १, ३, ६-II",
  "UVA / UVB Protection": "UVA / UVB सुरक्षा",
  "Evaluation at Day 28": "२८ औं दिनको मूल्यांकन",
  "Bio-Identical Lipids": "बायो-आइडेन्टिकल लिपिड्स",
  "Pharmaceutical Grade": "औषधीय स्तर (फार्मास्युटिकल ग्रेड)",
  "Authorized Retailers": "अधिकृत खुद्रा बिक्रेताहरू",
  "Radical Transparency": "पूर्ण पारदर्शिता",
  "24h Express Delivery": "२४ घण्टा एक्सप्रेस डेलिभरी",
  "PAN / Business / NMC": "प्यान / व्यवसाय / NMC",
  "Compromised Barrier": "क्षतिग्रस्त ब्यारियर",
  "Post-Laser Recovery": "लेजर उपचार पछिको रिकभरी",
  "Micro-Mist Delivery": "माइक्रो-मिस्ट डेलिभरी",
  "Retinaldehyde 0.05%": "रेटिनाल्डिहाइड ०.०५%",
  "Wholesale / Clinics": "थोक / क्लिनिकहरू",
  "Ideal For Treating:": "उपचारका लागि उपयुक्त:",
  "Evaluation at Day 2": "दोस्रो दिनको मूल्यांकन",
  "Pure Clinical Grade": "शुद्ध क्लिनिकल ग्रेड",
  "Plant-Based Ferment": "वनस्पतिमा आधारित फर्मेन्ट",
  "Doctor Instructions": "डाक्टरका निर्देशनहरू",
  "Inquiries & Support": "सोधपुछ तथा सहयोग",
  "On-Bottle QR Access": "बोतलमा भएको QR कोड पहुँच",
  "Specification Limit": "विशिष्टता सीमा",
  "5.20 – 5.60 at 25°C": "५.२० – ५.६०, २५°C मा",
  "5.20 - 5.60 at 25°C": "५.२० – ५.६०, २५°C मा",
  "&lt; 1 CFU/g [Pass]": "< १ CFU/g [उत्तीर्ण]",
  "< 1 CFU/g [Pass]": "< १ CFU/g [उत्तीर्ण]",
  "Not Detected [Pass]": "पत्ता लागेन [उत्तीर्ण]",
  "4,000 RPM / 30 mins": "४,००० RPM / ३० मिनेट",
  "Nationwide Dispatch": "देशव्यापी ढुवानी",
  "Verified Dispensary": "प्रमाणित डिस्पेन्सरी",
  "GMP Certified Plant": "GMP प्रमाणित प्लान्ट",
  "Drink enough water.": "प्रशस्त पानी पिउनुहोस्।",
  "Partner Pharmacies": "साझेदार फार्मेसीहरू",
  "(often searched as": "(प्रायः खोजिने नाम:",
  "Explore Collection": "कलेक्सन हेर्नुहोस्",
  "Himalayan Squalane": "हिमाली स्क्वालेन",
  "4D Hyaluronic Acid": "4D हाइलुरोनिक एसिड",
  "Kathmandu Same-Day": "काठमाडौंमा सोही दिन डेलिभरी",
  "Thermal Incubation": "थर्मल इन्क्युबेशन",
  "Key Ingredient": "प्रमुख तत्व",
  "ISO 9001:2015": "ISO ९००१:२०१५",
  "Dr. A. Karki": "डा. ए. कार्की",
  "Download PDF": "PDF डाउनलोड गर्नुहोस्",
  "24–48 hrs": "२४–४८ घण्टा",
  "24-48 hrs": "२४–४८ घण्टा",
  "Catalog": "क्याटलग",
  "&bull;": "•",
  "•": "•",
  "ISO 7": "ISO ७",
  "24h": "२४ घण्टा",
  "e.g. Koshi Beauty Lounge or Patan Skin Care": "जस्तै: कोशी ब्युटी लाउन्ज वा पाटन स्किन केयर",
  "+977 98...": "+९७७ ९८...",
  "e.g. LOT-24-0442": "जस्तै: LOT-24-0442",
  "e.g. Koshi Beauty Store or Kathmandu Skin Clinic": "जस्तै: कोशी ब्युटी स्टोर वा काठमाडौं स्किन क्लिनिक",
  "e.g. 609874123": "जस्तै: ६०९८७४१२३",
  "Store Owner / Dr. / Manager Name": "स्टोर मालिक / डा. / प्रबन्धकको नाम",
  "e.g. Kathmandu, Biratnagar, Beauty Store, Naxal...": "जस्तै: काठमाडौं, विराटनगर, ब्युटी स्टोर, नक्साल...",
  "Most skin problems I see can be fixed with three things: a gentle cleanser, a good moisturiser, and sunscreen every single morning. You don't need 10 products — you need the right ones.": "मैले देख्ने अधिकांश छालाका समस्याहरू तीन चीजले समाधान गर्न सकिन्छ: एक कोमल क्लिन्जर, राम्रो मोइस्चराइजर, र हरेक बिहान सनस्क्रिन। तपाईंलाई १० थरी उत्पादन चाहिँदैन — सही उत्पादन चाहिन्छ।",
  "rebuild": "पुनर्निर्माण गर्ने"
};

const CDERMA_NEPALI_HTML = {
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

function applyBodyTranslations(lang) {
  const isNe = lang === 'ne';
  document.documentElement.lang = isNe ? 'ne' : 'en';

  // 1. Data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (isNe) {
      if (key === 'region_language') el.textContent = 'क्षेत्र / भाषा:';
      if (key === 'display_language') el.textContent = 'भाषा चयन गर्नुहोस्';
    } else {
      if (key === 'region_language') el.textContent = 'REGION / LANGUAGE:';
      if (key === 'display_language') el.textContent = 'Display Language';
    }
  });

  // 2. Search inputs & placeholders
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(inp => {
    if (isNe) {
      if (inp.dataset.enPh === undefined) inp.dataset.enPh = inp.getAttribute('placeholder') || '';
      const orig = inp.dataset.enPh.trim();
      if (CDERMA_NEPALI_DICTIONARY[orig]) {
        inp.setAttribute('placeholder', CDERMA_NEPALI_DICTIONARY[orig]);
      } else if (orig && orig.toLowerCase().includes('search')) {
        inp.setAttribute('placeholder', 'कस्मेटिक स्टोर, क्लिनिक वा शहर खोज्नुहोस्...');
      }
    } else if (inp.dataset.enPh !== undefined) {
      inp.setAttribute('placeholder', inp.dataset.enPh);
    }
  });

  // 3. Dropdown <select> options
  document.querySelectorAll('select option').forEach(opt => {
    if (isNe) {
      if (opt.dataset.enText === undefined) opt.dataset.enText = opt.textContent;
      const clean = opt.dataset.enText.trim().replace(/\s+/g, ' ');
      if (CDERMA_NEPALI_DICTIONARY[clean]) {
        opt.textContent = CDERMA_NEPALI_DICTIONARY[clean];
      }
    } else if (opt.dataset.enText !== undefined) {
      opt.textContent = opt.dataset.enText;
    }
  });

  // 4. HTML block replacements (CDERMA_NEPALI_HTML)
  const blockCandidates = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, [data-cms], .aeo-block, article > p');
  blockCandidates.forEach(el => {
    if (el.closest('.cderma-lang-toggle') || el.hasAttribute('data-lang-btn')) return;
    const cleanText = el.textContent.trim().replace(/\s+/g, ' ');
    if (CDERMA_NEPALI_HTML[cleanText]) {
      if (isNe) {
        if (el.dataset.enHtml === undefined) el.dataset.enHtml = el.innerHTML;
        el.innerHTML = CDERMA_NEPALI_HTML[cleanText];
        el.dataset.cdermaHtmlTrans = "true";
      } else if (el.dataset.enHtml !== undefined) {
        el.innerHTML = el.dataset.enHtml;
        delete el.dataset.cdermaHtmlTrans;
      }
    }
  });

  // 5. Universal Text-Node TreeWalker for all visible text across the entire page
  if (document.body) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'IFRAME') {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest('.material-symbols-outlined') || parent.closest('svg') || parent.classList.contains('material-symbols-outlined')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest('.cderma-lang-toggle') || parent.closest('[data-lang-btn]')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest('[data-cderma-html-trans="true"]')) {
            return NodeFilter.FILTER_REJECT;
          }
          const val = node.nodeValue;
          if (!val || !val.trim()) return NodeFilter.FILTER_SKIP;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {
      if (isNe) {
        if (node._cdermaEn === undefined) {
          node._cdermaEn = node.nodeValue;
        }
        const trimmed = node._cdermaEn.trim().replace(/\s+/g, ' ');
        if (CDERMA_NEPALI_DICTIONARY[trimmed]) {
          const leadingWs = node._cdermaEn.match(/^\s*/)[0];
          const trailingWs = node._cdermaEn.match(/\s*$/)[0];
          node.nodeValue = leadingWs + CDERMA_NEPALI_DICTIONARY[trimmed] + trailingWs;
        }
      } else {
        if (node._cdermaEn !== undefined) {
          node.nodeValue = node._cdermaEn;
          delete node._cdermaEn;
        }
      }
    });
  }

  // 6. Sibling-combined text elements (e.g. elements with icon + text node)
  const compoundCandidates = document.querySelectorAll('a, button, span, div, label, p, th, td');
  compoundCandidates.forEach(el => {
    if (el.closest('.cderma-lang-toggle') || el.hasAttribute('data-lang-btn')) return;
    if (el.closest('.material-symbols-outlined') || el.tagName === 'SVG' || el.closest('svg')) return;
    if (el.dataset.cdermaHtmlTrans === "true") return;

    if (isNe) {
      if (el.dataset.enTextDirect === undefined) {
        const directText = Array.from(el.childNodes)
          .filter(n => n.nodeType === 3)
          .map(n => n.nodeValue)
          .join('')
          .trim()
          .replace(/\s+/g, ' ');
        el.dataset.enTextDirect = directText;
      }
      const direct = el.dataset.enTextDirect;
      if (direct && CDERMA_NEPALI_DICTIONARY[direct]) {
        const trans = CDERMA_NEPALI_DICTIONARY[direct];
        el.childNodes.forEach(n => {
          if (n.nodeType === 3 && n.nodeValue.trim()) {
            const leadingWs = n.nodeValue.match(/^\s*/)[0];
            const trailingWs = n.nodeValue.match(/\s*$/)[0];
            n.nodeValue = leadingWs + trans + trailingWs;
          }
        });
      }
    }
  });
}

function initLanguageSwitcher() {
  const currentLang = getActiveLanguage();
  document.documentElement.lang = currentLang;

  // Sync cookie and localStorage
  document.cookie = `cderma_lang=${currentLang};path=/;max-age=31536000;SameSite=Lax`;
  try { localStorage.setItem(CDERMA_LANG_KEY, currentLang); } catch (e) {}

  updateLanguageTogglesUI(currentLang);
  if (currentLang === 'ne') {
    applyBodyTranslations('ne');
  }

  // Document-level event listener for all language toggle buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lang-btn]');
    if (!btn) return;
    e.preventDefault();
    const targetLang = btn.getAttribute('data-lang-btn');
    if (!targetLang) return;
    const active = getActiveLanguage();
    if (targetLang === active) return;
    setActiveLanguage(targetLang);
  });
}


document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Language Switcher & active states
  initLanguageSwitcher();

  // 1. Sync Dynamic Site Settings & Copy
  const activeLang = getActiveLanguage();
  try {
    const res = await fetch(`/api/settings?lang=${activeLang}`);
    const data = await res.json();
    if (data.success && data.settings) {
      const s = data.settings;

      // Universal [data-cms] text binder
      document.querySelectorAll('[data-cms]').forEach(el => {
        const key = el.getAttribute('data-cms');
        if (s[key] !== undefined && s[key] !== null) {
          el.textContent = s[key];
        }
      });
      if (activeLang === 'ne') applyBodyTranslations('ne'); // Re-run on dynamic CMS settings
      if (activeLang === 'ne') applyBodyTranslations('ne'); // Re-run on dynamic CMS settings
      if (activeLang === 'ne') applyBodyTranslations('ne'); // Re-run on dynamic CMS settings
      if (activeLang === 'ne') applyBodyTranslations('ne'); // Re-run on dynamic CMS settings
      // Universal [data-cms-href] link binder
      document.querySelectorAll('[data-cms-href]').forEach(el => {
        const key = el.getAttribute('data-cms-href');
        if (s[key]) {
          if (key.includes('phone')) {
            el.href = `tel:${s[key].replace(/\s+/g, '')}`;
          } else if (key.includes('email')) {
            el.href = `mailto:${s[key].trim()}`;
          } else if (key.includes('whatsapp')) {
            el.href = `https://wa.me/${s[key].replace(/\D/g, '')}`;
          } else {
            el.href = s[key];
          }
        }
      });

      // Global Header/Footer fallbacks
      if (s.contact_phone) {
        document.querySelectorAll('a[href^="tel:"]').forEach(el => {
          el.href = `tel:${s.contact_phone.replace(/\s+/g, '')}`;
        });
      }
      if (s.contact_email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
          el.href = `mailto:${s.contact_email}`;
        });
      }
    }
  } catch (err) {
    console.debug('CMS settings sync running in fallback mode');
  }

  // 1b. Sync Dynamic Site Images & Graphics
  try {
    const mediaRes = await fetch('/api/media');
    const mediaData = await mediaRes.json();
    if (mediaData.success && mediaData.media) {
      const m = mediaData.media;

      // Universal [data-cms-img] image binder
      document.querySelectorAll('[data-cms-img]').forEach(img => {
        const slotKey = img.getAttribute('data-cms-img');
        if (m[slotKey]) {
          img.src = m[slotKey];
        }
      });

      // Background image binder
      document.querySelectorAll('[data-cms-bg]').forEach(el => {
        const slotKey = el.getAttribute('data-cms-bg');
        if (m[slotKey]) {
          el.style.backgroundImage = `url('${m[slotKey]}')`;
        }
      });

      // Global logo auto-sync if not explicitly tagged
      if (m.site_logo) {
        document.querySelectorAll('header img[src*="logo"], footer img[src*="logo"]').forEach(img => {
          if (!img.hasAttribute('data-cms-img') && !img.src.includes('white')) {
            img.src = m.site_logo;
          }
        });
      }
    }
  } catch (err) {
    console.debug('CMS media sync running in fallback mode');
  }

  // 2. Wire B2B Wholesale Application Form (b2b.html)
  const b2bForm = document.getElementById('clinicPartnershipForm');
  if (b2bForm) {
    b2bForm.removeAttribute('onsubmit'); // Remove static event.preventDefault()
    b2bForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = b2bForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
        <span>Submitting Application...</span>
      `;

      const payload = {
        businessName: document.getElementById('businessName')?.value || '',
        regNumber: document.getElementById('regNumber')?.value || '',
        clinicType: document.getElementById('clinicType')?.value || '',
        contactPerson: document.getElementById('contactPerson')?.value || '',
        workEmail: document.getElementById('workEmail')?.value || '',
        phoneNumber: document.getElementById('phoneNumber')?.value || '',
        province: document.getElementById('province')?.value || 'bagmati',
        volumeTier: document.getElementById('volumeTier')?.value || 'starter',
        sampleKitRequested: document.getElementById('sampleKitCheck')?.checked ? 1 : 0
      };

      try {
        const res = await fetch('/api/b2b/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
          const successDiv = document.getElementById('formSuccess');
          if (successDiv) {
            successDiv.classList.remove('hidden');
            const msgEl = successDiv.querySelector('p');
            if (msgEl) msgEl.textContent = data.message;
          }
          b2bForm.classList.add('hidden');
        } else {
          alert(data.message || 'Error submitting application. Please verify required fields.');
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      } catch (err) {
        alert('Server connection error. Please try again or WhatsApp us at +977 9820753751 or email kandktradingconcern@gmail.com.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  // 3. Wire Doctor Verification Form (monographs.html)
  const docForms = document.querySelectorAll('form[onsubmit*="NMC/NPC"]');
  docForms.forEach(form => {
    form.removeAttribute('onsubmit');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const inputs = form.querySelectorAll('input, select');
      const nameInput = inputs[0]?.value || 'Doctor Verification';
      const nmcInput = inputs[1]?.value || '';
      const specialtyInput = inputs[2]?.value || '';

      try {
        const res = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: nameInput,
            email: 'practitioner-verification@cderma.np',
            subject: `Doctor Verification Request (${nmcInput})`,
            message: `Practitioner: ${nameInput}, NMC: ${nmcInput}, Specialty: ${specialtyInput}`,
            type: 'doctor_verification'
          })
        });
        const data = await res.json();
        alert('Clinical verification submitted successfully! Our medical liaison team will verify your NMC/NPC credentials within 24 hours.');
        form.reset();
      } catch (err) {
        alert('Verification request received.');
      }
    });
  });

  // 4. Dynamic Products Catalog (products.html)
  initProductsCatalog();

  // 5. Dynamic Product Detail (product-detail.html)
  initProductDetail();

  // 6. Dynamic Clinic Directory Filter & Search (clinics.html)
  initClinicsDirectory();

  // 7. Dynamic Monographs / Doctor's Advice Articles (monographs.html)
  initMonographsArticles();

  // 8. Hero Showcase Image Slider
  initHeroSlider();

  // 9. Universal Mobile-First Navigation Drawer
  initMobileNavigation();

  // 10. In-Page Live Visual Editor (for authenticated admins)
  initVisualEditor();

  // 11. Dynamic Social Media Channels & Floating WhatsApp Widget
  initSocialMediaIntegration();
});

async function initVisualEditor() {
  try {
    const res = await fetch('/api/auth/status');
    const authData = await res.json();
    if (!authData.authenticated) return; // Not admin, stay in normal visitor mode

    // Inject Admin Bar Styles
    const style = document.createElement('style');
    style.id = 'cderma-cms-styles';
    style.textContent = `
      #cderma-admin-bar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 44px;
        background: #191c1b;
        color: #f2ede3;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 13px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        border-bottom: 1px solid rgba(219,197,124,0.3);
      }
      body.cderma-admin-active {
        padding-top: 44px !important;
      }
      body.cderma-edit-mode [data-cms] {
        outline: 2px dashed rgba(107,91,28,0.4) !important;
        outline-offset: 3px;
        border-radius: 4px;
        cursor: text;
        transition: outline 0.15s, background-color 0.15s;
        position: relative;
      }
      body.cderma-edit-mode [data-cms]:hover {
        outline: 2px solid #6b5b1c !important;
        background-color: rgba(249, 225, 149, 0.15) !important;
      }
      body.cderma-edit-mode [data-cms]:focus {
        outline: 2px solid #2563eb !important;
        background-color: rgba(37, 99, 235, 0.08) !important;
      }
      body.cderma-edit-mode [data-cms-img] {
        position: relative;
        cursor: pointer;
        outline: 2px dashed rgba(107,91,28,0.5) !important;
        outline-offset: 2px;
      }
      body.cderma-edit-mode [data-cms-img]:hover {
        outline: 3px solid #6b5b1c !important;
        opacity: 0.9;
      }
      .cderma-img-overlay-btn {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background: rgba(25, 28, 27, 0.9);
        color: #f9e195;
        border: 1px solid #6b5b1c;
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        z-index: 1000;
        display: none;
      }
      body.cderma-edit-mode .cderma-img-wrapper:hover .cderma-img-overlay-btn {
        display: block;
      }
      .cderma-toast {
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #1E2322;
        color: #fff;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 9999999;
        font-size: 13px;
        border-left: 4px solid #6b5b1c;
        animation: cdermaSlideIn 0.3s ease-out;
      }
      @keyframes cdermaSlideIn {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    document.body.classList.add('cderma-admin-active');

    // State tracking
    window.__cderma_edits = {};
    let editMode = false;

    // Create and attach Top Admin Bar
    const bar = document.createElement('div');
    bar.id = 'cderma-admin-bar';
    bar.innerHTML = `
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="font-weight:bold; color:#f9e195; display:flex; align-items:center; gap:6px;">
          <span>🌿 CDerma CMS</span>
          <span style="font-size:10px; text-transform:uppercase; background:rgba(219,197,124,0.2); padding:2px 6px; border-radius:4px;">Live In-Page Editor</span>
        </span>
        <button id="cderma-toggle-edit" style="background:#2d3331; color:#fff; border:1px solid #4b4639; padding:4px 12px; border-radius:6px; cursor:pointer; font-size:12px; font-weight:600; display:flex; align-items:center; gap:6px; transition:all 0.15s;">
          <span>✏️</span> <span>Enable Visual Edit Mode</span>
        </button>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <span id="cderma-pending-indicator" style="font-size:11px; color:#a1a1aa; display:none;">0 pending edits</span>
        <button id="cderma-save-btn" disabled style="background:#6b5b1c; color:#fff; opacity:0.5; border:none; padding:4px 14px; border-radius:6px; cursor:not-allowed; font-size:12px; font-weight:600; display:flex; align-items:center; gap:6px; transition:all 0.15s;">
          <span>💾</span> <span>Save Page Changes</span>
        </button>
        <a href="/admin" target="_blank" style="background:transparent; color:#dbc57c; text-decoration:none; padding:4px 10px; border-radius:6px; font-size:12px; font-weight:500; display:flex; align-items:center; gap:4px;">
          <span>⚙️ Full CMS</span> ↗
        </a>
      </div>
    `;
    document.body.prepend(bar);

    const toggleBtn = document.getElementById('cderma-toggle-edit');
    const saveBtn = document.getElementById('cderma-save-btn');
    const pendingIndicator = document.getElementById('cderma-pending-indicator');

    // Hidden file uploader for in-page image replacement
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    let currentUploadSlot = null;
    let currentUploadImgEl = null;

    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file || !currentUploadSlot) return;

      showToast(`Uploading new image for "${currentUploadSlot}"...`);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const upRes = await fetch(`/admin/api/media/${encodeURIComponent(currentUploadSlot)}`, {
          method: 'POST',
          body: formData
        });
        const upData = await upRes.json();
        if (upData.success && upData.slot) {
          if (currentUploadImgEl) {
            currentUploadImgEl.src = upData.slot.image_url;
          }
          showToast(`✅ Image for "${currentUploadSlot}" replaced & published!`);
        } else {
          alert('Failed to upload image: ' + (upData.message || 'Unknown error'));
        }
      } catch (err) {
        alert('Upload error: ' + err.message);
      } finally {
        fileInput.value = '';
      }
    });

    // Toggle Edit Mode handler
    toggleBtn.addEventListener('click', () => {
      editMode = !editMode;
      if (editMode) {
        document.body.classList.add('cderma-edit-mode');
        toggleBtn.style.background = '#15803d';
        toggleBtn.style.borderColor = '#22c55e';
        toggleBtn.innerHTML = `<span>🟢</span> <span>Visual Edit Mode ACTIVE</span>`;
        showToast('✏️ Visual Edit Mode is now ON. Click any text to edit directly!');

        // Enable contenteditable on all [data-cms]
        document.querySelectorAll('[data-cms]').forEach(el => {
          el.setAttribute('contenteditable', 'true');
          el.setAttribute('title', `CMS Key: [${el.getAttribute('data-cms')}] (Click to edit)`);

          el.addEventListener('input', () => {
            const key = el.getAttribute('data-cms');
            window.__cderma_edits[key] = el.innerText.trim();
            updatePendingCount();
          });
        });

        // Add click listener on images [data-cms-img]
        document.querySelectorAll('[data-cms-img]').forEach(img => {
          img.setAttribute('title', `Click to upload & replace image for slot [${img.getAttribute('data-cms-img')}]`);
          img.onclick = (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            currentUploadSlot = img.getAttribute('data-cms-img');
            currentUploadImgEl = img;
            fileInput.click();
          };
        });

      } else {
        document.body.classList.remove('cderma-edit-mode');
        toggleBtn.style.background = '#2d3331';
        toggleBtn.style.borderColor = '#4b4639';
        toggleBtn.innerHTML = `<span>✏️</span> <span>Enable Visual Edit Mode</span>`;

        document.querySelectorAll('[data-cms]').forEach(el => {
          el.removeAttribute('contenteditable');
        });
        document.querySelectorAll('[data-cms-img]').forEach(img => {
          img.onclick = null;
        });
      }
    });

    function updatePendingCount() {
      const keys = Object.keys(window.__cderma_edits);
      const count = keys.length;
      if (count > 0) {
        pendingIndicator.style.display = 'inline-block';
        pendingIndicator.textContent = `${count} pending text edit${count > 1 ? 's' : ''}`;
        saveBtn.disabled = false;
        saveBtn.style.cursor = 'pointer';
        saveBtn.style.opacity = '1';
        saveBtn.style.background = '#22c55e';
      } else {
        pendingIndicator.style.display = 'none';
        saveBtn.disabled = true;
        saveBtn.style.cursor = 'not-allowed';
        saveBtn.style.opacity = '0.5';
        saveBtn.style.background = '#6b5b1c';
      }
    }

    // Save Changes button click
    saveBtn.addEventListener('click', async () => {
      const keys = Object.keys(window.__cderma_edits);
      if (keys.length === 0) return;

      saveBtn.disabled = true;
      saveBtn.innerHTML = `<span>⏳</span> <span>Saving...</span>`;

      try {
        const payload = { settings: window.__cderma_edits };
        const saveRes = await fetch('/admin/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const saveData = await saveRes.json();

        if (saveData.success) {
          showToast(`✅ Successfully saved ${keys.length} changes to database!`);
          window.__cderma_edits = {};
          updatePendingCount();
          saveBtn.innerHTML = `<span>💾</span> <span>Save Page Changes</span>`;
        } else {
          alert('Save failed: ' + (saveData.error || saveData.message));
          saveBtn.disabled = false;
          saveBtn.innerHTML = `<span>💾</span> <span>Retry Save</span>`;
        }
      } catch (err) {
        alert('Network error while saving: ' + err.message);
        saveBtn.disabled = false;
        saveBtn.innerHTML = `<span>💾</span> <span>Retry Save</span>`;
      }
    });

  } catch (e) {
    console.debug('Visual editor not enabled');
  }
}

function showToast(msg) {
  let toast = document.querySelector('.cderma-toast');
  if (toast) toast.remove();
  toast = document.createElement('div');
  toast.className = 'cderma-toast';
  toast.innerHTML = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast) toast.remove();
  }, 4000);
}

/**
 * Dynamic Products Catalog for products.html
 */
async function initProductsCatalog() {
  const container = document.getElementById('product-grid') || document.querySelector('[data-products-catalog]');
  if (!container) return;

  try {
    const lang = getActiveLanguage();
    const res = await fetch(`/api/products?lang=${lang}`);
    const data = await res.json();
    if (!data.success || !data.products || data.products.length === 0) return;

    window.__cderma_products = data.products;
    renderProductGrid(container, data.products);

    // Wire Category Filter Tabs
    const filterButtons = document.querySelectorAll('button[data-filter-cat], button.category-pill, button[data-filter]');
    if (filterButtons.length > 0) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          filterButtons.forEach(b => {
            b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
            b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
          });
          btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
          btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');

          const cat = btn.getAttribute('data-filter-cat') || btn.getAttribute('data-filter');
          if (!cat || cat === 'all') {
            renderProductGrid(container, window.__cderma_products);
          } else {
            const filtered = window.__cderma_products.filter(p => 
              (p.category && p.category.toLowerCase().includes(cat.toLowerCase())) ||
              (p.slug && p.slug.toLowerCase().includes(cat.toLowerCase()))
            );
            renderProductGrid(container, filtered);
          }
        });
      });
    }

    // Wire Skin Type Select dropdown if present
    const skinTypeSelect = document.querySelector('select[aria-label*="skin type"]');
    if (skinTypeSelect) {
      skinTypeSelect.addEventListener('change', (e) => {
        const val = e.target.value.toLowerCase();
        if (val.includes('all')) {
          renderProductGrid(container, window.__cderma_products);
        } else {
          const filtered = window.__cderma_products.filter(p => {
            const text = `${p.title} ${p.summary} ${p.description} ${p.category}`.toLowerCase();
            if (val.includes('hypersensitive') || val.includes('reactive')) {
              return text.includes('centella') || text.includes('barrier') || text.includes('sensitive') || text.includes('संवेदनशील');
            }
            if (val.includes('dry') || val.includes('dehydrated')) {
              return text.includes('ceramide') || text.includes('hyaluronic') || text.includes('आद्रता') || text.includes('सुख्खा');
            }
            if (val.includes('combination') || val.includes('acne')) {
              return text.includes('cleanser') || text.includes('cleansing') || text.includes('clarity') || text.includes('क्लिन्जर');
            }
            return true;
          });
          renderProductGrid(container, filtered);
        }
      });
    }

  } catch (err) {
    console.debug('Using fallback static products markup');
  }
}

function renderProductGrid(container, products) {
  const isNe = getActiveLanguage() === 'ne';

  if (!products || products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">inventory_2</span>
        <p class="text-sm font-semibold text-on-surface">${isNe ? 'यस वर्गमा कुनै उत्पादन फेला परेन।' : 'No products found in this category.'}</p>
        <p class="text-xs text-on-surface-variant mt-1">${isNe ? 'कृपया "सबै उत्पादनहरू" चयन गर्नुहोस् वा सम्पर्क गर्नुहोस्।' : 'Please select "All Formulations" or contact our medical liaison.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map((p, idx) => {
    const detailUrl = `product-detail.html?slug=${encodeURIComponent(p.slug)}`;
    const categoryNorm = (p.category || 'barrier').toLowerCase().replace(/\s+/g, '-');
    const ingredients = Array.isArray(p.active_ingredients) ? p.active_ingredients : [];
    const displayPrice = p.price_npr ? (isNe ? `रु. ${Number(p.price_npr).toLocaleString()}` : `NPR ${Number(p.price_npr).toLocaleString()}`) : '';
    const volumeText = p.volume || '';

    const chips = ingredients.slice(0, 3).map(ing => {
      const text = typeof ing === 'string' ? ing : (ing && (ing.name || ing.label || ing.title) ? (ing.name || ing.label || ing.title) : '');
      return `<span class="px-2 py-0.5 rounded bg-surface-container text-[11px] text-on-surface-variant font-medium">${escapeHtml(text)}</span>`;
    }).join('');

  if (isNe) applyBodyTranslations('ne'); // Products grid translated
    return `
      <div class="product-card group flex flex-col justify-between h-full bg-surface-container-lowest rounded-xl overflow-hidden p-space-lg hover:shadow-[0_14px_34px_rgba(107,91,28,0.06)] border border-outline-variant/20 transition-all" data-category="${escapeHtml(categoryNorm)}">
        <div class="relative w-full h-56 bg-surface-container-high rounded-lg overflow-hidden flex items-center justify-center mb-space-md">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="${escapeHtml(p.title)}" src="${escapeHtml(p.image_url || 'assets/images/product-packaging-dropper.png')}" loading="lazy" decoding="async">
          <div class="absolute top-space-xs left-space-xs">
            <span class="px-space-xs py-[2px] rounded bg-surface/90 text-primary text-[10px] uppercase tracking-wider font-semibold shadow-sm">
              ${escapeHtml(p.clinical_badge || (isNe ? 'चिकित्सकद्वारा प्रमाणित' : 'Doctor Formulated'))}
            </span>
          </div>
          ${p.is_featured ? `
            <div class="absolute top-space-xs right-space-xs">
              <span class="px-2 py-[2px] rounded bg-[#887635] text-white text-[10px] uppercase tracking-wider font-bold shadow-sm">
                ${isNe ? 'प्रमुख' : 'Flagship'}
              </span>
            </div>
          ` : ''}
        </div>
        <div class="flex flex-col flex-1 justify-between">
          <div>
            <div class="flex items-center justify-between text-[11px] text-outline uppercase tracking-wider mb-1">
              <span>${escapeHtml(p.category || (isNe ? 'क्लिनिकल रेजिमेन' : 'Clinical Regimen'))}${volumeText ? ` • ${escapeHtml(volumeText)}` : ''}</span>
              <span class="text-secondary font-semibold">${displayPrice || (isNe ? 'चिकित्सकीय ग्रेड' : 'Doctor Grade')}</span>
            </div>
            <h4 class="font-display-lg text-[17px] font-semibold text-on-surface leading-snug group-hover:text-primary transition-colors min-h-[48px] flex items-center">
              <a href="${detailUrl}">${escapeHtml(p.title)}</a>
            </h4>
            <p class="text-on-surface-variant text-[13px] mt-space-2xs line-clamp-2 min-h-[38px] leading-relaxed">
              ${escapeHtml(p.summary || p.description || '')}
            </p>
            ${chips ? `<div class="flex flex-wrap gap-1.5 mt-space-sm pt-space-xs">${chips}</div>` : ''}
          </div>
          <div class="mt-space-md pt-space-sm bg-surface-container-low rounded-lg p-space-xs border border-outline-variant/20">
            <div class="flex items-center justify-between mb-space-xs">
              <span class="text-[11px] text-outline">Clinical Batch: Verified</span>
              <span class="text-[11px] text-secondary font-semibold uppercase tracking-wider">ISO Class 7</span>
            </div>
            <div class="grid grid-cols-2 gap-space-2xs">
              <a class="text-center py-space-2xs rounded bg-surface hover:bg-surface-variant text-on-surface text-[12px] font-medium transition-colors" href="${detailUrl}">Product Details</a>
              <a class="text-center py-space-2xs rounded bg-primary text-on-primary text-[12px] font-medium hover:bg-primary-container transition-colors" href="clinics.html">Find In Stores</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Dynamic Product Detail for product-detail.html
 */
async function initProductDetail() {
  const isProductDetailPage = window.location.pathname.includes('product-detail') || 
                              window.location.pathname.includes('/products/') ||
                              document.getElementById('product-detail-console');
  if (!isProductDetailPage) return;

  const urlParams = new URLSearchParams(window.location.search);
  let slug = urlParams.get('slug');
  if (!slug) {
    const parts = window.location.pathname.split('/products/');
    if (parts.length > 1 && parts[1]) {
      slug = parts[1].replace('.html', '').split('?')[0];
    }
  }

  // Default flagship if none requested
  if (!slug || slug === 'flagship') {
    slug = 'centella-barrier-restore-concentrate';
  }

  try {
    const lang = getActiveLanguage();
    const isNe = lang === 'ne';
    const res = await fetch(`/api/products/${encodeURIComponent(slug)}?lang=${lang}`);
    const data = await res.json();
    if (!data.success || !data.product) return;

    const p = data.product;

    // 1. Update Title & Breadcrumbs
    document.title = `${p.title} | CDerma Clinical Formulations Nepal`;
    const bcEl = document.getElementById('p-breadcrumb') || document.querySelector('[data-product-breadcrumb]');
    if (bcEl) bcEl.textContent = p.title;

    // 2. Headings & Subtitles
    const titleEl = document.getElementById('p-title') || document.querySelector('[data-product-title]');
    if (titleEl) titleEl.textContent = p.title;

    const subtitleEl = document.getElementById('p-subtitle') || document.querySelector('[data-product-subtitle]');
    if (subtitleEl) subtitleEl.textContent = p.subtitle || p.category;

    const badgeEl = document.getElementById('p-badge') || document.querySelector('[data-product-badge]');
    if (badgeEl) badgeEl.textContent = p.clinical_badge || (isNe ? 'चिकित्सकद्वारा प्रमाणित' : 'Medical Grade Formulation');

    const categoryEl = document.getElementById('p-category') || document.querySelector('[data-product-category]');
    if (categoryEl) categoryEl.textContent = p.category;

    const volumeEl = document.getElementById('p-volume') || document.querySelector('[data-product-volume]');
    if (volumeEl) volumeEl.textContent = p.volume || '';

    const priceEl = document.getElementById('p-price') || document.querySelector('[data-product-price]');
    if (priceEl && p.price_npr) {
      priceEl.textContent = isNe ? `रु. ${Number(p.price_npr).toLocaleString()}` : `NPR ${Number(p.price_npr).toLocaleString()}`;
    }

    // 3. Descriptions & Summaries
    const descEl = document.getElementById('p-desc') || document.querySelector('[data-product-desc]');
    if (descEl) descEl.textContent = p.description || p.summary || '';

    // 4. Main Image
    const mainImg = document.getElementById('main-product-img');
    if (mainImg && p.image_url) {
      mainImg.src = p.image_url;
      mainImg.alt = p.title;
    }

    // 5. Active Ingredients Pills
    const ingredientsContainer = document.getElementById('p-ingredients') || document.querySelector('[data-product-ingredients]');
    if (ingredientsContainer && Array.isArray(p.active_ingredients) && p.active_ingredients.length > 0) {
      ingredientsContainer.innerHTML = p.active_ingredients.map(ing => `
        <span class="inline-flex items-center px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/40 text-primary font-label text-[11px] font-semibold tracking-wide">
          <span class="w-1.5 h-1.5 rounded-full bg-primary mr-1.5"></span>
          ${escapeHtml(ing)}
        </span>
      `).join('');
    }

    // 6. Key Benefits Checkmark List
    const benefitsContainer = document.getElementById('p-benefits') || document.querySelector('[data-product-benefits]');
    if (benefitsContainer && Array.isArray(p.key_benefits) && p.key_benefits.length > 0) {
      benefitsContainer.innerHTML = p.key_benefits.map(b => `
        <li class="flex items-start gap-2 text-on-surface-variant text-[13px] leading-relaxed">
          <span class="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
          <span>${escapeHtml(b)}</span>
        </li>
      `).join('');
    }

    // 7. INCI Full List
    const inciEl = document.getElementById('p-inci') || document.querySelector('[data-product-inci]');
    if (inciEl && p.inci_full) {
      inciEl.textContent = p.inci_full;
    }

    // 8. Usage Instructions
    const usageEl = document.getElementById('p-usage') || document.querySelector('[data-product-usage]');
    if (usageEl && p.usage_instructions) {
      usageEl.textContent = p.usage_instructions;
    }
    if (isNe) applyBodyTranslations('ne'); // Product detail translated

  } catch (err) {
    console.debug('Product detail dynamic sync fallback');
  }
}

/**
 * Dynamic Clinics & Authorized Store Directory for clinics.html
 */
async function initClinicsDirectory() {
  const cardsContainer = document.getElementById('clinics-cards-container') ||
    document.querySelector('[data-clinics-list]') ||
    document.getElementById('clinics-list');
  if (!cardsContainer && !document.getElementById('clinic-province-select')) return;

  try {
    const lang = getActiveLanguage();
    const res = await fetch(`/api/clinics?lang=${lang}`);
    const data = await res.json();
    if (!data.success || !data.clinics || data.clinics.length === 0) return;

    window.__cderma_clinics = data.clinics;

    // Update facility counts badges if present
    const counts = data.counts || {};
    const countAllEl = document.getElementById('count-all');
    if (countAllEl) countAllEl.textContent = counts.all !== undefined ? counts.all : data.clinics.length;
    const countCosmeticEl = document.getElementById('count-cosmetic');
    if (countCosmeticEl) countCosmeticEl.textContent = counts.cosmetic !== undefined ? counts.cosmetic : 0;
    const countDermEl = document.getElementById('count-dermatology');
    if (countDermEl) countDermEl.textContent = counts.dermatology !== undefined ? counts.dermatology : 0;
    const countHospEl = document.getElementById('count-hospital');
    if (countHospEl) countHospEl.textContent = counts.hospital !== undefined ? counts.hospital : 0;
    const countAesEl = document.getElementById('count-aesthetic');
    if (countAesEl) countAesEl.textContent = counts.aesthetic !== undefined ? counts.aesthetic : 0;

    let activeFacility = 'all';
    let activeProvince = 'all';
    const inStockToggle = document.getElementById('clinic-instock-toggle');
    let inStockOnly = inStockToggle ? inStockToggle.checked : false;
    const searchInput = document.querySelector('input[data-search-clinic], #search-input, input[placeholder*="Search by cosmetic store"]');
    let searchQuery = '';
    let selectedClinicId = data.clinics[0] ? data.clinics[0].id : null;

    function selectActiveClinic(clinic) {
      if (!clinic) return;
      selectedClinicId = clinic.id;

      // Update #active-map-card
      const mapCard = document.getElementById('active-map-card');
      if (mapCard) {
        const badge = document.getElementById('map-card-badge');
        if (badge) {
          badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full ${clinic.is_in_stock ? 'bg-emerald-600' : 'bg-amber-600'}"></span> ${clinic.is_verified ? 'Verified Dispensary Node' : 'Authorized Outlet Node'}`;
          badge.className = `inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${clinic.is_in_stock ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`;
        }

        const nodeId = document.getElementById('map-card-node-id');
        if (nodeId) nodeId.textContent = `${clinic.city || 'Regional'} Hub`;

        const title = document.getElementById('map-card-title');
        if (title) title.textContent = clinic.name;

        const doctor = document.getElementById('map-card-doctor');
        if (doctor) {
          const docText = clinic.lead_doctor ?
            `${clinic.lead_doctor}${clinic.doctor_nmc ? ' (' + clinic.doctor_nmc + ')' : ''}` :
            'Licensed Chief Pharmacist';
          doctor.textContent = docText;
        }

        const inventory = document.getElementById('map-card-inventory');
        if (inventory) {
          if (clinic.batch_units) {
            inventory.textContent = `${clinic.batch_units} Units Verified`;
            inventory.className = 'text-emerald-700 font-bold';
          } else if (clinic.is_in_stock) {
            inventory.textContent = 'Batch Verified In-Stock';
            inventory.className = 'text-emerald-700 font-bold';
          } else {
            inventory.textContent = 'Allocated / Reserved';
            inventory.className = 'text-amber-700 font-bold';
          }
        }

        const temp = document.getElementById('map-card-temp');
        if (temp) temp.textContent = clinic.temp_control || '18.4°C Controlled';

        const hours = document.getElementById('map-card-hours');
        if (hours) hours.textContent = clinic.operating_hours || '09:30 - 19:30 (Sun-Fri)';

        const transit = document.getElementById('map-card-transit');
        if (transit) {
          const transitNote = clinic.city === 'Biratnagar' ? 'Direct Lab Outpost' :
            (clinic.province === 'Koshi' ? 'Same-Day Dispatch' : 'Express Cold-Chain 24h');
          transit.innerHTML = `<span class="material-symbols-outlined text-[14px]">local_shipping</span> Koshi Lab Transit: ${transitNote}`;
        }

        const directions = document.getElementById('map-card-directions');
        if (directions) {
          const destUrl = clinic.directions_url || `https://maps.google.com/?q=${encodeURIComponent(clinic.name + ' ' + clinic.address)}`;
          directions.href = destUrl;
        }
      }

      // Highlight active card in DOM
      document.querySelectorAll('.clinic-item-card').forEach(card => {
        if (card.getAttribute('data-clinic-id') == clinic.id) {
          card.classList.add('border-primary', 'ring-2', 'ring-primary/40');
          card.classList.remove('border-outline-variant/30');
        } else {
          card.classList.remove('border-primary', 'ring-2', 'ring-primary/40');
          card.classList.add('border-outline-variant/30');
        }
      });
    }

    function applyFilters() {
      const filtered = window.__cderma_clinics.filter(c => {
        // Facility filter
        if (activeFacility !== 'all') {
          const cat = (c.category || '').toLowerCase();
          if (activeFacility === 'cosmetic' && !(cat.includes('cosmetic') || cat.includes('beauty') || cat.includes('retail'))) return false;
          if (activeFacility === 'dermatology' && !(cat.includes('dermatology') || cat.includes('laser') || cat.includes('skin'))) return false;
          if (activeFacility === 'hospital' && !(cat.includes('hospital') || cat.includes('wing') || cat.includes('referral'))) return false;
          if (activeFacility === 'aesthetic' && !(cat.includes('aesthetic') || cat.includes('institute') || cat.includes('dermal'))) return false;
        }

        // Province filter
        if (activeProvince !== 'all') {
          const prov = (c.province || '').toLowerCase();
          if (!prov.includes(activeProvince.toLowerCase())) return false;
        }

        // In-stock toggle
        if (inStockOnly) {
          if (!c.is_in_stock && c.is_in_stock !== 1 && c.is_in_stock !== '1') return false;
        }

        // Text query
        if (searchQuery) {
          const targetStr = `${c.name} ${c.city} ${c.province} ${c.address} ${c.lead_doctor || ''} ${c.doctor_nmc || ''} ${c.stock_summary || ''}`.toLowerCase();
          if (!targetStr.includes(searchQuery)) return false;
        }

        return true;
      });

      // Update count banner
      const countHeader = document.getElementById('available-locations-count');
      if (countHeader) {
        countHeader.textContent = lang === 'ne'
          ? `उपलब्ध स्थानहरू (${filtered.length} अधिकृत आउटलेटहरू)`
          : `Available Locations (${filtered.length} Authorized Outlets)`;
      }

      renderClinicsList(cardsContainer, filtered, selectActiveClinic, selectedClinicId);

      // Auto-select first clinic if current selected isn't in filtered
      if (filtered.length > 0) {
        const stillPresent = filtered.find(c => c.id == selectedClinicId);
        selectActiveClinic(stillPresent || filtered[0]);
      }
    }

    // Facility buttons listener
    const facilityBtns = document.querySelectorAll('button[data-filter-facility]');
    facilityBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        facilityBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-on-primary');
          b.classList.add('bg-surface-container', 'text-on-surface-variant');
        });
        btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
        btn.classList.add('bg-primary', 'text-on-primary');

        activeFacility = btn.getAttribute('data-filter-facility') || 'all';
        applyFilters();
      });
    });

    // Province dropdown listener
    const provinceSelect = document.getElementById('clinic-province-select');
    if (provinceSelect) {
      provinceSelect.addEventListener('change', (e) => {
        activeProvince = e.target.value;
        applyFilters();
      });
    }

    // In-stock toggle listener
    if (inStockToggle) {
      inStockToggle.addEventListener('change', (e) => {
        inStockOnly = e.target.checked;
        applyFilters();
      });
    }

    // Search input listener
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        applyFilters();
      });
    }

    // Interactive SVG Map Pins listener
    const mapPins = document.querySelectorAll('[data-map-city]');
    mapPins.forEach(pin => {
      pin.addEventListener('click', () => {
        const city = pin.getAttribute('data-map-city');
        if (city && searchInput) {
          searchInput.value = city;
          searchQuery = city.toLowerCase();
          // Clear facility to show all in this city
          activeFacility = 'all';
          facilityBtns.forEach(b => {
            if (b.getAttribute('data-filter-facility') === 'all') {
              b.classList.add('bg-primary', 'text-on-primary');
              b.classList.remove('bg-surface-container', 'text-on-surface-variant');
            } else {
              b.classList.remove('bg-primary', 'text-on-primary');
              b.classList.add('bg-surface-container', 'text-on-surface-variant');
            }
          });
          applyFilters();
        }
      });
    });

    // Reset Map Filter button
    const resetBtn = document.getElementById('reset-map-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeFacility = 'all';
        activeProvince = 'all';
        inStockOnly = false;
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        if (provinceSelect) provinceSelect.value = 'all';
        if (inStockToggle) inStockToggle.checked = false;

        facilityBtns.forEach(b => {
          if (b.getAttribute('data-filter-facility') === 'all') {
            b.classList.add('bg-primary', 'text-on-primary');
            b.classList.remove('bg-surface-container', 'text-on-surface-variant');
          } else {
            b.classList.remove('bg-primary', 'text-on-primary');
            b.classList.add('bg-surface-container', 'text-on-surface-variant');
          }
        });
        applyFilters();
      });
    }

    // Initial run
    applyFilters();

  } catch (err) {
    console.debug('Clinics dynamic sync fallback', err);
  }
}

function renderClinicsList(container, clinics, onSelectClinic, selectedClinicId) {
  if (!container) return;

  if (!clinics || clinics.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-space-md">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">storefront</span>
        <p class="text-sm font-semibold text-on-surface">No clinics or stores found matching your query.</p>
        <p class="text-xs text-on-surface-variant mt-1">Contact our distribution desk on WhatsApp +977 9820753751 for immediate delivery guidance.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = clinics.map(c => {
    const isSelected = c.id == selectedClinicId;
    const borderClasses = isSelected ? 'border-primary ring-2 ring-primary/40' : 'border-outline-variant/30';
    const isStore = (c.category || '').toLowerCase().includes('store') || (c.category || '').toLowerCase().includes('retail');

    return `
      <article class="clinic-item-card bg-surface-container-lowest p-space-md rounded-xl shadow-[0_4px_20px_rgba(107,91,28,0.04)] relative transition-all group border ${borderClasses} hover:border-primary/60 cursor-pointer mb-3" data-clinic-id="${c.id}">
        <div class="absolute top-space-md right-space-md flex flex-col items-end">
          <span class="text-[11px] font-mono font-bold text-primary bg-primary-fixed/40 px-2 py-0.5 rounded">${escapeHtml(c.distance_badge || c.province || 'Nepal')}</span>
          ${c.is_in_stock ? `
            <span class="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> In Stock
            </span>
          ` : `
            <span class="text-[10px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-600"></span> Allocated
            </span>
          `}
        </div>

        <div class="pr-20">
          <span class="text-[11px] font-semibold text-secondary uppercase tracking-wider block">${escapeHtml(c.category || 'Authorized Outlet')}</span>
          <h2 class="font-display-lg text-[16px] lg:text-[17px] font-bold text-on-surface group-hover:text-primary transition-colors">
            ${escapeHtml(c.name)}
          </h2>
        </div>

        <!-- Practitioner / Facility Bio Pill -->
        <div class="flex items-center gap-space-xs mt-space-xs bg-surface-container-low p-2 rounded-lg">
          ${c.doctor_image ? `
            <img class="w-10 h-10 rounded-full object-cover shrink-0 border border-outline-variant/40" src="${escapeHtml(c.doctor_image)}" alt="${escapeHtml(c.lead_doctor || c.name)}" loading="lazy" onerror="this.src='assets/images/img_204637447def.jpg'">
          ` : `
            <div class="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center shrink-0 text-secondary border border-outline-variant/40">
              <span class="material-symbols-outlined text-[20px]">person</span>
            </div>
          `}
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1">
              <p class="text-[13px] font-bold text-on-surface truncate">${escapeHtml(c.lead_doctor || 'Authorized In-Charge')}</p>
              ${c.is_verified ? '<span class="material-symbols-outlined text-primary text-[14px]">verified</span>' : ''}
            </div>
            <p class="text-[11px] text-on-surface-variant font-mono truncate">${escapeHtml(c.doctor_nmc || (c.city + ', ' + c.province))}</p>
          </div>
        </div>

        <!-- Details & Stock -->
        <div class="mt-space-sm space-y-1 text-[13px] text-on-surface-variant">
          <div class="flex items-start gap-2">
            <span class="material-symbols-outlined text-[16px] text-outline mt-0.5 shrink-0">location_on</span>
            <span class="text-[12.5px]">${escapeHtml(c.address)}</span>
          </div>
          ${c.phone ? `
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-outline shrink-0">call</span>
              <a href="tel:${escapeHtml(c.phone.replace(/\\s+/g, ''))}" class="font-mono text-[12px] text-primary hover:underline font-semibold">${escapeHtml(c.phone)}</a>
              ${c.operating_hours ? `<span class="text-[11px] text-outline font-mono">• ${escapeHtml(c.operating_hours)}</span>` : ''}
            </div>
          ` : ''}
          ${c.stock_summary ? `
            <div class="flex items-start gap-2 text-secondary font-medium">
              <span class="material-symbols-outlined text-[16px] text-secondary shrink-0 mt-0.5">medication</span>
              <span class="text-[12px] leading-snug">${escapeHtml(c.stock_summary)}</span>
            </div>
          ` : ''}
        </div>

        <!-- Actions -->
        <div class="mt-space-md pt-space-xs flex items-center gap-2" onclick="event.stopPropagation()">
          <a class="flex-1 text-center py-2 px-3 rounded-lg bg-primary text-on-primary text-[12px] uppercase font-bold tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-xs" href="tel:${escapeHtml((c.phone || '').replace(/\\s+/g, ''))}">
            ${isStore ? 'Contact Store' : 'Book Consultation'}
          </a>
          <a target="_blank" rel="noopener noreferrer" class="px-3 py-2 rounded-lg bg-surface-container text-on-surface text-[12px] font-semibold flex items-center gap-1 hover:bg-surface-container-high transition-colors" href="${escapeHtml(c.directions_url || ('https://maps.google.com/?q=' + encodeURIComponent(c.name + ' ' + c.address)))}">
            <span class="material-symbols-outlined text-[16px]">navigation</span> Directions
          </a>
          <button type="button" class="clinic-share-btn p-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors" data-share-name="${escapeHtml(c.name)}" data-share-info="${escapeHtml(c.name + ' | ' + c.address + ' | Tel: ' + c.phone)}">
            <span class="material-symbols-outlined text-[18px]">share</span>
          </button>
        </div>
      </article>
    `;
  }).join('');

  if (getActiveLanguage() === 'ne') applyBodyTranslations('ne'); // Clinics list translated
  // Attach card click listeners
  container.querySelectorAll('.clinic-item-card').forEach(card => {
    card.addEventListener('click', () => {
      const cid = card.getAttribute('data-clinic-id');
      const clinic = clinics.find(c => c.id == cid);
      if (clinic && onSelectClinic) {
        onSelectClinic(clinic);
      }
    });
  });

  // Attach share button listeners
  container.querySelectorAll('.clinic-share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const shareName = btn.getAttribute('data-share-name');
      const shareInfo = btn.getAttribute('data-share-info');
      if (navigator.share) {
        navigator.share({
          title: shareName,
          text: `CDerma Authorized Outlet: ${shareInfo}`,
          url: window.location.href
        }).catch(() => {});
      } else {
        const waUrl = `https://wa.me/?text=${encodeURIComponent('CDerma Authorized Outlet: ' + shareInfo + ' - ' + window.location.href)}`;
        window.open(waUrl, '_blank');
      }
    });
  });
}

/**
 * Dynamic Monographs & Doctor's Advice Articles for monographs.html
 */
async function initMonographsArticles() {
  const container = document.getElementById('posts-container') || document.querySelector('[data-monographs-list]');
  if (!container) return;

  try {
    const lang = getActiveLanguage();
    const res = await fetch(`/api/monographs?lang=${lang}`);
    const data = await res.json();
    if (!data.success || !data.monographs || data.monographs.length === 0) return;

    window.__cderma_articles = data.monographs;
    renderArticlesGrid(container, data.monographs);

    // Connect Category Filter Buttons
    const catButtons = document.querySelectorAll('button[data-filter-mono], button[data-cat]');
    if (catButtons.length > 0) {
      catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          catButtons.forEach(b => {
            b.classList.remove('bg-primary', 'text-on-primary');
            b.classList.add('bg-surface-container', 'text-on-surface-variant');
          });
          btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
          btn.classList.add('bg-primary', 'text-on-primary');

          const cat = btn.getAttribute('data-filter-mono') || btn.getAttribute('data-cat');
          if (!cat || cat === 'all') {
            renderArticlesGrid(container, window.__cderma_articles);
          } else {
            const filtered = window.__cderma_articles.filter(a =>
              (a.category && a.category.toLowerCase().includes(cat.toLowerCase())) ||
              (a.title && a.title.toLowerCase().includes(cat.toLowerCase()))
            );
            renderArticlesGrid(container, filtered);
          }
        });
      });
    }

  } catch (err) {
    console.debug('Monographs dynamic sync fallback');
  }
}

function renderArticlesGrid(container, articles) {
  const isNe = getActiveLanguage() === 'ne';

  if (!articles || articles.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">article</span>
        <p class="text-sm font-semibold text-on-surface">${isNe ? 'यस वर्गमा कुनै लेख फेला परेन।' : 'No articles found in this category.'}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = articles.map(a => {
    const categoryNorm = (a.category || 'General').toLowerCase().replace(/\s+/g, '-');
    const readTime = a.read_time || (isNe ? '५ मिनेट पढाइ' : '5 min read');
    const dateText = a.date_text || '2025';
    const author = a.author || 'Dr. S. Karki';
    const image = a.image_url || 'assets/images/img_7df877252467.jpg';

    return `
      <article class="post-card bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col" data-category="${escapeHtml(categoryNorm)}">
        <div class="relative h-48 overflow-hidden bg-surface-container">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${escapeHtml(image)}" alt="${escapeHtml(a.title)}" loading="lazy" decoding="async">
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1 bg-surface-container-lowest/90 backdrop-blur-sm text-primary rounded-full text-[10px] font-label font-bold uppercase tracking-wider shadow-sm">
              ${escapeHtml(a.category || (isNe ? 'सामान्य' : 'General'))}
            </span>
          </div>
        </div>
        <div class="p-5 flex flex-col gap-3 flex-1">
          <div class="flex items-center gap-2 text-[11px] text-on-surface-variant font-body">
            <span class="material-symbols-outlined text-[14px] text-primary">schedule</span>
            ${escapeHtml(readTime)}
            <span class="text-outline-variant">&bull;</span>
            ${escapeHtml(dateText)}
          </div>
          <h3 class="font-display text-[18px] text-on-surface leading-snug">
            ${escapeHtml(a.title)}
          </h3>
          <p class="font-body text-[13px] text-on-surface-variant leading-relaxed flex-1">
            ${escapeHtml(a.summary || a.content || '')}
          </p>
          <div class="pt-3 border-t border-outline-variant/30 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span class="material-symbols-outlined text-[14px]">person</span>
              </div>
              <span class="font-label text-[11px] text-on-surface font-semibold">${escapeHtml(author)}</span>
            </div>
            <a href="#" onclick="alert('Doctor Advice: ' + ${JSON.stringify(a.title)} + '\\n\\nClinical Summary:\\n' + ${JSON.stringify(a.summary || a.content || '')} + '\\n\\nAuthor: ' + ${JSON.stringify(author)});" class="text-primary font-label text-[11px] font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
              ${isNe ? 'पढ्नुहोस्' : 'Read'} <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
  if (isNe) applyBodyTranslations('ne'); // Articles grid translated
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}



/**
 * Universal Mobile-First Navigation Drawer for CDerma Nepal
 * Provides fluid luxury drawer with tap targets, active states, WhatsApp action & safe area support.
 */
function initMobileNavigation() {
  if (document.getElementById('cderma-mobile-drawer')) return;

  // Determine current active page
  const path = window.location.pathname.toLowerCase();
  const isHome = path === '/' || path.endsWith('/index.html') || path.endsWith('/');
  const isProducts = path.includes('products.html') || (path.includes('/products') && !path.includes('product-detail'));
  const isFlagship = path.includes('product-detail.html');
  const isScience = path.includes('science.html');
  const isB2B = path.includes('b2b.html');
  const isMonographs = path.includes('monographs.html') || path.includes('doctors-advice');
  const isClinics = path.includes('clinics.html');

  const lang = getActiveLanguage();
  const isNe = lang === 'ne';

  const navItems = [
    { name: isNe ? 'गृहपृष्ठ' : 'Home', href: 'index.html', active: isHome, icon: 'home' },
    { name: isNe ? 'उत्पादनहरू' : 'Products Catalog', href: 'products.html', active: isProducts, icon: 'inventory_2' },
    { name: isNe ? 'प्रमुख फेस केयर' : 'Flagship Face Care', href: 'product-detail.html', active: isFlagship, icon: 'star' },
    { name: isNe ? 'गुणस्तर र विज्ञान' : 'Quality & Science', href: 'science.html', active: isScience, icon: 'science' },
    { name: isNe ? 'थोक तथा वितरण' : 'B2B & Distribution', href: 'b2b.html', active: isB2B, icon: 'storefront' },
    { name: isNe ? 'चिकित्सकीय परामर्श' : "Doctor's Advice", href: 'monographs.html', active: isMonographs, icon: 'clinical_notes' },
    { name: isNe ? 'स्टोर तथा क्लिनिकहरू' : 'Clinics & Stores', href: 'clinics.html', active: isClinics, icon: 'location_on' },
  ];

  const drawerHtml = `
    <!-- Backdrop -->
    <div id="cderma-mobile-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 opacity-0 pointer-events-none" aria-hidden="true"></div>
    
    <!-- Drawer Panel -->
    <div id="cderma-mobile-drawer" class="fixed top-0 right-0 bottom-0 w-[86vw] max-w-sm bg-[#FAF9F6] text-[#1d1c16] z-[9999] shadow-2xl transform translate-x-full pointer-events-none transition-transform duration-300 ease-in-out flex flex-col justify-between border-l border-[#e7e2d8]" role="dialog" aria-modal="true" aria-label="Site Navigation">
      <!-- Drawer Top -->
      <div class="p-5 border-b border-[#e7e2d8] flex items-center justify-between bg-[#f8f3e9]">
        <a href="index.html" class="flex items-center">
          <img src="assets/images/cderma-logo.png" alt="CDerma" class="h-8 w-auto object-contain">
        </a>
        <button id="cderma-mobile-close" aria-label="Close navigation" class="w-10 h-10 flex items-center justify-center rounded-full bg-[#f2ede3] text-[#1d1c16] hover:bg-[#e7e2d8] hover:text-[#887635] transition-colors focus:outline-none focus:ring-2 focus:ring-[#887635]" type="button">
          <span class="material-symbols-outlined text-[24px]">close</span>
        </button>
      </div>

      <!-- Drawer Scrollable Links -->
      <div class="flex-1 overflow-y-auto p-5 space-y-4">
        <!-- Navigation Links -->
        <div class="space-y-1">
          <span class="text-[10px] font-bold uppercase tracking-widest text-[#7d7768] px-2 mb-2 block font-label">${isNe ? 'नेभिगेसन' : 'Navigation'}</span>
          ${navItems.map(item => `
            <a href="${item.href}" class="flex items-center justify-between px-3.5 py-3 rounded-lg text-[14px] font-semibold tracking-wide transition-all ${
              item.active 
                ? 'bg-[#887635] text-white shadow-sm font-bold' 
                : 'text-[#1d1c16] hover:bg-[#f2ede3] hover:text-[#887635]'
            }">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-[20px] ${item.active ? 'text-white' : 'text-[#887635]'}">${item.icon}</span>
                <span>${item.name}</span>
              </div>
              <span class="material-symbols-outlined text-[16px] opacity-60">chevron_right</span>
            </a>
          `).join('')}
        </div>

        <!-- Quick Conversion CTAs -->
        <div class="pt-4 border-t border-[#e7e2d8] space-y-2.5">
          <span class="text-[10px] font-bold uppercase tracking-widest text-[#7d7768] px-2 block font-label">${isNe ? 'प्रत्यक्ष सम्पर्क' : 'Direct Connect'}</span>
          
          <a href="https://wa.me/9779820753751" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-[#25D366] text-white font-semibold text-[13px] shadow-sm hover:bg-[#20bd5a] transition-all">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span>${isNe ? 'ह्वाट्सएप परामर्श' : 'WhatsApp Quick Consult'}</span>
          </a>

          <a href="clinics.html" class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#f2ede3] hover:bg-[#e7e2d8] text-[#1d1c16] font-semibold text-[13px] transition-colors border border-[#cec6b4]/40">
            <span class="material-symbols-outlined text-[18px] text-[#887635]">storefront</span>
            <span>${isNe ? 'स्टोर तथा क्लिनिक खोज्नुहोस्' : 'Find In Stores & Clinics'}</span>
          </a>

          <a href="b2b.html" class="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-[#887635]/10 hover:bg-[#887635]/20 text-[#887635] font-semibold text-[13px] transition-colors border border-[#887635]/30">
            <span class="material-symbols-outlined text-[18px]">verified</span>
            <span>${isNe ? 'बी२बी थोक साझेदारी' : 'B2B Wholesale Onboarding'}</span>
          </a>
        </div>

        <!-- Language Picker -->
        <div class="pt-4 border-t border-[#e7e2d8] flex items-center justify-between px-2">
          <span class="text-[12px] text-[#7d7768] font-medium" data-i18n="display_language">${isNe ? 'भाषा चयन गर्नुहोस्' : 'Display Language'}</span>
          <div class="cderma-lang-toggle flex items-center bg-[#f2ede3] border border-[#cec6b4]/60 rounded-full p-0.5 text-[11px] uppercase tracking-wider shadow-xs" role="group" aria-label="Language Selector">
            <button type="button" data-lang-btn="en" class="px-2.5 py-1 rounded-full font-bold transition-all ${isNe ? 'text-[#4b4639] hover:text-[#887635] bg-transparent shadow-none cursor-pointer' : 'text-[#887635] bg-white shadow-xs cursor-default'}" title="Switch to English">EN</button>
            <button type="button" data-lang-btn="ne" class="px-2.5 py-1 rounded-full font-medium transition-all ${isNe ? 'text-[#887635] font-bold bg-white shadow-xs cursor-default' : 'text-[#4b4639] hover:text-[#887635] bg-transparent shadow-none cursor-pointer'}" title="नेपालीमा हेर्नुहोस्">नेपाली</button>
          </div>
        </div>
      </div>

      <!-- Drawer Footer -->
      <div class="p-5 border-t border-[#e7e2d8] bg-[#f8f3e9] space-y-3">
        <div class="flex flex-col gap-1 text-[11px] text-[#7d7768]">
          <p class="font-semibold text-[#1d1c16]">CDerma Nepal • K&K Trading Concern</p>
          <p>Koshi Cleanroom Research Facility, Itahari</p>
          <a href="tel:+9779820753751" class="font-bold text-[#887635] hover:underline flex items-center gap-1 mt-0.5">
            <span class="material-symbols-outlined text-[14px]">phone</span> +977 9820753751
          </a>
        </div>

        <!-- Social Icons -->
        <div class="flex items-center gap-2 pt-1">
          <a href="https://instagram.com/cdermanepal" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="w-8 h-8 rounded-full bg-[#f2ede3] border border-[#cec6b4]/60 flex items-center justify-center text-[#1d1c16] hover:text-white hover:bg-[#E1306C] transition-all">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://facebook.com/cdermanepal" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="w-8 h-8 rounded-full bg-[#f2ede3] border border-[#cec6b4]/60 flex items-center justify-center text-[#1d1c16] hover:text-white hover:bg-[#1877F2] transition-all">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://tiktok.com/@cdermanepal" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="w-8 h-8 rounded-full bg-[#f2ede3] border border-[#cec6b4]/60 flex items-center justify-center text-[#1d1c16] hover:text-white hover:bg-black transition-all">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
          </a>
          <a href="https://youtube.com/@cdermanepal" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="w-8 h-8 rounded-full bg-[#f2ede3] border border-[#cec6b4]/60 flex items-center justify-center text-[#1d1c16] hover:text-white hover:bg-[#FF0000] transition-all">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', drawerHtml);

  const backdrop = document.getElementById('cderma-mobile-backdrop');
  const drawer = document.getElementById('cderma-mobile-drawer');
  const closeBtn = document.getElementById('cderma-mobile-close');

  function openDrawer() {
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    drawer.classList.remove('translate-x-full', 'pointer-events-none');
    drawer.classList.add('translate-x-0', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    drawer.classList.remove('translate-x-0', 'pointer-events-auto');
    drawer.classList.add('translate-x-full', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  // Hook all mobile navigation triggers across all pages
  document.querySelectorAll('button[aria-label="Open Mobile Navigation"], header button.xl\\:hidden').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDrawer();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && !drawer.classList.contains('translate-x-full')) {
      closeDrawer();
    }
  });

  // Close when clicking any link inside drawer
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}


/**
 * CDerma Nepal - Hero Showcase Image Slider
 * Connects frontend hero image slider to backend CMS /api/hero-slides
 * Supports auto-play, swipe gestures, dots, keyboard navigation and instant live sync.
 */
async function initHeroSlider() {
  const sliderEl = document.getElementById('cderma-hero-slider');
  const wrapper = document.getElementById('hero-slides-wrapper');
  if (!sliderEl || !wrapper) return;

  let slides = [];
  try {
    const lang = getActiveLanguage();
    const res = await fetch(`/api/hero-slides?lang=${lang}`);
    const data = await res.json();
    if (data.success && data.slides && data.slides.length > 0) {
      slides = data.slides;
    }
  } catch (err) {
    console.debug('Using fallback hero slides');
  }

  if (slides.length === 0) {
    // Hardcoded fallback slides
    slides = [
      {
        title: 'Centella Barrier Restore Concentrate',
        subtitle: '30ml ℮ 1.0 fl. oz. · Dermatologically Evaluated',
        badge_text: 'Flagship Restorative Formula',
        formula_number: 'Formula No. 04',
        origin_text: 'Origin: Koshi Cleanroom Labs',
        specs_text: 'pH 5.4 · Pure Hydration',
        image_url: 'assets/images/img_282f9d7b4a1e.jpg',
        cta_url: 'product-detail.html',
        cta_text: 'Details'
      },
      {
        title: 'Physiological Balancing Gel Cleanser',
        subtitle: '150ml Pump Bottle · Ultra-Gentle Daily Purifier',
        badge_text: 'Sulfate-Free Cleanser',
        formula_number: 'Formula No. 01',
        origin_text: 'Origin: Koshi Cleanroom Labs',
        specs_text: 'pH 5.5 · Non-Stripping',
        image_url: 'assets/images/img_d04f5fd68ff7.jpg',
        cta_url: 'products.html',
        cta_text: 'Details'
      },
      {
        title: 'Ceramide Deep Barrier Cream',
        subtitle: '50ml Jar · Multi-Ceramide Lipid Complex',
        badge_text: 'Deep Daily Moisture',
        formula_number: 'Formula No. 07',
        origin_text: 'Origin: Koshi Cleanroom Labs',
        specs_text: 'pH 5.8 · Bio-Identical',
        image_url: 'assets/images/texture-swatch.png',
        cta_url: 'products.html',
        cta_text: 'Details'
      },
      {
        title: 'High-Altitude Mineral Shield SPF 50+',
        subtitle: '50ml Tube · 18.5% Zinc Oxide & Ectoin',
        badge_text: 'Broad Spectrum PA++++',
        formula_number: 'Formula No. 09',
        origin_text: 'Origin: Koshi Cleanroom Labs',
        specs_text: 'Zero White Cast · High Altitude',
        image_url: 'assets/images/img_63acd4dd2bb8.jpg',
        cta_url: 'products.html',
        cta_text: 'Details'
      },
      {
        title: 'Cleanroom Formulation & Botanical Extraction',
        subtitle: 'Itahari, Sunsari · Koshi Province Cleanroom Facility',
        badge_text: 'Certified ISO Class 7',
        formula_number: 'Cleanroom Facility',
        origin_text: 'Exim: 3049904360114NP',
        specs_text: 'Hermetically Sealed',
        image_url: 'assets/images/cleanroom-lab-wide.png',
        cta_url: 'science.html',
        cta_text: 'Details'
      }
    ];
  }

  // Render slides in wrapper
  wrapper.innerHTML = slides.map((s, idx) => `
    <div class="hero-slide absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${idx === 0 ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'}" data-slide-index="${idx}">
      <img class="w-full h-full object-cover object-center filter saturate-[0.92] transition-transform duration-1000 ease-out" alt="${escapeHtml(s.title)}" src="${escapeHtml(s.image_url)}">
    </div>
  `).join('');

  // Render dots
  const dotsContainer = document.getElementById('slider-dots');
  if (dotsContainer) {
    dotsContainer.innerHTML = slides.map((_, idx) => `
      <button class="slider-dot transition-all duration-300 rounded-full ${idx === 0 ? 'w-6 h-2 bg-[#756839]' : 'w-2 h-2 bg-white/40 hover:bg-white'}" aria-label="Go to slide ${idx + 1}" data-dot-index="${idx}" type="button"></button>
    `).join('');
  }

  let currentIndex = 0;
  let autoplayTimer = null;

  function updateSlideUI(idx) {
    const s = slides[idx];
    if (!s) return;

    // Toggle slide visibility with subtle scale
    const slideEls = wrapper.querySelectorAll('.hero-slide');
    slideEls.forEach((el, i) => {
      if (i === idx) {
        el.classList.remove('opacity-0', 'scale-105', 'pointer-events-none', 'z-0');
        el.classList.add('opacity-100', 'scale-100', 'pointer-events-auto', 'z-10');
      } else {
        el.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto', 'z-10');
        el.classList.add('opacity-0', 'scale-105', 'pointer-events-none', 'z-0');
      }
    });

    // Update overlay texts
    const badgeTextEl = document.getElementById('slider-badge-text');
    if (badgeTextEl) badgeTextEl.textContent = s.badge_text ? `${s.formula_number || ''} · ${s.badge_text}` : (s.formula_number || 'Flagship Formulation');

    const counterEl = document.getElementById('slider-counter');
    if (counterEl) {
      const curStr = String(idx + 1).padStart(2, '0');
      const totalStr = String(slides.length).padStart(2, '0');
      counterEl.textContent = `${curStr} / ${totalStr}`;
    }

    const formulaTagEl = document.getElementById('slider-formula-tag');
    if (formulaTagEl) formulaTagEl.textContent = s.formula_number || 'CDERMA NEPAL · DOCTOR-FORMULATED SKINCARE';

    const titleEl = document.getElementById('slider-title');
    if (titleEl) titleEl.textContent = s.title || '';

    const subtitleEl = document.getElementById('slider-subtitle');
    if (subtitleEl) subtitleEl.textContent = s.subtitle || '';

    const ctaBtn = document.getElementById('slider-cta-btn');
    if (ctaBtn) {
      ctaBtn.href = s.cta_url || 'product-detail.html';
      const ctaSpan = ctaBtn.querySelector('span');
      if (ctaSpan) ctaSpan.textContent = s.cta_text || 'Explore Face Care';
    }

    const originEl = document.getElementById('slider-origin');
    if (originEl) originEl.textContent = s.origin_text || 'Origin: Koshi Cleanroom Labs';

    const specsEl = document.getElementById('slider-specs');
    if (specsEl) specsEl.textContent = s.specs_text || 'pH 5.4 · Pure Hydration';

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((d, i) => {
        if (i === idx) {
          d.classList.remove('w-2', 'bg-white/40');
          d.classList.add('w-6', 'bg-[#756839]');
        } else {
          d.classList.remove('w-6', 'bg-[#756839]');
          d.classList.add('w-2', 'bg-white/40');
        }
      });
    }

    currentIndex = idx;
  }

  function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    updateSlideUI(next);
  }

  function prevSlide() {
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    updateSlideUI(prev);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 4800);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Hook Next/Prev buttons
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    });
  }

  // Hook dots
  if (dotsContainer) {
    dotsContainer.querySelectorAll('.slider-dot').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(btn.getAttribute('data-dot-index'), 10);
        updateSlideUI(targetIdx);
        startAutoplay();
      });
    });
  }

  // Pause on hover
  sliderEl.addEventListener('mouseenter', stopAutoplay);
  sliderEl.addEventListener('mouseleave', startAutoplay);

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderEl.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  sliderEl.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide(); // Swiped left -> next
      } else {
        prevSlide(); // Swiped right -> prev
      }
    }
    startAutoplay();
  }, { passive: true });

  // Initialize first slide and start autoplay
  updateSlideUI(0);
  startAutoplay();
}

/**
 * CDerma Nepal - Dynamic Social Media Channels & Floating WhatsApp Widget
 * Connects public frontend pages to backend CMS /api/social
 */
async function initSocialMediaIntegration() {
  try {
    const res = await fetch('/api/social');
    const data = await res.json();
    if (!data.success) return;

    const channels = data.channels || [];
    const meta = data.meta || {};

    // 1. Sync footer social link URLs & visibility based on configured active channels
    channels.forEach(ch => {
      const plat = (ch.platform || '').toLowerCase();
      let links = [];
      if (plat === 'instagram') {
        links = document.querySelectorAll('a[href*="instagram.com"], a[aria-label*="Instagram"]');
      } else if (plat === 'facebook') {
        links = document.querySelectorAll('a[href*="facebook.com"], a[aria-label*="Facebook"]');
      } else if (plat === 'tiktok') {
        links = document.querySelectorAll('a[href*="tiktok.com"], a[aria-label*="TikTok"]');
      } else if (plat === 'youtube') {
        links = document.querySelectorAll('a[href*="youtube.com"], a[aria-label*="YouTube"]');
      } else if (plat === 'whatsapp') {
        links = document.querySelectorAll('footer a[href*="wa.me"], footer a[aria-label*="WhatsApp"]');
      } else if (plat === 'linkedin') {
        links = document.querySelectorAll('a[href*="linkedin.com"], a[aria-label*="LinkedIn"]');
      } else if (plat === 'twitter_x' || plat === 'twitter') {
        links = document.querySelectorAll('a[href*="twitter.com"], a[href*="x.com"], a[aria-label*="Twitter"], a[aria-label*=" X "]');
      }

      links.forEach(l => {
        if (ch.url) l.href = ch.url;
        if (!ch.is_active || !ch.show_in_footer) {
          l.style.display = 'none';
        } else {
          l.style.display = '';
        }
      });
    });

    // 2. Floating WhatsApp Clinical Consult Widget
    if (meta.social_whatsapp_floating === '1') {
      const phoneDigits = (meta.social_whatsapp_number || '9779820753751').replace(/\D/g, '');
      const greetingMsg = encodeURIComponent(meta.social_whatsapp_msg || 'Namaste CDerma! I would like to inquire about formulations & clinical supplies.');
      const waUrl = `https://wa.me/${phoneDigits}?text=${greetingMsg}`;

      let floatingWidget = document.getElementById('cderma-floating-whatsapp');
      if (!floatingWidget) {
        floatingWidget = document.createElement('div');
        floatingWidget.id = 'cderma-floating-whatsapp';
        floatingWidget.className = 'fixed bottom-6 right-6 z-50 flex items-center group';
        floatingWidget.innerHTML = `
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" aria-label="Chat with CDerma Medical Skincare Team" 
             class="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-[0_8px_24px_rgba(37,211,102,0.38)] hover:shadow-[0_12px_28px_rgba(37,211,102,0.5)] active:scale-95 transition-all duration-300 font-label font-bold text-xs tracking-wide">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span class="hidden sm:inline font-semibold">WhatsApp Consult</span>
          </a>
        `;
        document.body.appendChild(floatingWidget);
      } else {
        const link = floatingWidget.querySelector('a');
        if (link) link.href = waUrl;
        floatingWidget.style.display = 'flex';
      }
    } else {
      const existing = document.getElementById('cderma-floating-whatsapp');
      if (existing) existing.style.display = 'none';
    }

  } catch (e) {
    console.debug('Social media integration sync fallback', e);
  }
}
