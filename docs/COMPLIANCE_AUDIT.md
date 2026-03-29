# Compliance & brand audit log

**Date:** March 2026  
**Scope:** Marketing copy, legal pages, privacy alignment with implementation, `city-os` branding, labor/commission claims.

## Pre-change: privacy & data flows vs legal copy

| Claim in legal / cookie copy | Observed implementation | Discrepancy |
|------------------------------|-------------------------|-------------|
| Collection of **location** for arrival, **preferences** for stays | No booking API, forms do not POST to a backend in-repo; no geolocation API usage found | **Over-broad** for current marketing-only site |
| **Encrypted at executive grade**, European clusters, **zero-knowledge** | Static Next app; `@os/database` exports table name constants only—no runtime DB from web | **Forward-looking** stated as present fact |
| **Real-time synchrony** (cookies, terms) | No WebSocket/analytics scripts; theme stored in `localStorage` | **Overstated** for actual behavior |
| Cookie **analytics** “dispatch precision” / city patterns | No Google Analytics / PostHog / etc. detected | **Misaligned** if analytics cookies are not used |
| Sharing with **fleet and hotel partners** | No partner data pipeline from this site | **Conditional** on future services |

**Resolution:** Privacy, Data Sovereignty, and Cookie copy updated with a **scope preamble** and **current vs future** framing; cookie analytics copy describes **optional** future use unless/until implemented.

## Pre-change: branding (`city-os` / Barcelona OS)

| Location | Finding |
|----------|---------|
| `apps/web/app/layout.tsx` | Title “Barcelona City OS”, “city intelligence” |
| `theme-provider.tsx` | `localStorage` key `barcelona-city-os-theme` |
| Login/signup placeholders | `operator@barcelonaos.com` |
| Root `package.json` | `name`: `barcelona-city-os` |
| `apps/dispatcher/go.mod` | Module `github.com/barcelona-city-os/dispatcher` |
| `messages/ca.json` | Nav brand “Barcelona OS” (misaligned with Royale One) |

## Pre-change: labor / commission claims

| Location | Risk |
|----------|------|
| `join-the-fleet/page.tsx` (EN/ES) | “**guaranteed commissions**” without contract reference |

**Resolution:** Copy qualified; **Terms of Service** gain a **Fleet partners & compensation** section; cross-link from fleet page.

## Files modified (post-audit refactor)

See git history for this commit; summary:

- `apps/web/app/layout.tsx` — site metadata (Royale One, factual description).
- `apps/web/app/theme-provider.tsx` — `localStorage` key `royale-one-theme`.
- `apps/web/app/[locale]/login/page.tsx`, `signup/page.tsx` — email placeholders.
- `apps/web/messages/en.json`, `es.json`, `ca.json` — copy transparency, auth, showcase tags.
- `apps/web/app/_components/SpatialSearchShowcase.tsx`, `CitizenExperienceMock.tsx` — i18n / non-live labeling.
- `apps/web/app/[locale]/privacy-policy/page.tsx`, `data-sovereignty/page.tsx`, `cookie-preferences/page.tsx`, `terms-of-service/page.tsx` — scope, accuracy, fleet section.
- `apps/web/app/[locale]/join-the-fleet/page.tsx` — commission language + terms link.
- `apps/web/app/[locale]/press/page.tsx` — “Public Intelligence” label.
- `apps/web/app/_components/GoldStandardFooter.tsx` — company links.
- `package.json` (root), `apps/dispatcher/go.mod` — monorepo / module naming.
- `docs/COMPLIANCE_AUDIT.md` — this file.
- `README.md` — public brand framing vs folder name.

**Update:** The public `/roadmap` route was later removed; product planning remains in `docs/PRODUCT_ROADMAP.md` only.

**Status:** Items in the “Pre-change” tables above were **remediated** in the same change set that added this audit file (see git history).
