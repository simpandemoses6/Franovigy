// ============================================================
//  AGRICULTURE & MIXED FARMING  ("Agriculture Services" page)
//  Edit services, descriptions and bullet points here.
// ============================================================
import type { Division } from "./types";
import {cldImage} from "./cloudinary.ts";

export const agriculture: Division = {
  slug: "agriculture",
  path: "/agriculture",
  number: "02",
  logo: "/images/Logo-03.png",
  heroImage: cldImage("v1793621548/Agriulture-hero.png", "q_auto,w_1400"),
  heroBlur: cldImage("v1793621548/Agriulture-hero.png", "w_32,q_30"),
  name: "Agriculture & Mixed Farming",
  navLabel: "Agriculture Services",
  tagline: "Responsible farming for family and community.",
  summary:
      "Goat Farming • Poultry Farming • Cattle Farming • Crop Production \n combining responsible agricultural practices, productivity and sustainability to support diverse and profitable farming operations.",
  heroLines: ["FROM THE LAND,", "TO THE FUTURE."],
  intro:
      "Agriculture is an important part of our family legacy and business vision. Our operations are guided by a commitment to responsible farming, productivity, sustainability and the long-term development of family and community resources.",
  services: [
    {
      name: "Goat Farming",
      tagline: "Healthy herds, steady growth.",
      description: "Goat farming run with careful management, good feeding and attention to animal health.",
      points: ["Well-managed herds", "Responsible feeding and care", "Focus on productivity"],
    },
    {
      name: "Poultry & Chicken Farming",
      tagline: "Reliable poultry production.",
      description: "Poultry and chicken farming focused on healthy flocks and dependable production.",
      points: ["Healthy, well-housed flocks", "Good feeding and hygiene", "Consistent production"],
    },
    {
      name: "Cattle Farming",
      tagline: "Livestock for the long term.",
      description: "Cattle farming that balances productivity with responsible land and animal care.",
      points: ["Responsible herd management", "Grazing and feeding planning", "Long-term sustainability"],
    },
    {
      name: "Crop Production",
      tagline: "Growing from the ground up.",
      description: "Crop production that works hand in hand with our livestock operations as part of a mixed farm.",
      points: ["Practical, sustainable methods", "Mixed farming approach", "Productive use of land"],
    },
    {
      name: "Other Agricultural & Livestock Activities",
      tagline: "A farm that keeps growing.",
      description: "Additional agricultural and livestock activities that strengthen the farm and its contribution to the community.",
      points: ["Diversified farm activities", "Community development", "Built for future generations"],
    },
  ],
  galleryCategories: ["Agriculture"],
  pathChips: ["Goats", "Poultry", "Cattle", "Crops"],
  enterLabel: "Enter Agriculture Services",
  ctaTitle: "Interested in our farming operations?",
  ctaLabel: "Talk Agriculture",
};