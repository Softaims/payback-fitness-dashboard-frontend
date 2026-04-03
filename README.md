# Payback Fitness — Dashboard

The web dashboard for the Payback Fitness platform, serving two distinct surfaces: a user-facing app for managing fitness challenge groups and tracking progress, and an internal admin panel for managing users, groups, and platform analytics.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router v7 |
| State | Zustand |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Icons | Lucide React |
| HTTP | Axios |
| Validation | Zod |
| Notifications | react-hot-toast |

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- A running instance of the [backend API](../backend/README.md)

### Installation

```bash
npm install
```

### Environment

Create a `.env` file in the project root:

```env
VITE_SERVER_URL=http://localhost:3000
```

### Running

```bash
npm run dev
```

The dev server starts at `http://localhost:5173` with HMR enabled.

---

## Project Structure

```
src/
├── user/
│   ├── components/     # User-facing UI components
│   ├── routes/         # Page components and route definitions
│   ├── constants/      # Enums, config constants
│   └── utils/          # User-domain utilities
├── admin/
│   ├── components/     # Admin-specific UI components
│   ├── layouts/        # Admin shell and sidebar layouts
│   ├── pages/          # Admin page components
│   ├── routes/         # Admin route definitions
│   └── store/          # Admin-scoped Zustand stores
└── shared/
    ├── components/     # Cross-cutting UI primitives
    ├── hooks/          # Shared React hooks
    ├── lib/            # Axios instance, token helpers
    ├── utils/          # General utilities
    └── constants/      # App-wide constants
```

### Routing

The app uses two top-level route trees with separate auth guards:

- `/` → User routes (onboarding, groups, workouts, progress)
- `/admin` → Admin routes (protected by admin role check)

Auth state is derived from the JWT stored in `localStorage`, decoded client-side with `jwt-decode`.

---

## Key Features

**User surface:**
- Authentication (email/password, Google OAuth, magic link)
- Onboarding flow with subscription plan selection (Stripe)
- Group creation, joining via invite code, and member management
- Workout logging with type, duration, and notes
- Weekly progress tracking against group goal
- PF Coins balance and transaction history
- Referral code sharing and status tracking

**Admin surface:**
- Platform overview dashboard with key metrics
- User management — search, suspend, edit, delete
- Group management — inspect, force-complete, reset challenges
- PF Coins management — purchase and redemption oversight
- Analytics and reporting views

---

## Build & Deployment

```bash
# Production build (output in /dist)
npm run build

# Preview the production build locally
npm run preview

# Serve the built output (production)
npm run start
```

Vite outputs static assets to `/dist`. Deploy to any static host (Vercel, Netlify, S3 + CloudFront, etc.) or serve via the bundled `serve` package using `npm run start`.

Ensure `VITE_SERVER_URL` points to the correct API base URL for the target environment before building — Vite bakes environment variables into the bundle at build time.

---

## Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run start` | Serve `/dist` in production |
| `npm run lint` | Run ESLint |
