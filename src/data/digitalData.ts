// ============================================================
//  DIGITAL & BUSINESS SOLUTIONS  ("Tech Services" page)
//  Edit services, descriptions and bullet points here.
// ============================================================
import type { Division } from "./types";
import { cldImage } from "./cloudinary";

export const digital: Division = {
  slug: "digital",
  path: "/digital",
  number: "01",
  logo: "/images/Logo-02.png",
  heroImage: cldImage("v1791211510/digital-hero.png", "q_auto,w_1400"),
  heroBlur: cldImage("v1791211510/digital-hero.png", "w_32,q_30"),
  name: "Digital & Business Solutions",
  navLabel: "Tech Services",
  tagline: "Creativity, technology and business knowledge in one place.",
  summary:
      "Web Development • Graphic Design • Printing & Branding • Consultancy • Digital Marketing \n delivering practical and creative solutions that help individuals, businesses, organisations and institutions establish, improve and grow their operations.",
  heroLines: ["DIGITAL SOLUTIONS"],
  intro:
      "We combine creativity, technology and business knowledge to help our clients communicate effectively, strengthen their brands and operate more efficiently.",
  services: [
    {
      name: "Digital & IT Solutions",
      tagline: "Technology that keeps you running.",
      description:
          "Practical IT and digital solutions that help people and organisations set up, improve and manage the technology they depend on.",
      points: ["IT setup and support", "Digital tools and systems", "Technology guidance"],
    },
    {
      name: "Web Design & Software Development",
      tagline: "Websites and systems built around your business.",
      description:
          "From a clean business website to custom software, we design and build digital products that are fast, modern and easy to use.",
      points: ["Business and corporate websites", "Custom software and databases", "E-commerce and online platforms", "Ongoing maintenance and support"],
    },
    {
      name: "Business Consultancy",
      tagline: "Clear thinking for growing businesses.",
      description:
          "Practical guidance to help you establish, structure and grow your business or organisation with confidence.",
      points: ["Business setup and planning", "Process improvement", "Growth support"],
    },
    {
      name: "Graphic Design & Creative Services",
      tagline: "Design that gets noticed.",
      description:
          "Visual communication that makes your business look as good as it works, from a first logo to a full campaign.",
      points: ["Logos and brand identity", "Flyers, posters and brochures", "Social media graphics", "Company profiles"],
    },
    {
      name: "Printing & Branding",
      tagline: "From screen to finished print.",
      description:
          "Quality printing and branded materials, so what your customers hold matches what they see online.",
      points: ["Business cards and stationery", "Banners and large format", "Stickers, labels and certificates", "Branded materials"],
    },
    {
      name: "Digital Marketing & Tech Solutions",
      tagline: "Be found. Be remembered.",
      description:
          "Digital marketing and related technology solutions that help your business reach and keep customers.",
      points: ["Social media presence", "Online campaigns", "Related technology solutions"],
    },
  ],
  tools: ["React", "TypeScript", "Node.js", "SQL Databases", "REST APIs", "Tailwind CSS", "Mobile-first design"],
  galleryCategories: ["Digital", "Design & Print"],
  pathChips: ["Web & Software", "Graphic Design", "Printing & Branding", "Consultancy", "Digital Marketing"],
  enterLabel: "Enter Tech Services",
  ctaTitle: "Have an idea, a brand or a business to grow?",
  ctaLabel: "Start a Digital Project",
};