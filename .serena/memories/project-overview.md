# AED Karlovo — project overview

Static site (no build step): a Leaflet map of public AED defibrillators in Община Карлово, plus a first-aid guide. Vanilla HTML/CSS/JS, no framework, no dependencies bundled locally (Leaflet from unpkg CDN).

## Files
- `index.html` — the map (Leaflet + OSM tiles). Loads `data/defibrillators.geojson` (6 AED points, Карлово + Сопот). Has "Най-близкият до мен" (geolocation), emergency 112 bar, PWA install button, link to the first-aid page.
- `pomosht.html` — first-aid guide (served at `/pomosht`). Sections w/ anchors: razpoznavane, stapki, kompresii, aed, vazstanovitelno, zadavyane (choking), deca (paediatric), veriga, mitove.
- `sw.js` — service worker. Offline shell precache + network-first HTML + network-first geojson + cache-first OSM tiles (capped 350). Bump `VERSION` when precached static assets change.
- `manifest.webmanifest`, `icons/`, `favicon.*`, `og.png/svg` — PWA + SEO assets.
- `robots.txt`, `sitemap.xml` — SEO.
- `_headers` — Cloudflare headers (CSP-ish security headers, cache-control, manifest content-type).
- `img/` — first-aid images (see image policy below).

## Hosting & deploy
See `mem:aed-karlovo-hosting` equivalent (harness memory `aed-karlovo-hosting.md`): Cloudflare **Worker** `avd-karlovo` w/ Static Assets, custom domain `aed.karlovo.net`. **Deploy = `git push origin master`** (Cloudflare Workers Builds auto-deploys from GitHub `escapeboy/aed-karlovo`). **`.html` is trimmed** → use extensionless URLs everywhere (`/`, `/pomosht`), never `.html`.

## Design system (reuse in any new page)
CSS variables in `:root`: `--aed:#008a3e` / `--aed-d:#006e31` (brand green), `--emergency:#d6201f` (red — **only** for the 112 bar / 112 emphasis), `--ink`, `--muted`, `--surface`, `--bg`, `--line`, `--r:12px`, `--shadow`. system-ui fonts, mobile-first, `:focus-visible`, `prefers-reduced-motion`, print stylesheet, safe-area insets. Same `.er` 112 bar at top of every page.

## Medical content rules (life-safety — verified, not from memory)
First-aid content follows **ERC Guidelines 2025** (current; replaced ERC 2021), cross-checked via Resuscitation Council UK pages; БЧК (firstaid.redcross.bg) cited for training. Sources + version cited in the page footer. Key verified numbers: adult compressions 5–6cm, 100–120/min, 30:2; **2025 change**: call 112 first (then check breathing); child 15:2 (trained)/30:2, ~5cm, 5 initial breaths; infant **two-thumb encircling** (2025 change, not two fingers), ~4cm; choking adult/child = 5 back blows + 5 abdominal thrusts, infant = 5 back blows + 5 chest thrusts (NO abdominal); paediatric AED anteroposterior pads <25kg, adult AED OK if no paediatric.

## Image policy (user-enforced)
Technique diagrams must be **credible, freely-licensed** images (CC / public-domain), cited with author+license, and must not contradict the verified text. Wikimedia Commons sources used: OpenStax (CPR), BruceBlaus (AED), U.S. Army PD (recovery, Heimlich), Trakotako (back blows). **User dislikes custom hand-drawn SVGs** — removed all anatomical custom SVGs; if no good free image exists, prefer NO image over a custom drawing. (Only the BLS flowchart remains as own SVG — labelled boxes, not an illustration.)

## Text/tone
Bulgarian, calm, imperative, short sentences. Avoid jargon — laypeople audience. Simplified terms applied: "задавяне" (not обструкция), "детски" (not педиатрични), "агонално дишане" (not "агонални хватки"), "шанс за оцеляване" (not преживяемост), "разряд с AED" gloss for дефибрилация, "детски режим" gloss for атенюатор.
