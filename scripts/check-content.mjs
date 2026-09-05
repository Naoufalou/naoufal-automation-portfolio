import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const text = readFileSync(
  new URL("../content/projects.json", import.meta.url),
  "utf8",
);
const projects = JSON.parse(text);
assert.equal(projects.length, 43);
assert.equal(new Set(projects.map((p) => p.slug)).size, projects.length);
assert(
  !/\/Users\/|lovable\.dev\/projects|api[_-]?key|access[_-]?token/i.test(text),
  "Private metadata detected",
);
for (const p of projects) {
  for (const k of [
    "id",
    "slug",
    "name",
    "description",
    "category",
    "status",
    "stack",
  ])
    assert(p[k], `${p.id}: missing ${k}`);
  for (const k of ["demo", "source"])
    if (p[k]) assert.equal(new URL(p[k]).protocol, "https:");
  assert(/^[a-z0-9-]+$/.test(p.slug));
}
console.log(
  `${projects.length} project records validated: unique routes, required fields, HTTPS links, no local paths.`,
);
