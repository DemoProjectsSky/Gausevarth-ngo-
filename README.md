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
- **Contact form email:** Vercel env vars `EMAIL_USER`, `EMAIL_PASS`, `CONTACT_TO` set karna zaroori hai.
- Fonts ab package se aate hain (`npm install` ke baad offline bhi chalte hain).
