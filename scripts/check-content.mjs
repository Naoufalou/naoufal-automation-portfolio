import { readFileSync } from "node:fs";
import { existsSync } from "node:fs";
import assert from "node:assert/strict";
const text = readFileSync(
  new URL("../content/projects.json", import.meta.url),
  "utf8",
);
const projects = JSON.parse(text);
assert(
  projects.length >= 49,
  "Recent case studies are missing from the catalogue.",
);
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
  assert(
    Array.isArray(p.steps) && p.steps.length >= 3,
    `${p.id}: missing project stages`,
  );
  for (const [index, step] of p.steps.entries()) {
    for (const key of ["title", "detail", "state"])
      assert(step[key], `${p.id}: step ${index + 1} missing ${key}`);
  }
  assert(Array.isArray(p.gallery), `${p.id}: missing visual gallery metadata`);
  for (const visual of p.gallery) {
    assert(
      visual.src.startsWith("/project-visuals/"),
      `${p.id}: gallery image must be a local public visual`,
    );
    assert(
      existsSync(new URL(`../public${visual.src}`, import.meta.url)),
      `${p.id}: missing visual file ${visual.src}`,
    );
    assert(
      !visual.kind ||
        ["capture", "concept", "architecture"].includes(visual.kind),
      `${p.id}: unknown visual kind`,
    );
  }
  for (const k of ["demo", "source"])
    if (p[k]) assert.equal(new URL(p[k]).protocol, "https:");
  assert(/^[a-z0-9-]+$/.test(p.slug));
}
console.log(
  `${projects.length} project records validated: unique routes, required fields, HTTPS links, no local paths.`,
);
