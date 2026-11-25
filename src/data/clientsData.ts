// ============================================================
//  CLIENTS  - shown on the Clients page, by logo.
//  1. Put each logo in public/images/clients/ (PNG with a transparent background looks best),
//     or paste a Cloudinary link as the logo.
//  2. Add one line per client below. "category" and "url" are optional:
//       category -> adds the client to a filter tab
//       url      -> makes the logo a link to the client's website
//  If a logo file is missing, the client's name is shown in its place.
//  The entries below are examples based on your gallery projects. Replace them with your real clients.
// ============================================================
import type { GalleryCategory } from "./types";

export interface Client {
    name: string;
    logo: string;
    category?: GalleryCategory;
    url?: string;
    dark?: boolean;
}

export const clients: Client[] = [
    { name: "Ratsa", logo: "https://www.rtsa.org.zm/wp-content/uploads/2022/12/header-final-2.png", category: "Design, Print & Paste" },
    { name: "Mungabwa", logo: "/images/clients/mungabwa.png", category: "Design, Print & Paste" },
    { name: "FEM", logo: "/images/clients/fem.png", category: "Design, Print & Paste" },
    { name: "RIB", logo: "https://ribrisk.com/wp-content/uploads/2024/03/rib-logo.png", category: "Design, Print & Paste" },
    { name: "The Fanellie Livestock Sanctuary", logo: "https://res.cloudinary.com/eotxgi4p/image/upload/v1792680568/Logo.png", category:"Design, Print & Paste"},
];