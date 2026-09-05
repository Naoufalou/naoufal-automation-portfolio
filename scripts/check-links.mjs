import projects from "../content/projects.json" with { type: "json" };
let failed = false;
for (const url of [
  ...new Set(projects.flatMap((p) => [p.demo, p.source]).filter(Boolean)),
]) {
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
    console.log(r.status, url);
    if (!r.ok) failed = true;
  } catch (e) {
    console.error(url, e.message);
    failed = true;
  }
}
process.exitCode = failed ? 1 : 0;
