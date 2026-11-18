# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Gau Sevarth: images kaise daalein

- **Gallery photos:** `public/images/` mein file daalo, phir `src/content/galleryImages.js` mein line add/badlo. `shape` = `portrait` / `square` / `landscape` / `tall`. Photo kisi bhi size ki ho, frame mein apne aap crop hoti hai. `gallery-09.jpg` se `gallery-12.jpg` ke slots ready hain (file daalte hi dikhne lagte hain).
- **Contact / footer details:** `src/content/foundationContent.js` ke `contact` section mein.
- **Bank / UPI:** `src/content/bank.js`. QR image: `public/images/gausevath ngo qr.jpeg`.
- **Contact form email:** Gmail ke liye `EMAIL_USER`, `EMAIL_PASS` (Google App Password), aur `CONTACT_TO` configure karein. Local API test ke liye `.env.example` ko `.env.local` mein copy karke values bharein, phir `npm run dev:api` chalayein. Vercel deployment par yehi variables Project Settings > Environment Variables mein add karein. `.env.local` ko commit na karein.
- Fonts ab package se aate hain (`npm install` ke baad offline bhi chalte hain).

---

## Performance, SEO and deployment notes

- **Set your domain before building** so canonical URLs, sitemap and robots are correct:
  `SITE_URL=https://your-domain.org npm run build` (also set `VITE_SITE_URL` to the same value in Vercel).
  Without it, `sitemap.xml` is skipped and canonicals use the current origin.
- **Optimize photos once:** `npm install && npm run images` creates WebP copies (480/800/1280 px) next to the originals in `public/images/`. Originals are untouched.
- **SEO text per page:** edit `src/seo/routes.js`.
- **SPA routing on Vercel:** `vercel.json` rewrites page URLs to `index.html` (so `/donate` works on refresh) and keeps `/api/*` intact.
- Secondary pages are code-split with `React.lazy`; Home loads first.

### Photos already optimized
`public/images/` now holds WebP copies (gallery photos, 640 px variants, poster, logo) and a 4 MB web version of the video (was 29.8 MB). The QR code image is the original, unchanged. New photos: add them, then run `npm run images`.

### Extra features
Error screen with reload, back-to-top button, sticky mobile "Donate Now" bar, share button on the donate page, spam trap on the contact form, keyboard focus moved to the page on navigation, and `src/responsive.css` (small-phone and large-screen safeguards).
