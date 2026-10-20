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

Production deployment is automated through GitHub Pages from the `main` branch.
The custom domain is `recurfx.com`; `www.recurfx.com` should redirect to the
apex domain once DNS propagation is complete.

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

- A dedicated Recur Supabase project is active in London (`eu-west-2`) with
  project reference `wksrszxndpqyachsgznc`.
- The local website is connected using the project URL and publishable browser
  key stored in the ignored `apps/website/.env.local` file.
- `database/schema.sql` separates private financial records from operational
  agreement dates and explicitly provides no dealer access to finance data.
- All application tables have row-level security enabled and the Supabase
  security advisor reports no findings.
- Public enquiry capture has been verified end to end through the Data API.
- The current screens use demonstration records so that the complete role flow
  can be reviewed before connecting personal or financial information.

