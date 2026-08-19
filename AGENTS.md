# AGENTS.md

## Git workflow

- **Always auto-commit and auto-push after completing any work.** Do not wait
  to be asked. Stage the relevant files, write a concise commit message
  (repo uses conventional prefixes like `feat:`, `fix:`, `perf:`), push to
  `main`, and confirm the push succeeded.

## Portal updates (Updates button)

- **Every commit that ships a user-visible change must also update the portal's
  Updates button.** Keep `UPDATE_SECTIONS` in `public/portal.html` current:
  the newest entry goes at the top of the array (index 0) with the commit
  `hash`, a short `heading`, a `desc`, the `date`, and `bugs`/`updates`/
  `features` arrays describing what changed. Never ship a commit that changes
  game or portal behavior without a matching Updates entry — do it in the same
  commit, not a follow-up.
