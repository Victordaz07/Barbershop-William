# Vehikité — Barbershop Booking Platform

Bilingual (English / Tongan) booking site for a Bay Area barbershop. React 19 +
Vite + TypeScript + Tailwind CSS, with Firebase (Firestore + Auth) for data and
admin login.

> **Branding:** "Vehikité" is the confirmed business name. Logo assets live in
> `src/assets/logo.png` (black, for light backgrounds) and
> `src/assets/logo-light.png` (cream, for dark backgrounds — navbar, footer,
> hero).

> **Tongan translation note:** the strings in `src/locales/to.json` are a
> best-effort draft, not reviewed by a native speaker. Have a fluent Tongan
> speaker proofread `to.json` before this goes live for real customers.

## Status

Implemented: project scaffold, Dark Tropics design system, i18n (EN/TO toggle
persisted to `localStorage`), public shell (Navbar/Footer/kupesi divider),
Hero, Services grid, Barbers grid, full booking flow (form, real-time time
slots, availability), reviews (public grid + submission form, moderation
queue), Firestore security rules (deployed), and an admin panel (`/admin`)
with appointment management, review moderation, and services/barbers CRUD.

Not yet built: an admin Auth account (see [Manual setup
remaining](#manual-setup-remaining)) and a final content/polish pass once
real client info (business name, address, hours, services, barbers) is
available.

`services`/`barbers` currently have placeholder data seeded directly in the
Firebase console (Signature Fade, Beard Sculpt, Full Package, Kids Cut /
Sione Taufa, Mele Vaka, David Kava) so the grids render populated while real
client info is pending.

## Manual setup remaining

These steps require Firebase Console access and can't be done from this
environment (no interactive browser/CI token, and the project's existing
service account key doesn't have the IAM roles needed):

1. **Create the admin account.** Firebase Console → Authentication → Sign-in
   method → enable **Email/Password** (if not already) → Users → Add user.
   The security rules treat *any* authenticated user as admin (single-account
   model, no public signup) — log into `/admin/login` with that email/password
   once created.
2. **(Later) Enable Cloud Storage** when the client upgrades off the Spark
   plan, to support real review photo uploads — see below.

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

## Scripts

- `npm run dev` — local dev server
- `npm run build` — type-check (`tsc -b`) and production build
- `npm run lint` — ESLint
- `npm run preview` — preview the production build locally

## Deploying

Deploys to Firebase Hosting (`barbershop-william.web.app`) happen
automatically via GitHub Actions (`.github/workflows/firebase-deploy.yml`)
on every push to `claude/new-session-bxez3q`. The workflow builds the app
and runs `firebase deploy --only hosting,firestore:rules` using a service
account key stored in the repo secret `FIREBASE_SERVICE_ACCOUNT`.

To set up or rotate that secret: GitHub repo → Settings → Secrets and
variables → Actions → New repository secret → name `FIREBASE_SERVICE_ACCOUNT`,
value = the full contents of a service account JSON key (Editor role, or at
least `Firebase Hosting Admin` + `Firebase Rules Admin`) for the
`barbershop-william` GCP project.

Manual/local deploy is still possible:

```bash
npm run build
firebase deploy --only hosting,firestore:rules --project barbershop-william
```

Requires `firebase login` or `GOOGLE_APPLICATION_CREDENTIALS` pointing at a
service account key with the roles above.

## Data model (Firestore)

- **appointments**: `{ id, clientName, phone, serviceId, barberId | 'any', date (YYYY-MM-DD), time (HH:mm), status: 'pending'|'confirmed'|'cancelled'|'done', createdAt }`
- **reviews**: `{ id, clientName, rating (1-5), comment, photoUrls: string[], approved: boolean, createdAt }`
- **services**: `{ id, nameEn, nameTo, price, durationMinutes, active: boolean }`
- **barbers**: `{ id, name, role, bioEn, bioTo, photoUrl, active: boolean }`

## Security model

`firestore.rules` (deployed): public can read `services`/`barbers` and create
`appointments` (must start `status: 'pending'`) and `reviews` (must start
`approved: false`). Any authenticated user can read/write everything — there's
a single admin account, no public signup or per-user roles.

## Enabling Storage later

The project currently runs on the Firebase **Spark** (free) plan, which does
not include Cloud Storage. Photo uploads on reviews are built behind a single
abstraction so enabling Storage later is a one-function change:

- `src/lib/uploadReviewPhotos.ts` exports `uploadReviewPhotos(files: File[]): Promise<string[]>`.
- Every caller (`ReviewForm`, `ReviewCard`) only ever calls this function and
  renders whatever strings come back — they don't know or care whether those
  are Storage URLs or something else.
- **Now:** stub that returns `[]` (no photos), so the photo input is shown as
  disabled with a "coming soon" message (`PhotoUpload.tsx`).
- **Once the client upgrades to Blaze:** swap the function body to upload to
  Firebase Storage and return real download URLs. No other code needs to
  change.

## Design system

"Dark Tropics" — see `tailwind.config.js` for the full token set (colors,
fonts). Never hardcode hex values in components; extend the theme instead.
The `KupesiDivider` component (`src/components/layout/KupesiDivider.tsx`) is
the one exception, since CSS gradients can't reference Tailwind theme tokens
directly — its color must be kept in sync with `sand` in the Tailwind config
by hand.
