# Changelog

All notable changes to this site will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

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
