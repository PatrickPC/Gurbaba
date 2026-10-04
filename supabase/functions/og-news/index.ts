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

const escapeHtml = (value: string): string => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

const absolute = (value?: string | null): string | null => {
  if (!value) return null;

  const url = String(value).trim();

  if (!url) return null;

  if (url.startsWith("blob:") || url.startsWith("data:")) {
    return null;
  }

  if (/^https:\/\//i.test(url)) {
    return url;
  }

  if (/^http:\/\//i.test(url)) {
    return url.replace(/^http:\/\//i, "https://");
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  return `${SITE_URL}/${url.replace(/^\/+/, "")}`;
};

const clamp = (value: string, max = 200): string => {
  const text = (value || "").replace(/\s+/g, " ").trim();

  if (text.length > max) {
    return `${text.slice(0, max - 1)}…`;
  }

  return text;
};

const page = (tags: string[], redirectTo: string): string => {
  return `<!DOCTYPE html>
<html lang="ne">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
${tags.join("\n")}
<link rel="canonical" href="${escapeHtml(redirectTo)}" />
<script>
window.location.replace(${JSON.stringify(redirectTo)});
</script>
</head>
<body>
<p>
<a href="${escapeHtml(redirectTo)}">Continue to the article</a>
</p>
</body>
</html>`;
};

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  const url = new URL(req.url);

  // Accept:
  // /og-news/<id>
  // /og-news?id=<id>
  const pathId = url.pathname.split("/").filter(Boolean).pop();

  const id =
    url.searchParams.get("id") ||
    (pathId && pathId !== "og-news" ? pathId : null);

  const headers = {
    ...corsHeaders,
    "content-type": "text/html; charset=utf-8",
    "cache-control": "public, max-age=300",
  };

  const fallback = (): Response => {
    const redirectTo = id
      ? `${SITE_URL}/news/${encodeURIComponent(id)}`
      : `${SITE_URL}/`;

    return new Response(
      page(
        [
          `<title>${escapeHtml(DEFAULT_TITLE)}</title>`,

          `<meta name="description" content="${escapeHtml(
            DEFAULT_DESCRIPTION,
          )}" />`,

          `<meta property="og:site_name" content="${escapeHtml(
            SITE_NAME,
          )}" />`,

          `<meta property="og:type" content="website" />`,

          `<meta property="og:title" content="${escapeHtml(
            DEFAULT_TITLE,
          )}" />`,

          `<meta property="og:description" content="${escapeHtml(
            DEFAULT_DESCRIPTION,
          )}" />`,

          `<meta property="og:url" content="${escapeHtml(
            redirectTo,
          )}" />`,

          `<meta name="twitter:card" content="summary_large_image" />`,
        ],
        redirectTo,
      ),
      {
        headers,
      },
    );
  };

  if (!id) {
    return fallback();
  }

  try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !anonKey) return fallback();

    const queryUrl =
      `${supabaseUrl}/rest/v1/news_articles` +
      `?id=eq.${encodeURIComponent(id)}` +
      `&select=id,title,excerpt,images,author,category,published_at` +
      `&limit=1`;

    const res = await fetch(queryUrl, {
      method: "GET",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });

    if (!res.ok) {
      return fallback();
    }

    const rows = await res.json();

    const article = Array.isArray(rows) ? rows[0] : null;

    if (!article) {
      return fallback();
    }

    const canonical = `${SITE_URL}/news/${article.id}`;

    const title = clamp(
      typeof article.title === "string"
        ? article.title
        : DEFAULT_TITLE,
      120,
    );

    const description = clamp(
      typeof article.excerpt === "string"
        ? article.excerpt
        : DEFAULT_DESCRIPTION,
    );

    const firstImage =
      Array.isArray(article.images) && article.images.length > 0
        ? article.images[0]
        : null;

    const image =
      absolute(
        typeof firstImage === "string"
          ? firstImage
          : null,
      ) ||
      `${SITE_URL}/images/default-placeholder.png`;

    const tags: string[] = [
     `<title>${escape(title)} | ${SITE_NAME}</title>`,
      `<meta name="description" content="${escape(description)}" />`,
      `<meta property="og:site_name" content="${SITE_NAME}" />`,
      `<meta property="og:type" content="article" />`,
      `<meta property="og:title" content="${escape(title)}" />`,
      `<meta property="og:description" content="${escape(description)}" />`,
      `<meta property="og:image" content="${escape(image)}" />`,
      `<meta property="og:image:secure_url" content="${escape(image)}" />`,
      `<meta property="og:image:type" content="image/jpeg" />`,
      `<meta property="og:url" content="${escape(canonical)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escape(title)}" />`,
      `<meta name="twitter:description" content="${escape(description)}" />`,
      `<meta name="twitter:image" content="${escape(image)}" />`,
    ];

    if (article.published_at) tags.push(`<meta property="article:published_time" content="${escape(article.published_at)}" />`);
    if (article.author) tags.push(`<meta property="article:author" content="${escape(article.author)}" />`);
    if (article.category) tags.push(`<meta property="article:section" content="${escape(article.category)}" />`);

    return new Response(page(tags, canonical),{headers,},);    
  } catch (_error) {
    return fallback();
  }
});