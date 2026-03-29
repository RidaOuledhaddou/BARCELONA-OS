import { NextResponse } from "next/server";
import { Pool } from "pg";
import {
  getPoolConfigFromDatabaseUrl,
  resolvePhysicalDatabaseName,
} from "../../../../lib/pg-pool-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/health/db — server-only check that DATABASE_URL works.
 * Dev: http://localhost:3000/api/health/db
 * Production: set ALLOW_DB_HEALTH=1 to enable (otherwise 404).
 */
export async function GET() {
  const blockedInProd =
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_DB_HEALTH !== "1";
  if (blockedInProd) {
    return NextResponse.json(
      { ok: false, error: "Disabled in production (set ALLOW_DB_HEALTH=1 to enable)" },
      { status: 404 },
    );
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_URL is not set (use apps/web/.env.local)" },
      { status: 500 },
    );
  }

  let poolCfg = getPoolConfigFromDatabaseUrl(connectionString);
  const ssl: false | { rejectUnauthorized: boolean } =
    connectionString.includes("sslmode=require") ||
    connectionString.includes("ssl=true")
      ? { rejectUnauthorized: false }
      : false;
  poolCfg = await resolvePhysicalDatabaseName(poolCfg, ssl);

  const pool = new Pool({
    ...poolCfg,
    connectionTimeoutMillis: 8000,
    max: 1,
    ssl,
  });

  try {
    await pool.query("SET search_path TO royale_one, public");
    const r = await pool.query<{
      db: string;
      schema: string;
      roles_count: string;
      report_types_count: string;
    }>(
      `SELECT current_database()::text AS db,
              current_schema()::text AS schema,
              (SELECT count(*)::text FROM royale_one.roles WHERE deleted_at IS NULL) AS roles_count,
              (SELECT count(*)::text FROM royale_one.report_types WHERE deleted_at IS NULL) AS report_types_count`,
    );
    await pool.end();
    const row = r.rows[0];
    return NextResponse.json({
      ok: true,
      database: row.db,
      schema: row.schema,
      royale_one_roles_active: row.roles_count,
      royale_one_report_types_active: row.report_types_count,
    });
  } catch (e) {
    await pool.end().catch(() => {});
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 503 });
  }
}
