# Recur

The editable home for the Recur marketing website and product platform.

## Workspace

- `apps/website/` — the new editable React/TypeScript marketing website
- `website/dist/` — protected snapshot of the former public Replit website
- `website/server.mjs` — local server for comparing the protected snapshot

The snapshot is a reference, not the source for the new product. New work should
be made in `apps/` and shared code will live in `packages/`.

## Run the editable website

```sh
pnpm install
pnpm dev
```

The website includes the Recur homepage, payment illustration, responsive
navigation and initial dealer, manufacturer and about pages.

## Run the reference snapshot

```sh
pnpm reference
```

## Product boundary

The platform will support three signed-in roles:

- Consumers manage their Recur agreement, payments, bike record, servicing,
  return and renewal.
- Dealers manage bikes, authorised servicing and operational agreement dates.
  They never see consumer payment amounts, balances, arrears or banking data.
- Recur Operations manages the complete lifecycle, with sensitive finance data
  restricted to specifically authorised colleagues.

The next build phase adds the platform application, authentication, role-based
permissions, database and working enquiry capture.

