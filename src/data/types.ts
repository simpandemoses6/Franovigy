export type GalleryCategory = "Web Development" |"Digital" | "Design, Print & Paste" | "Agriculture";

export interface ServiceItem {
  name: string;
  tagline: string; // shown on the card
  description: string; // shown on hover (desktop) or in the bottom sheet (phones)
  points: string[];
}

export interface Division {
  slug: "digital" | "agriculture";
  path: string;
  number: string;
  logo?: string; // small logo shown on the landing page path card
  heroImage?: string; // picture shown in the page hero (replaces the animated artwork)
  heroBlur?: string; // blurred version of hero image for loading placeholder
  name: string;
  navLabel: string;
  tagline: string;
  summary: string;
  heroLines: string[];
  intro: string;
  services: ServiceItem[];
  tools?: string[];
  galleryCategories: GalleryCategory[];
  pathChips: string[]; // small tags on the landing page cards
  enterLabel: string;
  ctaTitle: string;
  ctaLabel: string;
}

export interface GalleryItem {
  category: GalleryCategory;
  src: string; // thumbnail (or the poster frame for a video)
  full?: string; // larger picture for the full-size viewer
  video?: string; // if set, this item is a video
  alt?: string;
  project?: string;
  date?: string;
}