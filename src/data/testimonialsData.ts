// ============================================================
//  TESTIMONIALS  - shown on the Home page and the Projects page.
//  Replace the sample entry with real client words. If this list
//  is empty, the testimonial sections are hidden automatically.
// ============================================================

export interface Testimonial {
  quote: string;
  name: string;
  role: string; // e.g. "Owner, Company name"
}

export const testimonials: Testimonial[] = [
  {
    quote: "Replace this with a real testimonial from one of your clients.",
    name: "Client Name",
    role: "Company, Lusaka",
  },
  {
    quote: "Add as many testimonials as you have. They rotate automatically.",
    name: "Client Name",
    role: "Company, Lusaka",
  },
];
