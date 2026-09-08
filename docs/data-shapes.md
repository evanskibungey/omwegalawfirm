# Data shapes — the integration contract

**Status:** draft for confirmation with Omwenga & Company Advocates.
**Owner:** HittyTech Solutions. **Last updated:** 8 September 2026.

This document defines the exact shape of every prop the React pages receive. It is written
*before* any component exists, and it is the reason the front-end-first build order is cheap
rather than expensive.

## The rule

The front end is built first, against dummy data. That only saves time if the dummy data is
shaped **identically** to what the Laravel controllers will eventually send.

1. Dummy modules live in `resources/js/data/` and export objects matching the shapes below.
2. Pages receive data through **Inertia props only**. No component ever imports a dummy
   module directly.
3. During Phases 1-2 a thin dev-only provider injects the dummy data as props.
4. In Phase 3 the provider is deleted and controllers return real props of the same shape.
   The React tree does not change.

If a shape needs to change, change it *here* first, then in the dummy module, then in the
component. Never let a component quietly depend on something this document does not promise.

## Conventions

| Rule | Decision |
| --- | --- |
| Key casing | `snake_case` everywhere — matches Eloquent's default serialization, so no transform layer is needed |
| IDs | Integers |
| Dates and times | ISO 8601 with offset, e.g. `2026-09-08T14:32:00+03:00`. Formatted in React by one shared `formatDate()` helper — never preformatted server-side |
| Dates without time | `YYYY-MM-DD`, e.g. `2026-08-14` |
| Absent values | Explicit `null`. **Never omit a key** — a missing key and a null key fail differently in destructuring |
| Nested records | Summary only: `{ id, name }`. A matter carries a client summary, not a full client object |
| Money | Not used in the core scope. If billing is ever added: integer cents, never floats |
| Storage timezone | UTC in the database, rendered to `Africa/Nairobi` on output. The ISO offset carries what the front end needs either way |

## Shared props

Sent with every response by `HandleInertiaRequests::share()`.

```js
{
  auth: {
    user: {
      id: 3,
      name: "Advocate Name",
      email: "name@omwenga.co.ke",
      role: "admin",              // admin | advocate | staff — added in Phase 3
    },                            // or null when logged out
  },
  flash: {
    success: "Client saved.",     // or null
    error: "Something went wrong.", // or null
  },
  ziggy: {},                      // route helper payload
}
```

> **Phase 3 note.** `share()` currently returns `$request->user()` — the whole model. Once
> roles exist, replace it with an explicit array of exactly the four keys above, so a column
> added to `users` later is never leaked to the browser by accident.

## Pagination envelope

All admin lists paginate. Passing `Model::paginate()` straight into an Inertia prop produces
Laravel's `LengthAwarePaginator` shape, so dummy modules must reproduce it exactly:

```js
{
  data: [],                       // array of records
  current_page: 1,
  last_page: 4,
  per_page: 25,
  from: 1,
  to: 25,
  total: 87,
  path: "https://omwenga.co.ke/admin/clients",
  first_page_url: "https://omwenga.co.ke/admin/clients?page=1",
  last_page_url: "https://omwenga.co.ke/admin/clients?page=4",
  next_page_url: "https://omwenga.co.ke/admin/clients?page=2",
  prev_page_url: null,
  links: [
    { url: null, label: "&laquo; Previous", active: false },
    { url: "https://omwenga.co.ke/admin/clients?page=1", label: "1", active: true },
  ],
}
```

Build one `Pagination` component against this shape in Phase 1 and reuse it everywhere.

## Entities

Fields marked **PD** are personal data under the Kenya Data Protection Act 2019. They drive
the retention policy, the audit trail, and who is allowed to see what.

### Client

```js
{
  id: 12,
  name: "Achieng Otieno",                                 // PD
  type: "individual",                                     // individual | organisation
  email: "a.otieno@example.co.ke",                        // PD, nullable
  phone: "+254 712 345 678",                              // PD, nullable
  national_id: "12345678",                                // PD, nullable — admin only, never in list views
  kra_pin: "A001234567Z",                                 // PD, nullable — admin only
  postal_address: "P.O. Box 1234-30100, Eldoret",         // PD, nullable
  physical_address: "Daima Towers, Uganda Road",          // PD, nullable
  notes: "Referred by ...",                               // PD, nullable — may contain privileged detail
  status: "active",                                       // prospect | active | former
  matters_count: 3,
  created_at: "2026-09-01T09:14:00+03:00",
  updated_at: "2026-09-04T11:02:00+03:00",
}
```

On the client **detail** page only, add `matters: []` — an array of Matter summaries.

### Matter

The central record. Both `status` and `reference` need the firm's sign-off.

```js
{
  id: 88,
  reference: "OCA/CONV/2026/014",
  title: "Transfer of L.R. No. 12345/6, Eldoret",
  client: { id: 12, name: "Achieng Otieno" },             // summary only
  practice_area: "conveyancing",                          // slug — see enumerations
  advocate: { id: 3, name: "Advocate Name" },             // nullable
  status: "active",
  description: "...",                                     // nullable
  court_reference: "ELD HCCC E045 of 2026",               // nullable — litigation matters only
  opened_on: "2026-08-14",
  closed_on: null,
  notes_count: 7,
  last_activity_at: "2026-09-05T16:20:00+03:00",          // nullable
  created_at: "2026-08-14T10:00:00+03:00",
  updated_at: "2026-09-05T16:20:00+03:00",
}
```

A **Matter summary** — used inside a Client and in dashboard lists — is the subset
`{ id, reference, title, practice_area, status, advocate, last_activity_at }`.

On the matter **detail** page only, add `notes: []` — an array of MatterNote, newest first.

### MatterNote

The running progress log from proposal section 4.4. Append-only by design: an edited history
is worth less than an honest one.

```js
{
  id: 401,
  matter_id: 88,
  author: { id: 3, name: "Advocate Name" },
  body: "Filed the transfer instrument at the Lands Registry.",
  created_at: "2026-09-05T16:20:00+03:00",
}
```

### Enquiry

Created by the public consultation form (proposal section 4.5).

```js
{
  id: 7,
  name: "Prospective Client",                             // PD
  email: "someone@example.com",                           // PD, nullable
  phone: "+254 712 345 678",                              // PD, nullable
  practice_area: "conveyancing",                          // slug, nullable
  message: "I would like advice on ...",                  // PD
  status: "new",                                          // new | contacted | converted | closed
  converted_client_id: null,                              // Client id once converted
  received_at: "2026-09-07T08:41:00+03:00",
}
```

### GalleryImage

```js
{
  id: 21,
  url: "/storage/gallery/reception-large.webp",
  thumb_url: "/storage/gallery/reception-thumb.webp",
  alt: "Reception area with branded wall signage",        // required — accessibility
  caption: "Our reception at Daima Towers",               // nullable
  category: "office",                                     // office | team | events | brand | milestones
  sort_order: 3,
}
```

> Proposal section 4.2 is explicit that no gallery image may identify a client or show client
> documents without written consent. Worth restating in the upload screen's help text.

### PracticeArea

The seven areas are fixed and rarely change, so these are **static config in the
application**, not a database table — one less admin screen to build and train staff on. If
the firm later wants to edit them itself, that is a post-launch add-on.

```js
{
  slug: "conveyancing",
  name: "Conveyancing",
  summary: "One-sentence description for the practice-area grid.",
  body_html: "<p>Full page copy supplied by the firm.</p>",
  icon: "deed",
}
```

### Staff user

```js
{
  id: 3,
  name: "Advocate Name",
  email: "name@omwenga.co.ke",                            // PD
  role: "advocate",                                       // admin | advocate | staff
  is_active: true,
  created_at: "2026-09-01T09:00:00+03:00",
}
```

## Enumerations — needs the firm's confirmation

### Matter status

Proposal section 4.4 gives "New, Active, Closed" as an example and leaves the real list to be
agreed. This is the proposed set. The two waiting states exist because a conveyancing practice
spends real time blocked on the Lands Registry or a bank, and a matter parked there is not the
same as a matter nobody is working on — collapsing them hides exactly the difference the firm
most needs to see.

| Value | Label | Meaning |
| --- | --- | --- |
| `new` | New | Opened, work not yet begun |
| `active` | Active | Being actively worked on |
| `waiting_client` | Waiting on client | Blocked on documents, instructions or payment |
| `waiting_third_party` | Waiting on third party | Blocked on the registry, a court, a bank, opposing counsel |
| `closed` | Closed | Concluded |
| `archived` | Archived | Closed and filed away, hidden from default views |

**Confirm before Phase 3.** This list is the backbone of the `matters` table and roughly half
the admin UI. Changing it once real data exists is expensive.

### Practice area slugs

Taken verbatim from proposal section 2.

| Slug | Label |
| --- | --- |
| `conveyancing` | Conveyancing |
| `real-estate` | Real Estate & Property Development |
| `civil-litigation` | Civil Litigation & Dispute Resolution |
| `insurance-law` | Insurance Law |
| `environment-land` | Environment & Land Laws |
| `commercial-corporate` | Commercial & Corporate Law |
| `banking-finance` | Banking & Finance |

### Roles — proposed

| Role | Clients | Matters | Enquiries | Staff accounts |
| --- | --- | --- | --- | --- |
| `admin` | All, including national ID and KRA PIN | All | All | Create, edit, deactivate |
| `advocate` | All | All, but edits only those assigned to them | All | No |
| `staff` | All, excluding ID and PIN fields | Assigned matters only | All | No |

Authorisation is enforced in Laravel policies, not by hiding buttons. A hidden button is not
a permission.

### Matter reference format — proposed

`OCA / practice-area code / year / sequence`, for example `OCA/CONV/2026/014`. Generated by
the system on creation, editable by an admin. **Ask the firm what they use on paper today**
and match it — a system reference that disagrees with the physical file is worse than no
reference at all.

## Page prop contracts

What each Inertia page receives. Dummy providers must supply exactly this.

### Public

| Page | Props |
| --- | --- |
| `Public/Home` | `practice_areas`, `advocates`, `gallery_preview` |
| `Public/PracticeArea` | `area`, `related` |
| `Public/About` | `advocates` |
| `Public/Contact` | `office: { address, phone[], email, hours, map_embed_url }` |
| `Public/Gallery` | `images`, `categories` |

The consultation form posts to the enquiry endpoint and needs no props of its own beyond
`practice_areas` for its dropdown.

### Admin

| Page | Props |
| --- | --- |
| `Admin/Dashboard` | `stats: { active_matters, new_enquiries, clients_total }`, `recent_matters`, `recent_enquiries` |
| `Admin/Clients/Index` | `clients` (paginated), `filters: { search, status }` |
| `Admin/Clients/Show` | `client` (with `matters`) |
| `Admin/Clients/Form` | `client` (null when creating) |
| `Admin/Matters/Index` | `matters` (paginated), `filters: { search, status, practice_area, advocate_id }`, `advocates` |
| `Admin/Matters/Show` | `matter` (with `notes`) |
| `Admin/Matters/Form` | `matter` (null when creating), `clients`, `advocates` |
| `Admin/Enquiries/Index` | `enquiries` (paginated), `filters: { search, status }` |
| `Admin/Enquiries/Show` | `enquiry` |
| `Admin/Gallery/Index` | `images`, `categories` |

`filters` always echoes back the currently applied values, so the controls stay in sync with
the URL after a reload or a shared link.

## Open questions for the discovery session

1. Confirm or amend the **matter status list** above.
2. Confirm the **matter reference format** — what appears on the physical file today?
3. Confirm the **roles matrix**, particularly whether an advocate should see colleagues' matters.
4. Do clients need **more than one contact person**? Relevant for organisation clients.
5. Should closed matters be **retained indefinitely**, or purged after a set period? The Data
   Protection Act expects a defined retention period, and that answer belongs to the firm.
6. Who supplies the **practice-area copy** and the **photographs**?
