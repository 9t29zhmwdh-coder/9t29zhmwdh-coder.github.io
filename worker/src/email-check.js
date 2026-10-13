import { DISPOSABLE_DOMAINS } from "./disposable-domains.js";

const DOH_URL = "https://cloudflare-dns.com/dns-query";
const DOH_TIMEOUT_MS = 3000;
const TYPE_MX = 15;
const TYPE_A = 1;
const TYPE_AAAA = 28;
const RCODE_NXDOMAIN = 3;

export function domainOf(email) {
  return email.slice(email.lastIndexOf("@") + 1).toLowerCase();
}

// Matches the domain itself and every subdomain, so "x.mailinator.com" is caught as well.
export function isDisposable(domain) {
  const parts = domain.split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    if (DISPOSABLE_DOMAINS.has(parts.slice(i).join("."))) return true;
  }
  return false;
}

async function lookup(domain, type) {
  const res = await fetch(`${DOH_URL}?name=${encodeURIComponent(domain)}&type=${type}`, {
    headers: { Accept: "application/dns-json" },
    signal: AbortSignal.timeout(DOH_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error("dns");
  return res.json();
}

// Only a definite "this domain cannot receive mail" returns false. A resolver outage or timeout lets the
// visitor through, because a real person must not be locked out by a DNS hiccup.
export async function canReceiveMail(domain) {
  try {
    const mx = await lookup(domain, TYPE_MX);
    if (mx.Status === RCODE_NXDOMAIN) return false;
    const records = (mx.Answer || []).filter((r) => r.type === TYPE_MX).map((r) => r.data.trim());
    if (records.length > 0) {
      // RFC 7505: a single MX "0 ." says the domain accepts no mail at all.
      return !(records.length === 1 && /^0\s+\.?$/.test(records[0]));
    }
    // RFC 5321: without any MX record the mail goes to the address record of the domain itself.
    for (const type of [TYPE_A, TYPE_AAAA]) {
      const address = await lookup(domain, type);
      if ((address.Answer || []).some((r) => r.type === type)) return true;
    }
    return false;
  } catch {
    return true;
  }
}

// Returns "ok", "disposable" or "unreachable".
export async function checkEmailDomain(email) {
  const domain = domainOf(email);
  if (isDisposable(domain)) return "disposable";
  return (await canReceiveMail(domain)) ? "ok" : "unreachable";
}
