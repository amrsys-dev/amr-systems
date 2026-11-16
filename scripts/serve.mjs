// Локальный просмотр dist/ с теми же правилами, что на Vercel: / -> /site/, /p/<slug>/ как есть.
// Запуск: node scripts/serve.mjs [порт]
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const DIST = join(fileURLToPath(new URL("..", import.meta.url)), "dist");
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".txt": "text/plain", ".xml": "application/xml" };
const port = Number(process.argv[2] || 4173);

createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (!/^\/(assets|p|site)\//.test(p) && !extname(p)) p = "/site" + p;
  let f = normalize(join(DIST, p));
  if (!f.startsWith(DIST)) { res.writeHead(400); return res.end(); }
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f)) { res.writeHead(404, { "content-type": TYPES[".html"] }); return res.end(readFileSync(join(DIST, "404.html"))); }
  res.writeHead(200, { "content-type": TYPES[extname(f)] || "application/octet-stream" });
  res.end(readFileSync(f));
}).listen(port, () => console.log(`http://localhost:${port}/`));
