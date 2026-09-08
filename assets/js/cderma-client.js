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

const STATIC_UI_NEPALI = {
  'REGION / LANGUAGE:': 'क्षेत्र / भाषा:',
  'Display Language': 'भाषा चयन गर्नुहोस्',
  'Navigation': 'नेभिगेसन',
  'Direct Connect': 'प्रत्यक्ष सम्पर्क',
  'WhatsApp Quick Consult': 'ह्वाट्सएप परामर्श',
  'Find In Stores & Clinics': 'स्टोर तथा क्लिनिक खोज्नुहोस्',
  'B2B Wholesale Onboarding': 'बी२बी थोक साझेदारी',
  'Company': 'कम्पनी',
  'Products': 'उत्पादनहरू',
  'B2B Partners': 'बी२बी साझेदार',
  'Resources': 'स्रोतहरू',
  'About Us': 'हाम्रो बारेमा',
  'Quality Standards': 'गुणस्तर मापदण्ड',
  'Manufacturing Facility': 'उत्पादन तथा वितरण केन्द्र',
  'Careers & Research': 'अनुसन्धान तथा करियर',
  'Face Care Systems': 'फेस केयर प्रणाली',
  'Hydrating Serums': 'हाइड्रेटिङ सिरमहरू',
  'Restorative Creams': 'रिस्टोरेटिभ क्रिमहरू',
  'Body Care Formulations': 'बडी केयर फर्मुलाहरू',
  'Cosmetic Store Wholesale': 'कस्मेटिक स्टोर थोक',
  'Become a Distributor': 'वितरक बन्नुहोस्',
  'Salon & Pharmacy Supply': 'सैलुन तथा फार्मेसी आपूर्ति',
  'Dermatologist Portal': 'चिकित्सक पोर्टल',
  'Skincare Guides': 'छाला हेरचाह निर्देशिका',
  'Verified Ingredients': 'प्रमाणित सामग्रीहरू',
  'Verification & Transparency': 'प्रमाणीकरण र पारदर्शिता',
  'Clinical FAQs': 'क्लिनिकल प्रश्नोत्तर',
  'Legal & Compliance': 'कानुनी र अनुपालन',
  'Follow & Connect With Us': 'हामीसँग जोडिनुहोस्',
  'Bottle': 'बोतल',
  'Lab Report': 'ल्याब रिपोर्ट',
  'Lab Report (PDF)': 'ल्याब रिपोर्ट (PDF)',
  'Hover to Inspect Bottle': 'बोतल हेर्न कर्सर लैजानुहोस्',
  'Certificate of Quality': 'गुणस्तर प्रमाणपत्र',
  'TEST PASSED': 'परीक्षण सफल',
  'Vitamin B3 (Niacinamide)': 'भिटामिन B3 (नियासिनामाइड)',
  'Skin-Friendly pH': 'छाला-अनुकूल pH',
  'Microbial Purity': 'माइक्रोबियल शुद्धता',
  'Heavy Metals Check': 'हेभी मेटल जाँच',
  'Zero Detected': 'शून्य पत्ता लाग्यो',
  'Not Detected': 'पत्ता लागेन (१००% सुरक्षित)',
  'Lead Chemist: S. Pokharel': 'प्रमुख केमिस्ट: एस. पोखरेल',
  'All Products': 'सबै उत्पादनहरू',
  'Barrier Repair': 'ब्यारियर मर्मत',
  'Hydration': 'हाइड्रेशन',
  'Cleansers': 'क्लिन्जर',
  'Photoprotection': 'सन केयर',
  'Corrective Treatments': 'उपचारात्मक सिरम'
};

function applyStaticUITranslations(lang) {
  if (lang !== 'ne') return;

  // 1. Check data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key === 'region_language') el.textContent = 'क्षेत्र / भाषा:';
    if (key === 'display_language') el.textContent = 'भाषा चयन गर्नुहोस्';
  });

  // 2. Footer headers and links
  document.querySelectorAll('footer span.font-label.uppercase, footer ul a, footer span').forEach(el => {
    const text = el.textContent.trim();
    if (STATIC_UI_NEPALI[text]) {
      el.textContent = STATIC_UI_NEPALI[text];
    }
  });

  // 3. Search inputs
  document.querySelectorAll('input[placeholder]').forEach(inp => {
    const ph = inp.getAttribute('placeholder');
    if (ph && (ph.includes('Search by cosmetic store') || ph.includes('Search authorized clinics'))) {
      inp.setAttribute('placeholder', 'कस्मेटिक स्टोर, क्लिनिक वा शहर खोज्नुहोस्...');
    } else if (ph && ph.includes('Search')) {
      inp.setAttribute('placeholder', 'खोज्नुहोस्...');
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
    applyStaticUITranslations('ne');
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
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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
    const res = await fetch('/api/hero-slides');
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
