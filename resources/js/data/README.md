# Dummy data — the integration contract

Every module here is shaped **exactly** like the Inertia props the Laravel controllers will
eventually send: same key names, same nesting, same date formats, same pagination envelope.
The authoritative definition is [`docs/data-shapes.md`](../../../docs/data-shapes.md).

## What belongs here, and what does not

Only **database-backed entities** — the things that become Eloquent queries in Phase 3:
advocates, clients, matters, matter notes, enquiries, gallery images.

**Static site configuration does not belong here.** Office details and the practice-area list
live in `config/site.php` and are shared with every response by
`HandleInertiaRequests::share()`. That is not a shortcut — it is the only thing that works.
The site header and footer read `usePage()`, which contains *only what the server sent*, so a
client-side mock can never reach them. It is also where those values live permanently, so
putting them on the server now costs nothing later.

## Rules

1. **No component ever imports from this directory.** Pages receive data through props only.
   The single importer is `resources/js/dev/dummyProps.js`.
2. **Shapes change here last.** Change `docs/data-shapes.md` first, then this module, then
   the component.
3. **Real props always win.** The dev provider spreads dummy props *before* real ones, so the
   moment a controller starts sending real data for a page, the dummy is overridden with no
   component change. That is what makes the Phase 3 migration page-by-page rather than
   big-bang.
4. **Dummy props reach pages, not layouts.** Anything a layout needs must be a real shared
   prop. See the note above.

## Removing it

In Phase 3, once every page is served by a real controller:

```
rm -r resources/js/data resources/js/dev
```

then drop the `withDummyProps` call from `resources/js/app.jsx` and `VITE_USE_DUMMY_DATA`
from `.env`. Nothing else should need to change. If something does, the contract was broken
somewhere — find it rather than patching around it.

## Placeholders

Values the firm has not supplied are written so they cannot be mistaken for real ones —
`+254 7XX XXX XXX`, `example` addresses, and a `PLACEHOLDER` comment on the line. Search both
this directory and `config/site.php` for `PLACEHOLDER` before launch; none should remain.
