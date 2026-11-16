# AMR Design System & Brandbook v1.2

**Master specification for Brand, UX/UI, Themes, Graphics and
Performance**\
**Master language:** English \| **Status:** Design and engineering
handoff baseline

## 0. Purpose and authority

AMR Design System (AMR DS) is the single source of truth for visual
identity, interaction patterns, themes, graphic assets, accessibility
and performance across the AMR ecosystem. This is a design
specification, not permission to edit existing application code. Product
engineers implement approved specifications in their own repositories
and branches.

### Core principles

1.  Clarity before decoration.
2.  One interaction system, multiple visual appearances.
3.  Lightweight by default; no theme may slow down the application.
4.  Modular products may operate independently and connect through
    explicit integration contracts.
5.  Responsive mobile, tablet and desktop layouts; PWA support where
    applicable.
6.  The original AMR monogram geometry is immutable.
7.  Interface languages: English (`en`), Russian (`ru`), Arabic (`ar`, RTL), Uzbek (`uz`) and Tajik (`tg`).

## 1. Brand identity

### AMR monogram --- locked asset

-   Use only the approved original AMR monogram artwork.
-   Preserve exact letter geometry, proportions, spacing, joins and
    silhouette.
-   Never redraw, retype, stretch, skew, crop, simplify, frame or alter
    its shape.
-   Permitted changes: colour, material finish, lighting and background.
-   Production master (owner-approved 2026-11-16): the clean high-resolution monogram set `brand/monogram/amr-*.png` (set "B") and the owner-approved path vector `brand/monogram/amr-monogram.svg` derived from it (silhouette overlap > 99%). See section 24.
-   Never use an AI-generated approximation as the production logo.

AMR should feel precise, calm, capable and adaptable. Product themes may
add personality but must not replace the common AMR identity.

### AMR monogram — immutable logo asset

The supplied connected a-m-R monogram is the AMR logo and its letterform identity. Its silhouette is fixed across every product, theme, mode and placement. Only colour, material finish, lighting and background may vary. The production masters are defined in section 24 (owner decision, 2026-11-16). The photo-cut PNG from the v1.1 package is a reference only and is not used in production because of edge artefacts. No font, CSS construction or AI redraw is permitted; the approved path SVG is the only vector.

## 2. Design foundations

### Typography

-   Primary: Inter.
-   Arabic: Noto Sans Arabic or Noto Kufi Arabic, selected after
    legibility testing.
-   Fallback: system sans-serif.
-   Display: 32--40 px Semibold; H1: 24--28 px Semibold; H2: 20--22 px
    Semibold; H3: 16--18 px Semibold; body: 16 px Regular (15 px only in dense tables); labels:
    13--14 px Medium; captions: 13 px. Absolute minimum for any readable text: 13 px.
-   Use tabular numerals for balances, prices, dates and measurements.
-   Do not shrink text to fit dense layouts. Arabic requires correct RTL
    direction and font metrics.

### Spacing and geometry

Use a 4 px scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. - Mobile page
gutter: 16 px; desktop: 24--32 px. - Standard card padding: 16 px;
compact: 12 px. - Controls: 44--48 px high; minimum touch target: 44 ×
44 px. - Card radius: 14--18 px; control radius: 10--14 px. - Avoid
excessive pill-shaped controls; reserve pills for tags, filters and
compact statuses.

### Layout

-   Mobile: one primary content column; no competing side panels.
-   Tablet: two columns only where useful.
-   Desktop: restrained content width and clear sidebar/navigation rail.
-   Primary actions must be predictable and never depend on hover.
-   Bottom navigation on compact mobile layouts for up to five primary
    destinations; sidebar or navigation rail on larger screens.

## 3. Base appearance modes: Light and Dark

Light and Dark are foundational modes, not decorative themes. Every
theme must support both unless a documented product exception exists.

### Existing AMR foundation palette

  Token              HEX       Role
  ------------------ --------- ---------------------------
  brand.emerald      #087A55   Primary AMR action
  brand.forest       #064B38   Deep brand surface
  brand.mint         #20C997   Secondary highlight
  brand.gold         #C9A44C   Restrained premium accent
  neutral.graphite   #17231F   Dark text/surface
  neutral.dark       #101714   Dark background
  neutral.light      #F6F8F7   Light background

Use semantic tokens: `color.bg`, `color.surface`,
`color.surface.elevated`, `color.text.primary`, `color.text.secondary`,
`color.border`, `color.action.primary`, `color.action.secondary`,
`color.accent`, `color.success`, `color.warning`, `color.danger`,
`color.focus`.

Light mode: neutral calm background, high-contrast dark text, subtle
card borders/shadows, accents reserved for actions and key data. Dark
mode: charcoal/graphite rather than pure black for large surfaces; clear
separation of cards and text; no large neon areas or excessively dim
secondary text. Status must never rely on colour alone; pair it with a
label or icon.

## 4. Theme architecture

AMR provides six theme families. Each supports Light and Dark modes.
Themes change tokens and optional decorative assets only; they never
change navigation, business logic, component behaviour or application
bundles. Theme switching must not reload the page or require a network
request.

### Six theme families

The palettes below are design targets and must be validated for contrast
in actual screens before release.

  -----------------------------------------------------------------------
  Theme ID          Name              Character         Main combination
  ----------------- ----------------- ----------------- -----------------
  emerald-saudi     Emerald Saudi     Professional,     Deep emerald +
                                      confident, warm   forest green +
                                                        sand/champagne
                                                        gold

  wood-metal        Wood & Metal      Craft, furniture, Dark walnut +
                                      premium           graphite +
                                      manufacturing     brushed metal +
                                                        pale champagne
                                                        gold

  carbon-red        Carbon Red        Technical,        Carbon black +
                                      automotive,       graphite +
                                      performance       restrained
                                                        crimson

  cream-lavender    Cream Lavender    Soft, calm,       Warm cream +
                                      creative          pearl +
                                                        lavender + muted
                                                        violet

  rose-champagne    Rose Champagne    Elegant, warm,    Dusty rose +
                                      distinctive       pearl + rose
                                                        metal + champagne

  digital           Digital           Creator or Gamer  One lightweight
                                      Tactical          family with two
                                                        selectable accent
                                                        profiles
  -----------------------------------------------------------------------

#### Emerald Saudi

Deep emerald and forest surfaces; sand/champagne gold accents; muted
mint highlights. Avoid literal national flags or emblems in generic UI.

#### Wood & Metal

Dark walnut and graphite surfaces; brushed steel and pale champagne-gold
details. Wood grain is optional and subtle; never cover whole screens
with photographic wood textures.

#### Carbon Red

Carbon black and graphite surfaces; restrained crimson accent and cool
steel-grey secondary highlight. Avoid neon glow, excessive diagonal
stripes and aggressive HUD decoration.

#### Cream Lavender

Warm cream and ivory surfaces; pearl secondary surfaces; muted lavender
accent and soft violet highlight. Keep it airy and readable, not
saturated purple.

#### Rose Champagne

Warm blush, dusty rose and pearl surfaces; rose-metal accent and
champagne-gold secondary accent. It must be clearly warmer and more
metallic than Cream Lavender; no dominant lavender/violet and no bright
pink.

#### Digital: Creator / Gamer Tactical

One theme family, two profiles, same components and behaviours. -
Creator: charcoal or dark plum/indigo base; controlled violet, coral or
turquoise accents; creator-oriented emphasis for content, publishing,
media and audience metrics. Use familiar conventions, never copy
proprietary platform logos or interfaces. - Gamer Tactical:
graphite/near-black base; muted tactical olive/khaki accent and
restrained signal colour; compact indicators and precise segmented
controls. Avoid camouflage backgrounds, crosshairs and constant
animation.

Each theme must define semantic tokens for background, surfaces, text,
muted text, border, primary/secondary action, accent, focus, status
colours and optional material/glass highlights.

## 5. Glass and material effects

Glassmorphism is a restrained optional surface treatment, not the
default for every card. - Use translucent fills, thin borders, subtle
highlights and low-intensity blur only on a few overlays. - Never use
large full-screen blur layers or place small text over busy translucent
backgrounds. - Provide a solid fallback for browsers/devices without
`backdrop-filter`. - Prefer a static gradient or border when blur adds
no functional value. - Material textures are decorative and must never
carry meaning.

Theme glass accents: Emerald---smoked emerald/mint-sand; Wood &
Metal---warm smoked glass/champagne edge; Carbon---graphite/crimson
edge; Cream---pearl/lavender tint; Rose---warm pearl/rose metal;
Creator---subtle indigo; Gamer---smoked graphite/muted olive.

## 6. UI component system

All components share one implementation and behaviour model; themes
style them through tokens.

### Buttons

Types: Primary, Secondary, Tertiary/Ghost, Destructive, Icon, Segmented.
States: default, hover where applicable, pressed, focused, disabled,
loading, success/error feedback. - Use concise verbs: Add, Save, Share,
Edit, Delete, Connect. - One dominant primary action per content
region. - Icon-only buttons require accessible names. - Do not use
colour alone to communicate status.

### Cards

Types: summary/metric, list item, product/service, project/task,
contact, dashboard widget. - One clear purpose per card. - At most one
primary action; secondary actions may be in a compact menu. - Avoid
unnecessary nested cards and oversized decorative icons. - Keep padding,
title placement and metadata order consistent.

### Inputs and selection

Labels remain visible; placeholders are not labels. Place validation
beside the field. Use suitable mobile keyboards. Toggles are for
immediate on/off settings; checkboxes for independent selections;
radio/segmented controls for mutually exclusive choices.

### Icons

Default: Lucide or Tabler rendered as SVG. Use one family per product
surface. Typical size 18--22 px for controls and 24 px for prominent
navigation; stroke approximately 1.75--2 px, optically adjusted. Avoid
oversized icons, emoji mixtures and mixed 3D/outline styles. Product
logos are distinct from UI icons.

### Avatars and identity

Use user photos where supplied; otherwise initials or neutral generated
monogram avatars. Never use stock portraits as if they were real users.
Verification indicators must be factual.

### Badges and status

Use short labels and semantic status colours. Do not use badges as
decoration or repeat nearby information. Examples: Active, In progress,
Paused, New, In transit, Completed. Status must remain understandable
without colour.

### Navigation

Keep primary navigation stable across themes. Use icons with labels
where possible. Bottom navigation on mobile for up to five primary
destinations; sidebar/navigation rail on desktop. Secondary navigation
stays within its section.

## 7. UX rules

1.  One screen, one obvious primary purpose.
2.  Prefer direct actions over explanatory paragraphs.
3.  Keep primary actions visible and predictable.
4.  Use progressive disclosure for advanced options.
5.  Never hide essential actions in decorative menus.
6.  Confirm destructive or irreversible actions.
7.  Provide empty, loading, success, error and offline states.
8.  Preserve input when validation fails.
9.  Keep back navigation and screen titles consistent.
10. Keep multi-step forms short and show progress.
11. Avoid unnecessary onboarding and repeated permission prompts.
12. Use plain user-facing language.

## 8. AMR SELF specification

AMR SELF is a personal work and management space, not only a finance
application.

### Primary navigation

1.  Home
2.  Finance
3.  Planner
4.  Services
5.  Profile

### Home

Show identity, key balance/selected summary, today's tasks/events, quick
actions and relevant project/service highlights. Avoid excessive
dashboard cards, decorative banners and fake/unverified values.

### Finance and Reports

Finance includes accounts/wallet overview, income, expenses,
transactions, categories and budgets where supported. Reports include
period selection, totals, category breakdown, trend chart and
export/share only if implemented. Use clear currency, tabular numerals
and explicit dates/status. Charts must have accessible labels or text
summaries. Never imply real payment capability if not connected.

### Planner

Calendar, tasks, reminders, notes and project links. Distinguish date,
time and status; show today's priorities first; provide compact list and
calendar views.

### Projects

Show project name/status, real progress only when supported, next
milestone/deadline and related tasks/documents.

### Services tab --- strict connection rule

The tab is titled «Сервисы» and has two groups: **Разделы SELF** (built-in sections such as Car, Health, AMR ID card — always visible, user may hide/reorder) and **Подключённые модули** (external AMR modules — shown only when connected). The rules below apply to the second group.


-   Display only modules the user has actually connected or is entitled
    to use.
-   Connected AMR Bazar and AMR Service Hub may appear.
-   Disconnected modules must not appear as active services.
-   Discovery/connection belongs in a separate catalogue or settings
    area if supported.
-   A service tile is a link/entry point to an independent module, not
    an embedded copy.
-   AMR 3D Constructor and AMR Vision must not appear in the Services
    tab; they are standalone products.
-   Do not imply AMR controls transactions or fulfilment in
    Bazar/Service Hub unless their integration contract explicitly says
    so.

### Profile and settings

Profile/AMR ID entry, language, appearance mode (System/Light/Dark),
theme family/profile, notifications, security/privacy and connected
modules.

## 9. AMR ID specification

AMR ID is a public digital identity based on a unique nickname and
shareable public web page. Visitors must not need to install AMR or
register to view a public card.

### Owner dashboard

My AMR ID, public card preview, Contacts, Appearance, QR & Sharing,
Statistics (only when real analytics exist), Privacy & Settings.

### Contact management

Add, edit, reorder, remove contact methods. Supported types may include
Telegram, WhatsApp, phone, email, Instagram, YouTube, website and other
approved platforms. Each contact has platform icon, label,
destination/value and visibility setting. Validate links and normalize
phone numbers where relevant. Preview public output. Hidden contacts
must never leak to the public card.

### Public card hierarchy

1.  Avatar or brand image.
2.  Display name.
3.  Unique AMR ID nickname.
4.  Profession/short description.
5.  Visible contact methods.
6.  QR and public URL.
7.  Save Contact (VCF) and Share where supported.

### QR rules

Encode the canonical public AMR ID URL. Preserve quiet zone and
contrast. Do not distort modules or overlay decorative graphics on the
data area. Always show readable URL as alternative. Test with multiple
camera apps and screen sizes. QR exports may be PNG or SVG depending on
library and compatibility.

AMR ID card appearance is independent from the AMR SELF theme; changing
SELF theme must not automatically overwrite public card design.

## 10. Ecosystem boundaries

-   AMR SELF: personal workspace and entry point.
-   AMR ID: digital identity and public contact card.
-   AMR Bazar: independent storefront/marketplace module.
-   AMR Service Hub: independent service discovery/matching module.
-   AMR 3D Constructor: standalone furniture design product.
-   AMR Vision: standalone furniture analysis product.

Products may connect through navigation/integration contracts but retain
their own purpose and flows. Do not merge unrelated product functions
into one screen.

## 11. Localization and accessibility

Supported locales: English (`en`), Russian (`ru`), Arabic (`ar`), Uzbek
(`uz`) and Tajik (`tg`). `tg` is the only code in URLs, files and APIs; legacy `tj` is accepted as an input alias and redirected to `tg`. - All UI strings must be
localizable; never hardcode user-facing text in components. - Arabic
requires true RTL layout, not translation alone. - Mirror directional
icons only when direction changes; never mirror logos or universal
symbols. - Use locale-aware dates, numbers and currency. - Allow text
expansion; do not hardcode widths around English labels. - Keyboard
navigation and visible focus are required. - Target WCAG 2.2 AA contrast
for text and interactive controls. - Provide accessible names for
icon-only controls and respect reduced-motion preferences.

## 12. Graphics and asset standard

### SVG

Use for UI icons, approved logos/monogram, scalable line illustrations,
2D diagrams and technical drawings where vector is appropriate. Optimize
SVG; remove editor metadata and unused definitions; avoid excessive
filters/masks/path complexity; use token-driven fills/strokes where
appropriate; do not embed large raster images.

### PNG

Use for PWA/platform-required raster icon exports, lossless raster
transparency and compatibility exports. Do not use PNG for ordinary
interface icons. Provide required icon sizes through the
manifest/platform guidance.

### WebP

Use for photographs, product imagery, material previews and optional
small wood/metal/carbon texture tiles. Use responsive sizes, compression
and lazy loading; never load full-resolution originals into thumbnails.

### CSS

Use for gradients, borders, shadows, colour transitions, simple
material-like surfaces, theme variables and small decorative details.

### Canvas / WebGL

Use only for dynamic drawing, complex diagrams or interactive 3D. Never
use these for ordinary UI decoration.

## 13. Performance requirements

Performance is a release requirement. - Theme switching is local and
immediate: no page reload, no network request and no separate app bundle
per theme. - Use semantic CSS variables/design tokens. - Load optional
textures only when needed and visible. - Cache static assets with
appropriate immutable versioning. - Target additional theme-specific
assets at **≤ 50 KB compressed per theme**, excluding shared application
assets and user uploads. This is a budget to measure, not an assumed
result. - Prefer optimized SVG components over duplicated icon files. -
Avoid large background images/video backgrounds, large-area backdrop
blur, stacked blur layers, expensive shadow stacks and continuous
decorative animation. - Prefer transform/opacity for short transitions;
respect reduced motion. - Virtualize genuinely long lists and lazy-load
below-the-fold images/modules. - Test on low- and mid-range Android
devices and constrained networks.

Release checks: no visible initial layout shift; no reload or network
request for theme switching; no major interaction delay from decoration;
no horizontal overflow; readable text in every theme; no critical
accessibility failures. Measure Core Web Vitals on the actual build;
never claim compliance without measurements.

## 14. Developer handoff contract

Every task must specify: product/screen, user goal, layout, components,
component states, theme token mapping, responsive behaviour,
localization/RTL, accessibility, performance constraints, acceptance
criteria and exclusions/integration boundaries.

Engineering rules: - Reuse existing product architecture and business
logic. - Do not rewrite working functionality solely for visual
styling. - Do not change APIs, routes, data models or authentication
without a separate approved task. - Do not create duplicate components
per theme. - Document product-specific exceptions. - Never show
disconnected services as active. - Keep AMR 3D Constructor and AMR
Vision out of AMR SELF Services.

### Definition of Done

A screen is compliant only when it follows the approved hierarchy; all
controls behave correctly and expose states; Light/Dark and all theme
families render correctly; mobile/desktop layouts work; required locales
and Arabic RTL are tested; asset/performance budgets are measured;
original AMR monogram geometry is preserved; and unrelated product logic
is untouched.

## 15. Governance

This is AMR Design System & Brandbook v1.1. Token changes require a version note.
Component behaviour changes require migration notes. New themes must use
the same semantic token schema. New products reuse the foundation and
document only product-specific patterns. After approval, this master
specification is the single source of truth.

## 16. Approved visual direction — premium depth, lightweight execution

### 16.1 Design intent

AMR interfaces must not look flat, generic or inexpensive. The approved direction is **restrained premium depth**: a clear, fast interface with controlled material cues, subtle layering and carefully placed colour transitions.

The visual quality must come from composition, spacing, typography, contrast, surface hierarchy and precise details — not from a high number of effects.

The interface should feel:
- premium, composed and technically credible;
- soft rather than harsh; rich rather than glossy;
- intuitive at first use, with concise labels and obvious actions;
- consistent across products while allowing each product/theme to express its own character.

### 16.2 Surface depth levels

Use a small, repeatable surface system. Do not apply every effect to every component.

| Level | Surface | Approved treatment | Typical use |
|---|---|---|---|
| 0 | Base | Solid token background | Page canvas |
| 1 | Raised | Slightly different surface token, fine border, soft shadow | Standard cards, panels |
| 2 | Focus | Subtle tonal gradient or restrained inner highlight | Primary balance card, selected item |
| 3 | Glass | Low-opacity fill, thin light border, restrained blur with solid fallback | Floating toolbar, compact overlay, popover |
| 4 | Brand feature | Larger but static colour/material accent | Hero header, identity card, theme preview |

Rules:
- Most content uses Levels 0–1.
- Use Level 2 for a small number of high-value elements per screen.
- Level 3 glass is reserved for overlays and selected floating elements, not every card.
- Level 4 is decorative and must never reduce text contrast or compete with the task.
- Use soft shadows with short, low-opacity spread. Avoid hard black shadows and multiple stacked shadow layers.
- Prefer fine borders and tonal contrast over excessive glow.

### 16.3 Gradient and metallic accents

Gradients are permitted and encouraged when they improve hierarchy or brand character.
- Use low-contrast, short-range gradients within a theme's palette.
- Metallic gold, silver, bronze, steel and rose-metal are **accent materials**, not large blocks of saturated colour.
- A highlight line, edge, small icon detail or selected control is usually sufficient.
- Avoid full-screen gradients, rainbow gradients, neon glow, strong lens flares and animated light streaks.
- Never use gradient colour as the only indication of state or meaning.

### 16.4 Glass treatment

Glass is a controlled material, not the system's default card style.
- Recommended use: compact floating actions, overlays, navigation popovers, theme selectors and selected summary panels.
- Use a translucent fill, subtle 1 px border and restrained blur.
- Provide an opaque surface fallback for unsupported browsers and low-performance settings.
- Avoid nested glass, large blur regions, multiple backdrop filters and blur over busy imagery.
- Text and controls must retain accessible contrast in both modes.

### 16.5 Interaction and motion

- Short transitions only; default range 120–180 ms.
- Prefer opacity and transform; avoid animating blur, large shadows, gradients or layout dimensions.
- No continuous decorative animation.
- Respect `prefers-reduced-motion`.
- Pressed, selected, focused, disabled and loading states must be visually distinct without relying only on colour.

### 16.6 Six theme families — visual distinction

The six theme families remain the approved set:
1. Emerald Saudi
2. Wood & Metal
3. Carbon Red
4. Digital (profiles: Creator / Gamer Tactical)
5. Cream Lavender
6. Rose Champagne

Creator and Gamer Tactical are two profiles within the Digital family, not two additional theme families. The active profile may alter accent tokens and a small number of visual details, but not component structure or behaviour.

Theme separation must be immediately recognisable through palette, material cue and accent treatment:
- **Emerald Saudi:** deep emerald/forest + sand/champagne gold + muted mint.
- **Wood & Metal:** dark walnut + warm graphite + brushed steel + pale champagne gold. Wood grain is optional and limited to small accents or preview surfaces.
- **Carbon Red:** carbon/graphite + restrained crimson + cool steel. No camouflage or aggressive HUD styling.
- **Digital — Creator profile:** dark plum/indigo or neutral charcoal + controlled violet/coral/turquoise accents. Content-first, expressive but not neon-heavy.
- **Cream Lavender:** warm cream + pearl + muted lavender + soft violet. Light, airy and calm.
- **Rose Champagne:** dusty rose + warm pearl + rose metal + champagne gold. Clearly warmer and more metallic than Cream Lavender; avoid dominant violet.

Every theme supports Light and Dark modes. Light/Dark is a mode; the six themes are style families.

## 17. AMR monogram approval and usage lock

The user-approved AMR monogram treatment is accepted as the brand direction:
- On dark backgrounds: champagne gold, emerald, white or silver variants.
- On light backgrounds: deep emerald, graphite, champagne gold or black variants.
- Flat variants are the default for small digital UI, favicons and compact placements.
- Metallic finishes are for larger brand placements, launch screens, presentation covers and promotional materials.

**Non-negotiable geometry lock:** the original supplied monogram master is the only production source. Preserve its exact silhouette, joins, proportions and negative spaces. Do not redraw, regenerate, retype, simplify, crop, stretch or distort it. Generated mockups are mood references only and must never replace the approved masters in section 24.

Minimum size and clear space are measured from `brand/monogram/amr-monogram.svg` (section 24.3).

## 18. Currency symbol — Saudi Riyal

The supplied Saudi Riyal symbol artwork is an approved currency glyph asset for AMR financial interfaces.
- Preserve the supplied glyph geometry; do not redraw or stylise its shape.
- Source: the official SAMA symbol (sama.gov.sa, Saudi Riyal symbol guidelines). Until the official SVG file is placed at `assets/system/saudi-riyal.svg`, products may use the high-fidelity trace of the SAMA artwork (overlap 99.8%) as a CSS mask. Provide a tested PNG fallback only where required.
- Placement follows SAMA rules: symbol before the number in LTR, with a thin space; minus sign before the symbol.
- Store currency values using ISO currency code `SAR` in data and APIs.
- Display the Saudi Riyal symbol in the interface when the selected currency is SAR; retain a textual accessible name such as “Saudi riyal”.
- Align the symbol optically with numerals and use tabular numerals for monetary values.
- In mixed-currency views, always make the currency unambiguous.

## 19. Performance budget for premium visuals

Premium appearance must not create a second application-sized visual payload.

### Rendering rules
- Build gradients, borders, shadows, highlights and simple glass surfaces in CSS.
- Use SVG for UI icons, approved logos, diagrams and line illustrations.
- Use WebP for photos, product imagery and material previews.
- Use PNG only for platform-required PWA exports, transparent raster assets and compatibility fallbacks.
- Do not use PNG files for ordinary UI icons.
- Do not use WebGL/Canvas for static decoration.
- Load optional textures only when the relevant theme is active and the texture is visible.
- Use a solid fallback when `backdrop-filter` is unavailable or performance is constrained.

### Budgets and validation
- Theme-specific decorative assets: target ≤ 50 KB compressed per theme, excluding shared application assets and user content.
- Prefer a single shared component implementation and token swap; never ship a separate component bundle per theme.
- Avoid large background images, video backgrounds, large-area blur, stacked filters and high-cost shadow stacks.
- Test theme switching on low- and mid-range Android devices and constrained mobile networks.
- Measure actual bundle size, image transfer, rendering performance and Core Web Vitals on the implementation. Do not claim a performance target is met until measured.
- The app must remain usable with decorative effects disabled.

## 20. Updated visual acceptance checklist

A screen is visually compliant only when:
- it follows the AMR hierarchy and looks premium without being visually crowded;
- depth is used selectively and surfaces remain distinguishable;
- glass and gradients are subtle, purposeful and have fallbacks;
- typography is readable and controls are easy to recognise;
- icon weight and size are consistent;
- theme identity is visible without changing layout or behaviour;
- Light and Dark modes both maintain contrast;
- the approved monogram geometry is unchanged;
- the Saudi Riyal glyph is used faithfully where SAR is displayed;
- no unnecessary decorative assets or expensive rendering effects are loaded;
- all product, connection, privacy and business-logic boundaries in this specification remain intact.


## 21. Signature Brand DNA — the recognisable AMR signature

The following five rules are mandatory across AMR SELF, AMR ID, AMR Bazar, AMR Service Hub, AMR 3D Constructor and AMR Vision. A theme may change colour and material expression, but it must never remove or reinterpret these structural brand markers.

### 21.1 Locked monogram geometry as a structural code

- The supplied connected **a-m-R monogram is the AMR logo itself**, not a decorative symbol and not a generic initial treatment. Its letterform identity carries the meaning of the AMR brand.
- The exact silhouette in the approved user-supplied references is immutable: preserve the circular `a` counter and bowl, the connected central `m` arches, the `R` bowl and terminal, all joins and negative spaces, and especially the pointed cut / tapered lower leg of `R`.
- The mark must always be treated as one inseparable connected symbol. Never separate letters, retype it with a font, rebuild it with CSS, approximate it with a new SVG path, simplify its counters, or alter any contour.
- The reference board establishes the approved presentation variants:
  - **Dark backgrounds:** metallic champagne / warm gold as the primary premium treatment; flat white and flat champagne for compact UI.
  - **Light backgrounds:** deep emerald as the primary brand treatment; flat black for monochrome and print.
  - **Large brand placements:** silver-metal with champagne/copper edge or metallic champagne.
  - **Compact digital placements:** flat white, flat black, flat emerald or flat champagne, selected for contrast.
- Permitted changes are limited to **colour, material finish, lighting and background**. Geometry, proportions, joins, spacing within the mark and negative spaces are never theme-dependent.
- A watermark version may appear only on primary Hero cards, splash screens and the AMR ID header, at **3%–5% opacity**. It is a background signature and must not reduce text or control contrast.
- The two supplied PNG references are authoritative visual references and must be retained unchanged in the design-system repository. They are not a substitute for a scalable vector master. Request the original SVG/AI/vector source for production export; until it is supplied, use the provided reference image unchanged where a raster placement is acceptable, or omit the mark. **Do not recreate it.**

### 21.2 Metallic / Champagne Edge

- Key anchor cards — such as the main balance, active order status and active project — must carry a **1 px inner edge** with a restrained Champagne / metal tonal gradient.
- The edge is a reference to the metallic cut edge of the approved AMR monogram.
- The edge is decorative, not a status indicator, focus ring, or text colour. It must never be the only boundary cue for an interactive control.
- Use the active theme's metal interpretation: champagne, brushed steel, walnut-champagne, crimson-steel, pearl-lavender, rose-metal, creator-violet or tactical-olive.
- Keep the edge static. No animated shine, glow sweep or moving highlight.

### 21.3 Two-step geometry and tabular numerals

- Standard outer card/container radius: **16 px**.
- Nested surface, inset panel or control radius: **12 px**.
- Status badges: capsule radius **999 px**.
- These values are structural defaults. Product-specific geometry may vary only when required by a platform convention and must be documented.
- All balances, prices, dates, counts, quantities, dimensions, percentages and measurements must use tabular numerals (`font-variant-numeric: tabular-nums` or the platform equivalent).
- Status badges must contain a concise text label; colour alone must never carry status meaning.

### 21.4 Shared Hero anatomy

Every product's primary landing view follows the same information anatomy, without duplicating product screens or forcing identical content:

1. **Hero header:** contextual title / current status aligned left.
2. **Identity trigger:** compact AMR ID avatar or identity control aligned right.
3. **Primary anchor:** the module's most important summary card directly below the header.

The content of the anchor card is product-specific (for example, balance in SELF, public identity in AMR ID, current request in Service Hub, or active model in Constructor). The hierarchy and relative placement remain recognisable across modules.

### 21.5 Unified tactile physics

- A pressed interactive control scales to **0.98** over **120 ms**.
- Use a restrained ease-out or linear transform transition. Do not use spring, rubber-band, bounce or overshoot easing.
- Prefer transform and opacity; do not animate blur, large shadows, layout dimensions or decorative gradients.
- Respect `prefers-reduced-motion`; in reduced-motion mode, remove or minimise the scale transition while retaining a clear pressed state.
- The same physical response applies across themes and products. Theme changes must not alter interaction timing.

### Brand DNA implementation check

A screen passes the AMR signature check only when all five rules are present or their documented omission condition is met, the original monogram asset remains untouched, and the signature effects do not compromise WCAG contrast or performance.

## 22. Version history

### v1.2 — owner corrections (2026-11-16)
- Monogram masters fixed: clean set B + owner-approved path SVG (section 24); v1.1 photo-cut PNG demoted to reference.
- Duplicate section "13" renumbered to 24; asset paths unified under `brand/`.
- Typography: body 16 px, captions 13 px, minimum readable text 13 px.
- Locale code for Tajik standardised to `tg`.
- Saudi Riyal: official SAMA source and placement rules.
- Services tab: two groups — «Разделы SELF» and «Подключённые модули».
- Theme family 4 renamed "Digital (Creator / Gamer Tactical)".
- New section 25: public portal and product pages architecture.
- New section 26: shared product registry for parallel development.

### v1.1 — engineering contract update
- Added the five mandatory Signature Brand DNA rules.
- Added exact Light and Dark semantic colour tokens for all six theme families and both Digital profiles.
- Added WCAG contrast pair definitions and machine-readable contrast validation results.
- Standardised the 16 px / 12 px / capsule geometry, tabular numerals, Hero anatomy and 120 ms pressed-state physics.
- Preserved the original monogram asset lock, product boundaries, connected-services rule and performance budget.

## 23. Supplied monogram reference assets

The following user-supplied files are included in the v1.1 engineering package and define the approved silhouette and colour/finish usage:

- `brand/reference/AMR_Monogram_Usage_Guide_Reference.png` — dark/light background variants and flat white, champagne, black and emerald applications.
- `brand/reference/AMR_Monogram_Metallic_Master_Reference.png` — silver-metal body with champagne/copper edge treatment.

These files must be preserved unchanged. They are visual authority for review and implementation. They are references, not production sources; production sources are listed in section 24.

## 24. Final approved monogram asset contract (supersedes the second "13" of v1.1)

### 24.1 Standalone mark
The approved AMR monogram is always displayed as a standalone mark: no enclosing frame, circle, shield, badge, tile, decorative plate or background is part of the logo. Place it directly on the relevant interface surface. The application icon may use the platform's required square canvas, but the monogram itself remains unframed and the canvas remains transparent in the supplied assets.

### 24.2 Master asset and derivatives (owner decision 2026-11-16)
- **Vector master:** `brand/monogram/amr-monogram.svg` — path vector traced from the clean set, overlap with the raster master > 99%, approved by the owner as the official vector until a designer source file (AI/EPS/SVG) is supplied. Colours are set through `fill`/CSS variables; geometry is never edited.
- **Raster master:** `brand/monogram/amr-white.png` (1600 px, transparent) and its colour/finish set `amr-*.png` (white, black, bronze, green-gold, green-silver, silver-copper, 3d-blue, 3d-bronze).
- **App icons:** 192 / 512 / 1024 px exports from the vector master, monogram unframed, safe zone 12%.
- **Not used in production:** the v1.1 photo-cut PNG and the raster-backed SVG wrapper (edge artefacts, specks). Kept as reference only.
- When a designer source arrives, it replaces the vector master after an overlap check; all products update from this folder.

### 24.3 Clear space and minimum use
Maintain clear space around the mark equal to at least 12% of its displayed height on all sides. Do not place text, icons or borders inside this zone. Use the flat mark for compact UI placements; use the metallic finish for larger brand placements and presentation contexts. At very small sizes, use the approved flat PNG and verify legibility at actual device scale.

### 24.4 Placement rules
- App header: standalone mark, no container.
- AMR ID identity header: standalone mark may appear beside the public nickname; the nickname remains text, not part of the logo.
- Splash/launch: standalone metallic or flat mark on a plain theme surface.
- Hero-card watermark: use the same mark at 3–5% opacity, behind content, never as a substitute for a readable heading.
- Social/contact icons are separate platform marks and must never be fused into the AMR monogram.

### 24.5 Asset status
Geometry locked. Vector master: owner-approved path SVG. Raster master: clean set B. Designer source file: requested, optional; when supplied it replaces the path SVG after verification.

## 25. Public portal and product pages

### 25.1 Domains
| Address | Role |
|---|---|
| `amrsys.net` | Portal: welcome, presentation of all products, links to product pages. No accounts, no app logic. |
| `<product>.amrsys.net` | Product page: short description, how it works (steps with screenshots), Open / Install / Demo. One page per product, independent. |
| App origin (from registry `app_url`) | The PWA itself. SELF and public AMR ID cards: `id.amrsys.net`. Other apps: own origin listed in the registry. |

Reserved product slugs: `self`, `safar`, `cutting`, `hub`, `constructor`, `vision`, `bazar`.

### 25.2 Portal (amrsys.net)
1. Header: monogram, product menu, language switch (flag + code), theme Light/Dark/Auto.
2. Hero: monogram (metallic finish allowed), one-line promise, one primary action «Продукты».
3. Product showcase: one card per product — app icon, name, one line, honest status (Работает / Демо / В разработке / Скоро). The whole card opens the product page.
4. Principles: three short points (independent products, one AMR ID, privacy).
5. Footer: contacts, languages, © AMR Systems.
Login and registration are not on the portal; they live in AMR ID / SELF.

### 25.3 Product page (`<product>.amrsys.net`)
1. Header identical to the portal (logo returns to amrsys.net).
2. Hero: app icon, name, one-sentence description, buttons **Открыть** (app_url), **Установить** (opens app with install hint), **Демо** (demo_url, if any). Status badge.
3. «Как это работает»: 3–5 steps, each a WebP phone screenshot + 1 short sentence.
4. Features: up to 6 short tiles.
5. Install instructions: Android/Chrome (install prompt) and iPhone (Share → «На экран Домой»), shown as two small illustrated steps.
6. Footer with link back to all products.
Installation always happens on the app origin (browsers only allow install there); the product page explains and links.

### 25.4 Performance and quality
- Static HTML + one CSS file + minimal JS (language, theme). No framework on portal/product pages.
- Budgets: HTML+CSS+JS < 60 KB gzip per page; images WebP, lazy; LCP < 1.5 s on 4G.
- Five locales, Arabic RTL. Each locale has its own URL (`/ru/`, `/en/`, `/ar/`, `/uz/`, `/tg/`); `/` picks by browser language.
- Security headers: CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors none.
- Honest statuses only; no fake numbers, reviews or users.

## 26. Shared product registry

`products.json` in the portal repository (`amrsys-dev/amr-systems`) is the single source for the portal and all product pages. Every development session (human or AI) changes product data only there.

Fields per product: `slug`, `name`, `status` (`live`, `demo`, `dev`, `soon`), `app_url`, `demo_url`, `icon`, `accent`, and `steps_images[]` (optional WebP screenshots, shared by all locales), `pwa`, `hidden`, and per locale (`i18n.<code>`): `tagline`, `description`, `steps[]` (one short sentence each), `features[]`.

Rules:
- One product = one entry; the slug equals the subdomain.
- Screenshots go to `public/p/<slug>/` as WebP, 720 px wide max.
- Status changes only when true (e.g. `live` only after a production release).
- A pull request that adds or changes a product must keep all five locales filled (fallback to English is allowed but marked in review).

**End of specification.**
