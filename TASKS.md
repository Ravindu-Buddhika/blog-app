# 📋 Project Task Breakdown

### Phase 1: Database & Core Authentication (Tonight's Sprint)
- [x] Setup Next.js project structure and repository tracking files
- [ ] Execute Supabase SQL Schema (Profiles, Posts with categories, and Auth triggers)
- [ ] Implement Supabase Auth inside Next.js App Router (Login / Sign-Up pages)
- [ ] Create Middleware to handle route protection based on authentication status

### Phase 2: Frontend Layout & Blog CRUD (Friday - Saturday)
- [ ] Build Home Page Grid UI with Search Bar and Category Tabs (Science, Economy, Sport, News, Entertainment)
- [ ] Build Blog Detailed View Page (`/blog/[id]`) for reading full articles
- [ ] Build Admin Dashboard (List View with Edit, Delete actions and Premium Star indicators)
- [ ] Build Create/Edit Post Page UI (Form with Title, Context, Category Dropdown, Image Upload, and Premium Toggle)
- [ ] Implement Server Actions for Admin Blog CRUD operations
- [ ] Add Frontend Blur/Gold Overlay Logic for `is_premium` posts seen by Free users

### Phase 3: Stripe Subscriptions & Vercel Deployment (Sunday)
- [ ] Integrate Stripe Checkout for Premium Subscriptions
- [ ] Create Stripe Webhook handler to automatically sync 'premium' status to user profiles
- [ ] Conduct comprehensive End-to-End testing
- [ ] Deploy the application to Vercel and submit the live URL