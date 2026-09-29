# Changelog

All notable changes to this site will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.5.0] - 2026-09-29

### Added

- A live weather tile in the Home Assistant example view. It shows the current temperature, the city and the conditions for the visitor's approximate location, in German or English. The location comes from Cloudflare's coarse IP geolocation inside the Worker (rounded to about 10 km, no permission prompt), the forecast from MET Norway (CC BY 4.0, credited in the view's footnote). The tile loads only when the view scrolls into view and stays hidden if anything fails.
- `worker/`: a `GET /weather` route, limited to requests from raystudio.ch, with a ten minute cache.

### Changed

- `PRIVACY.md` describes the weather lookup.
- The footnote of the Home Assistant view says that only the weather is live.

## [0.4.0] - 2026-09-29

### Added

- A contact form with name, reply address and message, so that visitors without a GitHub account can reach the site owner. The GitHub issue button stays as a second way in. The form is protected by Cloudflare Turnstile, whose script loads only after the first click into the form, plus a hidden honeypot field.
- `worker/`: the Cloudflare Worker behind the form. It accepts requests only from raystudio.ch, verifies the Turnstile token server side, validates length and format of every field and forwards the message by mail through Resend, sent from `kontakt@raystudio.ch` (domain verified in Resend), with the visitor's address as reply address. Recipient address and API keys live in Worker secrets, not in the repository.

### Changed

- `PRIVACY.md` no longer says the site has no forms and names Cloudflare Turnstile, Cloudflare Workers and Resend.
- The form stays hidden until `CONTACT_ENDPOINT` and `TURNSTILE_SITEKEY` in `index.html` are set, so the page shows only the GitHub button until the Worker is deployed.

## [0.3.0] - 2026-09-04

### Added

- A menu button on screens narrower than 960px. Below that width the navigation bar was hidden with `display:none` and nothing took its place, so all seven sections were unreachable on a phone except by scrolling the full page. The button opens a panel with the same targets as the desktop bar plus the enquiry call to action, carries `aria-expanded` and `aria-controls`, closes on Escape, on a tap on any entry, and when the window grows back past 960px.

### Changed

- The topology diagram is labelled in plain words instead of trade abbreviations: ISP became Internet, AP became WLAN, NAS became Speicher, and the centre node reads Router rather than Cloud Gateway. Terms that are common currency in German stay as they are: Switch, Router and Smart Home. Each node also carries the same icon its tooltip already used, and the labels sit outside the circles so whole words fit. The labels went into the translation table, so the language switch now takes them along; they were hard-coded in the SVG before and stayed German in the English version.
- `applyLang` writes to `textContent` for SVG elements. `innerHTML` on SVG nodes is not available in every browser this site targets, and the diagram labels are the first translated elements inside an SVG.

### Fixed

- Content no longer flashes empty when jumping across the page. Every `.fade` element sat at `opacity:0` until an IntersectionObserver fired, and the reveal then took 0.65s plus up to 0.21s of stagger. After an End key press, an anchor click or a fast swipe, the destination therefore built up over roughly a second while the visitor looked at empty colour fields. The rule is now unambiguous: anything still below the viewport fades in as before, anything already on screen and not yet revealed is set without a transition. Because the switch happens synchronously inside the scroll event and forces a layout pass before the transition is restored, the change is committed in the same frame the browser is about to paint. Setting the class alone was not enough; no style recalculation happened before the class was removed again, so the browser animated anyway.

- The sticky header no longer flickers. `contain:paint` and `backdrop-filter` sat on the same element, and `contain:paint` establishes a new backdrop root, which is precisely the surface the blur is supposed to sample. On top of that the page alternates seven times between dark and light sections, so the translucent bar changed colour at every boundary. The header is now opaque and drops the blur along with the GPU hints that were meant to work around the flicker; its bottom edge fades in after the first scroll instead.

## [0.2.0] - 2026-09-03

### Added

- Two new sections between the ICT services and the stack: `02 / Netzwerk & Internetsicherheit` and `03 / Smart Home mit Home Assistant`. The first explains DNS filtering with AdGuard Home or Pi-hole, the gateway rules that keep a device from slipping past that filter, and separate networks for guests and smart devices. The second explains what Home Assistant actually does for a household, with HomeKit as a side note rather than the headline. Both carry a recreated example dashboard, labelled as such: no live data and no real device names, because a genuine screenshot of either would put internal addresses and device names into a public repository.
- An "Im Klartext" box in every section that says in everyday language what the section means for the reader. The technical keyword lists stay untouched underneath, so the page reads for someone who knows nothing and for someone who knows the products.

### Changed

- The prose across all sections is roughly half as long and no longer leans on jargon. Entra ID, VLAN, access point, MFA and IoT no longer appear in running text, only in the keyword lists where they belong. The page addresses the reader informally throughout, as it already did.
- Section numbering and the light/dark alternation were renumbered for the two additions: stack is now 04, developer tools 05, process 06, contact 07.

### Fixed

- The sticky header no longer flickers while scrolling. `body{overflow-x:hidden}` had turned the body into a scroll container, which detached the sticky header from the viewport; combined with the `backdrop-filter` blur and the fixed noise overlay behind it, the browser recomposited the bar on every scroll frame. The page now uses `overflow-x:clip`, the header and the overlay each get their own compositing layer, and the missing `-webkit-backdrop-filter` was added for Safari.
- Clicking a navigation link no longer hides the start of a section behind the header, via `scroll-padding-top` and `scroll-margin-top`.

---

## [0.1.6] - 2026-07-31

### Changed

- Both READMEs now say plainly that this repository is the source of raystudio.ch and that the site, not the repository, is the thing worth looking at. Anyone here for the tools is pointed at the other repositories or at the site, which reads better than a repository listing.

---

## [0.1.5] - 2026-07-30

### Changed

- Three tools are listed under their new names: MailPilot is now MailLoom, NetScanX is NetFathom, and SwiftAgent is EmissaryKit. Each was renamed because another product carried the same name in the same category. GitHub redirects the old repository URLs, so nothing was broken, but a portfolio page that lists a tool under a name it no longer uses is its own kind of wrong.
- The repository list feeding the dashboard names `NetFathom` as well. That list is matched against the GitHub API, where a stale name would have kept working through the redirect while quietly showing the wrong label.

---

## [0.1.4] - 2026-07-17
### Added
- Count badge (hits.sh, single cumulative number) next to the existing badges in README.md. No login/account needed.
- Live visitor counter in the site footer, next to "Systeme laufen" / "systems operational", both languages. Same hits.sh counter (`www.raystudio.ch` key), rendered as an image (fetch() isn't usable here since hits.sh doesn't send CORS headers).

## [0.1.3] - 2026-07-12
### Added
- Third pill in the "more tools" footer, linking to entra-access-graph-engine's live CodeQL code-scanning page, alongside the existing "all projects" and "engineering standards" links.

## [0.1.2] - 2026-07-11
### Changed
- Updated the "Weitere Tools" / "More tools" card selection on the landing page: replaced agent-governance-console, entra-least-privilege-analyzer and SiliconMark with MailPilot, LifePlanner and LogLens (tools with real installers), kept NetSweep

## [0.1.1] - 2026-07-10
### Fixed
- Removed em-dash from CHANGELOG.md date header, replaced with plain hyphen

## [0.1.0] - 2026-06-13
### Added
- Initial import: portfolio landing page
- Developer tools showcase section
- GitHub Pages deployment
