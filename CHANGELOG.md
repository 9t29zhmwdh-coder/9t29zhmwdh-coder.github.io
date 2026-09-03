# Changelog

All notable changes to this site will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

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
