/**
 * CDerma Nepal — Input Validation & Schema Sanitization Service
 * Provides strict validation rules for forms, API endpoints, and CMS data entries.
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PHONE_CHARS_REGEX = /^[0-9+()\s.-]{6,30}$/;

function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  // Strip control characters except newline and tab
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  return trimmed.length <= 150 && EMAIL_REGEX.test(trimmed);
}

/**
 * Validate General Inquiries & Doctor Verification Requests
 */
function validateInquiryInput(body) {
  const errors = [];
  const name = sanitizeText(body.name);
  const email = sanitizeText(body.email);
  const phone = sanitizeText(body.phone);
  const subject = sanitizeText(body.subject) || 'General Inquiry';
  const message = sanitizeText(body.message);
  const type = sanitizeText(body.type) || 'general';

  if (!name || name.length < 2) errors.push('Name must be at least 2 characters long.');
  if (name.length > 100) errors.push('Name cannot exceed 100 characters.');

  if (!email || !isValidEmail(email)) errors.push('A valid professional email address is required.');

  if (phone && !PHONE_CHARS_REGEX.test(phone)) {
    errors.push('Phone number contains invalid characters (allowed: numbers, +, -, parentheses).');
  }

  if (subject.length > 200) errors.push('Subject cannot exceed 200 characters.');
  if (message.length > 4000) errors.push('Message cannot exceed 4000 characters.');

  const allowedTypes = ['general', 'doctor_verification', 'sample_request', 'clinical'];
  const finalType = allowedTypes.includes(type) ? type : 'general';

  return {
    isValid: errors.length === 0,
    errors,
    data: { name, email, phone, subject, message, type: finalType }
  };
}

/**
 * Validate B2B Wholesale & Hospital Pharmacy Applications
 */
function validateB2BInput(body) {
  const errors = [];
  const practiceName = sanitizeText(body.businessName || body.practiceName);
  const contactPerson = sanitizeText(body.contactPerson);
  const email = sanitizeText(body.workEmail || body.email);
  const phone = sanitizeText(body.phoneNumber || body.phone);
  const facilityCategory = sanitizeText(body.clinicType || body.facilityCategory) || 'Dermatology Clinic';
  const regNumber = sanitizeText(body.regNumber);
  const province = sanitizeText(body.province) || 'Bagmati';
  const volumeTier = sanitizeText(body.volumeTier) || 'starter';
  const sampleKit = (body.sampleKitRequested || body.sampleKitCheck) ? 1 : 0;

  if (!practiceName || practiceName.length < 2) errors.push('Clinic or Practice Name is required.');
  if (practiceName.length > 150) errors.push('Practice Name cannot exceed 150 characters.');

  if (!contactPerson || contactPerson.length < 2) errors.push('Contact Person Name is required.');
  if (contactPerson.length > 100) errors.push('Contact Person Name cannot exceed 100 characters.');

  if (!email || !isValidEmail(email)) errors.push('A valid professional work email address is required.');

  if (!phone || !PHONE_CHARS_REGEX.test(phone)) {
    errors.push('A valid phone number is required (allowed: numbers, +, -, parentheses).');
  }

  if (regNumber.length > 80) errors.push('Registration number cannot exceed 80 characters.');
  if (facilityCategory.length > 100) errors.push('Facility category cannot exceed 100 characters.');

  return {
    isValid: errors.length === 0,
    errors,
    data: {
      practiceName,
      contactPerson,
      email,
      phone,
      facilityCategory,
      regNumber,
      province,
      volumeTier,
      sampleKit
    }
  };
}

/**
 * Validate Product Data Entry
 */
function validateProductInput(body) {
  const errors = [];
  const slug = sanitizeText(body.slug).toLowerCase();
  const title = sanitizeText(body.title);
  const price = parseFloat(body.price_npr);

  if (!slug || !SLUG_REGEX.test(slug)) {
    errors.push('Product slug must contain only lowercase alphanumeric characters and single hyphens (e.g. ceramide-cream).');
  }
  if (!title || title.length < 2) errors.push('Product title is required.');
  if (title.length > 200) errors.push('Product title cannot exceed 200 characters.');
  if (isNaN(price) || price < 0) errors.push('Price in NPR must be a non-negative number.');

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  sanitizeText,
  isValidEmail,
  validateInquiryInput,
  validateB2BInput,
  validateProductInput
};
