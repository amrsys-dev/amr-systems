// AMR portal: тема, язык, ссылки на превью. Без зависимостей.
(function () {
  var root = document.documentElement;
  var LANGS = ["ru", "en", "ar", "uz", "tg"];

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  // Тема: auto / light / dark
  function applyTheme(t) {
    if (t === "light" || t === "dark") root.setAttribute("data-theme", t); else root.removeAttribute("data-theme");
    var dark = t === "dark" || (t !== "light" && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", dark ? "#0D1713" : "#F4F7F3");
    document.querySelectorAll("[data-theme-set]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-theme-set") === (t || "auto"))); });
  }
  applyTheme(store("amr-theme") || "auto");
  document.querySelectorAll("[data-theme-set]").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-theme-set"); store("amr-theme", t); applyTheme(t);
      var d = b.closest("details"); if (d) d.open = false;
    });
  });

  // Запомнить выбранный язык
  document.querySelectorAll("[data-lang-set]").forEach(function (a) {
    a.addEventListener("click", function () { store("amr-lang", a.getAttribute("data-lang-set")); });
  });

  // Закрыть меню по клику вне
  document.addEventListener("click", function (e) {
    document.querySelectorAll("details.dd[open]").forEach(function (d) { if (!d.contains(e.target)) d.open = false; });
  });

  // На превью (не amrsys.net) ссылки на поддомены ведут на локальные пути
  var host = location.hostname;
  if (!/(^|\.)amrsys\.net$/.test(host)) {
    document.querySelectorAll("a[data-local]").forEach(function (a) { a.setAttribute("href", a.getAttribute("data-local")); });
  }

  // Корень сайта: если язык сохранён или браузер на другом языке — перейти
  var lang = root.getAttribute("lang");
  if (root.hasAttribute("data-root") && lang === "ru") {
    var saved = store("amr-lang");
    var want = saved;
    if (!want) {
      var nav = (navigator.language || "ru").slice(0, 2).toLowerCase();
      if (nav === "tj") nav = "tg";
      want = LANGS.indexOf(nav) > 0 ? nav : null;
    }
    if (want && want !== "ru" && LANGS.indexOf(want) > 0) location.replace(want + "/");
  }
})();
