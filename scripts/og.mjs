// Link-preview pictures (og:image, 1200x630) and site icons, rendered with headless Chrome.
// Run by hand after changing texts/design: node scripts/build.mjs && node scripts/og.mjs
// Output: public/assets/og/<page>-<lang>.jpg, public/assets/icon-*.png, public/favicon.svg stays as fallback.
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const PUB = join(ROOT, "public");
const OUT = join(PUB, "assets/og");
const TMP = "/tmp/amr-og";
mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });
const { products } = JSON.parse(readFileSync(join(ROOT, "products.json"), "utf8"));
const LANGS = ["ru", "en", "ar", "uz", "tg"];
const only = process.argv.slice(2);

// Short hooks for the picture (the long texts stay in the page meta).
const HOOK = {
  home: {
    ru: ["Приложения для работы", "и жизни", "Один AMR ID - все приложения экосистемы"],
    en: ["Apps for work", "and life", "One AMR ID - every app of the ecosystem"],
    ar: ["تطبيقات للعمل", "وللحياة", "حساب AMR ID واحد لكل التطبيقات"],
    uz: ["Ish va hayot uchun", "ilovalar", "Bitta AMR ID - barcha ilovalar"],
    tg: ["Барномаҳо барои кор", "ва зиндагӣ", "Як AMR ID - ҳамаи барномаҳо"],
  },
  id: { ru: ["Один контакт", "на всю жизнь"], en: ["One contact", "for life"], ar: ["جهة اتصال واحدة", "مدى الحياة"], uz: ["Butun umrga", "bitta kontakt"], tg: ["Як тамос", "барои тамоми умр"] },
  self: { ru: ["Деньги, планы и машина", "в одном телефоне"], en: ["Money, plans and car", "in one phone"], ar: ["المال والخطط والسيارة", "في هاتف واحد"], uz: ["Pul, rejalar va mashina", "bitta telefonda"], tg: ["Пул, нақшаҳо ва мошин", "дар як телефон"] },
  safar: { ru: ["Такси межгород и до границы", "за секунды"], en: ["Intercity and border taxi", "in seconds"], ar: ["تاكسي بين المدن وإلى الحدود", "خلال ثوانٍ"], uz: ["Shaharlararo va chegaragacha taksi", "soniyalarda"], tg: ["Таксии байнишаҳрӣ ва то сарҳад", "дар чанд сония"] },
  cutting: { ru: ["Раскрой за минуты", "меньше отходов"], en: ["Cutting maps in minutes", "less waste"], ar: ["خرائط القص بدقائق", "هدر أقل"], uz: ["Bichish bir necha daqiqada", "kamroq chiqindi"], tg: ["Буриш дар чанд дақиқа", "партови камтар"] },
  bazar: { ru: ["Своя витрина за 5 минут", "заказы в WhatsApp"], en: ["Your shop in 5 minutes", "orders in WhatsApp"], ar: ["متجرك في 5 دقائق", "الطلبات عبر واتساب"], uz: ["Oʻz vitrinangiz 5 daqiqada", "buyurtmalar WhatsApp’da"], tg: ["Витринаи худ дар 5 дақиқа", "фармоишҳо дар WhatsApp"] },
  constructor: { ru: ["Кухня в 3D", "прямо при клиенте"], en: ["A kitchen in 3D", "right with the client"], ar: ["مطبخ ثلاثي الأبعاد", "أمام العميل مباشرة"], uz: ["Oshxona 3D’da", "mijoz oldida"], tg: ["Ошхона дар 3D", "дар назди мизоҷ"] },
  vision: { ru: ["3D-модель в детали", "и порядок сборки"], en: ["3D model into parts", "and assembly order"], ar: ["نموذج ثلاثي الأبعاد إلى قطع", "وترتيب التجميع"], uz: ["3D model - detallar", "va yigʻish tartibi"], tg: ["Модели 3D ба қисмҳо", "ва тартиби васл"] },
  hub: { ru: ["Заявки из Telegram", "и WhatsApp в одном месте"], en: ["Requests from Telegram", "and WhatsApp in one place"], ar: ["طلبات تيليجرام", "وواتساب في مكان واحد"], uz: ["Telegram va WhatsApp", "arizalari bir joyda"], tg: ["Дархостҳо аз Telegram", "ва WhatsApp дар як ҷо"] },
};
const DOMAIN = { id: "id.amrsys.net", self: "self.amrsys.net", safar: "safar.amrsys.net", cutting: "cut.amrsys.net", bazar: "bazar.amrsys.net" };
const PHONE = { id: "id", self: "self", safar: "safar", cutting: "cutting", bazar: "bazar" };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const ecoCss = readFileSync(join(ROOT, "src/site.css"), "utf8").split("\n").filter((l) => l.startsWith(".eco")).join("\n");

const BASE_CSS = `
*{box-sizing:border-box;margin:0}
html,body{width:1200px;height:630px;overflow:hidden;background:#050A10}
body{font-family:Inter,"DejaVu Sans",sans-serif;color:#EEF3F8;position:relative}
.bg{position:absolute;inset:0;background:
 radial-gradient(70% 90% at 78% 50%,color-mix(in srgb,var(--a) 30%,transparent),transparent 60%),
 radial-gradient(60% 80% at 0% 100%,rgba(242,138,50,.16),transparent 60%),
 linear-gradient(160deg,#07131E,#04080D 70%)}
.grid{position:absolute;inset:0;opacity:.13;background-image:linear-gradient(#5FB4FF 1px,transparent 1px),linear-gradient(90deg,#5FB4FF 1px,transparent 1px);background-size:40px 40px;-webkit-mask:radial-gradient(80% 90% at 70% 50%,#000,transparent 75%)}
.rim{position:absolute;inset:0;border:2px solid transparent;border-image:linear-gradient(90deg,#F28A32,#FFD29A 50%,#00BFFF) 1;opacity:.85}
.top{position:absolute;top:44px;inset-inline-start:64px;display:flex;align-items:center;gap:14px;font:700 17px Inter,sans-serif;letter-spacing:.28em;color:#AAB8C6}
.top img{height:30px}
.left{position:absolute;top:116px;inset-inline-start:64px;width:700px}
.app{display:flex;align-items:center;gap:22px;margin-bottom:26px}
.app img{width:104px;height:104px;border-radius:26px;box-shadow:0 0 0 2px color-mix(in srgb,var(--a) 70%,transparent),0 18px 40px -10px color-mix(in srgb,var(--a) 80%,transparent)}
.app b{font:800 52px Inter,sans-serif;letter-spacing:-.01em}
h1{font:800 50px/1.1 Inter,"DejaVu Sans",sans-serif;letter-spacing:-.02em}
h1 em{font-style:normal;background:linear-gradient(90deg,var(--a),#FFD29A);-webkit-background-clip:text;color:transparent}
.chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px;max-height:100px;overflow:hidden}
.chips span{font:600 18px Inter,"DejaVu Sans",sans-serif;padding:9px 16px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);color:#DCE6EF}
.foot{position:absolute;bottom:30px;inset-inline-start:64px;font:700 22px Inter,sans-serif;color:var(--a);display:flex;align-items:center;gap:12px}
.foot i{width:10px;height:10px;border-radius:50%;background:var(--a);box-shadow:0 0 12px var(--a)}
.phone{position:absolute;top:50px;inset-inline-end:90px;width:250px;height:542px;border-radius:40px;overflow:hidden;transform:rotate(-4deg);
 box-shadow:0 0 0 7px #11161C,0 0 0 9px #2A3440,0 30px 80px -10px color-mix(in srgb,var(--a) 70%,transparent),0 0 120px -20px var(--a)}
.phone img{width:100%;height:100%;object-fit:cover;object-position:top}
.big{position:absolute;top:135px;inset-inline-end:150px;width:360px;height:360px;border-radius:84px;box-shadow:0 0 0 3px color-mix(in srgb,var(--a) 70%,transparent),0 40px 120px -20px var(--a)}
[dir=rtl] .phone{transform:rotate(4deg)}
`;

function page(body, accent, l) {
  return `<!doctype html><html dir="${l === "ar" ? "rtl" : "ltr"}"><head><meta charset="utf-8"><base href="file://${PUB}/">
<style>:root{--a:${accent}}${BASE_CSS}${ecoCss}</style></head><body><div class="bg"></div><div class="grid"></div>${body}<div class="rim"></div></body></html>`;
}

const topBar = () => `<div class="top"><img src="assets/home/amr-512.webp" alt="">SYSTEMS</div>`;

function productCard(p, l) {
  const x = p.i18n[l] || p.i18n.en;
  const [h1, h2] = HOOK[p.slug][l];
  const chips = (x.features || []).slice(0, 3).map((f) => `<span>${esc(f)}</span>`).join("");
  const phone = Object.hasOwn(PHONE, p.slug);
  const right = phone ? `<div class="phone"><img src="assets/home/${PHONE[p.slug]}-phone.webp"></div>` : `<img class="big" src="${p.icon.slice(1)}">`;
  const dom = Object.hasOwn(DOMAIN, p.slug) ? DOMAIN[p.slug] : "amrsys.net";
  return page(
    `${topBar()}<div class="left"${phone ? "" : ' style="width:600px"'}><div class="app"><img src="${p.icon.slice(1)}"><b>${esc(p.name)}</b></div><h1>${esc(h1)}<br><em>${esc(h2)}</em></h1><div class="chips">${chips}</div></div>${right}<div class="foot"><i></i>${dom}</div>`,
    p.accent,
    l,
  );
}

function homeCard(l) {
  const html = readFileSync(join(ROOT, "dist/site", l === "ru" ? "" : l, "index.html"), "utf8");
  let eco = html.match(/<svg class="eco"[\s\S]*?<\/svg>/)[0].replace(/href="\/assets/g, 'href="assets');
  const [h1, h2, sub] = HOOK.home[l];
  return page(
    `${topBar()}<div class="left" style="width:520px;top:150px"><h1 style="font-size:60px">${esc(h1)}<br><em>${esc(h2)}</em></h1><p style="margin-top:26px;font:600 24px/1.35 Inter,'DejaVu Sans',sans-serif;color:#C4D0DC">${esc(sub)}</p></div>
<div style="position:absolute;top:14px;inset-inline-end:30px;width:620px;height:600px">${eco}</div><div class="foot"><i></i>amrsys.net</div>`,
    "#00BFFF",
    l,
  ).replace(".eco{", ".eco .pl{display:none}.eco{");
}

function shoot(html, out, w = 1200, h = 630, clear = false) {
  const f = join(TMP, "p.html");
  writeFileSync(f, html);
  execFileSync("google-chrome", ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", `--window-size=${w},${h}`, "--force-device-scale-factor=1", ...(clear ? ["--default-background-color=00000000"] : []), "--virtual-time-budget=3000", `--screenshot=${out}`, `file://${f}`], { stdio: "ignore" });
}

// Messengers (WhatsApp) skip big pictures: keep each card a small JPEG (~100 KB).
function card(html, name) {
  const png = join(TMP, "c.png");
  shoot(html, png);
  execFileSync("convert", [png, "-strip", "-quality", "84", "-sampling-factor", "4:2:0", join(OUT, name)]);
}
const want = (k) => !only.length || only.includes(k);
for (const l of LANGS) {
  if (want("home")) card(homeCard(l), `home-${l}.jpg`);
  for (const p of products) if (want(p.slug) && Object.hasOwn(HOOK, p.slug)) card(productCard(p, l), `${p.slug}-${l}.jpg`);
}

// Site icon: dark tile, gold-to-blue ring, the AMR mark large in the middle.
if (want("icon")) {
  const icon = (s, full) => `<!doctype html><html><head><base href="file://${PUB}/"><style>*{margin:0}html,body{width:${s}px;height:${s}px;background:transparent;overflow:hidden}
.t{position:absolute;inset:0;border-radius:${full ? 0 : s * 0.22}px;background:radial-gradient(90% 90% at 50% 30%,#123047,#060D15 70%);overflow:hidden}
.t::before{content:"";position:absolute;inset:${s * 0.035}px;border-radius:${s * 0.19}px;padding:${Math.max(1, s * 0.022)}px;background:linear-gradient(135deg,#F28A32,#FFD29A 50%,#00BFFF);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor}
.t::after{content:"";position:absolute;left:10%;right:10%;bottom:-20%;height:55%;background:radial-gradient(closest-side,rgba(0,191,255,.35),transparent)}
img{position:absolute;left:8%;width:84%;top:50%;transform:translateY(-50%);filter:drop-shadow(0 ${s * 0.02}px ${s * 0.04}px rgba(0,0,0,.6))}</style></head>
<body><div class="t"></div><img src="assets/home/amr-512.webp"></body></html>`;
  // apple-touch-icon is a full square (iOS rounds it itself), the others have their own rounded corners.
  for (const [s, name, full] of [[512, "icon-512.png"], [192, "icon-192.png"], [180, "apple-touch-icon.png", true], [48, "icon-48.png"]]) {
    shoot(icon(s, full), join(PUB, "assets", name), s, s, !full);
  }
}
rmSync(TMP, { recursive: true, force: true });
console.log("og: done");
