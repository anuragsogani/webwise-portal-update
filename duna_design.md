# Duna Design System (`design.md`)

## Overview

Duna.com is the **precise, architectural, technical-confident** end of the B2B-fintech category. Where most compliance and identity platforms reach for cool corporate blues, Duna anchors on a **warm-neutral near-white canvas** (`{colors.canvas}` - #ffffff trending to #f7f7f5) and pairs it with **deep warm-charcoal product surfaces** (`{colors.surface-dark}` - #1a1816). The base atmosphere reads like a well-set technical manual: lots of air, a confident grotesque display face, and small monospace eyebrows that signal "engineered, auditable, exact."

The display face is **GT America** (Grilli Type's neo-grotesque) run at weight 400–500 with tight negative tracking - never a serif, never bold. Body is **Inter**. The third and most characterful voice is **Fragment Mono**, used for section eyebrows ("Onboard", "Decide", "Artificial Intelligence", "Data platform"), metadata, and fine labels. That mono eyebrow is Duna's signature small detail - it frames every section like a code comment and reinforces the "compliance translated into code" product story.

Brand voltage is deliberately scarce and comes from exactly two chromatic moves against the warm-neutral floor:
1. **Electric lime** (`{colors.primary}` - #aeec1d) - a single bright chartreuse used on key CTAs, status dots, and highlight markers. It is the brand's loudest pixel and it appears rarely.
2. **Teal band** (`{colors.accent-teal}` - #46838c) - used as a full-bleed section background, not as a per-element accent.

The system runs three surface modes that alternate band-by-band:
1. **White / warm-white canvas** (`{colors.canvas}`) - default body floor.
2. **Warm light surface** (`{colors.surface-soft}` - #edece7) - feature bands, stat blocks, testimonial cards.
3. **Dark warm-charcoal product surfaces** (`{colors.surface-dark}` - #1a1816) - product mockup showcases, the AI section, pre-footer, and footer.

The single most defining structural choice is **corner radius: there essentially isn't one.** Cards, images, and bands use square `{rounded.none}` (0px) corners. Only buttons soften slightly (`{rounded.sm}` - 8px) and pills/badges go full radius. The square geometry is what makes Duna feel like infrastructure rather than a consumer app.

> **Scope of this document.** This spec covers the full public site, not just the homepage. The site is a Framer build that shares one global token set (color, type, radius, spacing) across every route; what changes page to page is **section composition**. The marketing pages assemble from a fixed kit of section blocks - product hero, alternating feature split, spec matrix, testimonial pull-quote, "Next up" carousel, "Get started" CTA - while the company and editorial pages (About, Careers, News, articles) use a long-form editorial layout. The "Components" section below documents every block; the "Page Templates & Sitemap" section maps each route to its exact section stack so you can rebuild any page.

**Key Characteristics:**
- Warm near-white canvas (`{colors.canvas}` - #ffffff / #f7f7f5) with deep warm-charcoal ink (`{colors.ink}` - #1a1816). Warm-neutral, not the cool gray of typical fintech.
- Electric-lime primary accent (`{colors.primary}` - #aeec1d), used scarcely on CTAs and markers - never spread across the page.
- A teal full-bleed band (`{colors.accent-teal}` - #46838c) as a section-level color block, not an element accent.
- GT America grotesque display at weight 400–500 with negative tracking (-0.01 to -0.06em). No serif, no bold.
- Fragment Mono eyebrows and labels - the technical voice that frames every section.
- Square corners everywhere (`{rounded.none}` - 0px) on cards, images, and bands. Buttons soften to 8px; badges go pill.
- Dark warm-charcoal product mockup surfaces (`{colors.surface-dark}` - #1a1816) carrying real platform screenshots (onboarding flows, case management, dashboards) rather than abstract illustration.
- Big numeric stat blocks (10.6x, 37%, 4.8x) in large GT America - the proof-point rhythm.
- Generous section rhythm (`{spacing.section}` - ~120px) with a 1200px max content width.

## Colors

### Brand & Accent
- **Lime / Primary** (`{colors.primary}` - #aeec1d): The signature electric chartreuse. Used on primary CTA fills, status/active dots, and key highlight markers. The loudest color in the system and intentionally rare - one or two appearances per viewport at most.
- **Lime Active** (`{colors.primary-active}` - #9bd40f): Press / darker variant for the lime CTA.
- **Lime Disabled** (`{colors.primary-disabled}` - #d6e8a8): Desaturated, lightened lime for disabled states.
- **Accent Teal** (`{colors.accent-teal}` - #46838c): A muted blue-green used as a full-bleed section background and on select secondary surfaces. Calm, trustworthy, never neon.
- **Accent Teal Deep** (`{colors.accent-teal-deep}` - #3a6e76): Darker teal for nested elements or pressed states on teal surfaces.
- **Accent Plum** (`{colors.accent-plum}` - #1b0624): A deep near-black plum appearing inside gradient imagery and the occasional dark hero artwork. A rare atmospheric tone, not a UI color.
- **On Accent** (`{colors.on-accent}` - #1a1816): Dark ink used as text/icon color **on** the lime accent, since lime is too bright for white text.

### Surface
- **Canvas** (`{colors.canvas}` - #ffffff): The default page floor. Pure white at the top, warming toward off-white in lower bands.
- **Canvas Warm** (`{colors.canvas-warm}` - #f7f7f5): A barely-warm off-white used for alternating bands and large neutral areas.
- **Surface Soft** (`{colors.surface-soft}` - #edece7): Warm light surface for feature bands, stat blocks, and testimonial cards. One clear step down from canvas.
- **Surface Cream Strong** (`{colors.surface-cream-strong}` - #dbd9cd): A stronger warm neutral for emphasized panels, dividers, and image placeholders.
- **Surface Dark** (`{colors.surface-dark}` - #1a1816): The primary dark warm-charcoal surface. Product showcases, the AI section, footer.
- **Surface Dark Deep** (`{colors.surface-dark-deep}` - #160f0c): The darkest band - used behind the most immersive product/AI moments.
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` - #292421): Elevated cards and panels inside dark bands.
- **Surface Dark Soft** (`{colors.surface-dark-soft}` - #222221): Slightly lifted dark, for nested blocks and code surfaces inside dark cards.
- **Hairline** (`{colors.hairline}` - #edece7): The 1px border tone on light surfaces. Reads as one elevation step, not an ink line.
- **Hairline Strong** (`{colors.hairline-strong}` - #dbd9cd): A more visible divider on warm surfaces.
- **Hairline Dark** (`{colors.hairline-dark}` - #38322f): The border tone used between elements on dark surfaces.

### Text
- **Ink** (`{colors.ink}` - #1a1816): All display headlines and primary text. Deep warm charcoal, never pure black.
- **Ink Deep** (`{colors.ink-deep}` - #160e0b): The darkest text, for the largest hero display.
- **Body Strong** (`{colors.body-strong}` - #292421): Lead paragraphs and emphasized body.
- **Body** (`{colors.body}` - #4d4846): Default running-text color.
- **Muted** (`{colors.muted}` - #898683): Sub-labels, eyebrows on light, secondary metadata.
- **Muted Soft** (`{colors.muted-soft}` - #b2afae): Captions, fine-print, timestamps.
- **On Dark** (`{colors.on-dark}` - #f7f7f5): Warm-white text on dark surfaces (echoes the canvas warmth).
- **On Dark Muted** (`{colors.on-dark-muted}` - #928e8b): Secondary text and labels on dark surfaces and in the footer.

### Semantic
- **Success** (`{colors.success}` - #5db872): Available/healthy status indicators. (The lime accent is brand, not status - keep them distinct.)
- **Warning** (`{colors.warning}` - #d4a017): Caution callouts.
- **Error** (`{colors.error}` - #c64545): Validation and failure states.

> Note: Duna's palette is monochromatic-warm by design. The neutral spine (white → #edece7 → #dbd9cd → #292421 → #1a1816 → #160f0c) carries almost the entire interface; lime and teal are the only saturated colors and they appear sparingly. Resist adding a fourth hue.

## Typography

### Font Family
The system runs **GT America** (Grilli Type) as the neo-grotesque display and UI face, **Inter** as the running-body sans, and **Fragment Mono** as the monospace eyebrow/label voice. The fallback stack walks `GT America, Inter, "Helvetica Neue", Arial, sans-serif` for display/UI and `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` for body. Mono falls back `"Fragment Mono", "JetBrains Mono", "SFMono-Regular", Menlo, monospace`.

The split is technical-editorial:
- GT America (weight 400–500, negative tracking) → h1, h2, h3, hero display, stat numbers, button labels, nav.
- Inter (weight 400–500) → body paragraphs, descriptions, list copy.
- Fragment Mono → section eyebrows, metadata, category/time labels, fine technical captions.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-2xl}` | 80px | 400 | 1.0 | -0.04em | Hero headline ("The new standard in compliance") - GT America |
| `{typography.display-xl}` | 64px | 400 | 1.05 | -0.035em | Large section heroes - GT America |
| `{typography.display-lg}` | 48px | 400 | 1.1 | -0.03em | Section heads ("AI built for compliance.") - GT America |
| `{typography.display-md}` | 40px | 400 | 1.15 | -0.025em | Stat numbers (10.6x / 37% / 4.8x), sub-section heads |
| `{typography.display-sm}` | 32px | 400 | 1.2 | -0.02em | Card headlines, sub-section titles |
| `{typography.title-lg}` | 28px | 500 | 1.25 | -0.015em | Testimonial pull-quotes, feature lead titles |
| `{typography.title-md}` | 22px | 500 | 1.3 | -0.01em | Feature card titles |
| `{typography.title-sm}` | 18px | 500 | 1.4 | 0 | Sub-feature labels, list headers |
| `{typography.body-lg}` | 20px | 400 | 1.5 | -0.01em | Hero sub-headline, intro paragraphs - Inter |
| `{typography.body-md}` | 17px | 400 | 1.55 | 0 | Default running-text - Inter |
| `{typography.body-sm}` | 16px | 400 | 1.55 | 0 | Secondary body, footer links |
| `{typography.caption}` | 14px | 400 | 1.45 | 0 | Fine-print, captions - Inter |
| `{typography.eyebrow-mono}` | 14px | 400 | 1.4 | 0.02em | Section eyebrows ("Onboard", "Decide") - Fragment Mono |
| `{typography.label-mono}` | 12px | 400 | 1.4 | 0.02em | Metadata, time/category labels - Fragment Mono |
| `{typography.button}` | 16px | 500 | 1.0 | -0.01em | Button labels - GT America |
| `{typography.nav-link}` | 16px | 500 | 1.4 | -0.01em | Top-nav menu items - GT America |

### Principles
Display sizes use weight 400 (regular) for the largest sizes and 500 (medium) for mid-tier titles. The system never uses bold - confidence comes from scale and tracking, not weight. Negative letter-spacing is essential and scales with size: roughly -0.04em at 80px easing to 0 by body size. GT America without the tight tracking reads loose and generic.

The Fragment Mono eyebrow is the brand's most distinctive type move. Each major section opens with a short lowercase or sentence-case mono label that names the module before the GT America headline lands. Treat that mono eyebrow as part of the section header pattern, not an optional decoration.

Body stays Inter at weight 400 for paragraphs and 500 for inline emphasis and labels. Inter and GT America share humanist-grotesque proportions, so the body-to-display transition is quiet and intentional.

### Note on Font Substitutes
GT America is a licensed Grilli Type face. The closest open substitutes are **Inter** (already in the stack) run a touch tighter, or **Helvetica Neue** / **Neue Haas Grotesk** if licensed; **Archivo** is a workable open-source approximation of GT America's grotesque character. For Fragment Mono, **JetBrains Mono** or **Space Mono** are the nearest open substitutes - keep them at weight 400 with light positive tracking. Inter is its own fallback and needs none.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.huge}` 80px · `{spacing.section}` 120px.
- **Section padding:** `{spacing.section}` (~120px vertical) between major bands - generous, magazine-like pacing.
- **Card internal padding:** `{spacing.xl}` (32px) for feature and testimonial cards; `{spacing.lg}` (24px) for smaller list cards and news tiles.
- **Stat block spacing:** large gaps (`{spacing.huge}` 80px) between big numeric proof points so each reads as its own beat.

### Grid & Container
- **Max content width:** ~1200px centered (containers cap at 1199–1200px).
- **Reading column:** intro/lead text constrains to ~800px (`max-width:800px`) and tight copy to ~720px for legibility.
- **Hero:** single centered column - eyebrow/badge, large GT America headline, Inter sub-headline, then the CTA, with a full-bleed product image below.
- **Feature module pattern:** an eyebrow + headline + "Explore" link paired with a product screenshot, followed by a 4-up row of sub-feature labels (title + one-line description).
- **Stat row:** 3-up at desktop (10.6x / 37% / 4.8x), stacking on mobile.
- **News grid:** card list, 2–3 up at desktop.

### Whitespace Philosophy
Duna's layout breathes through large neutral bands and wide gutters rather than dense grids. The square corners and warm-neutral surfaces mean whitespace does the structural work that borders and shadows would do elsewhere. Each module is given room to register as a discrete, labeled unit - eyebrow, statement, proof, image - before the next band begins.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Body sections, top nav, hero bands |
| Surface block | Color-block change only (canvas → `{colors.surface-soft}`) | Feature bands, stat blocks |
| Hairline | 1px `{colors.hairline}` border | Inputs, occasional card outlines, dividers |
| Dark surface | `{colors.surface-dark}` background, no shadow | Product showcases, AI band, footer |
| Soft drop shadow | Very low-alpha shadow | Reserved for floating product screenshots over light bands - `0 8px 30px rgba(26,24,22,0.08)`, used sparingly |

The elevation philosophy is **color-block first, geometry second, shadow last.** Depth comes almost entirely from the white-to-charcoal surface contrast and the square-edged stacking of bands and images. Product screenshots occasionally float with a faint shadow to lift them off a light band, but flat color-blocking is the default.

### Decorative Depth
- Product screenshots are the primary visual texture - real platform UI (onboarding journeys, case queues, dashboards, AI panels) shown at full fidelity with square crops.
- The teal band and the dark bands act as full-bleed color rests between white sections, pacing the page like chapter breaks.
- The lime accent provides a single point of visual energy - a CTA fill or a small marker - against the restrained neutral field.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | The default. Cards, images, bands, panels, product screenshots - all square. |
| `{rounded.sm}` | 8px | Buttons and small interactive controls - the only place corners soften. |
| `{rounded.md}` | 12px | Rare; nested inputs or small chips when needed. |
| `{rounded.pill}` | 9999px | Badges, tags, the "Series A" announcement pill, status dots. |
| `{rounded.full}` | 50% | Avatars and circular status markers. |

The square-corner default is the system's structural signature. Do not round cards or images "to soften" them - the architecture is the brand.

### Photography & Illustrations
Duna leads with **product screenshots**, not illustration:
- Full-fidelity platform UI in square crops - onboarding flows, case management queues, dashboards, AI agent panels.
- Customer logos in a quiet monochrome row ("Built for businesses where compliance matters").
- Testimonial portraits crop to circles at ~48–56px.
- The hero and AI sections occasionally use atmospheric dark gradient imagery (warm charcoal into deep plum) as a backdrop for product chrome.

## Components

### Top Navigation

**`top-nav`** - White canvas nav bar pinned to the top, ~72px tall, `{colors.canvas}` background. Carries the Duna wordmark at left, a center menu in `{typography.nav-link}` (GT America 16px / 500), and a single right-side CTA. Flat - no shadow until scrolled. The menu mixes direct links and dropdowns: **Product** is a direct link to `/product`; **Customers**, **Company**, and **Resources** are `{component.nav-dropdown}` triggers. The right CTA is "Schedule a demo" → `/forms/get-in-touch`.

**`nav-dropdown`** - A hover/click mega-menu panel opening below a nav item on `{colors.canvas}`, square corners, hairline top edge. Holds grouped links: **Customers** → Industries (Financial technology, Banking, Platforms) + Teams (Compliance, Revenue, Technology); **Company** → About, News, Careers, Foundation; **Resources** → Trust, Status, Press. Group headers in `{typography.label-mono}` (Fragment Mono), links in `{typography.nav-link}`.

### Buttons

**`button-primary`** - The lime CTA. Background `{colors.primary}` (#aeec1d), text `{colors.on-accent}` (#1a1816 - dark ink, because lime is bright), type `{typography.button}` (GT America 16px / 500), padding 14px × 24px, height ~48px, rounded `{rounded.sm}` (8px). Active state darkens to `{colors.primary-active}` (#9bd40f). This is the page's primary conversion control ("Get started", "Schedule a demo").

**`button-dark`** - Dark solid button for secondary primary-actions. Background `{colors.surface-dark}` (#1a1816), text `{colors.on-dark}`, same padding/height/radius as primary. Used where lime would be too loud.

**`button-secondary`** - Outline button on light surfaces. Transparent or `{colors.canvas}` background, `{colors.ink}` text, 1px `{colors.hairline-strong}` border, rounded `{rounded.sm}`.

**`button-text-link`** - Inline "Explore" / "Discover" / "See more" link. No background; GT America 16px / 500 in `{colors.ink}`, often with a trailing arrow. The workhorse navigational CTA inside feature modules.

**`button-on-dark`** - Used over dark bands. Background `{colors.surface-dark-elevated}` (#292421) or lime, text `{colors.on-dark}`. The system keeps buttons dark-on-dark rather than inverting to a light fill, except for the lime primary.

### Cards & Containers

**`hero-band`** - Centered hero on white canvas: an announcement pill, a large `{typography.display-2xl}` GT America headline, an `{typography.body-lg}` Inter sub-headline, a `{component.button-primary}`, then a full-bleed square product image below. Vertical padding `{spacing.section}`.

**`announcement-pill`** - A small pill above the hero headline ("Duna raises $35mn Series A"). Background `{colors.surface-soft}` or a faint outline, text `{colors.body}`, rounded `{rounded.pill}`, padding 6px × 14px. Often links to a news post.

**`stat-block`** - Large numeric proof point. The number in `{typography.display-md}` (40px GT America) and a one-line label in `{typography.body-md}` beneath. Arranged 3-up over `{colors.surface-soft}` with `{spacing.huge}` gaps.

**`feature-module`** - The core repeating pattern: a Fragment Mono eyebrow (`{typography.eyebrow-mono}`), a `{typography.display-lg}` GT America headline, a short Inter description, a `{component.button-text-link}` ("Explore"), and a square product screenshot. Below it, a 4-up `{component.sub-feature}` row.

**`sub-feature`** - A compact label block inside a feature module. A `{typography.title-sm}` title (e.g. "20+ KYB modules") plus a one-line `{typography.body-sm}` description. No card chrome - separated by whitespace and optional hairlines.

**`testimonial-card`** - Pull-quote card. Background `{colors.surface-soft}` (or white with hairline), square corners. A `{typography.title-lg}` quote in GT America, then a circular portrait, the speaker name in `{typography.title-sm}`, and role in `{typography.label-mono}` (Fragment Mono).

**`product-showcase-dark`** - Full-bleed dark band (`{colors.surface-dark}` / `{colors.surface-dark-deep}`) carrying a product screenshot or AI panel, an eyebrow, a `{typography.display-lg}` headline in `{colors.on-dark}`, and a `{component.button-text-link}`. The "AI built for compliance" and immersive product moments live here.

**`news-card`** - Article tile. A square thumbnail image, a `{typography.label-mono}` category + read-time line ("Product - 7min"), and a `{typography.title-md}` title. Square corners, minimal chrome, the whole tile is the link.

**`logo-row`** - A quiet horizontal band of customer logos in monochrome under the line "Built for businesses where compliance matters." Logos sit in `{colors.muted}` tone, evenly spaced.

**`teal-band`** - A full-bleed `{colors.accent-teal}` (#46838c) section used as a chromatic rest. White text, square edges, used once or twice per page for emphasis.

### Section Blocks (page composition kit)

These are the repeating section archetypes the marketing pages assemble from. Each spans the full content width and is separated by `{spacing.section}`.

**`hero-product`** - The standard inner-page hero. A Fragment Mono eyebrow (`{typography.eyebrow-mono}`, e.g. "Onboard", "Duna AI", "Financial technology"), a `{typography.display-xl}`/`{typography.display-2xl}` GT America headline, and an `{typography.body-lg}` Inter sub-line. No image on most product/persona heroes - type on canvas, generous top padding.

**`hero-editorial`** - The company/editorial hero (About, Careers). A wide full-bleed image at top, then a `{typography.display-xl}` headline and long-form `{typography.body-lg}` narrative prose constrained to ~720–800px. Used where storytelling outranks product proof.

**`module-index-row`** - The Product-overview building block. A square product image paired with a Fragment Mono eyebrow, a `{typography.display-md}` headline, a one-paragraph description, and a `{component.button-text-link}` ("Learn more"). Rows stack and alternate image side. Used to index the six product modules from `/product`.

**`feature-split`** - The core repeating product/persona block. A `{typography.display-sm}`/`{typography.title-lg}` headline + short Inter description on one side, a square product screenshot on the other; sides alternate down the page. Often followed by a **3-up `{component.sub-feature}` row** (title + one-line description, no card chrome) sitting beneath the split.

**`module-list`** - A capability list beside an image ("Everything you need, and more"). A headline + description, then a vertical list of short labels (Business details, Legal representatives, Ownership and UBO, AML screening, …) rendered as plain text rows separated by hairlines.

**`spec-matrix`** - The "[Product] at a glance" block. A multi-column grid grouping every capability under Fragment Mono category headers (Modules, Multi-channel, Insights, Conversion, Collaboration). Each column is a header plus a dense list of `{typography.body-sm}` line items. The most information-dense block in the system; lives near the bottom of product-detail pages.

**`stat-row`** - 3-up large numeric proof points (`{component.stat-block}`). On the homepage these are static (10.6x / 37% / 4.8x); on the AI page they are **`{component.stat-counter}`** - numbers that animate from 0 on scroll into view (e.g. "0% → decrease in submission time", "0x → faster time to completion").

**`value-prop-row`** - A 3-up row of short value props: a `{typography.title-md}` title and a 1–2 line `{typography.body-md}` description each, separated by whitespace or hairlines, no card background. Used for "AI built for compliance" (Policy-driven agents / Always stay in control / Auditable decisions) and "Realize ROI, together" (Defining metrics / Tracking / Delivering outcomes).

**`decision-ui-mockup`** - A small inline product-chrome fragment showing an Accept / Decline decision control with a recommendation, used on the AI page to illustrate "Decision recommendations." Square, on a light or dark card, with the lime accent on the primary action.

**`testimonial-pullquote`** - A large standalone customer quote, sometimes full-bleed, sometimes on `{colors.surface-soft}`. A `{typography.title-lg}` quote in GT America, a circular portrait (~48–56px), the speaker name in `{typography.title-sm}`, and role in `{typography.label-mono}` (Fragment Mono). Interspersed between feature blocks. Real names/roles: Ante Spittler (CEO, Moss), Zak Lambert (GM EMEA, Plaid), Claire Hughes Johnson (Former COO, Stripe), Pieter van der Does (CEO, Adyen), Frank Slootman (Former CEO, ServiceNow/Snowflake).

**`testimonial-card`** - A smaller quote card used in 2-up arrangements; same quote/portrait/name/role anatomy at reduced scale, square corners.

**`faq-accordion`** - A stacked list of expandable question rows (AI page). Each row: a `{typography.title-sm}` question with an expand affordance; the open state reveals an `{typography.body-md}` answer. Square rows divided by hairlines. Questions like "What is Duna AI?", "Will Duna's AI hallucinate?", "What happens if Duna AI gets something wrong?".

**`next-up-carousel`** - A related-pages carousel closing product-detail pages ("Next up"). Horizontally scrollable cards linking sibling products (Decide, Lifecycle, Policy engine, Data Platform, Trust), each a title + one-line descriptor, with circular back/next arrow buttons (`{component.button-icon-circular}`, ~56px, square or circular SVG arrows).

**`cta-get-started`** - The pre-footer conversion block on most pages. A `{typography.title-lg}`/`{typography.display-sm}` "Get started" headline, a short line ("Learn more about the Duna platform. Enter your business email and we'll reach out."), an email `{component.text-input}`, and a "Schedule a demo" `{component.button-primary}` (lime).

**`logo-strip`** - A quiet horizontal row of customer/affiliation logos under a Fragment Mono label ("Built for businesses where compliance matters" / "By people who previously built" / "Join a company of people who previously built"). Logos render monochrome in `{colors.muted}`; in source the slots appear as dash placeholders, suggesting a marquee/auto-scroll treatment.

### Company & Editorial Blocks

**`founder-card`** - Used in the About "Our company" section. A square/portrait photo, the founder name in `{typography.title-md}`, the role label "Founder" in `{typography.label-mono}`, and a `{typography.body-md}` bio. Arranged 2-up (David Schreiber, Duco van Lanschot).

**`investor-list`** - A multi-column roster of backers/advisors. Each entry is a name in `{typography.title-sm}` and a role in `{typography.label-mono}` (e.g. "Jan Hammer - General Partner", "Frank Slootman - Former CEO, Snowflake"). Dense, runs many rows; no photos.

**`narrative-prose`** - Long-form editorial body used on About, Careers, and articles. Inter `{typography.body-lg}` running text in a ~720px column, with `{typography.title-sm}` bold lead-ins on paragraphs (e.g. "**People.**", "**Culture.**") and occasional `#####` sub-heads. This is the only place the system runs sustained paragraphs.

**`foundational-doc-card`** - Link cards on Careers pointing to culture docs (What's in it for you?, Why we love working here, Operating principles, Transparent by default). Square, hairline-bordered, title + arrow.

### News & Article Blocks

**`news-featured-card`** - The lead item on the News index and homepage News section. A large wide image with an overlaid or adjacent `{component.article-meta}` line and a `{typography.title-lg}` title; the whole card links to the article.

**`news-card`** - A standard article tile in the index grid. Optional square thumbnail, an `{component.article-meta}` line, and a `{typography.title-md}` title. Square corners, whole tile tappable. Grid is ~2–3 up at desktop.

**`article-meta`** - The Fragment Mono metadata line attached to every article: a category and read-time/medium, formatted "Category - X min read / watch / listen". Categories in use: Company, Insights, Media, Product, Conversations.

**`article-detail`** - The long-form post template (e.g. `/news/series-a`). A `{component.hero-editorial}`-style header (title + `{component.article-meta}` + author/date), an optional lead image, then `{component.narrative-prose}` body in a ~720px column, closing with a `{component.cta-get-started}` and footer.

### Careers Blocks

**`job-group`** - A department heading (`{typography.title-sm}` / Fragment Mono, e.g. "Engineering", "Design", "Growth", "Other", "Open applications") above its role rows.

**`job-listing-row`** - A single open role: the role title as a link, inline level badges (`{component.badge-pill}` - Senior / Staff / Principal / Junior) and a location badge (Remote / Onsite). Links out to the Ashby ATS.

### Inputs & Forms

**`text-input`** - Standard input. Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.body-md}`, 1px `{colors.hairline-strong}` border, rounded `{rounded.sm}` (8px), padding 12px × 16px, height ~48px.

**`text-input-focused`** - Focus shifts the border to `{colors.ink}` or a faint lime ring; minimal, no heavy glow.

**`form-split`** - The "Get started" / contact layout (`/forms/get-in-touch`). A two-column split: a full-bleed image on one side, the form on the other. The form stacks `{component.text-input}` fields (name, business email, company), a `{component.select-field}`, and a "Schedule a demo" `{component.button-primary}` (lime). Header is a `{typography.display-md}` "Get started" with a short Inter sub-line.

**`select-field`** - A dropdown / radio group, e.g. "How did you hear about us?" with options: Google search · AI assistant (ChatGPT, Claude, Perplexity, Gemini, etc.) · Social media (e.g. LinkedIn) · Word of mouth · Event, press, or podcast · Other. Same border, height, and 8px radius as `{component.text-input}`.

### Tags / Badges

**`badge-pill`** - Category/status pill. Background `{colors.surface-soft}`, text `{colors.body}`, type `{typography.label-mono}` (Fragment Mono 12px), rounded `{rounded.pill}`, padding 4px × 12px.

**`badge-lime`** - Rare highlight badge. Background `{colors.primary}` (#aeec1d), text `{colors.on-accent}` (#1a1816), rounded `{rounded.pill}`. Reserve for genuine "new / featured" moments.

**`status-dot`** - A small lime or success-green circle (`{rounded.full}`) for active/available indicators.

### CTA / Footer

**`cta-band`** - Pre-footer conversion band. Either a dark `{colors.surface-dark}` band or the `{component.teal-band}`, carrying a `{typography.display-lg}` headline and a `{component.button-primary}` (lime). Square edges, full-bleed.

**`footer`** - Dark warm-charcoal footer closing every page. Background `{colors.surface-dark}` (#1a1816), text `{colors.on-dark-muted}`. A multi-column link list grouped under Fragment Mono headers - **Product** (Onboard, Decide, Lifecycle), **Platform** (Duna AI, Policy engine, Data platform), **Industries** (Financial technology, Banking, Platforms), **Customers** (Compliance, Revenue, Technology), **Company** (About, News, Careers, Foundation), **Resources** (Trust, Status, Press, Resources Hub). Below the columns: the Duna wordmark, "© Duna 2026", and legal links (Privacy Policy, Security) in `{typography.label-mono}` / `{typography.body-sm}`. The footer never inverts to light.

**`ai-summary-links`** - A distinctive footer module: "Get an AI summary of Duna:" followed by three links that open Claude, ChatGPT, and Gemini pre-filled with a prompt to summarize duna.com. A deliberate AI-native brand signal; appears in the footer on product pages.

## Page Templates & Sitemap

Every page draws from the same global tokens and the section-block kit above. This maps each route to its section stack, top to bottom, so any page can be rebuilt. Shared chrome (`{component.top-nav}` at top; `{component.cta-get-started}` + `{component.footer}` + `{component.ai-summary-links}` at bottom) is implied on every page unless noted.

### Sitemap

- **Home** - `/`
- **Product overview** - `/product`
- **Product detail** - `/product/onboard`, `/product/decide`, `/product/lifecycle`, `/product/policy-engine`, `/product/data-platform`
- **Duna AI** - `/product/ai`
- **Industries** - `/customers/industries/financial-technology`, `/banking`, `/platforms`
- **Teams** - `/customers/teams/compliance`, `/revenue`, `/technology`
- **Company** - `/about`, `/news`, `/careers`, `/foundation`
- **Resources** - `/resources/trust`, `/resources/privacy-policy`, `/press`, external `status.duna.com`
- **Forms** - `/forms/get-in-touch`
- **Articles** - `/news/{slug}`

### Home (`/`)
1. `{component.hero-band}` - announcement pill ("Duna raises $35mn Series A"), display-2xl headline ("The new standard in compliance"), Inter sub-line, "Get started" `{component.button-primary}`, full-bleed product image.
2. `{component.logo-strip}` - "Built for businesses where compliance matters."
3. `{component.stat-row}` - "Designed to convert. Built to scale." → 10.6x faster onboarding / 37% conversion increase / 4.8x analyst efficiency, with three value props (Drive revenue / Future-proof compliance / Reduce costs).
4. `{component.testimonial-pullquote}` - "Trusted by leaders" (Ante Spittler, CEO Moss).
5. `{component.product-showcase-dark}` - "AI built for compliance." eyebrow + headline + "Discover Duna AI" link.
6. Four `{component.feature-split}` blocks, each with a Fragment Mono eyebrow + 4-up sub-features: **Onboard**, **Decide**, **Lifecycle**, **Data platform**.
7. `{component.feature-split}` - "Safe and secure" (Trust) with "Explore" link.
8. News section - `{component.news-featured-card}` + `{component.news-card}`s, "See more" link.

### Product overview (`/product`)
1. `{component.hero-product}` - "The compliance engine powering better business." + product image.
2. Six stacked `{component.module-index-row}` blocks (alternating image side): **Policy Engine**, **Onboard**, **Decide**, **Lifecycle**, **Data Platform**, **Trust** - each with eyebrow, headline, description, "Learn more."
3. `{component.testimonial-pullquote}` - Claire Hughes Johnson (Former COO, Stripe).

### Product detail (`/product/onboard`, `/decide`, `/lifecycle`, `/policy-engine`, `/data-platform`)
The shared product template:
1. `{component.hero-product}` - Fragment Mono eyebrow (module name) + display headline + sub-line.
2. `{component.module-list}` - "Everything you need, and more" - capability list beside product image.
3. One or more `{component.feature-split}` blocks ("Designed for conversion", "Collect all information in one go", "Fully customizable onboarding", "Global reach, local expertise", "Understand complex ownership structures"), several with 4-up sub-feature rows.
4. `{component.testimonial-pullquote}` (often two - e.g. David Backstrom seQura, Zak Lambert Plaid).
5. `{component.spec-matrix}` - "[Module] at a glance" with categorized capability columns.
6. `{component.next-up-carousel}` - "Next up" related modules with arrow controls.
7. `{component.cta-get-started}` → footer (+ `{component.ai-summary-links}`).

### Duna AI (`/product/ai`)
The product template with AI-specific blocks:
1. `{component.hero-product}` - "Automate onboarding with Duna AI."
2. `{component.value-prop-row}` - "AI built for compliance" (Policy-driven agents / Always stay in control / Auditable decisions).
3. `{component.testimonial-pullquote}` - Zak Lambert, Plaid.
4. `{component.stat-row}` as `{component.stat-counter}` - "Increase your team's impact" (animated 0% / 0x).
5. `{component.feature-split}` - "Reduce effort. Increase output" with a `{component.decision-ui-mockup}` (Accept / Decline), Document validation / Screening optimisation / Website monitoring / Smart summaries.
6. Two `{component.testimonial-card}`s (Matthijs Welle Mews, Ante Spittler Moss).
7. `{component.faq-accordion}` - "FAQ".

### Industry & Team pages (`/customers/industries/*`, `/customers/teams/*`)
Persona-framed pages on the same chassis. Industries target a vertical (Financial technology, Banking, Platforms); Teams target a buyer (Compliance, Revenue, Technology). Stack:
1. `{component.hero-product}` - persona eyebrow + benefit headline ("Where compliance meets conversion").
2. Three to four `{component.feature-split}` blocks grouped by theme (Revenue/conversion → Compliance controls → Case management → Data) each with 3–4-up sub-features.
3. `{component.testimonial-pullquote}`s interspersed between blocks (Pieter van der Does, Araba Eshun, Frank Slootman).
4. `{component.value-prop-row}` - "Realize ROI, together" (Defining metrics / Tracking and accelerating / Delivering business outcomes).
5. `{component.cta-get-started}`.

### About (`/about`)
1. `{component.hero-editorial}` - wide image + "Identity is one of the internet's biggest unsolved problems" + `{component.narrative-prose}` mission narrative.
2. "Our company" - two `{component.founder-card}`s (David Schreiber, Duco van Lanschot).
3. `{component.logo-strip}` - "By people who previously built."
4. "Our investors" - `{component.investor-list}` (multi-column backers/advisors).
5. "News" - `{component.news-card}`s.
6. "Press" - download CTA → `/press`.

### Careers (`/careers`)
1. `{component.hero-editorial}` - image + "Building a unique company" + "A letter from our founders" `{component.narrative-prose}` (bold lead-ins: People / Culture / Ambition / Ethical by design).
2. "Foundational documents" - four `{component.foundational-doc-card}`s.
3. `{component.logo-strip}` - "Join a company of people who previously built."
4. `{component.testimonial-card}`s (David Singleton, Akshay Kothari, Jorn van Dijk).
5. "Open positions" - `{component.job-group}` headers (Engineering / Design / Growth / Other / Open applications) with `{component.job-listing-row}`s linking to Ashby.
6. "Feedback" - `{component.narrative-prose}` with contact emails.

### News index (`/news`)
1. `{component.news-featured-card}` - lead Series A story with large image.
2. `{component.news-card}` grid - every post with `{component.article-meta}` (Company / Insights / Media / Product / Conversations + read-time).

### Article detail (`/news/{slug}`)
`{component.article-detail}` - editorial header (title + `{component.article-meta}` + author/date), optional lead image, `{component.narrative-prose}` body in ~720px column, `{component.cta-get-started}`, footer.

### Get in touch / demo (`/forms/get-in-touch`)
`{component.form-split}` - image + "Get started" form (name, business email, company, `{component.select-field}` "How did you hear about us?", "Schedule a demo" submit). Minimal page chrome, then footer.

### Resource & legal pages (`/resources/trust`, `/resources/privacy-policy`, `/press`, `/foundation`)
Lighter editorial pages on canvas. **Trust** ("Engineered for integrity") pairs `{component.feature-split}` security blocks with links to a security center. **Press** offers a media-kit download. **Foundation** uses `{component.hero-editorial}` + `{component.narrative-prose}` for the non-profit story. **Privacy Policy** is a single `{component.narrative-prose}` column. **Status** links out to `status.duna.com`.



### Do
- Anchor on the warm near-white canvas and let large neutral bands do the structural work. Warm white, not cool gray, is the differentiator.
- Use GT America for every headline and UI label, Inter for body, Fragment Mono for eyebrows. The three-voice split is the system.
- Open every major section with a Fragment Mono eyebrow before the GT America headline lands. It is the brand's signature pattern.
- Keep corners square (`{rounded.none}`) on cards, images, and bands. Soften only buttons (8px) and badges (pill).
- Reserve `{colors.primary}` (lime) for primary CTAs, status dots, and rare highlights - one or two appearances per viewport.
- Use the `{component.teal-band}` and dark bands as full-bleed color rests between white sections to pace the page.
- Show real product screenshots at full fidelity in square crops rather than abstract illustration.
- Apply `{spacing.section}` (~120px) between major bands; give stat blocks room to breathe.
- Compose pages from the section-block kit rather than inventing new layouts. Product, industry, and team pages are the same chassis - `{component.hero-product}` → alternating `{component.feature-split}` → `{component.testimonial-pullquote}` → `{component.cta-get-started}` - reskinned with different eyebrows and copy.
- Open product-detail pages with a `{component.module-list}` and close them with a `{component.spec-matrix}` and `{component.next-up-carousel}`. That bookending is the product-page signature.
- Switch to the editorial layout (`{component.hero-editorial}` + `{component.narrative-prose}`) only for company and article pages (About, Careers, News, Foundation). Keep product pages on the block kit.
- Keep the Fragment Mono `{component.article-meta}` line ("Category - X min read") on every news item.

### Don't
- Don't use cool corporate blue or pure cold gray. The warm-neutral spine and warm charcoal are the brand.
- Don't bold the display type. GT America stays at 400–500; scale and tracking carry emphasis.
- Don't drop the negative letter-spacing on headlines - loose GT America reads generic.
- Don't round cards or images "to soften them." Square geometry is the architectural signal.
- Don't spread lime across the page. It loses all voltage if it appears more than once or twice per view.
- Don't put white text on the lime accent - lime needs dark `{colors.on-accent}` ink.
- Don't introduce a fourth saturated hue. The palette is warm-neutral plus lime plus teal, full stop.
- Don't skip the mono eyebrow - section headers feel unbranded without it.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Hamburger nav; hero display 80→40px; stat row stacks 1-up; feature sub-rows 4→1; product images full-width square; footer columns collapse to 1–2 |
| Tablet | 768–1024px | Nav tightens but stays horizontal; stat row 3-up holds or goes 2-up; sub-features 2-up; reading columns ~720px |
| Desktop | 1024–1440px | Full nav; 3-up stats; 4-up sub-feature rows; feature module image beside or below copy; container ~1200px |
| Wide | > 1440px | Same as desktop with more outer gutter; content caps at 1200px |

### Touch Targets
- `{component.button-primary}` at ~48px height - comfortably above 44px.
- `{component.text-input}` height ~48px.
- News and feature cards are fully tappable; effective tap area well over 44px.

### Collapsing Strategy
- Top nav collapses to a hamburger sheet below 768px.
- The hero stays single-column at all sizes; the product image moves full-width beneath the copy on mobile.
- Stat blocks stack vertically, preserving the large GT America numerals.
- Sub-feature rows reduce columns (4 → 2 → 1) rather than shrinking type.
- Product screenshots scale proportionally and keep square corners at every breakpoint.

### Image Behavior
- Product screenshots scale to container width, square crop preserved.
- Customer logos wrap to multiple rows on mobile, staying monochrome.
- Testimonial portraits hold their circular crop at every breakpoint.

## Iteration Guide

1. Work one component at a time and reference its token key (`{component.feature-module}`, `{component.product-showcase-dark}`).
2. Variants (`-active`, `-disabled`, `-focused`) live as separate entries under `components:`.
3. Use `{token.refs}` everywhere - never inline hex.
4. Document default and active/pressed states only; skip hover.
5. Headlines stay GT America 400–500 with negative tracking. Body stays Inter. Eyebrows stay Fragment Mono. The three-voice split is fixed.
6. Warm-neutral spine + lime + teal is the whole palette. No fourth hue.
7. When emphasis is needed: larger GT America and more whitespace before more color.
8. Keep corners square unless the element is a button or a badge.

## Known Gaps

- GT America and Fragment Mono are licensed faces and not freely available as web fonts. Substitutes (Archivo / Neue Haas Grotesk / tighter Inter for display; JetBrains Mono / Space Mono for the mono voice) are documented in the typography section.
- The site is built in Framer, so spacing and breakpoints are extracted from rendered output and approximated to a 4px scale rather than read from an authored token file. Treat the spacing values as close approximations.
- **Page coverage.** Section stacks were verified directly from these routes: `/`, `/product`, `/product/onboard`, `/product/ai`, `/customers/industries/financial-technology`, `/about`, `/news`, `/careers`, `/forms/get-in-touch`. The remaining product modules (`/decide`, `/lifecycle`, `/policy-engine`, `/data-platform`), the other industries (`/banking`, `/platforms`), the team pages (`/compliance`, `/revenue`, `/technology`), and the resource pages (`/resources/trust`, `/press`, `/foundation`, `/resources/privacy-policy`) reuse the documented templates; their stacks are mapped by archetype, so confirm exact section order and copy against the live pages when rebuilding them.
- `{component.article-detail}` is mapped from the news index metadata and the editorial prose patterns seen on About/Careers; pull one or two live article pages to confirm in-body media (block quotes, inline images, embedded video for "Conversations" posts).
- The deep-plum tone (#1b0624) and teal-to-charcoal gradients appear inside imagery; exact gradient stops and any motion/parallax on the product showcases are out of scope.
- Animation and transition timings are not captured here: the homepage News and `{component.logo-strip}` marquees, the `{component.stat-counter}` count-up on the AI page, `{component.next-up-carousel}` scroll, `{component.faq-accordion}` expand, and `{component.nav-dropdown}` open. The dash-placeholder logo slots in source suggest an auto-scrolling marquee.
- Form validation/success states beyond focus, and any in-product application chrome (the actual Duna platform UI: case queues, policy editor, AI panels) share tokens with the marketing site but add many product-specific components out of scope for this marketing-surface document.
- Exact lime active/disabled and teal-deep values are derived approximations, not lifted from a published token; confirm against brand source if available.