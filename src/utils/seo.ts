/** Canonical public origin of the site — used to build absolute URLs for crawlers. */
export const SITE_URL = 'https://radiogurbaba.org.np';
export const SITE_NAME = 'Radio Gurbaba';

/** Turn a possibly relative/blob path into an absolute https URL, or return null when unusable. */
export const toAbsoluteUrl = (value?: string | null): string | null => {
  if (!value) return null;
  const url = value.trim();
  if (!url || url.startsWith('blob:') || url.startsWith('data:')) return null;
  if (/^https:\/\//i.test(url)) return url;
  if (/^http:\/\//i.test(url)) return url.replace(/^http:\/\//i, 'https://');
  if (url.startsWith('//')) return `https:${url}`;
  return `${SITE_URL}/${url.replace(/^\/+/, '')}`;
};

/** Absolute URL of a news article page. */
export const articleUrl = (id: string) => `${SITE_URL}/news/${id}`;

/** Trim text to a safe length for meta descriptions. */
export const clampText = (text: string | undefined | null, max = 200): string => {
  const value = (text || '').replace(/\s+/g, ' ').trim();
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
};