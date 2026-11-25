// ============================================================
//  PROJECT GALLERY
//  Each group below is one project. To add pictures, paste the part of the
//  Cloudinary link after "/upload/" (e.g. "v1791219042/Ratsa-1.jpg").
//  Project details (name and date) are shown as a small caption on each picture.
//  Date format: "YYYY/MM/DD". Leave a detail out and it is simply not shown.
//  To move a project to another tab, change its category in the list at the bottom:
//  "Digital", "Design, Print & Paste" or "Agriculture".
// ============================================================
import { cldImage, cldVideo, cldVideoPoster } from "./cloudinary";
import type { GalleryCategory, GalleryItem } from "./types";

interface Meta {
  project?: string;
  date?: string;
}

const photos = (category: GalleryCategory, files: string[], meta: Meta = {}): GalleryItem[] =>
    files.map((f) => ({ category, ...meta, src: cldImage(f, "q_auto,w_800"), full: cldImage(f, "q_auto,w_1800") }));

const movie = (category: GalleryCategory, file: string, meta: Meta = {}): GalleryItem => ({
  category,
  ...meta,
  src: cldVideoPoster(file),
  video: cldVideo(file),
});

const ratsaInside = [
  "v1791219042/Ratsa-1.jpg",
  "v1791218898/Ratsa-2.jpg",
  "v1791219155/Ratsa-3.jpg",
  "v1791219050/Ratsa-4.jpg",
  "v1791218864/Ratsa-5.jpg",
]

const ratsaCar = [
  "v1791219064/Ratsa-6.jpg",
  "v1791219061/Ratsa-7.jpg",
  "v1791218970/Ratsa-8.jpg",
  "v1791218881/Ratsa-9.jpg",
  "v1791218804/Ratsa-10.jpg",
  "v1791219042/Ratsa-11.jpg",
  "v1791218775/Ratsa-12.jpg",
  "v1791218855/Ratsa-13.jpg",
  "v1791218819/Ratsa-14.jpg",
];

const mungambwa = [
  "v1791224240/Mungambwa-01.jpg",
  "v1791224205/Mungambwa-02.jpg",
  "v1791224383/Mungambwa-03.jpg",
  "v1791224170/Mungambwa-04.jpg",
  "v1791224217/Mungambwa-05.jpg",
  "v1791224390/Mungambwa-06.jpg",
];

const fem = ["v1791229468/FEM-01.jpg", "v1791229501/FEM-02.jpg", "v1791229468/FEM-03.heic"];

const web = [
  "v1791229596/WEB-01.heic",
  "v1791229578/WEB-02.heic",
  "v1791229557/WEB-03.heic",
  "v1791229562/WEB-04.heic",
];

const rib = [
  "v1791229693/RIB-01.jpg",
  "v1791229698/RIB-02.jpg",
  "v1791229723/RIB-03.jpg",
  "v1791229667/RIB-04.heic",
  "v1791229614/RIB-05.heic",
];

const DPP: GalleryCategory = "Design, Print & Paste";

const ratsaInsideInfo: Meta = { project: "Ratsa car branding", date: "2024/01/10" };
const ratsaCarInfo: Meta = { project: "Ratsa car branding", date: "2024/01/10" };
const mungambwaInfo: Meta = { project: "Mungabwa Shop Signage", date: "2024/01/10" };
const femInfo: Meta = { project: "Fransalian Education Mission Signage", date: "2024/01/10" };
const webInfo: Meta = { project: "Mungabwa Shop Signage", date: "2024/01/10" };
const ribInfo: Meta = { project: "Mungabwa Shop Signage", date: "2024/01/10" };

export const gallery: GalleryItem[] = [
    ...photos(DPP, ratsaInside, ratsaInsideInfo),
  ...photos(DPP, ratsaCar, ratsaCarInfo),
  movie(DPP, "v1791219305/Ratsa-Vid-1.mov", ratsaInsideInfo),
  ...photos(DPP, mungambwa, mungambwaInfo),
  ...photos(DPP, fem, femInfo), // add { project: "...", date: "YYYY/MM/DD" } as a third argument
  ...photos("Digital", web, webInfo), // same here
  ...photos(DPP, rib, ribInfo), // and here
];