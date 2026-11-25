// ============================================================
//  SITE CONTENT  - company, navigation, About page, directors.
//  Digital services:  digitalData.ts
//  Farming services:  agricultureData.ts
//  Phone / email:     contactData.ts
//  Gallery images:    galleryData.ts
//  Testimonials:      testimonialsData.ts
// ============================================================
import { digital } from "./digitalData";
import { agriculture } from "./agricultureData";

export interface Director {
  id: string;
  firstName: string;
  fullName: string;
  role: string;
  variant: "mono" | "red"; // mono = black/white, red = black/red/white
  photo?: string; // e.g. "/images/paul.jpg" (put file inside /public/images)
  bio: string;
  hiHelloUrl: string; // <-- paste each director's HiHello digital card link here
}

export const divisions = [digital, agriculture];

export const company = {
  name: "CHIKUMBA ENTERPRISES",
  shortName: "CHIKUMBA",
  suffix: "CE LEGACY 1957",
  fullName: "Chikumba Enterprises (CE)- Legacy 1957",
  slogan: "LEGACY 1957",
  slogan_st1: "LEGACY",
  slogan_st2: "1957",
  tagline: ["CHIKUMBA ENTERPRISES"],
  heroText:
      "is a family-owned, legacy-driven enterprise carrying our father's vision forward through digital and business solutions and mixed farming.",
  year: 2026,
  logo: "/images/Logo-01.png", // main logo (navbar, footer, menu, intro)
  // "original" = show as is, "black" = turn a light logo black, "tile" = put it on a white tile
  logoStyle: "original" as "original" | "black" | "tile",
  // true if the logo image already contains the company name (hides the text beside it)
  logoHasName: true,
  // logo shown in the centre of the rotating "Legacy 1957" ring on the Home page
  badgeLogo: "/images/Logo-04.png",
  techLogo: "/images/Logo-02.png",
  agricultureLogo: "/images/Logo-03.png",
  profileFile: "/Chikumba-Company-Profile.pdf", // put the PDF in /public with this exact name
  profileLabel: "Download Company Profile",
};

// Words that rotate in the home page hero ("Now building: ...")
export const heroWords = ["Websites", "Brands", "Software", "Livestock", "Crops"];

// Scrolling ticker under the hero
export const marquee = [
  "Web Design",
  "Software",
  "Graphic Design",
  "Printing & Branding",
  "Business Consultancy",
  "Digital Marketing",
  "Goat Farming",
  "Poultry",
  "Cattle",
  "Crop Production",
];

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: digital.navLabel, path: digital.path },
  { label: agriculture.navLabel, path: agriculture.path },
  { label: "Projects", path: "/projects" },
  {label: "Clients", path: "/clients"}
];

// How a digital project runs (shown on the Tech Services page)
export const workSteps = [
  { title: "Brief", text: "We listen, then agree scope, budget and timeline." },
  { title: "Create", text: "Design and development start, and you see progress early." },
  { title: "Refine", text: "We review together and adjust until it is right." },
  { title: "Deliver", text: "Prints delivered, sites launched, systems handed over with support." },
];

export const about = {
  heroLines: ["BUILT ON LEGACY.", "DRIVEN BY ACTION."],
  brief: [
    "Chikumba Enterprises (CE)- Legacy 1957 is a family-owned and legacy-driven enterprise established to preserve, build upon, and carry forward the vision and values of our father's legacy.",
    "Under the slogan \"Legacy 1957\", the company is more than a business. It is a continuation of a family foundation built on hard work, integrity, resilience, innovation, and a commitment to creating opportunities for future generations.",
  ],
  areasIntro: "Our operations are built around two main areas of business: Digital & Business Solutions and Agriculture.",
  legacyTitle: "Our Legacy",
  legacy: [
    "CE Legacy 1957 is founded on the belief that a legacy should not simply be remembered. It should be built upon.",
    "We honour our father's legacy by combining the values passed down to us with modern technology, entrepreneurship, creativity, and agriculture. Our goal is to build a diversified and sustainable enterprise that creates value today while establishing a strong foundation for future generations.",
  ],
  closing: "Honouring the past. Building the present. Creating the future.",
  mission:
      "To honour our father's legacy by delivering quality digital, business, creative, and agricultural solutions that create lasting value for our clients and future generations.",
  vision:
      "To build a trusted and sustainable family enterprise that transforms ideas, technology, and agriculture into opportunities for generations to come.",
  values: [
    { title: "Integrity", text: "We do business with honesty and transparency." },
    { title: "Excellence", text: "We are committed to quality in everything we do." },
    { title: "Innovation", text: "We embrace creativity, technology, and new ideas." },
    { title: "Hard Work", text: "We value dedication, discipline, and perseverance." },
    { title: "Sustainability", text: "We build for long-term growth and future generations." },
    { title: "Family & Legacy", text: "We honour our heritage and build upon our father's legacy." },
  ],
  whyChoose: [
    { title: "Family Legacy", text: "Built on values passed down through generations." },
    { title: "Quality & Reliability", text: "We are committed to delivering dependable services and products." },
    { title: "Diverse Solutions", text: "From IT and design to printing, consultancy, and agriculture." },
    { title: "Innovation", text: "We combine traditional values with modern technology and ideas." },
    { title: "Customer Focus", text: "We put our clients' needs and satisfaction first." },
    { title: "Long-Term Vision", text: "We build today with the future generation in mind." },
  ],
};

export const directors: Director[] = [
  {
    id: "paul",
    firstName: "PAUL",
    fullName: "PAUL SIMPANDE",
    role: "Director",
    variant: "mono",
    photo: "", // e.g. "/images/paul.jpg"
    bio: "Paul leads the creative and technology side of the enterprise, with a focus on precision, clean design and dependable systems.", // <-- edit
    hiHelloUrl: "https://www.hihello.com/p/REPLACE-WITH-PAUL-ID",
  },
  {
    id: "elijah",
    firstName: "ELIJAH",
    fullName: "ELIJAH MWEEMBA SIMPANDE",
    role: "Director",
    variant: "red",
    photo: "", // e.g. "/images/elijah.jpg"
    bio: "Elijah drives the enterprise's operations and growth, with energy for getting projects moving and seeing them through.", // <-- edit
    hiHelloUrl: "https://www.hihello.com/p/REPLACE-WITH-ELIJAH-ID",
  },
];