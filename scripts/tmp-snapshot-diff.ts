import { PGlite } from "@electric-sql/pglite";
import { btree_gist } from "@electric-sql/pglite/contrib/btree_gist";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { listMigrationFiles, planMigrations } from "./migration-plan";
import { diffCatalogs, readCatalog, type Catalog } from "./schema-catalog";

const DB_DIR = join(import.meta.dir, "..", "db");
const db = new PGlite({ extensions: { pgcrypto, btree_gist } });
for (const step of planMigrations(listMigrationFiles(DB_DIR), new Set())) {
  if (step.action !== "run") continue;
  const body = readFileSync(join(DB_DIR, step.file), "utf8");
  await db.exec(`begin;\n${body}\ncommit;`);
}
const replayed = await readCatalog(async (q) => (await db.query<Record<string, unknown>>(q)).rows);
const committed = JSON.parse(readFileSync(join(DB_DIR, "schema.snapshot.json"), "utf8")) as Catalog;
const diff = diffCatalogs(committed, replayed);
console.log("diff entries:", diff.length);
const seen = new Set<string>();
for (const d of diff) {
  const s = JSON.stringify(d).slice(0, 160);
  if (!seen.has(s)) {
    seen.add(s);
    if (seen.size <= 15) console.log("  ", s);
  }
}
await db.close();
