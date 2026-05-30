// Client-side action helpers for a static PWA (no backend).
// Messaging "sends" open native deep links; copy/share use Web APIs with fallbacks.

/** Strip a phone number down to digits for tel:/wa.me/sms: links. */
export function normalizePhone(phone = '') {
  return String(phone).replace(/[^\d+]/g, '');
}

/** Build a WhatsApp deep link. wa.me wants digits only, no '+'. */
export function waLink(phone, msg = '') {
  const num = normalizePhone(phone).replace(/^\+/, '');
  const text = msg ? `?text=${encodeURIComponent(msg)}` : '';
  return `https://wa.me/${num}${text}`;
}

/** Build an sms: deep link (uses the `?&body=` form for broad compatibility). */
export function smsLink(phone, msg = '') {
  const num = normalizePhone(phone);
  const body = msg ? `?&body=${encodeURIComponent(msg)}` : '';
  return `sms:${num}${body}`;
}

/** Build a mailto: deep link. */
export function mailLink(email = '', subject = '', body = '') {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const qs = params.length ? `?${params.join('&')}` : '';
  return `mailto:${email}${qs}`;
}

/** Open a deep link in a new tab/native handler (no-op in non-browser envs). */
export function openLink(url) {
  if (typeof window !== 'undefined' && url) window.open(url, '_blank', 'noopener');
}

/** Copy text to the clipboard. Returns a promise resolving to true on success. */
export async function copyToClipboard(text) {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* fall through to legacy path */ }
  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Share via the Web Share API, falling back to copying the URL.
 * Returns 'shared' | 'copied' | 'failed'.
 */
export async function shareLink({ title, text, url }) {
  try {
    if (typeof navigator !== 'undefined' && navigator.share) {
      await navigator.share({ title, text, url });
      return 'shared';
    }
  } catch (err) {
    // User aborting the share sheet should not be treated as a copy fallback.
    if (err && err.name === 'AbortError') return 'failed';
  }
  const ok = await copyToClipboard(url || text || '');
  return ok ? 'copied' : 'failed';
}

/** Open the print dialog (used for "download" of QR / booking page as PDF). */
export function printPage() {
  if (typeof window !== 'undefined') window.print();
}

/** Insert a token at the cursor position of a textarea/input, returning the new value. */
export function insertToken(value = '', token = '', selStart = null, selEnd = null) {
  const start = selStart == null ? value.length : selStart;
  const end = selEnd == null ? start : selEnd;
  return value.slice(0, start) + token + value.slice(end);
}
