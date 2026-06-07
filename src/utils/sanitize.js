// Sanitize user input to prevent XSS
export const sanitize = (str) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
};

// Validate email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Validate Indian phone
export const isValidPhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone);
};

// Validate password strength
export const isStrongPassword = (password) => {
  return password.length >= 6;
};