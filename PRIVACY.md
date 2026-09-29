# Privacy Policy

This is a static website hosted on GitHub Pages.

- **No tracking:** The site does not use cookies, analytics scripts, or user tracking.
- **GitHub Pages hosting:** GitHub may collect server logs (IP addresses, access times) as part of their hosting service. See [GitHub's Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement).
- **Contact form:** If you send a message, your name, email address and message are transmitted to a Cloudflare Worker, which forwards them by mail through Resend to the site owner. They are used only to reply to you and are not stored by the site itself. Cloudflare and Resend process them as technical providers under their own privacy policies.
- **Cloudflare Turnstile:** The contact form is protected against bots by Cloudflare Turnstile. Its script (challenges.cloudflare.com) is loaded only when you first click into the form, not when you merely read the page. Cloudflare receives your IP address and browser signals for that check.
- **Weather tile:** The Home Assistant example view shows the current temperature for your approximate location. When the tile scrolls into view, your browser asks the Cloudflare Worker for it. Cloudflare derives a coarse position (city level, rounded to about 10 km) from your IP address inside the Worker; no location permission prompt is involved and nothing is stored. Only these rounded coordinates, never your IP address, are sent on to the weather service MET Norway (api.met.no), whose data is licensed under CC BY 4.0.
- **System info panel:** The "My System" preview reads values (OS, browser, screen, timezone, language, CPU cores, device type) locally in your browser only. Nothing is sent or stored, and no public IP lookup is performed.
- **Tool lookups:** The DNS and mail checks run only when you click them. They query public DNS-over-HTTPS resolvers (Google 8.8.8.8, Cloudflare 1.1.1.1) with the domain you enter; those providers' privacy policies apply.
- **Web fonts:** Fonts are loaded from Google Fonts (fonts.googleapis.com), so Google receives your IP as part of that request.
- **External links:** Links to third-party sites are subject to those sites' privacy policies.
