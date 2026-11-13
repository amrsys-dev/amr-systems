# AMR Systems — Brand & Digital Design Principles

Version: 0.1  
Status: Working foundation

## Brand intent
AMR Systems is an engineering-led technology ecosystem. Its identity must communicate precision, modularity, industrial credibility, and purposeful innovation. Avoid generic "AI company" clichés.

## Core identity
- The approved AMR monogram is the primary brand asset.
- The monogram is immutable: do not redraw, reinterpret, stretch, recolor arbitrarily, or replace it with a typed approximation in production.
- Until the approved master asset is supplied in the repository, the text-based AMR wordmark is a temporary development placeholder only.

## Color system
- Graphite / near-black: primary canvas and navigation surfaces.
- Technical silver: primary text, structural lines, and neutral highlights.
- Restrained copper / bronze: secondary emphasis and premium material reference.
- Electric cyan: interaction state, active indicators, and technical signal accents.
- Avoid large areas of saturated blue, rainbow gradients, and excessive glow.

## Typography
- Use a disciplined sans-serif for interface and display typography.
- Use a monospaced face sparingly for technical labels, indices, and metadata.
- Preserve legibility at mobile sizes.
- Arabic must use a font with correct Arabic shaping; never force Latin display fonts onto Arabic text.

## Graphic language
- Prefer original vector/CSS diagrams, grids, geometry, and product-specific technical illustrations.
- Do not use stock imagery, watermarked visuals, screenshots from other brands, third-party creator artwork, or images containing another person's signature/caption.
- Any future image must be commissioned/generated specifically for AMR, reviewed for brand consistency, and stored as a project asset with a clear source.
- The current landing-page orbital and module diagrams are authored in CSS; they are not borrowed images.

## Layout and interaction
- Dark graphite surfaces, generous spacing, precise alignment, restrained borders.
- Motion should explain structure or guide attention, never delay access to content.
- Intro animation must be skippable and respect reduced-motion preferences.
- Responsive behavior is mandatory, with mobile-first validation.
- Navigation and language selection must remain easy to reach on small screens.

## Language system
Supported public-site languages:
1. English (en) — default landing language.
2. Arabic (ar) — right-to-left.
3. Russian (ru).
4. Tajik (tg).
5. Uzbek (uz).

Language labels should be displayed in their native names in the final selector. All content, navigation, accessibility labels, metadata, and product statuses must be localized. Arabic layout direction must be RTL; all other languages LTR. Translation quality must be reviewed by a fluent speaker before production.

## Product communication rules
- Keep AMR 3D Constructor, AMR Vision, AMR Cutting, AMR Service Hub, and AMR Materials distinct.
- Show development/research status honestly.
- Do not advertise unbuilt functionality, integrations, pricing, or availability.
- Product-specific visuals must express the actual product discipline rather than reuse one generic AI motif.

## Current implementation notes
- The language selector is currently an in-page prototype using local state. It demonstrates five-language copy switching and Arabic RTL, but does not yet provide localized URLs, server-rendered locale pages, or localized SEO metadata.
- The current AMR text mark is temporary until the approved monogram master is supplied.
- CSS-generated technical graphics are placeholders for a future custom illustration system.
