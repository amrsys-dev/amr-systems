// Сборка портала AMR: статические страницы из products.json и i18n.json. Без зависимостей.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "dist");
const DOMAIN = "amrsys.net";
const LANGS = ["ru", "en", "ar", "uz", "tg"];
const FLAGS = { ru: "🇷🇺", en: "🇬🇧", ar: "🇸🇦", uz: "🇺🇿", tg: "🇹🇯" };
const HTML_LANG = { ru: "ru", en: "en", ar: "ar", uz: "uz", tg: "tg" };

const registry = JSON.parse(readFileSync(join(ROOT, "products.json"), "utf8"));
const T = JSON.parse(readFileSync(join(ROOT, "i18n.json"), "utf8"));
const MONO_D = readFileSync(join(ROOT, "brand/monogram/amr-monogram.svg"), "utf8").match(/ d="([^"]+)"/)[1];
const products = registry.products.filter((p) => !p.hidden);

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const safeUrl = (u) => (/^https:\/\/[^\s"'<>]+$/.test(u || "") ? u : "");
/** Catalog pages cannot prompt another origin's PWA; open the app with ?install=1 instead. */
export function installHref(app) {
  if (!app) return "";
  return app + (app.includes("?") ? "&" : "?") + "install=1";
}

// Хэш файлов для кэша
const css = readFileSync(join(ROOT, "src/site.css"), "utf8");
const js = readFileSync(join(ROOT, "src/site.js"), "utf8");
const h = (s) => createHash("sha256").update(s).digest("hex").slice(0, 10);
const CSS_URL = `/assets/site.${h(css)}.css`;
const JS_URL = `/assets/site.${h(js)}.js`;

// Встроенный скрипт темы (до отрисовки, чтобы не мигало). Его хэш идёт в CSP.
export const THEME_BOOT = `try{var t=localStorage.getItem("amr-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;
export const THEME_BOOT_HASH = "sha256-" + createHash("sha256").update(THEME_BOOT).digest("base64");

const monoSym = `<svg class="sprite" width="0" height="0" aria-hidden="true"><defs><linearGradient id="mg" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="var(--mono-a)"/><stop offset=".55" stop-color="var(--mono-b)"/><stop offset="1" stop-color="var(--mono-c)"/></linearGradient><symbol id="amr" viewBox="0 0 290.4 100"><path fill-rule="evenodd" d="${MONO_D}"/></symbol></defs></svg>`;
const mono = (cls, label = true) =>
  `<svg class="${cls}" viewBox="0 0 290.4 100" ${label ? 'role="img" aria-label="AMR"' : 'aria-hidden="true"'}><use href="#amr" fill="url(#mg)" stroke="var(--mono-edge)" stroke-width="1.5" paint-order="stroke"/></svg>`;
const chevron = `<svg class="go" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>`;

// Пути. Русский — корень, остальные — /xx/.
const langPath = (l) => (l === "ru" ? "" : l + "/");
// Портал: /, /en/ ... Страница продукта: /safar/, /en/safar/ ... Само приложение — на поддомене (app_url).
const portalPath = (l) => `/${langPath(l)}`;
const productPath = (slug, l) => `/${langPath(l)}${slug}/`;
const portalUrl = (l) => `https://${DOMAIN}${portalPath(l)}`;
const productUrl = (slug, l) => `https://${DOMAIN}${productPath(slug, l)}`;

function text(p, l) {
  const t = p.i18n[l] || p.i18n.en;
  return t;
}

function head({ l, title, desc, canonical, alternates, icon }) {
  const t = T[l];
  return `<!doctype html>
<html lang="${HTML_LANG[l]}" dir="${t.dir}"${l === "ru" ? " data-root" : ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#F4F7F3" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0D1713" media="(prefers-color-scheme: dark)">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="${canonical}">
${alternates.map(([hl, href]) => `<link rel="alternate" hreflang="${hl}" href="${href}">`).join("\n")}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="https://${DOMAIN}/assets/og.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${icon || "/assets/apple-touch-icon.png"}">
<script>${THEME_BOOT}</script>
<link rel="stylesheet" href="${CSS_URL}">
<script src="${JS_URL}" defer></script>
</head>
<body>
${monoSym}
<a class="skip" href="#main">${l === "ar" ? "تخطَّ إلى المحتوى" : "↓"}</a>`;
}

function header(l, langHrefs, home) {
  const t = T[l];
  return `<header class="hdr"><div class="wrap">
<a class="logo" href="${home}" aria-label="AMR Systems">${mono("", false)}<span>Systems</span></a>
<span class="sp"></span>
<a class="nav-link" href="${home}#products">${esc(t.nav_products)}</a>
<details class="dd"><summary aria-label="${esc(t.language)}"><span class="flag" aria-hidden="true">${FLAGS[l]}</span>${l.toUpperCase()}</summary>
<div class="dd-menu">${LANGS.map((x) => `<a href="${langHrefs[x]}" hreflang="${x}" lang="${x}" data-lang-set="${x}"${x === l ? ' aria-current="true"' : ""}><span class="flag" aria-hidden="true">${FLAGS[x]}</span>${esc(T[x].lang_name)}</a>`).join("")}</div></details>
<details class="dd"><summary aria-label="${esc(t.theme)}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg></summary>
<div class="dd-menu">${["auto", "light", "dark"].map((x) => `<button type="button" data-theme-set="${x}">${esc(t["theme_" + x])}</button>`).join("")}</div></details>
</div></header>`;
}

function footer(l) {
  const t = T[l];
  return `<footer class="ftr"><div class="wrap">${mono("", false)}<span>© ${new Date().getUTCFullYear()} AMR Systems. ${esc(t.footer)}</span>
<nav aria-label="${esc(t.nav_all)}">${products.map((p) => `<a href="${productPath(p.slug, l)}">${esc(p.name)}</a>`).join("")}</nav>
</div></footer>
</body></html>
`;
}

const badge = (s, l) => `<span class="badge ${esc(s)}">${esc(T[l]["status_" + s] || s)}</span>`;
const iconImg = (p, size, cls = "") => `<img${cls ? ` class="${cls}"` : ""} src="${esc(p.icon)}" alt="" width="${size}" height="${size}" decoding="async">`;

function portalPage(l) {
  const t = T[l];
  const langHrefs = Object.fromEntries(LANGS.map((x) => [x, portalPath(x)]));
  const alternates = LANGS.map((x) => [x, portalUrl(x)]).concat([["x-default", portalUrl("ru")]]);
  return (
    head({ l, title: t.title, desc: t.meta, canonical: portalUrl(l), alternates }) +
    header(l, langHrefs, portalPath(l)) +
    `<main id="main">
<section class="hero"><div class="wrap">
${mono("mono")}
<div class="kicker">${esc(t.hero_kicker)}</div>
<h1>${esc(t.hero_title)}</h1>
<p class="lead">${esc(t.hero_sub)}</p>
<a class="btn btn-p" href="#products">${esc(t.hero_cta)}</a>
</div></section>
<section id="products"><div class="wrap">
<h2>${esc(t.products_title)}</h2>
<p class="sub">${esc(t.products_sub)}</p>
<div class="grid">
${products
  .map((p) => {
    const x = text(p, l);
    return `<a class="card" href="${productPath(p.slug, l)}">${iconImg(p, 64)}<div><h3>${esc(p.name)} ${badge(p.status, l)}</h3><p>${esc(x.tagline)}</p></div>${chevron}</a>`;
  })
  .join("\n")}
</div></div></section>
<section><div class="wrap">
<h2>${esc(t.principles_title)}</h2>
<div class="prin" data-mt>
${[1, 2, 3].map((i) => `<div class="pi"><i></i><b>${esc(t["p" + i + "_t"])}</b><p>${esc(t["p" + i + "_d"])}</p></div>`).join("\n")}
</div></div></section>
</main>` +
    footer(l)
  );
}

function productPage(p, l) {
  const t = T[l];
  const x = text(p, l);
  const langHrefs = Object.fromEntries(LANGS.map((y) => [y, productPath(p.slug, y)]));
  const alternates = LANGS.map((y) => [y, productUrl(p.slug, y)]).concat([["x-default", productUrl(p.slug, "ru")]]);
  const app = safeUrl(p.app_url);
  const demo = safeUrl(p.demo_url);
  const usable = app && (p.status === "live" || p.status === "demo");
  const acts = usable
    ? `<div class="acts">
<a class="btn btn-p" href="${esc(app)}" rel="noopener">${esc(t.open)}</a>
${p.pwa ? `<a class="btn btn-s" href="${esc(installHref(app))}" rel="noopener">${esc(t.install)}</a>` : ""}
${demo ? `<a class="btn btn-g" href="${esc(demo)}" rel="noopener">${esc(t.demo)}</a>` : ""}
</div>`
    : `<p class="note">${esc(p.status === "dev" ? t.not_ready_dev : t.not_ready_soon)}</p>`;
  const steps = (x.steps || []).filter(Boolean);
  const imgs = (p.steps_images || []);
  return (
    head({ l, title: `${p.name} — ${x.tagline}`, desc: x.description, canonical: productUrl(p.slug, l), alternates, icon: p.icon }) +
    header(l, langHrefs, portalPath(l)) +
    `<main id="main">
<section class="phero"><div class="wrap"><div class="anchor">
${mono("wm", false)}
<div class="top">${iconImg(p, 88, "ic")}<div><h1>${esc(p.name)}</h1>${badge(p.status, l)}</div></div>
<p class="tag">${esc(x.tagline)}</p>
<p class="desc">${esc(x.description)}</p>
${acts}
${x.note ? `<p class="note" data-mt>${esc(x.note)}</p>` : ""}
</div></div></section>
${
  steps.length
    ? `<section><div class="wrap"><h2>${esc(t.how_title)}</h2>
<ol class="steps${imgs.length ? " has-img" : ""}" data-mt>
${steps.map((s, i) => `<li><span>${esc(s)}</span>${imgs[i] ? `<img src="${esc(imgs[i])}" alt="" loading="lazy" decoding="async" width="300" height="600">` : ""}</li>`).join("\n")}
</ol></div></section>`
    : ""
}
${
  (x.features || []).length
    ? `<section><div class="wrap"><h2>${esc(t.features_title)}</h2>
<div class="feats" data-mt>${x.features.map((f) => `<div>${esc(f)}</div>`).join("")}</div></div></section>`
    : ""
}
${
  usable && p.pwa
    ? `<section id="install"><div class="wrap"><h2>${esc(t.install_title)}</h2>
<div class="inst" data-mt><div><b>${esc(t.install_android_t)}</b><p>${esc(t.install_android)}</p></div><div><b>${esc(t.install_ios_t)}</b><p>${esc(t.install_ios)}</p></div></div>
<p class="sub" data-mt>${esc(t.install_note)}</p>
<a class="btn btn-p" href="${esc(app)}" rel="noopener">${esc(t.open)} ${esc(p.name)}</a>
</div></section>`
    : ""
}
<section><div class="wrap"><a class="back" href="${portalPath(l)}#products">${esc(t.back)}</a></div></section>
</main>` +
    footer(l)
  );
}

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

export function build() {
  rmSync(OUT, { recursive: true, force: true });
  cpSync(join(ROOT, "public"), OUT, { recursive: true });
  write(join(OUT, CSS_URL), css);
  write(join(OUT, JS_URL), js);
  for (const l of LANGS) {
    write(join(OUT, "site", langPath(l), "index.html"), portalPage(l));
    for (const p of products) write(join(OUT, "site", langPath(l), p.slug, "index.html"), productPage(p, l));
  }
  write(join(OUT, "404.html"), portalPage("ru").replace("<h1>", "<h1>404 · ").replace(' data-root', ""));
  write(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: https://${DOMAIN}/sitemap.xml\n`);
  const urls = LANGS.flatMap((l) => [portalUrl(l), ...products.map((p) => productUrl(p.slug, l))]);
  write(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${u}</loc></url>`).join("\n")}\n</urlset>\n`);
  writeVercel();
  return { pages: LANGS.length * (1 + products.length), products: products.map((p) => p.slug) };
}

// vercel.json: все страницы -> /site/. Заголовки безопасности и CSP.
export function vercelConfig() {
  const csp = [
    "default-src 'self'",
    `script-src 'self' '${THEME_BOOT_HASH}'`,
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
  const PAGE = "/:path((?!assets/|site/)[^.]*)";
  return {
    $schema: "https://openapi.vercel.sh/vercel.json",
    framework: null,
    buildCommand: "node scripts/build.mjs",
    installCommand: "",
    outputDirectory: "dist",
    trailingSlash: true,
    redirects: [
      { source: "/ru/:path*", destination: "/:path*", permanent: true },
      { source: "/tj/:path*", destination: "/tg/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host", value: `www.${DOMAIN}` }], destination: `https://${DOMAIN}/:path*`, permanent: true }],
    rewrites: [
      { source: PAGE, destination: "/site/:path" },
    ],
    headers: [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      { source: "/assets/site.(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ],
  };
}

function writeVercel() {
  writeFileSync(join(ROOT, "vercel.json"), JSON.stringify(vercelConfig(), null, 2) + "\n");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const r = build();
  console.log(`Готово: ${r.pages} страниц, продукты: ${r.products.join(", ")}`);
}
