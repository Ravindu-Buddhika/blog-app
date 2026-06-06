# 🚀 Project Progress Tracking

### Current Status: Phase 2 (Core Features & Monetization)

### Day 6: Saturday, June 6

**Completed:**
- **Database Abstraction:** Built a complete `postService` layer to abstract all Supabase database interactions.
- **Content Creation:** Integrated `postService` into the `CreatePostModal`, enabling real-time article creation with full TypeScript support for premium flag definitions.
- **Admin & Management:** Refactored and updated the Admin Dashboard to dynamically fetch, map, and delete posts directly via the service layer.
- **Data Fetching & Filtering:** Implemented `getPublicPosts` and `getPostById` methods to handle real-time category filtering and rich dynamic routing (`/blog/[id]`) for single blog views.
- **Stripe Monetization:** Successfully set up the Stripe CLI environment and implemented the full Stripe Checkout Session infrastructure.
- **Secure Webhook Pipeline:** Engineered a robust Stripe Webhook handler using Supabase **Service Role Client** to safely bypass RLS and dynamically upgrade profiles to premium upon successful payment.
- **Role & Access Enforcement:** Fixed frontend state synchronization by binding profile roles and subscription statuses to the global authentication listener on the Home Page.
- **Paywall Access Control:** Developed strict paywall restriction mechanics, allowing immediate premium content access to paying subscribers and Admins while triggering a conversion modal for Free readers.
- **Dynamic Navbar Sync:** Enhanced the `Navbar` component to dynamically receive subscription data and reflect an animated Premium Badge inside the profile dropdown menu.

**Next Steps:**
- Implement Post Editing capabilities (Core functionality remaining for Content Management).
- Integrate global search filtering on the Homepage search bar utilizing Supabase text queries.
- Deploy the production build onto Vercel and configure all sensitive environment variables (`.env`).
- Finalize project documentation and prepare the GitHub repository for submission.

**Challenges:**
- Ran into a Row Level Security (RLS) block when attempting to update user subscription statuses through standard frontend database queries. Resolved it by creating an isolated admin client using the `SUPABASE_SERVICE_ROLE_KEY` inside the secure Webhook endpoint.

**Status:** Ahead of Schedule

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