// ============================================================
//  WEBSITE PROJECTS  - shown as live previews on the Projects page.
//  Each entry becomes a browser-style window showing the real website,
//  which visitors can scroll and click inside.
//
//  name         the project's name
//  url          the live website (must start with https://)
//  description  one short line (optional)
//  date         "YYYY/MM/DD" (optional)
//  tags         small labels, e.g. ["React", "E-commerce"] (optional)
//
//  Some websites refuse to be shown inside another page. If a preview comes up blank or says
//  "refused to connect", add:   embed: false,   screenshot: "/images/sites/name.jpg"
//  and a picture of the site is shown in the same browser window instead (with an "open site" button).
//
//  If this list is empty, the whole section is hidden.
//  The entry below is an EXAMPLE. Replace it with your real projects.
// ============================================================

export interface WebProject {
  name: string;
  url: string;
  description?: string;
  date?: string;
  tags?: string[];
  embed?: boolean;
  screenshot?: string;
}

export const webProjects: WebProject[] = [
  {
    name: "GOLDEN CREAM AGRICULTURE FARMS",
    url: "https://www.goldencreamagriulturefarms.com/",
    description: "Replace this with one of your real website projects.",
    date: "2026/01/15",
    tags: ["React", "TypeScript"],
  },
];
