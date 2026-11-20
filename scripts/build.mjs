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

function head({ l, title, desc, canonical, alternates, icon, home = false }) {
  const t = T[l];
  return `<!doctype html>
<html lang="${HTML_LANG[l]}" dir="${t.dir}"${home ? ' class="home"' : ""}${l === "ru" ? " data-root" : ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
${home ? '<meta name="theme-color" content="#050A10">' : `<meta name="theme-color" content="#F4F7F3" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0D1713" media="(prefers-color-scheme: dark)">`}
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

function header(l, langHrefs, home, isHome = false) {
  const t = T[l];
  return `<header class="hdr"><div class="wrap">
<a class="logo" href="${home}" aria-label="AMR Systems">${mono("", false)}<span>Systems</span></a>
<span class="sp"></span>
${isHome ? `<a class="nav-link" href="#eco">${esc(t.nav_eco)}</a><a class="nav-link" href="#id">${esc(t.nav_id)}</a><a class="nav-link" href="#show">${esc(t.nav_how)}</a>` : ""}<a class="nav-link" href="${home}#products">${esc(t.nav_products)}</a>
<details class="dd"><summary aria-label="${esc(t.language)}"><span class="flag" aria-hidden="true">${FLAGS[l]}</span>${l.toUpperCase()}</summary>
<div class="dd-menu">${LANGS.map((x) => `<a href="${langHrefs[x]}" hreflang="${x}" lang="${x}" data-lang-set="${x}"${x === l ? ' aria-current="true"' : ""}><span class="flag" aria-hidden="true">${FLAGS[x]}</span>${esc(T[x].lang_name)}</a>`).join("")}</div></details>
${isHome ? `<a class="login" href="https://self.amrsys.net" rel="noopener">${esc(t.login)}</a>` : `<details class="dd"><summary aria-label="${esc(t.theme)}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg></summary>
<div class="dd-menu">${["auto", "light", "dark"].map((x) => `<button type="button" data-theme-set="${x}">${esc(t["theme_" + x])}</button>`).join("")}</div></details>`}
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

const LIVE = ["self", "safar", "cutting", "bazar"];
const bySlug = (slug) => products.find((p) => p.slug === slug);

// Схема экосистемы: в центре AMR ID, слева производство, справа личное. Только SVG + CSS.
function ecoSvg(t) {
  const C = [320, 240];
  const ind = [["vision", 110, 92], ["constructor", 66, 240], ["cutting", 110, 388], [null, 262, 444]];
  const per = [["self", 530, 92], ["bazar", 574, 240], ["safar", 530, 388]];
  const link = (x, y, cls) => {
    const dx = x - C[0], dy = y - C[1], d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
    return `<path class="ln ${cls}" d="M${Math.round(C[0] + ux * 104)} ${Math.round(C[1] + uy * 104)}L${Math.round(x - ux * 44)} ${Math.round(y - uy * 44)}"/>`;
  };
  const node = (slug, x, y, cls) => {
    const p = slug && bySlug(slug);
    const name = p ? p.name : t.eco_reports;
    const inner = p
      ? `<clipPath id="c-${slug}"><rect x="${x - 28}" y="${y - 28}" width="56" height="56" rx="14"/></clipPath><image href="${esc(p.icon)}" x="${x - 28}" y="${y - 28}" width="56" height="56" clip-path="url(#c-${slug})"/>`
      : `<g class="doc" transform="translate(${x - 16} ${y - 20})"><path d="M0 0h22l10 10v30H0z"/><path d="M22 0v10h10M7 18h18M7 26h18M7 33h11"/></g>`;
    const body = `<circle cx="${x}" cy="${y}" r="40"/>${inner}<text x="${x}" y="${y + 60}" text-anchor="middle">${esc(name)}</text>`;
    return p ? `<a class="nd ${cls}" href="${productPath(slug, t.__l)}">${body}</a>` : `<g class="nd ${cls}">${body}</g>`;
  };
  return `<svg class="eco" viewBox="0 0 640 520" role="img" aria-label="${esc(t.eco_aria)}">
<defs><linearGradient id="idg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F28A32"/><stop offset=".5" stop-color="#FFD29A"/><stop offset="1" stop-color="#00BFFF"/></linearGradient></defs>
<text class="grp" x="110" y="26" text-anchor="middle" fill="#F28A32">${esc(t.eco_prod)}</text><text class="grp" x="530" y="26" text-anchor="middle" fill="#00BFFF">${esc(t.eco_pers)}</text>
<path class="ln cu" d="M110 92C40 140 40 190 66 240"/><path class="ln cu" d="M66 240C40 300 60 350 110 388"/><path class="ln cu" d="M110 388C150 440 200 450 262 444"/>
<path class="ln bl" d="M530 92C600 140 600 190 574 240"/><path class="ln bl" d="M574 240C600 300 580 350 530 388"/>
${ind.map(([s, x, y]) => link(x, y, "cu")).join("")}${per.map(([s, x, y]) => link(x, y, "bl")).join("")}
<circle class="core" cx="320" cy="240" r="100"/><circle class="idr" cx="320" cy="240" r="100" stroke="url(#idg)"/>
<image href="/assets/home/amr-512.webp" x="226" y="205" width="188" height="69"/>
<text class="idl" x="320" y="306" text-anchor="middle">${esc(t.eco_id)}</text>
${ind.map(([s, x, y]) => node(s, x, y, "cu")).join("")}${per.map(([s, x, y]) => node(s, x, y, "bl")).join("")}
</svg>`;
}

const ICON = {
  b1: '<path d="M27 3 9 27h13l-2 18 19-26H25z"/>',
  b2: '<circle cx="22" cy="25" r="17"/><circle cx="22" cy="25" r="8"/><path d="m22 25 18-18m-9 0h9v9"/>',
  b3: '<path d="m24 4 19 10-19 10L5 14zM5 24l19 10 19-10M5 34l19 10 19-10"/>',
  b4: '<path d="M24 3 42 10v12c0 11-8 19-18 23C14 41 6 33 6 22V10z"/><path d="m15 24 6 6 13-14"/>',
};
const IDI = [
  '<rect x="10" y="20" width="28" height="22" rx="4"/><path d="M16 20v-6a8 8 0 0 1 16 0v6M24 29v5"/>',
  '<path d="M6 8h14v14H6zM28 8h14v14H28zM6 28h14v14H6z"/><path d="M28 28h6v6h-6zM38 36h4v6h-4zM28 38h6v4"/>',
  '<path d="M24 4 41 11v12c0 10-7 18-17 21C14 41 7 33 7 23V11z"/><path d="M17 23l5 5 10-10"/>',
  '<circle cx="24" cy="24" r="17"/><path d="M24 14v10l7 5"/>',
];
const waves = () => {
  let s = "";
  for (let i = 0; i < 8; i++) s += `<path class="${i % 2 ? "s" : "c"}" d="M0 ${100 + i * 6}C300 ${40 + i * 10} 600 ${150 - i * 4} 900 ${90 + i * 5}S1300 ${30 + i * 8} 1600 ${80 + i * 6}"/>`;
  return `<svg class="h-waves" viewBox="0 0 1600 160" preserveAspectRatio="none" aria-hidden="true">${s}</svg>`;
};

function portalPage(l) {
  const t = { ...T[l], __l: l };
  const langHrefs = Object.fromEntries(LANGS.map((x) => [x, portalPath(x)]));
  const alternates = LANGS.map((x) => [x, portalUrl(x)]).concat([["x-default", portalUrl("ru")]]);
  const live = LIVE.map(bySlug).filter(Boolean);
  const soon = products.filter((p) => !LIVE.includes(p.slug));
  return (
    head({ l, title: t.title, desc: t.meta, canonical: portalUrl(l), alternates, home: true }) +
    header(l, langHrefs, portalPath(l), true) +
    `<main id="main">
<section class="h-hero" id="eco"><div class="wrap"><div>
<p class="eyebrow">${esc(t.home_eyebrow)}</p>
<h1>${esc(t.home_t1)} <span>${esc(t.home_t2)}</span></h1>
<p class="h-lead">${esc(t.home_lead)}</p>
<div class="h-acts"><a class="hb hb-p" href="#products">${esc(t.home_cta)}</a><a class="hb hb-s" href="#show">${esc(t.home_watch)}</a></div>
<p class="h-pf"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2"/></svg><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="13" rx="1"/><path d="M8 21h8m-4-4v4"/></svg><span>${esc(t.home_pwa)}</span></p>
</div>
<div>${ecoSvg(t)}</div>
</div>${waves()}</section>
<section class="h-ben"><div class="wrap">
${[1, 2, 3, 4].map((i) => `<div class="hbn"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">${ICON["b" + i]}</svg><div><b>${esc(t["b" + i + "_t"])}</b><small>${esc(t["b" + i + "_d"])}</small></div></div>`).join("\n")}
</div></section>
<section class="h-sec h-id" id="id"><div class="wrap h-id-in">
<div><span class="kick kick-s">${esc(t.id_kicker)}</span><h2>${esc(t.id_title)}</h2><p class="h-id-sub">${esc(t.id_sub)}</p>
<ul class="h-id-list">${[1, 2, 3, 4].map((i) => `<li><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IDI[i - 1]}</svg><div><b>${esc(t["id" + i + "_t"])}</b><p>${esc(t["id" + i + "_d"])}</p></div></li>`).join("")}</ul>
<a class="hb hb-p" href="https://self.amrsys.net" rel="noopener">${esc(t.band_cta)}</a></div>
<div class="h-id-ph"><div class="phn phn-s"><div class="scr"><img class="on" src="/assets/home/id-phone.webp" alt="${esc(t.screen_of)}: AMR ID" width="540" height="1170" loading="lazy" decoding="async"></div></div></div>
</div></section>
<section class="h-sec h-show" id="show"><div class="wrap">
<div class="h-sh"><span class="kick">${esc(t.show_kicker)}</span><h2>${esc(t.show_title)}</h2><p>${esc(t.show_sub)}</p></div>
<div class="dev" data-anim><div class="lap"><div class="scr">${live.map((p, i) => `<img src="/assets/home/${p.slug}-desk.webp" alt="${esc(t.screen_of)}: ${esc(p.name)}" width="1280" height="800" decoding="async"${i ? ' loading="lazy"' : ""}>`).join("")}</div></div>
<div class="phn"><div class="scr">${live.map((p, i) => `<img src="/assets/home/${p.slug}-phone.webp" alt="" width="540" height="1170" decoding="async"${i ? ' loading="lazy"' : ""}>`).join("")}</div></div></div>
<div class="h-tabs" aria-hidden="true">${live.map((p) => `<span><img src="${esc(p.icon)}" alt="" width="28" height="28">${esc(p.name)}</span>`).join("")}</div>
</div></section>
<section class="h-sec" id="products"><div class="wrap">
<div class="h-sh"><span class="kick">${esc(t.prod_kicker)}</span><h2>${esc(t.prod_title)}</h2><p>${esc(t.prod_sub)}</p></div>
<div class="h-grid">
${live
  .map((p) => {
    const x = text(p, l);
    return `<a class="pc pc-${p.slug}" href="${productPath(p.slug, l)}"><div class="shot"><img src="/assets/home/${p.slug}-phone.webp" alt="${esc(t.screen_of)}: ${esc(p.name)}" width="540" height="1170" loading="lazy" decoding="async"></div><div class="cb"><div class="ct">${iconImg(p, 34)}<b>${esc(p.name)}</b></div><p>${esc(x.tagline)}</p><span class="go">${esc(t.more)} →</span></div></a>`;
  })
  .join("\n")}
</div>
<div class="h-soon">
${soon.map((p) => `<a class="sn" href="${productPath(p.slug, l)}">${iconImg(p, 42)}<div><b>${esc(p.name)}</b><small>${esc(text(p, l).tagline)}</small></div><em>${esc(t["status_" + p.status] || p.status)}</em></a>`).join("\n")}
</div>
<div class="h-band"><div><b>${esc(t.band_title)}</b><p>${esc(t.band_text)}</p></div><a class="hb hb-p" href="https://self.amrsys.net" rel="noopener">${esc(t.band_cta)}</a></div>
</div></section>
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
