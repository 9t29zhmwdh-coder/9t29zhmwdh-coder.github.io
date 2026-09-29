# Contact worker

Receives the contact form of raystudio.ch, checks the Cloudflare Turnstile token and forwards the message by mail through Resend. The visitor's address becomes the reply address, the recipient address never appears on the site or in this repository.

## Secrets

Set once with `npx wrangler secret put <NAME>`, never commit them:

| Name | Content |
|---|---|
| `TURNSTILE_SECRET` | Secret key of the Turnstile widget |
| `RESEND_API_KEY` | Resend API key (sending access only) |
| `TO_EMAIL` | The mailbox that receives the enquiries. The sender `kontakt@raystudio.ch` needs the domain verified in Resend (DKIM and the two CNAME records at the DNS host) |

## Deploy

```
cd worker
npx wrangler deploy
```

Then put the Worker URL into `CONTACT_ENDPOINT` and the public Turnstile site key into `TURNSTILE_SITEKEY` in `index.html`. Both values are public by design.
