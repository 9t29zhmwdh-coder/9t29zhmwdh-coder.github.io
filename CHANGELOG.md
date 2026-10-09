# Changelog

All notable changes to this site will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.9.1] - 2026-10-09

### Fixed

- In Safari the logo jumped by about 18 pixels shortly before the shooting star landed. The logo column fades in from below when the page loads, and the position of the videos was measured while it was still moving. Safari fires the `load` event late (it waits for the videos), and only then the position was corrected. The videos are now placed from the layout position, which does not include the fade-in movement, so they stand in the right place from the first second and never jump. Checked in the browser: one single position from the start, at most 0.5 pixel from the final logo (rounding).

## [0.9.0] - 2026-10-09

### Changed

- The hero animation no longer breaks the logo tile. When the shooting star reaches the star of the logo, a burst of light shoots out of it: a soft warm glow (white in the core, then yellow, amber at the edge) with about 150 fine rays of different lengths and a few long camera-style streaks. It lights up the whole logo and reaches far beyond the tile, through the whole hero area behind the text. At the peak the tile is completely covered, the logo is swapped, and the light fades after about 0.6 seconds. What remains is the new logo as light lettering with a warm tail and star.
- After the burst the star flashes twice more, the edges of the letters that face the star catch the light, and one soft streak of light runs over the letters. Then everything stands still.
- The leaf veins and the stone break from 0.8.0 are gone. The logo video is about 0.14 MB smaller, the background video got bigger (up and to the right) so that the rays are not cut off. Both videos together are about 0.5 MB. The letters sit at the same position before and after the swap (measured on the finished video: at most 1 pixel off).

## [0.8.0] - 2026-10-09

### Changed

- The hero animation now ends with a breakout. The shooting star flies into the logo tile, and while it travels, short leaf-like veins grow along its path: a thin central vein at the entry point that gets thicker towards the star, with short side veins that grow longer the closer they are to the star. After the landing the tile breaks into stone pieces along these veins, starting at the entry point at the lower left and running along the vein towards the star. The pieces fall away sideways and fade out, with small splinters and dust along the break front.
- What remains is the logo as light lettering (cream with a soft teal tint) with a warm glowing tail and star. The star flashes three times, and on every flash the edges of the letters that face the star catch the light. After that one soft streak of light runs over the letters and everything stands still.
- The logo video now covers a larger area behind the text, with exactly the hero colour, and draws the shooting star and the shock waves itself, so the star stays visible all the way into the tile. The still logo stays as the fallback and is shown again if the video cannot play. Visitors who prefer reduced motion see only the still logo.
- Both videos together are about 0.6 MB. On small screens the videos start later in the clip, shortly before the star enters the picture, so nobody waits for it. Checked at 320, 390, 430 and 768 pixels wide: no sideways scrolling, the text stays readable.

## [0.7.2] - 2026-10-09

### Fixed

- On phones and tablets the shooting star started outside the visible area, so it took visibly long until it appeared. The page now works out from the real flight path and the window size when the star first enters the picture, and starts both videos shortly before that (about 2.4 seconds into the clip at 390 and 430 pixels wide). The shock waves and the shaking text keep the same time. On wide screens nothing changes.

## [0.7.1] - 2026-10-09

### Removed

- The visitor counter in the footer and the count badge in the README. Both loaded an image from the third-party service hits.sh, which counts every visit and is blocked by many filters. The site no longer contacts hits.sh at all.

## [0.7.0] - 2026-10-09

### Changed

- The hero logo no longer loops. After about one second a shooting star appears at the lower left, flies on a measured arc that joins the golden ray of the logo exactly, grows and brightens as if it came from far away, lands in the star of the logo, and the star flashes three times. Then everything stays still. It plays once per page load.
- When the shooting star breaks through, soft pressure waves run through the hero (video behind the text) and the text itself shakes: every word, headline line and button is pushed away from the wave front while it passes, then swings back. The waves grow with the size of the shooting star.
- Two short videos start together (background flight and logo landing, 0.15 MB in total). The background video has exactly the hero colour, so no box is visible, also in Safari. The page is checked at 390, 430, 544 and 892 pixels wide: no sideways scrolling, text stays readable.
- When the shooting star lands, a second, smaller burst of waves runs out of the star (up to one logo width), golden inside the logo and teal outside. The text shakes a second time. The edge mask on the background video is gone, which also makes playback lighter in Safari.
- Visitors who prefer reduced motion, or browsers that cannot play the video, still see the plain logo.

## [0.6.2] - 2026-10-09

### Fixed

- The Apple logo in the device tile looked stretched. It was squeezed into a square, but the logo is taller than wide. It now keeps its real proportions.

## [0.6.1] - 2026-10-09

### Fixed

- The three dark cards in the security section now react to the pointer like the light cards above: they lift, show the teal line along the bottom edge, and the icon tilts slightly before it turns into the image on hover.

## [0.6.0] - 2026-10-09

### Added

- The logo in the hero area is now a short looping video instead of a still image: a small golden light travels along the ray, then the star flashes three times. The loop is 4.5 seconds, about 38 kilobytes. Visitors who prefer reduced motion still see the plain logo, which is also the fallback if a browser cannot play the video. The frames were made in Pixelmator Pro.
- The three platform tiles (Windows, macOS, Linux) now show the real logos on rounded tiles. On hover a tile grows to 2.5 times its size and gets a gradient border.
- The three service cards and the three security cards show an image behind their icon on hover, with the same zoom and gradient border: the UniFi Cloud Gateway Max (cut out, shown at half the zoom), an animated Home Assistant logo, a NAS with blinking LEDs, the AdGuard logo, the back of a UniFi gateway and a camera. The Home Assistant and NAS images are short videos that only play while the pointer is on them.
- The five list icons in the smart home section are now small illustrated tiles.

### Changed

- The contact section is centred at every window width, including the send button, the privacy note and the GitHub buttons.
- The visitor badge in the footer only appears once it has loaded. If it is blocked by a DNS filter or an ad blocker, it is hidden instead of showing a broken image.

## [0.5.3] - 2026-09-30

### Fixed

- The contact section had large empty gaps between the send button, the privacy note, the "or" line and the GitHub buttons. The general rule for paragraphs in that section (`margin: 0 auto 32px`) was more specific than the rules of the status line, the note and the "or" line, so it overrode their margins, and the empty status line reserved a full line on top. The three rules now win over it and the status line takes no space while it is empty. The gaps are now 14, 26 and 14 pixels.


## [0.5.2] - 2026-09-29

### Changed

- The green dot of the weather tile now fades slowly in and out (2.8 seconds per cycle) instead of standing still. The animation is switched off for visitors who prefer reduced motion.

## [0.5.1] - 2026-09-29

### Changed

- The weather tile carries a "live" marker with the same green dot as the footer status, so it is clear that this value is not static like the rest of the example view.

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
