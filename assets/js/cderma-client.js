/**
 * CDerma Nepal - Client-Side Dynamic Synchronization
 * Connects frontend pages to the Node.js backend CMS APIs
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Sync Dynamic Site Settings & Copy
  try {
    const res = await fetch('/api/settings');
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
        alert('Server connection error. Please try again or contact clinical@cderma.com.np directly.');
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

  // 4. Dynamic Clinic Directory Filter & Search (clinics.html)
  const clinicContainer = document.querySelector('[data-clinics-list]');
  if (clinicContainer) {
    loadDynamicClinics(clinicContainer);
  }

  // 5. In-Page Live Visual Editor (for authenticated admins)
  initVisualEditor();
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

async function loadDynamicClinics(container) {
  try {
    const res = await fetch('/api/clinics');
    const data = await res.json();
    if (data.success && data.clinics.length > 0) {
      container.innerHTML = data.clinics.map(c => `
        <div class="p-space-lg rounded-xl border border-outline bg-white hover:border-secondary transition-all shadow-sm flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-space-xs">
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-surface-container text-secondary">${escapeHtml(c.category)}</span>
              ${c.is_verified ? '<span class="text-[11px] text-emerald-700 font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-xs">verified</span> Verified Dispensary</span>' : ''}
            </div>
            <h3 class="font-display-lg text-[18px] font-bold text-on-surface mb-1">${escapeHtml(c.name)}</h3>
            <p class="text-[12px] text-gray-500 mb-2">${escapeHtml(c.city)}, ${escapeHtml(c.province)}</p>
            <p class="text-[13px] text-on-surface-variant mb-3">${escapeHtml(c.address)}</p>
            ${c.lead_doctor ? `<p class="text-[12px] text-secondary font-medium"><strong>Practitioner:</strong> ${escapeHtml(c.lead_doctor)}</p>` : ''}
          </div>
          <div class="pt-space-md mt-space-md border-t border-outline/30 flex items-center justify-between">
            <a href="tel:${escapeHtml(c.phone || '')}" class="text-[12px] font-bold text-primary hover:text-secondary flex items-center gap-1">
              <span class="material-symbols-outlined text-sm">phone</span>
              <span>${escapeHtml(c.phone || 'Contact Clinic')}</span>
            </a>
            <a href="b2b.html" class="text-[11px] uppercase tracking-wider font-semibold text-secondary hover:underline">Referral Inquiries →</a>
          </div>
        </div>
      `).join('');
    }
  } catch (e) {
    console.debug('Clinic directory fallback');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

