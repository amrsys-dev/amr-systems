# AMR Systems — портал amrsys.net и страницы продуктов

Статический сайт без зависимостей. Брендбук: `docs/brand/AMR_Design_System_Brandbook_v1.2.md` (разделы 25–26).

## Адреса
| Адрес | Что это |
|---|---|
| `amrsys.net` | Портал: приветствие и витрина всех продуктов |
| `amrsys.net/<slug>/` | Страница продукта: описание, как работает, открыть / установить |
| `<slug>.amrsys.net` | Само приложение (PWA) — отдельный проект Vercel, ставится на телефон |

Языки: ru (корень `/`), en, ar (RTL), uz, tg — `/en/`, `/ar/`, `/uz/`, `/tg/`.

## Как добавить или изменить продукт
Всё в одном файле — `products.json` (единый реестр для всех сессий разработки).
1. Добавить запись: `slug` (= поддомен), `name`, `status` (`live`, `demo`, `dev`, `soon`), `app_url`, `icon`, тексты на 5 языках.
2. Иконку положить в `public/assets/icons/` (WebP 256 px или SVG).
3. Скриншоты шагов — WebP до 720 px в `public/assets/<slug>/`, пути в `steps_images`.
4. `node scripts/build.mjs` — пересоберёт страницы и `vercel.json` (правила поддоменов).
5. `node --test scripts/build.test.mjs` — проверки. Коммит вместе с `vercel.json`.
6. Приложению — домен `<slug>.amrsys.net` в его проекте Vercel. DNS: в Cloudflare одна запись `*` → `cname.vercel-dns.com` (без прокси) покрывает все поддомены.

## Просмотр
`node scripts/build.mjs && node scripts/serve.mjs` → http://localhost:4173/ (продукт: `/<slug>/`).

## Бренд
`brand/monogram/` — главная монограмма (чистый набор + утверждённый SVG), `brand/social/` — официальные значки соцсетей (Simple Icons, CC0).
