/**
 * Strip `options` from a libpq URL. Passing `?options=-c search_path=...` through
 * node-pg can produce "database does not exist" on some Windows + PostgreSQL
 * setups even when the DB is listed in pg_database.
 */
export function pgPoolConnectionString(connectionUrl: string): string {
  try {
    const u = new URL(connectionUrl);
    u.searchParams.delete("options");
    return u.toString();
  } catch {
    return connectionUrl;
  }
}
