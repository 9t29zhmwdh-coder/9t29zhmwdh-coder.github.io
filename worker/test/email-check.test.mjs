import { test } from "node:test";
import assert from "node:assert/strict";
import { checkEmailDomain, isDisposable, domainOf } from "../src/email-check.js";

const realFetch = globalThis.fetch;

function mockDns(table) {
  globalThis.fetch = async (url) => {
    const u = new URL(url);
    const key = `${u.searchParams.get("name")}/${u.searchParams.get("type")}`;
    const hit = table[key];
    if (hit === "fail") throw new Error("network");
    if (hit === "http500") return new Response("x", { status: 500 });
    return new Response(JSON.stringify(hit ?? { Status: 0 }), { status: 200 });
  };
}

test.afterEach(() => { globalThis.fetch = realFetch; });

test("domainOf takes the part after the last @, lowercased", () => {
  assert.equal(domainOf("A.B@Example.CH"), "example.ch");
});

test("isDisposable catches listed domains and their subdomains", () => {
  assert.equal(isDisposable("mailinator.com"), true);
  assert.equal(isDisposable("foo.mailinator.com"), true);
  assert.equal(isDisposable("icloud.com"), false);
  assert.equal(isDisposable("mailinator.com.example.ch"), false);
});

test("disposable domain is rejected without any DNS call", async () => {
  mockDns({ "x/1": "fail" });
  let calls = 0;
  const f = globalThis.fetch;
  globalThis.fetch = async (...a) => { calls++; return f(...a); };
  assert.equal(await checkEmailDomain("a@mailinator.com"), "disposable");
  assert.equal(calls, 0);
});

test("domain with MX record is ok", async () => {
  mockDns({ "example.ch/15": { Status: 0, Answer: [{ type: 15, data: "10 mx.example.ch." }] } });
  assert.equal(await checkEmailDomain("a@example.ch"), "ok");
});

test("NXDOMAIN is unreachable", async () => {
  mockDns({ "nope.ch/15": { Status: 3 } });
  assert.equal(await checkEmailDomain("a@nope.ch"), "unreachable");
});

test("null MX is unreachable", async () => {
  mockDns({ "nomail.ch/15": { Status: 0, Answer: [{ type: 15, data: "0 ." }] } });
  assert.equal(await checkEmailDomain("a@nomail.ch"), "unreachable");
});

test("no MX but an A record falls back to the address record", async () => {
  mockDns({ "a-only.ch/1": { Status: 0, Answer: [{ type: 1, data: "192.0.2.1" }] } });
  assert.equal(await checkEmailDomain("a@a-only.ch"), "ok");
});

test("no MX and no address record is unreachable", async () => {
  mockDns({});
  assert.equal(await checkEmailDomain("a@empty.ch"), "unreachable");
});

test("resolver failure lets the visitor through", async () => {
  mockDns({ "slow.ch/15": "fail" });
  assert.equal(await checkEmailDomain("a@slow.ch"), "ok");
  mockDns({ "bad.ch/15": "http500" });
  assert.equal(await checkEmailDomain("a@bad.ch"), "ok");
});
