# AiRAT Design System (`design.md`)

**Canonical URL:** [https://airat.in/](https://airat.in/)  
**Codebase:** `webwise-portal-update` (Duna-inspired light layout) · **Production today:** `webwise-portal` (Anthropic-style dark marketing site)

---

## Quick glance — allocation decisions

Use this table when deciding **what to ship, where content lives, and who owns it**.

| Question | Decision | Source of truth |
|---|---|---|
| Which repo is live? | `webwise-portal` → **airat.in** today | Deploy pipeline |
| Which repo is the redesign? | `webwise-portal-update` — Duna band layout + AiRAT copy | This doc + `src/content/*` |
| Primary conversion CTA | **Book a strategy call** → `/contact` | `SiteHeader`, hero, `cta-band` |
| Secondary proof CTA | **Read case studies** → `/portfolio` | Hero, footer, case cards |
| Three delivery domains | Security · AI & LLM · Data & search | `SOLUTION_PATHS_SECTION` in `homePageCopy.ts` |
| Proof metrics (homepage) | 99.95% uptime · 87% alert noise cut · 12× faster investigation | `IMPACT_METRICS` |
| GEO / markets in copy | UAE, India, Singapore, Indonesia, Australia, Europe, US | `HOME_META_DESCRIPTION`, FAQ, org schema |
| AEO / AI discovery | FAQ JSON-LD + `{component.ai-summary-links}` in footer | `HOME_FAQ`, `GetAiSummaryLinks.tsx` |
| Visual layout reference | [Duna.com](https://duna.com/) section rhythm (square crops, mono eyebrows) | Layout only — **AiRAT-owned SVGs**, not Duna assets |
| Fonts (update branch) | Archivo (display) · Inter (body) · JetBrains Mono (eyebrows) | `tokens.css` |
| Fonts (production) | Poppins (display) · Lora (body) | `webwise-portal/tokens.css` |

### Homepage section stack (update branch — target)

| # | Block | Duna equivalent | AiRAT content | Visual asset |
|---|---|---|---|---|
| 1 | `{component.hero-band}` | Hero + product image | H1 + SLO lead + CTAs | `athena-unified-platform.svg` (1200×675) |
| 2 | `{component.logo-strip}` | Customer logos | Client grid | `ClientLogoGrid` |
| 3 | `{component.stat-row}` + value props | 10.6x / 37% / 4.8x | Uptime / alerts / investigation | — |
| 4 | `{component.testimonial-pullquote}` | Trusted by leaders | Head of Cybersecurity · Dubai | — |
| 5 | `{component.product-showcase-dark}` | AI built for compliance | AI & LLM systems path | `rag-retrieval.svg` (640×640) |
| 6 | Three `{component.feature-module}` | Onboard / Decide / Lifecycle | Security · AI · Data paths | hawkeye / socai / opensearch SVGs (448×448) |
| 7 | `{component.feature-split}` trust | Safe and secure | Industries + compliance | evidence-chain + compliance-audit (320×320) |
| 8 | News / cases | News grid | Featured case studies | Optional thumbs from portfolio |
| 9 | `{component.teal-band}` | Teal rest band | Industry trust grid | — |
| 10 | Testimonials + differentiators + FAQ + `{component.cta-band}` | Closing bands | Prod copy from `homePageCopy.ts` | — |

---

## Gap analysis — production vs update branch

Synced from [airat.in](https://airat.in/) HTML meta and `webwise-portal` source (June 2026).

| Area | Production (`webwise-portal`) | Update (`webwise-portal-update`) | Status |
|---|---|---|---|
| **Theme** | Dark Anthropic-style (`--void` #141413, Tiffany teal `#76e4df`) | Light Duna-style (warm canvas, lime `#aeec1d`, teal band) | Intentional redesign |
| **Hero layout** | Split column + linked words (security/AI/data) | Centered band + announcement pill + hero image | Update adds Duna rhythm |
| **Hero motion** | HawkeyeParticles + CaseStudySlider | Static hero visual | **Missing in update** — consider porting slider or use case-study thumb in hero image |
| **Latest work row** | Dynamic 3-tile (services / case / blog) | Static case study grid only | **Partial** — add API-driven tiles like prod |
| **Metrics animation** | Scroll counter (`stat-counter`) | Static stat blocks | **Missing** — wire IntersectionObserver from prod |
| **Preloader** | Yes | No | Optional |
| **JSON-LD** | Organization + WebSite + FAQ on home | FAQ visible; verify org schema on deploy | Add `SEO` component parity |
| **Meta description** | UAE, India, Singapore, Indonesia, Australia, Europe | **Synced** in `homePageCopy.ts` | Done |
| **Nav** | Flat: Services, Case studies, Insights, Demo, About | Dropdowns: Resources, Company + Book a strategy call | Update richer IA |
| **Demo link** | `/demo` in prod nav | Redirects to `/contact` | OK |
| **Theme toggle** | Prod has dark/light | Update light-only | By design for Duna pass |
| **Services stack UI** | Interactive stack explorer on `/services` | Ported via legacy aliases in `tokens.css` | Verify on services page |
| **GEO/AEO service pages** | `/services/aeo-geo`, `/services/ai-visibility` | Routes exist | Content audit recommended |
| **Footer AI summary** | Not on prod | `{component.ai-summary-links}` | **Update-only AIO feature** |
| **Product screenshots** | Particle WebGL + doodle icons on paths | Full-width SVG slots (Duna positions) | **Done** — `homePageVisuals.ts` |

---

## Overview

AiRAT’s **update branch** applies [Duna’s](https://duna.com/) structural language — warm near-white canvas, square geometry, mono eyebrows, lime primary CTAs, teal rest bands — to **AiRAT’s production story**: senior-led delivery of security, AI, and data platforms for regulated enterprises.

**Brand voice (content):** precise, SLO-anchored, anti-theatre. No acronyms without outcomes.  
**Visual voice (update UI):** architectural, editorial, infrastructure — not consumer fintech.

Production at [airat.in](https://airat.in/) still runs the prior dark marketing theme until this branch ships.

### Key characteristics

- Warm canvas (`{colors.canvas}` #ffffff / `{colors.canvas-warm}` #f7f7f5) with warm charcoal ink (`{colors.ink}` #1a1816)
- Electric lime primary (`{colors.primary}` #aeec1d) — CTAs and badges only, 1–2 per viewport
- Teal full-bleed band (`{colors.accent-teal}` #46838c) for industry / trust rests
- Archivo display (GT America substitute), Inter body, JetBrains Mono eyebrows
- Square corners on cards and images (`{rounded.none}`); buttons at 8px
- Real product **doodles** and portfolio SVGs in Duna image slots — not third-party screenshots

---

## SEO · AEO · GEO · AIO — content & schema

### SEO (search engines)

| Element | Rule | AiRAT home implementation |
|---|---|---|
| `<title>` | Brand + primary keyword phrase | `AiRAT - Production platforms for security, AI & data` |
| Meta description | ≤160 chars, regions + outcome | `HOME_META_DESCRIPTION` — includes APAC + EU |
| H1 | One per page, matches intent | Production platforms for security, AI & data |
| Internal links | Hero links to `/services#cyber`, `#ai`, `#data` | Update: text CTAs + nav |
| Canonical | `https://airat.in/` | Set in `SEO` / prerender |
| Sitemap | `/sitemap.xml` | All service, portfolio, blog, glossary routes |

### GEO (generative engine optimization)

- **Entity clarity:** Organization name **AiRAT**, domains (security, AI, data), regions (UAE, India, APAC, EU) repeated in FAQ, footer, about.
- **Structured regions:** `areaServed` in Organization JSON-LD: AE, IN, SG, ID, AU, EU, GB, US.
- **Long-tail blog:** Articles on entity SEO, AI Overviews, GEO — `/blog/category/seo-geo` (see `content/blog/`).
- **Service pages:** `/services/aeo-geo`, `/services/ai-visibility`, `/services/technical-seo`.

### AEO (answer engine optimization)

- **`HOME_FAQ`** — five Q&As covering what AiRAT builds, industries, regions, GEO/AEO, differentiation.
- **`FAQPage` JSON-LD** — inject on home (port from prod `HomePage.tsx`).
- **Direct answers:** First sentence of each FAQ answer is a complete standalone response (ChatGPT / Perplexity / Gemini extraction).

### AIO (AI overview / assistant discovery)

- **`{component.ai-summary-links}`** — “Get an AI summary of AiRAT” with pre-filled prompts to Claude, ChatGPT, Gemini (`GetAiSummaryLinks.tsx`).
- **Article meta pattern:** `Category — X min read` (Fragment Mono) on blog and case cards.
- **Glossary:** `/glossary`, `/glossary/:term` — definitional pages for XDR, RAG, SIEM, etc.

---

## Colors

### Brand & accent
- **Lime / Primary** (`{colors.primary}` #aeec1d): Primary CTA fills, outcome badges
- **Accent Teal** (`{colors.accent-teal}` #46838c): `{component.teal-band}` backgrounds
- **On Accent** (`{colors.on-accent}` #1a1816): Text on lime buttons

### Surface
- **Canvas** `#ffffff` · **Canvas Warm** `#f7f7f5` · **Surface Soft** `#edece7`
- **Surface Dark** `#1a1816` — AI showcase, CTA band, footer

### Text
- **Ink** `#1a1816` · **Body** `#4d4846` · **Muted** `#898683`
- **On Dark** `#f7f7f5` · **On Dark Muted** `#928e8b`

> Production dark theme tokens (`--void`, `--lime` #76e4df) live in `webwise-portal/src/styles/tokens.css` until cutover.

---

## Typography

| Token | Size | Font | Use |
|---|---|---|---|
| `{typography.display-2xl}` | clamp → 80px | Archivo 400 | Hero H1 |
| `{typography.display-lg}` | clamp → 48px | Archivo 400 | Section heads |
| `{typography.display-md}` | clamp → 40px | Archivo 400 | Stat numbers |
| `{typography.body-lg}` | 20px | Inter 400 | Hero lead |
| `{typography.body-md}` | 17px | Inter 400 | Body |
| `{typography.eyebrow-mono}` | 14px | JetBrains Mono | Section eyebrows |
| `{typography.label-mono}` | 12px | JetBrains Mono | Meta, case labels |

Negative tracking on display sizes (-0.04em at largest). No bold on hero display — use scale.

---

## Layout

- **Max width:** 1200px (`--max-width: 75rem`)
- **Reading column:** 800px (`--max-read`)
- **Section padding:** `--space-section` (~120px)
- **Nav height:** 72px (`--nav-height: 4.5rem`)

---

## Visual asset map (Duna slot → AiRAT file)

**Do not hotlink Duna.com images.** Use AiRAT-owned assets at the same layout positions and CSS dimensions.

| Slot | CSS class | Dimensions | AiRAT asset path | Alt intent |
|---|---|---|---|---|
| Hero product panel | `.hero-band__image` | 100% × auto, max ~1200px wide | `/doodles/portfolio/athena-unified-platform.svg` | Unified platform story |
| AI dark showcase | `.product-showcase-dark__image` | 1fr column, ~640px | `/doodles/rag-retrieval.svg` | Governed RAG loop |
| Security module | `.feature-module__image` | max 28rem | `/doodles/portfolio/hawkeye-siem-xdr.svg` | SIEM/XDR console |
| AI module | `.feature-module__image` | max 28rem | `/doodles/portfolio/socai-bot-assistant.svg` | SOC AI assistant |
| Data module | `.feature-module__image` | max 28rem | `/doodles/portfolio/opensearch-ecommerce.svg` | Search at scale |
| Trust split (×2) | `.trust-card__image` | 64×64 display | `/doodles/evidence-chain.svg`, `/doodles/compliance-audit.svg` | Evidence + compliance |

Constants: `src/content/homePageVisuals.ts`  
Swap assets by editing that file only — HomePage reads from it.

### Portfolio doodle inventory (case study / inner pages)

| File | Use |
|---|---|
| `hawkeye-siem-xdr.svg` | csoc / SIEM case studies |
| `windows-xdr-agent.svg` | XDR agent case study |
| `opensearch-ecommerce.svg` | MSAZN search case |
| `socai-bot-assistant.svg` | AI SOC automation |
| `delta-lake-analytics.svg` | Data lake engagements |
| `elk-observability-bank.svg` | Observability / banking |

---

## Components

### Navigation — `{component.top-nav}`

White canvas, ~72px. Brand **AiRAT** left; center: Services, Case studies, Resources ▾, Company ▾; right: **Book a strategy call** → `/contact`.

### Buttons

- **`button-primary`** — Lime fill, dark ink, 48px height, 8px radius
- **`button-secondary`** — Hairline outline on canvas
- **`button-text-link`** — “Explore →” pattern inside feature modules

### Section blocks (homepage kit)

Documented in **Quick glance** table above. All copy keys live in `src/content/homePageCopy.ts`.

### Footer — `{component.footer}`

Dark charcoal. Columns: Services · Work · Resources · Company. Includes `{component.ai-summary-links}` for AIO.

---

| Route | Template | Primary copy file |
|---|---|---|
| `/` | Homepage stack (prod text, Duna layout) | `homePageCopy.ts` |
| `/services` | Hero + stack panels + domain links | `servicesPageCopy.ts` |
| `/products` | Product tiles + FAQ | `productsPageCopy.ts` |
| `/products/:id` | Product detail (workflow + capabilities) | `productsPageCopy.ts` → `soc` · `adr` · `audit` · `cspm` |
| `/services/aeo-geo` | Service detail + FAQ | `geoAeoServicePageCopy.ts` |
| `/services/technical-seo` | Service detail | `seoServicePageCopy.ts` |
| `/services/sxo` | Service detail | `sxoServicePageCopy.ts` |
| `/services/ai-visibility` | Service detail | `aiVisibilityPageCopy.ts` |
| `/portfolio` | Case grid + filters | `portfolioPageCopy.ts` |
| `/portfolio/:slug` | Case study + outcomes | `portfolioPageCopy.ts` (10 projects) |
| `/blog` | News index | `blog/blogPageCopy.ts` + API |
| `/blog/:slug` | Article detail | `content/blog/articles/*.md` |
| `/about` | Editorial hero + clients | `aboutPageCopy.ts` |
| `/contact` | Form split | `contactPageCopy.ts` |
| `/resources` | Hub | `resourcesPageCopy.ts` |
| `/glossary`, `/glossary/:term` | Definition pages | `glossaryTerms.ts` |
| `/industries/fintech` | Persona page | glossary + fintech page |
| `/methodology` | Process narrative | (inline / shared) |
| `/technology-expertise` | Stack proof | `technologyPageCopy.ts` |
| `/for-mssps` | MSSP landing | `msspPageCopy.ts` |
| `/apac-cybersecurity-ai-soc-automation` | APAC landing | `apacCybersecurityPageCopy.ts` |
| Footer (all pages) | Columns + tagline | `footerCopy.ts` |

---

## Content source map (synced from production)

All marketing copy lives in `src/content/*.ts`. **Do not hardcode strings in page TSX** except prod-parity hero links.

### Home — `homePageCopy.ts`

| Block | Key constants |
|---|---|
| SEO | `HOME_META_DESCRIPTION` (live regions: UAE, India, SG, ID, AU, EU) |
| Hero | `HERO_H1_*`, `HERO_LEAD`, `OUTCOME_TAGS`, CTAs |
| Statement | `HOME_STATEMENT` |
| Metrics | `IMPACT_METRICS`, `METRICS_SECTION_*` |
| Clients | `HOME_CLIENTS_SECTION` |
| What we build | `SOLUTION_PATHS_SECTION` (Security · AI · Data) |
| Featured cases | `FEATURED_PROJECTS`, `CASES_*` |
| Industries | `TRUST_ITEMS`, `TRUST_STRIP_HEADING` |
| FAQ | `HOME_FAQ` (3 items, matches prod) |
| Closing | `HOME_CLOSING` |
| Visuals | `homePageVisuals.ts` (Duna slot → doodle paths) |

**Not rendered on update home (by design):** `TESTIMONIALS`, `DIFF_*`, `CTA_*` generic band.

### Products — `productsPageCopy.ts` *(ported from prod)*

| Product ID | Title | Route |
|---|---|---|
| `soc` | Managed CSOC & XDR | `/products/soc` |
| `adr` | Detection & Response — Agents & Applications | `/products/adr` |
| `audit` | Cyber Audit & GRC Assurance | `/products/audit` |
| `cspm` | The Agentic Cloud Defender. | `/products/cspm` |

Also: `CYBER_SERVICES`, `CYBER_SOLUTIONS` (accelerators), `PRODUCTS_FAQ` (6 items), `PRODUCTS_HERO`, `PRODUCTS_CLOSING`.

### Services — `servicesPageCopy.ts` *(identical to prod)*

| Stack ID | Title |
|---|---|
| `cyber` | Cybersecurity & XDR Platforms |
| `genai` | Generative AI & LLM Systems |
| `datalakes` | Data Lakes & Real-Time Analytics |
| `search` | Search & Observability |
| `platform` | Custom Platform Engineering |
| `visibility` | AI Search Visibility (GEO/AEO) |

Hero: *“Name the problem. We size and ship the fix.”*

### Case studies — `portfolioPageCopy.ts` *(identical to prod)*

| Slug | Title | Category |
|---|---|---|
| `hawkeye-multi-tenant-cybersecurity-platform` | csoc Enterprise Cyber Defense | Cybersecurity |
| `enterprise-xdr-agent-windows-endpoint-protection` | Enterprise XDR Agent | AI Platforms |
| `dva-institutional-cryptocurrency-trading-platform` | DVA Trading Platform | FinTech |
| `elk-log-observability-tier1-bank` | ELK Observability — Tier-1 Bank | Cloud & Observability |
| `msazn-opensearch-ecommerce-search-uae` | MSAZN OpenSearch E-Commerce | E-Commerce |
| `genda-phool-hyperlocal-delivery-platform-india` | Genda Phool Hyperlocal | Retail |
| `safemargin-ai-cyber-insurance-marketplace` | SafeMargin Cyber Insurance | FinTech |
| `socai-bot-ai-cyber-compliance-assistant` | SOCai Compliance Assistant | AI Platforms |
| `athena-unified-ai-cybersecurity-platform-eu` | Athena Unified AI Cyber | Cybersecurity |
| `enterprise-delta-lake-unified-analytics-platform` | Delta Lake Analytics | Data & Search |

Home **featured three** match the first csoc, XDR agent, and MSAZN search stories.

### Footer — `footerCopy.ts`

Synced with prod: Products column links (`/products`, `/products/soc`), case study label *Multi-tenant XDR · MSSPs*.

---

## Page templates & sitemap (layout)

Shared chrome: `{component.top-nav}` · `{component.cta-get-started}` (inner pages) · `{component.footer}`.

Legacy table (eyebrows only):

| Route | Primary eyebrow |
|---|---|
| `/` | Security · AI · Data |
| `/products` | Products |
| `/services` | What we build |
| `/portfolio` | Selected work |

---

## Responsive behavior

| Breakpoint | Changes |
|---|---|
| < 768px | Hamburger nav; stat row 1-up; sub-features 4→1; feature module stacks image below copy |
| 768–1024px | Stat row 2–3 up; feature split single column |
| > 1024px | Full Duna grid; hero image full-bleed below copy |

Touch targets: buttons and inputs ≥ 48px height.

---

## Do / Don't

### Do
- Keep copy synced with production meta and FAQ (`homePageCopy.ts`)
- Use mono eyebrows on every major section
- Place visuals via `homePageVisuals.ts` — one file to swap art
- Inject FAQ + Organization JSON-LD on homepage before launch
- Mention **regions and SLOs** in first paragraph of key pages (GEO)

### Don't
- Don't use Duna.com copyrighted screenshots or logos
- Don't spread lime across the page — reserve for primary CTAs
- Don't round feature cards — square is the brand
- Don't ship update branch without prerender / SEO parity check against prod

---

## Known gaps (post this doc)

1. **Animated stat counters** — port from prod `HomePage.tsx` IntersectionObserver block
2. **Case study slider / HawkeyeParticles** — optional hero motion; prod differentiator
3. **Dynamic latest-work tiles** — API fetch for case study + latest blog
4. **Organization JSON-LD** — confirm on update branch home (prod has it)
5. **Integrations page** — prod has `/integrations` + `integrationsCatalog.ts` (not yet in update)
6. **OG image** — verify `og-image.png` matches light theme when redesign ships
7. **Licensed fonts** — Archivo/JetBrains are open substitutes; swap if Grilli Type GT America is licensed later
8. **Remaining inner pages** — audit `/services`, `/about`, portfolio case pages for Duna band spacing (`duna-light-pages.css`)

---

## Iteration guide

1. **Content change** → edit `src/content/*PageCopy.ts`, not TSX
2. **Homepage image swap** → edit `src/content/homePageVisuals.ts`
3. **Token change** → `src/styles/tokens.css` then grep legacy aliases
4. **New section block** → add to this doc’s homepage table + `HomePage.tsx` + `homepage.css`
5. **SEO/AEO** → extend `HOME_FAQ`, blog articles, glossary terms; update `sitemap.xml`

---

*Last synced with production meta at [airat.in](https://airat.in/) and Duna layout reference at [duna.com](https://duna.com/). Visual slots replicate Duna **geometry only**; all artwork is AiRAT-owned under `public/doodles/`.*
