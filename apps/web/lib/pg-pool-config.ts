import { Pool } from "pg";
import { pgPoolConnectionString } from "./pg-connection-string";

export type PgPoolUserConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

type PgSsl = false | { rejectUnauthorized: boolean };

/**
 * Build explicit pg Pool fields from DATABASE_URL.
 * On some Windows + PostgreSQL + node-pg combos, `connectionString` alone can
 * produce "database does not exist" while `pg_database` lists the DB.
 */
export function getPoolConfigFromDatabaseUrl(
  connectionUrl: string,
): PgPoolUserConfig {
  const sanitized = connectionUrl.replace(/\r\n/g, "\n").replace(/\r/g, "").trim();
  const poolUrl = pgPoolConnectionString(sanitized);
  const u = new URL(poolUrl);
  const database = decodeURIComponent(
    u.pathname.replace(/^\//, "").split("/")[0] || "",
  ).trim();
  // Avoid ::1 vs 127.0.0.1 hitting different local Postgres stacks on Windows.
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

/**
 * Map logical DB name from the URL to the real `pg_database.datname`
 * (e.g. DB created as `royale_one␠` vs `royale_one`).
 */
export async function resolvePhysicalDatabaseName(
  base: PgPoolUserConfig,
  ssl: PgSsl = false,
): Promise<PgPoolUserConfig> {
  const want = base.database.trim();
  const adminPool = new Pool({
    ...base,
    database: "postgres",
    connectionTimeoutMillis: 8000,
    max: 1,
    ssl,
  });
  try {
    const { rows } = await adminPool.query<{ datname: string }>(
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
