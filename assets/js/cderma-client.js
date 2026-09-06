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
});

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
