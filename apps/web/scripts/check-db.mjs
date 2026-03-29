/**
 * Run from repo: pnpm --filter @os/web db:check
 * Reads apps/web/.env.local and runs the same sanity query as /api/health/db
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = join(scriptDir, "..");
const envPath = join(root, ".env.local");

if (!existsSync(envPath)) {
  console.error("Missing .env.local — copy from .env.example and set DATABASE_URL");
  process.exit(1);
}

const raw = readFileSync(envPath, "utf8");
const line = raw
  .split(/\r?\n/)
  .find((l) => l.trim().startsWith("DATABASE_URL="));
if (!line) {
  console.error(".env.local has no DATABASE_URL=");
  process.exit(1);
}

const connectionString = line.slice("DATABASE_URL=".length).trim();

/** Remove ?options=... — can break db connect with node-pg on some Windows + PG builds. */
function pgPoolConnectionString(url) {
  try {
    const u = new URL(url);
    u.searchParams.delete("options");
    return u.toString();
  } catch {
    return url;
  }
}

function getPoolConfigFromDatabaseUrl(urlString) {
  const sanitized = urlString
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "")
    .trim();
  const pu = pgPoolConnectionString(sanitized);
  const u = new URL(pu);
  const database = decodeURIComponent(
    u.pathname.replace(/^\//, "").split("/")[0] || "",
  ).trim();
  const host =
    u.hostname === "localhost" || u.hostname === "::1" ? "127.0.0.1" : u.hostname;
  return {
    host,
    port: Number.parseInt(u.port || "5432", 10),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: database || "postgres",
  };
}

/** Match URL database name to real pg_database.datname (handles stray spaces). */
async function resolvePhysicalDatabaseName(base) {
  const want = base.database.trim();
  const adminPool = new pg.Pool({
    ...base,
    database: "postgres",
    connectionTimeoutMillis: 8000,
    max: 1,
    ssl: false,
  });
  try {
    const { rows } = await adminPool.query(
      `SELECT datname FROM pg_database
       WHERE datistemplate = false
         AND btrim(datname) = btrim($1::text)
       ORDER BY (datname = $1) DESC, char_length(datname) ASC
       LIMIT 1`,
      [want],
    );
    if (rows[0]?.datname) {
      return { ...base, database: rows[0].datname };
    }
  } finally {
    await adminPool.end().catch(() => {});
  }
  return { ...base, database: want };
}

function describeTarget(cs) {
  try {
    const u = new URL(cs);
    const db =
      (u.pathname || "/").replace(/^\//, "").split("?")[0] || "(none)";
    return { host: u.hostname, port: u.port || "5432", database: db };
  } catch {
    return null;
  }
}

async function listDatabasesOnServer(cs) {
  const base = getPoolConfigFromDatabaseUrl(cs);
  const p = new pg.Pool({
    ...base,
    database: "postgres",
    connectionTimeoutMillis: 8000,
    max: 1,
    ssl: false,
  });
  try {
    const r = await p.query(
      `SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY 1`,
    );
    return r.rows.map((x) => x.datname);
  } finally {
    await p.end().catch(() => {});
  }
}

const target = describeTarget(connectionString);
if (target) {
  console.error(
    `Using host=${target.host} port=${target.port} database=${target.database} (from DATABASE_URL)`,
  );
}

const sql = `SELECT current_database()::text AS db,
       current_schema()::text AS schema,
       (SELECT count(*)::text FROM royale_one.roles WHERE deleted_at IS NULL) AS roles_count,
       (SELECT count(*)::text FROM royale_one.report_types WHERE deleted_at IS NULL) AS report_types_count`;

async function main() {
  let poolCfg = getPoolConfigFromDatabaseUrl(connectionString);
  poolCfg = await resolvePhysicalDatabaseName(poolCfg);
  const pool = new pg.Pool({
    ...poolCfg,
    connectionTimeoutMillis: 8000,
    max: 1,
    ssl: false,
  });

  try {
    await pool.query("SET search_path TO royale_one, public");
    const { rows } = await pool.query(sql);
    console.log(JSON.stringify({ ok: true, ...rows[0] }, null, 2));
    process.exitCode = 0;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("DB check failed:", msg);
    if (msg.includes("does not exist")) {
      try {
        const dbs = await listDatabasesOnServer(connectionString);
        console.error(
          "Databases visible on that host:port:",
          dbs.join(", ") || "(none)",
        );
        console.error(
          "Hint: database name in pg_database may differ from URL (e.g. trailing space). The app resolves via btrim(datname). Or run: ALTER DATABASE \"royale_one \" RENAME TO royale_one;",
        );
      } catch (e2) {
        const m = e2 instanceof Error ? e2.message : String(e2);
        console.error("Could not connect to database postgres on same host:", m);
      }
    }
    process.exitCode = 1;
  } finally {
    await pool.end().catch(() => {});
  }
}

await main();
