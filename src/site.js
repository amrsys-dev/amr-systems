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
    if (m && !root.classList.contains("home")) m.setAttribute("content", dark ? "#0D1713" : "#F4F7F3");
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
    if (want && want !== "ru" && LANGS.indexOf(want) > 0) location.replace("/" + want + location.pathname);
  }
})();

// Showcase: swipe by finger, tabs underneath, auto-advance that stops when you touch it.
(function () {
  var sc = document.querySelector("[data-sc]");
  if (!sc) return;
  var track = sc.querySelector(".sc-track");
  var tabs = [].slice.call(sc.querySelectorAll(".sc-tabs button"));
  var n = tabs.length, cur = 0, timer = null, idleUntil = 0;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rtl = document.documentElement.dir === "rtl";
  function go(i, smooth) {
    cur = (i + n) % n;
    var w = track.clientWidth;
    track.scrollTo({ left: (rtl ? -1 : 1) * cur * w, behavior: smooth === false ? "auto" : "smooth" });
    mark();
  }
  function mark() { tabs.forEach(function (b, k) { b.setAttribute("aria-selected", String(k === cur)); }); }
  function hold() { idleUntil = Date.now() + 9000; }
  tabs.forEach(function (b, k) { b.addEventListener("click", function () { hold(); go(k); }); });
  var t;
  track.addEventListener("scroll", function () {
    clearTimeout(t);
    t = setTimeout(function () { var i = Math.round(Math.abs(track.scrollLeft) / track.clientWidth); if (i !== cur) { cur = i; mark(); } }, 80);
  }, { passive: true });
  ["pointerdown", "touchstart", "wheel", "mouseenter"].forEach(function (e) { sc.addEventListener(e, hold, { passive: true }); });
  if (!reduce) timer = setInterval(function () { if (Date.now() > idleUntil && !document.hidden) go(cur + 1); }, 5000);
})();
