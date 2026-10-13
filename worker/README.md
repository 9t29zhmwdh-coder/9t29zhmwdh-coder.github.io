# Contact worker

Receives the contact form of raystudio.ch, checks the Cloudflare Turnstile token and forwards the message by mail through Resend. The visitor's address becomes the reply address, the recipient address never appears on the site or in this repository.

## Secrets

Set once with `npx wrangler secret put <NAME>`, never commit them:

| Name | Content |
|---|---|
| `TURNSTILE_SECRET` | Secret key of the Turnstile widget |
| `RESEND_API_KEY` | Resend API key (sending access only) |
| `TO_EMAIL` | The mailbox that receives the enquiries. The sender `kontakt@raystudio.ch` needs the domain verified in Resend (DKIM and the two CNAME records at the DNS host) |

## Email check

After the Turnstile check the worker looks at the domain of the visitor's address. Domains on the disposable-email list (`src/disposable-domains.js`, source `disposable-email-domains`, CC0, subdomains included) and domains that cannot receive mail (no MX or address record, or a null MX, looked up through Cloudflare DNS-over-HTTPS) get `422 {"ok":false,"error":"email"}`. If the resolver fails or takes longer than 3 seconds, the message goes through. To refresh the list, replace the entries with the current upstream `disposable_email_blocklist.conf` and adjust the commit note in the file header. Tests: `node --test test/`.

## Weather route

`GET /weather` returns city, temperature and conditions for the visitor's coarse location (Cloudflare `request.cf`, rounded to one decimal) from MET Norway. No secret needed.

## Deploy

```
cd worker
npx wrangler deploy
```

Then put the Worker URL into `CONTACT_ENDPOINT` and the public Turnstile site key into `TURNSTILE_SITEKEY` in `index.html`. Both values are public by design.
