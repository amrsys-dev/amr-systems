// Проверки реестра и сборки: node --test scripts/build.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { build, vercelConfig, esc } from "./build.mjs";

const LANGS = ["ru", "en", "ar", "uz", "tg"];
const reg = JSON.parse(readFileSync(new URL("../products.json", import.meta.url)));
const ui = JSON.parse(readFileSync(new URL("../i18n.json", import.meta.url)));

test("реестр: поля, статусы, все 5 языков", () => {
  const slugs = new Set();
  for (const p of reg.products) {
    assert.match(p.slug, /^[a-z][a-z0-9-]{1,30}$/);
    assert.ok(!slugs.has(p.slug), "повтор slug " + p.slug); slugs.add(p.slug);
    assert.ok(["live", "demo", "dev", "soon"].includes(p.status), p.slug);
    if (p.app_url) assert.match(p.app_url, /^https:\/\//);
    if (p.status === "live") assert.ok(p.app_url, p.slug + ": live без app_url");
    assert.ok(existsSync(new URL("../public" + p.icon, import.meta.url)), "нет иконки " + p.icon);
    for (const l of LANGS) {
      const t = p.i18n[l];
      assert.ok(t && t.tagline && t.description, `${p.slug}/${l}`);
      assert.equal((t.steps || []).length, (p.i18n.ru.steps || []).length, `${p.slug}/${l}: шаги`);
    }
  }
});

test("интерфейс: одинаковые ключи во всех языках", () => {
  const keys = Object.keys(ui.ru).sort();
  for (const l of LANGS) assert.deepEqual(Object.keys(ui[l]).sort(), keys, l);
  assert.equal(ui.ar.dir, "rtl");
});

test("сборка: все страницы, без внешних скриптов", () => {
  const r = build();
  assert.equal(r.pages, LANGS.length * (1 + reg.products.filter((p) => !p.hidden).length));
  for (const l of LANGS) {
    const dir = l === "ru" ? "" : l + "/";
    const html = readFileSync(new URL(`../dist/site/${dir}index.html`, import.meta.url), "utf8");
    assert.ok(!/<script[^>]+src="https?:/.test(html));
    assert.ok(html.includes(`lang="${l}"`));
    assert.ok(!/ style="/.test(html), "inline style запрещён CSP");
  }
});

test("vercel.json совпадает со сборкой и содержит CSP", () => {
  const saved = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url)));
  assert.deepEqual(saved, JSON.parse(JSON.stringify(vercelConfig())));
  const h = saved.headers[0].headers.map((x) => x.key);
  for (const k of ["Content-Security-Policy", "Strict-Transport-Security", "X-Content-Type-Options"]) assert.ok(h.includes(k));
});

test("экранирование", () => {
  assert.equal(esc(`<a href="x">'`), "&lt;a href=&quot;x&quot;&gt;&#39;");
});
