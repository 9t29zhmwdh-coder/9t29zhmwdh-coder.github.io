const ALLOWED_ORIGINS = ["https://raystudio.ch", "https://www.raystudio.ch"];
const MAX_BODY_BYTES = 10000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  };
}

function reply(status, body, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });
}

function singleLine(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

async function verifyTurnstile(token, secret, ip) {
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  return data.success === true;
}

function conditionOf(symbol) {
  if (symbol.includes("thunder")) return "thunder";
  if (symbol.includes("snow") || symbol.includes("sleet")) return "snow";
  if (symbol.includes("rain") || symbol.includes("drizzle")) return "rain";
  if (symbol.startsWith("fog")) return "fog";
  if (symbol.startsWith("partlycloudy")) return "partly";
  if (symbol.startsWith("cloudy")) return "cloudy";
  if (symbol.startsWith("fair")) return "fair";
  if (symbol.startsWith("clearsky")) return "clear";
  return "";
}

// Ort kommt aus Cloudflares IP-Grobortung, auf eine Nachkommastelle gerundet (rund 10 km). MET Norway sieht nie die IP des Besuchers.
async function weather(request, origin) {
  const cf = request.cf || {};
  const lat = Number.parseFloat(cf.latitude);
  const lon = Number.parseFloat(cf.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return reply(200, { ok: false }, origin);

  const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat.toFixed(1)}&lon=${lon.toFixed(1)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "raystudio.ch-weather/1.0 https://raystudio.ch" },
    cf: { cacheTtl: 600, cacheEverything: true },
  });
  if (!res.ok) return reply(502, { ok: false, error: "weather" }, origin);

  const now = (await res.json()).properties?.timeseries?.[0]?.data;
  const temp = now?.instant?.details?.air_temperature;
  if (typeof temp !== "number") return reply(502, { ok: false, error: "weather" }, origin);

  const symbol = now.next_1_hours?.summary?.symbol_code || now.next_6_hours?.summary?.symbol_code || "";
  return reply(200, {
    ok: true,
    city: String(cf.city || cf.region || "").slice(0, 60),
    country: String(cf.country || "").slice(0, 2),
    temp: Math.round(temp),
    condition: conditionOf(symbol),
  }, origin);
}

async function sendMail(env, { name, email, message }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "RayStudio Kontakt <kontakt@raystudio.ch>",
      to: [env.TO_EMAIL],
      reply_to: email,
      subject: `Anfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
    }),
  });
  return res.ok;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response("Forbidden", { status: 403 });
    }
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method === "GET" && new URL(request.url).pathname === "/weather") {
      return weather(request, origin);
    }
    if (request.method !== "POST") {
      return reply(405, { ok: false, error: "method" }, origin);
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return reply(413, { ok: false, error: "invalid" }, origin);
    }

    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      return reply(400, { ok: false, error: "invalid" }, origin);
    }

    // Bots füllen das versteckte Feld aus; sie bekommen ein Erfolgssignal, damit sie nichts lernen.
    if (input.website) return reply(200, { ok: true }, origin);

    const name = singleLine(input.name ?? "");
    const email = singleLine(input.email ?? "");
    const message = String(input.message ?? "").trim();
    const valid =
      name.length > 0 && name.length <= 100 &&
      EMAIL_PATTERN.test(email) && email.length <= 200 &&
      message.length >= 10 && message.length <= 4000;
    if (!valid) return reply(400, { ok: false, error: "invalid" }, origin);

    const token = typeof input.token === "string" ? input.token : "";
    const human = token && await verifyTurnstile(
      token, env.TURNSTILE_SECRET, request.headers.get("CF-Connecting-IP"));
    if (!human) return reply(403, { ok: false, error: "captcha" }, origin);

    const sent = await sendMail(env, { name, email, message });
    if (!sent) return reply(502, { ok: false, error: "send" }, origin);
    return reply(200, { ok: true }, origin);
  },
};
