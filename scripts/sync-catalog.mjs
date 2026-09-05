// Metadata audit only: never imports private repositories or publishes unreviewed records.
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
const records = JSON.parse(
  execFileSync(
    "gh",
    [
      "repo",
      "list",
      "Naoufalou",
      "--limit",
      "1000",
      "--json",
      "name,url,isPrivate,description,primaryLanguage",
    ],
    { encoding: "utf8" },
  ),
);
const safe = records
  .filter((r) => !r.isPrivate)
  .map(({ name, url, description, primaryLanguage }) => ({
    name,
    url,
    description,
    language: primaryLanguage?.name ?? null,
  }));
mkdirSync(".catalog-review", { recursive: true });
writeFileSync(
  ".catalog-review/public-repositories.json",
  JSON.stringify(safe, null, 2) + "\n",
);
console.log(
  `${safe.length} public repository metadata records exported for editorial review. content/projects.json was not changed.`,
);
