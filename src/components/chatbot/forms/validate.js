// Simple validation helpers for chat forms
export function isEmailValid(email) {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isPhoneValid(phone) {
    if (!phone) return false;
    // Accept digits, spaces, dashes, parentheses and leading +
    const digits = phone.replace(/[^0-9]/g, '');
    // basic length check
    return digits.length >= 7 && digits.length <= 15;
}

export function requiresContact(email, phone) {
    // returns true if at least one contact provided
    return Boolean((email && email.trim()) || (phone && phone.trim()));
}
