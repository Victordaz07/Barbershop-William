# Folau Cuts — Barbershop Booking Platform

Bilingual (English / Tongan) booking site for a Bay Area barbershop. React 19 +
Vite + TypeScript + Tailwind CSS, with Firebase (Firestore + Auth) for data and
admin login.

> **Branding note:** "Folau Cuts" is a placeholder name used throughout copy,
> i18n strings, and the logo until the client confirms the final business
> name. All copy is structured so a rename is a find-and-replace.

> **Tongan translation note:** the strings in `src/locales/to.json` are a
> best-effort draft, not reviewed by a native speaker. Have a fluent Tongan
> speaker proofread `to.json` before this goes live for real customers.

## Status

Currently implemented: project scaffold, Dark Tropics design system, i18n
(EN/TO toggle persisted to `localStorage`), public shell (Navbar/Footer/kupesi
divider), Hero, Services grid, and Barbers grid (both reading from Firestore).

Not yet built: booking flow, reviews, admin panel, security rules, deploy
config. Firestore is currently empty — until `services`/`barbers` documents
exist, those sections show their "coming soon" empty states (this is expected
behavior, not a bug).

## Setup

```bash
npm install
cp .env.example .env   # fill in Firebase web app config
npm run dev
```

### Environment variables

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

These come from the Firebase console (Project Settings → General → Your apps).
`.env` is gitignored — never commit it.

### Seeding sample data

To see the Services/Barbers sections populated, add documents to the
`services` and `barbers` Firestore collections matching the shapes in
[Data model](#data-model) below (e.g. via the Firebase console).

## Scripts

- `npm run dev` — local dev server
- `npm run build` — type-check (`tsc -b`) and production build
- `npm run lint` — ESLint
- `npm run preview` — preview the production build locally

## Data model (Firestore)

- **appointments**: `{ id, clientName, phone, serviceId, barberId | 'any', date (YYYY-MM-DD), time (HH:mm), status: 'pending'|'confirmed'|'cancelled'|'done', createdAt }`
- **reviews**: `{ id, name, rating (1-5), comment, photoUrls: string[], approved: boolean, createdAt }`
- **services**: `{ id, nameEn, nameTo, price, durationMinutes, active: boolean }`
- **barbers**: `{ id, name, role, bioEn, bioTo, photoUrl, active: boolean }`

## Enabling Storage later

The project currently runs on the Firebase **Spark** (free) plan, which does
not include Cloud Storage. Photo uploads on reviews are built behind a single
abstraction so enabling Storage later is a one-function change:

- `src/lib/photo-upload.ts` exports `uploadReviewPhotos(files: File[]): Promise<string[]>`.
- Every caller (the review form, review display) only ever calls this
  function and renders whatever strings come back — they don't know or care
  whether those are Storage URLs or something else.
- **Phase 1 (now):** stubbed/compressed-base64 implementation (see that
  file's comments for which mode is active).
- **Phase 2 (once the client upgrades to Blaze):** swap the function body to
  upload to Firebase Storage and return real download URLs. No other code
  needs to change.

This file doesn't exist yet — it ships with the reviews feature.

## Design system

"Dark Tropics" — see `tailwind.config.js` for the full token set (colors,
fonts). Never hardcode hex values in components; extend the theme instead.
The `KupesiDivider` component (`src/components/layout/KupesiDivider.tsx`) is
the one exception, since CSS gradients can't reference Tailwind theme tokens
directly — its color must be kept in sync with `sand` in the Tailwind config
by hand.
