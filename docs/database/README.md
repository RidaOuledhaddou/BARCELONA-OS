# Database documentation

- **[ROYALE_ONE_MVP_SCHEMA.md](ROYALE_ONE_MVP_SCHEMA.md)** — UUID rationale, Mermaid ER diagram, FK/index documentation, pillar migration strategy, and a full DDL block for copy-paste.
- **[001_royale_one_mvp.sql](001_royale_one_mvp.sql)** — Same DDL as a runnable script for pgAdmin / `psql` (empty database recommended).
- **[002_royale_one_repair.sql](002_royale_one_repair.sql)** — Idempotent repair: seeds first (single `DO` block), then verification query, then indexes/triggers / `public.users` cleanup / `pg_trgm` schema alignment.
- **[003_royale_one_seed_lookups_only.sql](003_royale_one_seed_lookups_only.sql)** — Small file: lookup seeds + counts only (use if you keep running only part of `002` by mistake).

Run order: create database **`royale_one`** → open Query Tool **on that database** → run `001_royale_one_mvp.sql` once (creates schema **`royale_one`**; tables and `royale_touch_updated_at` live there; extensions stay in **`public`**). App connections should set `search_path` to `royale_one, public` or qualify names as `royale_one.users`, etc.
