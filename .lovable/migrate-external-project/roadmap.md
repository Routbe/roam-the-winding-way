# Import roadmap — ROUT (github:Routbe/route-roam-f03d1a97)

Source: public GitHub repository, cloned 2026-11-22. Target: this Lovable project.
Ledger: `.lovable/migrate-external-project/ledger.json`.

## Done
- [x] Repository made public, cloned, inspected (320 route files, 125 API route files, 293 SQL migrations, 623 test files).
- [x] Source tree copied into this project (code, MDX docs, locales nl/en/fr/de, assets, wasm, worker, scripts, db migrations).
- [x] Dependencies installed; build OK; dev server serves the app.
- [x] Public routes verified rendering: `/`, `/about`, `/support`, `/guide`, `/features`, `/self-hosting`, `/sign`, `/t`, `/discover`, `/sitemap.xml`, `/robots.txt`, `/api/public/health`.

## Open
- [x] Database decision: keep Neon (DATABASE_URL secret pending)
- [ ] Records: no export attached — need CSV/JSON table exports plus user rows (email + original user ids).
- [ ] Secrets: DATABASE_URL / BETTER_AUTH_SECRET, Scaleway S3, Stripe, OMNI_*, CRON_SECRET, Brevo/Postmark mail — requested through the secure secret form once the database choice is settled.
- [ ] Omni worker (`worker/`): standalone Bun daemon, needs its own host at cutover.
- [ ] Schedule: `/api/public/cron/cleanup-assets` needs a scheduler after cutover.
- [ ] Verification: one signed-in create/read/update/delete flow plus an imported user's first-login email verification and new password.

## Notes
- `db/` and `db-pending/` are the source's own migration history; they are copied for reference and were never applied automatically.
- No credentials were copied: the repository contained no `.env` files.
