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

The connected application is available at `/app`. Its demonstration sign-in
opens the consumer, dealer and Recur Operations workspaces using shared sample
records. The database security model is defined in `database/schema.sql` and is
ready to be applied to a dedicated Recur Supabase project.

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

## Backend status

- A Supabase client is included but remains disabled until Recur project values
  are supplied in `apps/website/.env.local`.
- `database/schema.sql` separates private financial records from operational
  agreement dates and explicitly provides no dealer access to finance data.
- All exposed application tables have row-level security enabled in the draft.
- The current screens use demonstration records so that the complete role flow
  can be reviewed before connecting personal or financial information.

