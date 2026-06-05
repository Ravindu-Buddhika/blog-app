# 🚀 Project Progress Tracking

### Current Status: Phase 1 (Database & Authentication)

---

### Day 5: Friday, June 5

**Completed:**
- Connected Next.js application to Supabase (`.env.local` & client setup).
- Implemented full Supabase Authentication flow with custom Login and Sign-up pages.
- Created the Public Home Page UI with responsive Categories and Search Layout.
- Developed reusable UI components: `BlogCardMini.tsx` and `AdminBlogCard.tsx`.
- Built the core **Admin Dashboard (`/admin`)** layout with sticky sidebar navigation.
- Fixed the admin page 404 routing by correctly aligning the folder structure under `src/app/admin/`.
- Secured the `Navbar.tsx` user dropdown by implementing role-based conditional rendering for Authors/Admins.

**Next Steps:**
- Setup Next.js Middleware / Route Guarding for strict backend protection on `/admin`.
- Create "Create Post" Page/Modal UI for Authors to write blogs.
- Connect Frontend UI with Supabase DB to Fetch & Display live blogs (Replacing current Dummy Data).

**Challenges:**
- Had a minor routing delay due to a misaligned folder structure (`src/admin` instead of `src/app/admin`), but resolved it quickly.

**Status:** On Track

---

### Day 4: Thursday, June 4

**Completed:**
- Initialized Next.js project with Tailwind CSS & TypeScript.
- Designed full UI Wireframes in Figma (Home, Blog View, Admin Dashboard, Create Post).
- Finalized Project Task Breakdown (`TASKS.md`).
- Designed Supabase PostgreSQL Schema (Profiles, Posts, Triggers).

**Next Steps:**
- Connect Next.js to Supabase and implement Authentication flow.
- Set up initial routing for public and admin pages.

**Challenges:**
- Initial setup took some time to finalize the database schema and RLS policies.

**Status:** On Track