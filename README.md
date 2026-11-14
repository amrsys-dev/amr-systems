# AMR Systems — Public Portal

The public website for the AMR technology ecosystem.

## Scope
The portal introduces the ecosystem, explains the independent product directions, and provides navigation. Product applications remain separate deployments and are not embedded into this site.

## Product directions
- **AMR 3D Constructor** — furniture configuration and 3D project construction.
- **AMR Vision** — furniture model structure analysis and component decomposition.
- **AMR Cutting** — sheet-material and profile cutting optimization.
- **AMR Service Hub** — service discovery and request-to-provider matching; AMR does not intermediate payments.
- **AMR SELF** — personal digital identity and contact hub.
- **AMR SAFAR** — travel utilities including visa countdown, route/fuel calculations, and ride-request discovery.

Descriptions on the public site must reflect verified current scope. Do not imply unfinished applications or integrations are live.

## Architecture
- Main domain: public ecosystem portal.
- Product apps: independent modules intended for their own subdomains.
- Integrations: explicit contracts between apps; no forced monolith.

## Brand
See [Brand Guidelines](docs/brand/BRAND-GUIDELINES.md) and [Architecture](docs/architecture/README.md).

## Development
```bash
npm install
npm run dev
npm run build
```

The current language selector is a client-side prototype for English, Arabic (RTL), Russian, Tajik, and Uzbek. Localized URLs and localized SEO are not implemented yet.
