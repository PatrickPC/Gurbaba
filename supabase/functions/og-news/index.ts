
const SITE_URL = "https://radiogurbaba.org.np";
const SITE_NAME = "Radio Gurbaba";
const DEFAULT_TITLE = "Radio Gurbaba — समाचार, भिडियो र रेडियो";
const DEFAULT_DESCRIPTION =
  "Radio Gurbaba: स्थानीय, राष्ट्रिय, कृषि, संस्कृति, खेलकुद र अन्तर्वार्ता समाचार, भिडियो, अडियो र प्रत्यक्ष रेडियो।";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const absolute = (value?: string | null): string | null => {
  if (!value) return null;

  const url = String(value).trim();

  if (!url || url.startsWith("blob:") || url.startsWith("data:")) {
    return null;
  }

  if (/^https:\/\//i.test(url)) return url;

  if (/^http:\/\//i.test(url)) {
    return url.replace(/^http:\/\//i, "https://");
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  return `${SITE_URL}/${url.replace(/^\/+/, "")}`;
};

const clamp = (value: string, max = 200) => {
  const text = (value || "").replace(/\s+/g, " ").trim();

  return text.length > max
    ? `${text.slice(0, max - 1)}…`
    : text;
};