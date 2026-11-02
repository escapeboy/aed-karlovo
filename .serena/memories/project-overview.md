# AED Karlovo — project overview

Static site (no build step): a Leaflet map of public AED defibrillators in Община Карлово, plus a first-aid guide. Vanilla HTML/CSS/JS, no framework, no dependencies bundled locally (Leaflet from unpkg CDN). **Fully built & deployed/live** as of this work (mobile fix, PWA, SEO, first-aid page, content simplification, map-centering fix all on `master`).

## Files
- `index.html` — the map (Leaflet + OSM tiles). Loads `data/defibrillators.geojson` (6 AED points, Карлово + Сопот). Has "Най-близкият до мен" (geolocation), emergency 112 bar, PWA install button, link to the first-aid page.
- `pomosht.html` — first-aid guide (served at `/pomosht`). Sections w/ anchors: razpoznavane, stapki, kompresii, aed, vazstanovitelno, zadavyane (choking), deca (paediatric), veriga, mitove.
- `sw.js` — service worker. Offline shell precache + network-first HTML + network-first geojson + cache-first OSM tiles (capped 350). Bump `VERSION` only when precached static assets change (HTML is network-first so HTML-only edits need no bump). Current VERSION `aed-v7`.
- `manifest.webmanifest`, `icons/`, `favicon.*`, `og.png/svg` — PWA + SEO assets.
- `robots.txt`, `sitemap.xml`, `_headers` (Cloudflare headers).
- `img/` — first-aid images (see image policy).

## Hosting & deploy (see harness memory `aed-karlovo-hosting.md` for IDs/API)
Cloudflare **Worker** `avd-karlovo` w/ Static Assets, custom domain `aed.karlovo.net`. **Deploy = `git push origin master`** (Cloudflare Workers Builds auto-deploys from GitHub `escapeboy/aed-karlovo`, ~30–90s). **`.html` is trimmed** (`/index.html`→307→`/`, `/pomosht.html`→307→`/pomosht`) → use extensionless URLs everywhere (links, canonical, og:url, sitemap, SW precache); never `.html` or you get redirect hops + SW cache.add failures. curl/WebFetch are blocked by a context-mode hook → verify live via ctx_execute python (socket + SNI to 104.21.3.85) or the browser.

## Design system (reuse in any new page)
CSS vars in `:root`: `--aed:#008a3e`/`--aed-d:#006e31` (brand green), `--emergency:#d6201f` (red — **only** for the 112 bar / 112 emphasis), `--ink`,`--muted`,`--surface`,`--bg`,`--line`,`--r:12px`,`--shadow`. system-ui fonts, mobile-first, `:focus-visible`, `prefers-reduced-motion`, print stylesheet, safe-area insets. Same `.er` 112 bar at top of every page.

## Map interaction (index.html `focusPoint`)
"Покажи на картата" centers a marker. Popups are bound with `{autoPan:false}` and the marker is centered with a small downward pixel offset (project/unproject, 45px mobile / 30px desktop) — otherwise Leaflet's popup autoPan shoves the marker to the bottom edge of the short (46dvh) mobile map. On mobile, `focusPoint` first scrolls the map into view. Map layout was the original mobile bug: base `.layout` must be `flex-direction:column` (map on top ~46dvh, list below); `row` only at ≥880px.

## Medical content rules (life-safety — verified, not from memory)
Follows **ERC Guidelines 2025** (current; replaced 2021), cross-checked via Resuscitation Council UK; БЧК (firstaid.redcross.bg) cited for training. Sources+version in page footer. Verified: adult 5–6cm, 100–120/min, 30:2; **2025**: call 112 first then check breathing; child 15:2 (trained)/30:2, ~5cm, 5 initial breaths; infant **two-thumb encircling** (2025 change, not two fingers), ~4cm; choking adult/child = 5 back blows + 5 abdominal thrusts, infant = 5 back blows + 5 chest thrusts (NO abdominal); paediatric AED anteroposterior pads <25kg, adult AED OK if no paediatric.

## Image policy (user-enforced)
Technique diagrams must be **credible, freely-licensed** images (CC / public-domain), cited author+license, must not contradict the text. Sources used: OpenStax (CPR), BruceBlaus (AED), U.S. Army PD (recovery, Heimlich), Trakotako (back blows). **User dislikes custom hand-drawn SVGs** — removed all anatomical custom SVGs; if no good free image exists, prefer NO image over a custom drawing. Only the BLS flowchart remains as own SVG (labelled boxes, not an illustration).

## Text/tone
Bulgarian, calm, imperative, short sentences, layperson audience. Simplified terms applied: "задавяне" (not обструкция), "детски" (not педиатрични), "агонално дишане" (not "агонални хватки"), "шанс за оцеляване" (not преживяемост), "разряд с AED" gloss for дефибрилация, "детски режим" gloss for атенюатор, "Операторът на 112" (not диспечер), "високоговорител" (not спикър) in body text.
