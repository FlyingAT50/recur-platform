# Recur

Codex workspace for the Recur marketing website and the product application
that will sit behind it.

## Current contents

- `website/dist/` — complete public snapshot of `https://recur.exchange/`
- `website/server.mjs` — local preview server with single-page-app routing

The imported site includes the home, dealer, manufacturer, about, privacy and
terms experiences, the illustrative payment calculator, and all public image
assets.

## Important source note

The live Replit deployment exposes a compiled Vite/React production bundle,
not the original editable React source. The snapshot is therefore an exact
portable copy of the deployed front end. Before making major content or design
changes, replace or supplement it with a Replit source export (ZIP or Git
repository) so future development uses readable components rather than
compiled files.

The enquiry forms currently target `/api/enquiries`, which belongs to the live
application backend and is not included in this public snapshot.

## Preview

```sh
npm run dev
```

Then open `http://127.0.0.1:4173/`.

