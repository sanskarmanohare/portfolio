import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the portfolio and SEO metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Sanskar Manohare/);
  assert.match(html, /Full Stack Developer/);
  assert.match(html, /id="projects"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /aria-label="Main navigation"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("keeps portfolio content centralized and motion accessible", async () => {
  const [data, css, page, layout] = await Promise.all([
    readFile(new URL("../app/portfolio/data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(data, /Fleet Management Dashboard/);
  assert.match(data, /skillGroups/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /@media \(max-width:\s*700px\)/);
  assert.match(page, /<Portfolio \/>/);
  assert.match(layout, /themeColor:\s*"#E6FAF5"/);
});
