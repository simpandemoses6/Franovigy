# Chikumba Enterprises Website

React + TypeScript + Vite + Framer Motion + React Router.

## Run it
```
npm install
npm run dev
```
Build for production: `npm run build` (output in `dist/`).

## Editing content (all in `src/data/`)
| File | What it controls |
|---|---|
| `siteData.ts` | Company name, slogan, navigation, About page text, mission/vision/values, directors and their HiHello links |
| `digitalData.ts` | Tech Services page: services, hover details, tools |
| `agricultureData.ts` | Agriculture Services page: services, hover details |
| `contactData.ts` | Phone, email, WhatsApp, address, social links |
| `galleryData.ts` | Project gallery images (images only, no details) |
| `testimonialsData.ts` | Client testimonials (hidden if the list is empty) |

Gallery images go in `public/images/gallery/digital|design|agriculture/`. Director photos go in `public/images/` (set `photo` in siteData.ts).

## Pages
Home, Tech Services (`/digital`), Agriculture Services (`/agriculture`), About Us, Projects, Contact Us.
