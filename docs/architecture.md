# Architecture
- Framework: Next.js (App Router) with Client Components by default( as i am integration firebase as backend not server side).
- UI: Mantine v7. Theme in `/theme/index.ts`.
- Data: Firebase (Auth, Firestore, Storage). Client SDK only in client.
- State: Local component state + zustang as globale state — no global unless necessary.
- Fetching rules:
  - Client: use typed hooks for Firestore reads/writes.
- Error handling: never swallow errors; surface via `notifications` (Mantine) or route error boundaries.
