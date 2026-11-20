# Dry Fruits Business — Public Website + Owner Dashboard

A React + TypeScript + Supabase catalogue for a small Indian dry fruits shop. **No cart, no checkout, no payment gateway.** Customer enquiries open WhatsApp with a prefilled message. Product data is managed from `/admin`.

## Included

- Public home, catalogue, search/filter/sort, product details, about and contact pages.
- English/Hindi switcher, product photos, quantity-specific prices and active promotions.
- Mobile-friendly password-protected owner console for products, pack sizes, image uploads, categories, promotions and business settings.
- Supabase PostgreSQL schema, RLS policies, public-read/admin-write permissions and storage policies.
- Unit tests for pricing and WhatsApp links.
- Future WhatsApp chatbot architecture in `docs/WHATSAPP_FUTURE.md` (not a working chatbot).

## Requirements

Node.js 20+; npm; free Supabase project; hosting provider suitable for **commercial** sites. Free tiers have quotas and can change. A domain name is optional; use a free provider subdomain.

## Local setup (VS Code)

1. Open this directory in VS Code.
2. Run `npm install`.
3. Create a Supabase project at https://supabase.com (a free plan is available, subject to limits and possible inactivity pauses).
4. In Supabase SQL Editor run `supabase/migrations/001_initial.sql` **once**. Run `supabase/seed.sql` afterward for clearly marked demo products.
5. Copy `.env.example` to `.env`. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from Supabase Project Settings / API. Use the public publishable/anon key, **never** the service-role secret.
6. Run `npm run dev`. Open the URL printed by Vite (usually http://localhost:5173).
7. Run `npm test` and `npm run build` to check the application.

### Securely provision the owner (required)

1. In Supabase dashboard > Authentication > Users, create/invite a user with a strong password. Do not enable unrestricted public sign-up for this application. Confirm the user email if your auth configuration requires it.
2. Copy the user's UUID from the Authentication Users dashboard.
3. As the database administrator, run in Supabase SQL Editor (replace the UUID):

```sql
insert into public.admin_profiles(user_id)
values ('YOUR_AUTH_USER_UUID');
```

4. Sign in at `/admin` with that user's email/password. Only users listed in `admin_profiles` can edit data. The app has no public admin registration form.

### Configure shop details

From `/admin` > Shop Settings, set shop name, phone and **WhatsApp number including country code without leading +** (example `919876543210`), address, hours, and social links. For product photos use Products > Edit/Add > Upload; JPEG/PNG/WebP, max 3 MB per file. The app stores them in Supabase Storage `product-images`.

**Note:** The database contains sample products but no stock photos. Upload genuine product photos you own. Shop hero image is configured using a public URL in Shop Settings. If unset, a styled graphic appears instead.

## GitLab

```bash
git init
git add .
git commit -m "Initial dry fruits business website"
git branch -M main
git remote add origin https://gitlab.com/YOUR_USERNAME/dry-fruits-business.git
git push -u origin main
```

Do not commit `.env` or passwords. The `.gitignore` excludes `.env`.

## Free deployment

Choose a static hosting free tier whose terms permit a commercial retail website. **Do not assume Vercel Hobby permits commercial use.** Cloudflare Pages is one potential option; verify current terms and limits before deploying. You can upload the built `dist/` output or connect GitLab if your selected host supports it.

- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as build-time environment variables.
- Configure SPA fallback routing to `/index.html` for `/products/...` and `/admin` URLs. `public/_redirects` is provided for hosts that support it; other hosts require their own rewrite rule.
- In Supabase Authentication URL configuration, add your production site URL and any appropriate redirect URLs.
- Test public pages and admin login on the deployed URL.

## Manual verification checklist

- [ ] Homepage, catalogue, filters, sorting, product details, about, contact work.
- [ ] Hindi/English switch updates product labels.
- [ ] Public users cannot edit database rows or upload images.
- [ ] Admin sign-in works; unapproved account is denied.
- [ ] Admin creates, edits and deletes a product; changes show publicly after refresh.
- [ ] Admin uploads and removes product photos.
- [ ] Owner sets different prices for 100g/250g/500g/1kg.
- [ ] Active promotions show discounted price; expired promotions do not.
- [ ] WhatsApp link opens the right number with correct product, pack size and price; customer presses Send.
- [ ] Social links, shop settings and mobile navigation work.
- [ ] `npm test` and `npm run build` succeed.

## Limitations / operating costs

The initial release uses official WhatsApp click-to-chat links, not a programmable WhatsApp chatbot. Facebook/Instagram organic posts are free, but sponsored ads cost money. Free hosting/Supabase plans have limits and may pause or change; no permanent ₹0 production guarantee is possible. Supabase authentication, database, and storage must be configured by the developer before the live site works.

## Architecture

`React/Vite browser -> Supabase client -> PostgreSQL (RLS) + Storage`.
Public users have read-only access to visible products and public shop information. Admin authorization is enforced in PostgreSQL policies using `is_shop_admin()`, not just hidden UI controls. Product images are stored in a public-read, admin-write storage bucket. Future official WhatsApp automation is documented separately.
