#!/usr/bin/env python3
"""Schreibt die Content-Security-Policy als Meta-Tag in index.html.

GitHub Pages erlaubt keine eigenen HTTP-Header, deshalb steht die CSP im HTML.
Inline-Skripte sind per SHA-256 freigegeben, nicht per 'unsafe-inline'. Jede
Aenderung an einem Inline-Skript aendert den Hash: dieses Skript danach laufen
lassen, in der CI mit --check.
"""
import base64, hashlib, re, sys

PAGE = "index.html"
MARKER = re.compile(r'<!--CSP-->(\n<meta http-equiv="Content-Security-Policy"[^>]*>)?')
INLINE_SCRIPT = re.compile(r'<script>(.*?)</script>', re.S)

def build_policy(html):
    hashes = " ".join(
        "'sha256-%s'" % base64.b64encode(hashlib.sha256(m.encode("utf-8")).digest()).decode()
        for m in INLINE_SCRIPT.findall(html)
    )
    return "; ".join([
        "default-src 'none'",
        "script-src 'self' %s https://challenges.cloudflare.com" % hashes,
        # style-Attribute im Markup und im Skript brauchen 'unsafe-inline'
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data:",
        "font-src 'self'",
        "media-src 'self'",
        "connect-src 'self' https://raystudio-contact.raystudio.workers.dev https://dns.google https://cloudflare-dns.com https://api.github.com",
        "frame-src https://challenges.cloudflare.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
    ])

def render(html):
    tag = '<!--CSP-->\n<meta http-equiv="Content-Security-Policy" content="%s"/>' % build_policy(html)
    return MARKER.sub(lambda _: tag, html, count=1)

def main():
    html = open(PAGE, encoding="utf-8").read()
    out = render(html)
    if "--check" in sys.argv:
        if out != html:
            sys.exit("CSP veraltet: python3 scripts/update-csp.py ausfuehren")
        print("CSP aktuell")
    else:
        open(PAGE, "w", encoding="utf-8").write(out)
        print("CSP geschrieben")

main()
