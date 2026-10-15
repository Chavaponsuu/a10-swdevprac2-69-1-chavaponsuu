# Assignment 10 NextAuth Implementation Plan

> **For agentic workers:** Implement inline with test-driven development and verification before completion. Preserve all existing uncommitted work; do not commit or publish.

**Goal:** Implement Assignment 10 from the supplied PDF in the existing Venue Explorer app.

**Architecture:** NextAuth v4 Credentials Provider calls the backend login API. Its JWT carries the backend token into `session.user.token`; the root server layout seeds a client SessionProvider. Booking reads the authenticated profile on the server, while TopMenu and Banner read the client session.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript strict mode, NextAuth v4, Jest and React Testing Library.

**Spec:** `/Users/chavaponsuu/Downloads/THIS IS YOUR PRESENTATION TITLE.pdf`, pages 1–11.

## Global Constraints

- Keep `src/libs/userLogIn.tsx`, `src/libs/getUserProfile.tsx`, `src/providers/NextAuthProvider.tsx`, and `src/next-auth.d.ts` at the paths requested by the assignment.
- Login uses POST JSON `{ email, password }`; profile uses GET with `Authorization: Bearer <token>`.
- Default backend: `https://a08-venue-explorer-backend.vercel.app/api/v1`.
- Sign-In/Sign-Out is on the left of TopMenu; Booking and the existing logo stay on the right.
- Booking displays Name, Email, Tel., Member Since above the existing booking form only when signed in.
- Banner displays `Welcome <name>` in its top right corner when signed in.
- Use local installed Next.js documentation and asynchronous request APIs; never print tokens or secrets.

## Review Focus

- Invalid credentials must not create a session.
- Returning JWT callbacks must retain the backend token when no new user is supplied.
- Signed-out users must still be able to view the original booking form and banner.
- A failed profile request must show a useful message without removing the booking form.
- Development environment setup must work without committing a real secret.

### Task 1: Backend authentication and session configuration

**Files:** `src/types/auth.ts`, `src/libs/userLogIn.tsx`, `src/libs/getUserProfile.tsx`, `src/libs/authOptions.ts`, `src/next-auth.d.ts`, `src/app/api/auth/[...nextauth]/route.ts`, `.env.example`, README, package files.

**Interfaces:** `userLogIn(email: string, password: string): Promise<UserLogInResponse>`, `getUserProfile(token: string): Promise<UserProfileResponse>`, `authOptions: NextAuthOptions`.

- [x] Add backend-helper and authentication-callback tests for successful requests, rejected credentials, missing credentials, token persistence, and typed sessions. Run to observe missing functionality.
- [x] Implement the helpers, credentials authorization, JWT/session callbacks, NextAuth handler, and local environment setup.
- [x] Run the focused backend/authentication tests; expect all to pass.

### Task 2: Session-aware app UI

**Files:** `src/providers/NextAuthProvider.tsx`, `src/app/layout.tsx`, `src/components/TopMenu.tsx`, `src/components/Banner.tsx`, `src/components/banner.module.css`, `src/app/booking/page.tsx`.

**Interfaces:** Provider accepts `session: Session | null` and `children: ReactNode`; Booking remains a no-argument async page; the interactive DateReserve remains a client component.

- [x] Run existing assignment cases 2 and 3 and add signed-out/navigation/profile-failure coverage before implementation.
- [x] Wrap the app in the seeded provider, add navigation and welcome text, and render server-fetched profile above the existing booking form.
- [x] Run UI tests; expect all to pass without changing supplied assignment tests.

### Task 3: Verify and document

- [x] Run all three assignment cases, the full suite, TypeScript checks, lint, and production build. Record any pre-existing failures separately.
- [x] Verify a real login, session, profile, banner, and logout flow locally using the supplied test account.
- [x] Review the final diff for requirements, unrelated edits, and accidental secrets; report results and any remaining external limitations.

## Verification results

- Full Jest suite: 6 suites, 22 tests passed, including the three unchanged assignment test files and real backend requests.
- `next typegen` and `tsc --noEmit`: passed. Added the pre-existing missing `VenueDetailJson` type to unblock strict compilation.
- Final `npm run build`: passed with all six app routes generated. Existing Next config warnings about `images.domains` and a parent lockfile remain.
- ESLint on `src` and new tests: zero errors, two existing image-element warnings. Full project lint still reports pre-existing errors in supplied `case1.test.tsx` and the `Object` type in `interface.ts`.
- Browser: signed in as Alice, verified Sign-Out navigation, visible Welcome Alice, all four profile fields, and successful logout returning Sign-In and removing the welcome.
- Visual check found the unlayered global reset overriding the new Tailwind body offset and profile padding. Fixed the body offset in global CSS and isolated new profile spacing in a CSS module; verified body padding 70px, nav bottom 70px, welcome top 90px.
- Independent read-only review found no runtime blockers. Fixed its test-isolation finding and verified tests with an overridden `BACKEND_API_URL`.
- `.env.local` is ignored and contains a generated private local secret; `.env.example` contains a placeholder only. No commits or publishing performed.
