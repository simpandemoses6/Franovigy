// ============================================================
//  CLOUDINARY helpers. Paste only the part of the link after "/upload/",
//  for example "v1791219042/Ratsa-1.jpg".
//  - HEIC files are converted to JPG (most browsers cannot show HEIC).
//  - Videos are delivered as MP4 so they play in every browser.
//  If images do not load, check Cloudinary > Settings > Security and allow
//  unsigned transformations ("Strict transformations" must be off), or pass "" as the transform.
// ============================================================
const CLOUD = "https://res.cloudinary.com/eotxgi4p";
const t = (transform: string) => (transform ? `${transform}/` : "");

export function cldImage(path: string, transform = "q_auto,w_1000"): string {
    return `${CLOUD}/image/upload/${t(transform)}${path.replace(/\.heic$/i, ".jpg")}`;
}

export function cldVideo(path: string, transform = "q_auto"): string {
    return `${CLOUD}/video/upload/${t(transform)}${path.replace(/\.[a-z0-9]+$/i, ".mp4")}`;
}

// A still frame from a video, used as its thumbnail
export function cldVideoPoster(path: string, transform = "so_0,q_auto,w_800"): string {
    return `${CLOUD}/video/upload/${t(transform)}${path.replace(/\.[a-z0-9]+$/i, ".jpg")}`;
}