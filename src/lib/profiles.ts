/**
 * Single source for every public profile shown on the site
 * (Coding & Social Profiles section and the Connect board).
 */
export interface Profile {
  id: string;
  name: string;
  category: string;
  desc: string;
  url: string;
  handle: string;
  /** Brand colour — used for the mark and accents, never for body text */
  color: string;
  group: "build" | "compete";
  svgPath: string;
}

export const EMAIL = "srevarshan9600622@gmail.com";

export const PROFILES: Profile[] = [
  {
    id: "github",
    name: "GitHub",
    category: "Code & Repositories",
    desc: "Source for TextLens, AgroCare, the RAG pipeline from scratch, ACAS and more.",
    url: "https://github.com/Srevarshan05",
    handle: "Srevarshan05",
    color: "#1C202B",
    group: "build",
    svgPath: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "Professional",
    desc: "Internships, project write-ups and demo videos, including the AI Nose walkthrough.",
    url: "https://www.linkedin.com/in/srevarshan05/",
    handle: "in/srevarshan05",
    color: "#0A66C2",
    group: "build",
    svgPath: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.71 1.637-1.459 3.37-1.459 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "Demo Videos",
    desc: "Live project demos, prototype showcases & AI talks.",
    url: "https://www.youtube.com/@SreVarshanAI",
    handle: "@SreVarshanAI",
    color: "#FF0000",
    group: "build",
    svgPath: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    id: "medium",
    name: "Medium",
    category: "Tech Articles",
    desc: "In-depth breakdowns on Edge AI, LLMs & Full-stack Architecture.",
    url: "https://medium.com/@srevarshan9600622",
    handle: "@srevarshan9600622",
    color: "#1C202B",
    group: "build",
    svgPath: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    category: "DSA & Algorithms",
    desc: "500+ problems solved across data structures, algorithms & dynamic programming.",
    url: "https://leetcode.com/u/srevarshan9600622/",
    handle: "u/srevarshan9600622",
    color: "#FFA116",
    group: "compete",
    svgPath: "M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863 0-.713.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.07 5.07 0 0 0-3.85-1.428c-1.503 0-2.906.58-3.957 1.631L3.92 10.669A5.55 5.55 0 0 0 2.29 14.61c0 1.545.602 2.997 1.63 4.025l4.333 4.364c1.05 1.051 2.454 1.631 3.957 1.631 1.488 0 2.876-.566 3.892-1.583l2.609-2.589c.514-.514.496-1.365-.039-1.9-.535-.535-1.386-.553-1.9-.039zM10.811 13.784a1.2 1.2 0 0 0 0 2.4h10.978a1.2 1.2 0 0 0 0-2.4H10.811z",
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    category: "Certified Skills",
    desc: "Problem solving certifications and core domain competency tracks.",
    url: "https://www.hackerrank.com/profile/srevarshan960061",
    handle: "srevarshan960061",
    color: "#1BA94C",
    group: "compete",
    svgPath: "M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24C10.715 24 2.25 19.114 1.608 18 .963 16.886.963 7.114 1.608 6 2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.799c0-.141-.115-.258-.258-.258H8.963c-.141 0-.258.115-.258.258v10.402c0 .141.115.258.258.258h.742c.141 0 .258-.115.258-.258v-4.357h4.074v4.357c0 .141.115.258.258.258h.742c.141 0 .258-.115.258-.258V6.799c0-.141-.115-.258-.258-.258z",
  },
  {
    id: "codechef",
    name: "CodeChef",
    category: "Global Contests",
    desc: "Active competitive programming in monthly challenges and rated rounds.",
    url: "https://www.codechef.com/users/ss2535srmist",
    handle: "ss2535srmist",
    color: "#7B5E3E",
    group: "compete",
    // Chef's hat mark (the previous path was malformed and rendered partially)
    svgPath: "M6 18.5h12V21a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2.5Zm12-1.75H6v-3.1A4.75 4.75 0 0 1 6.9 4.3a5.25 5.25 0 0 1 10.2 0 4.75 4.75 0 0 1 .9 9.35v3.1Z",
  },
  {
    id: "hackerearth",
    name: "HackerEarth",
    category: "Hackathons",
    desc: "National level hackathons, live coding sprints & algorithmic tracks.",
    url: "https://www.hackerearth.com/@srevarshan9600622/",
    handle: "@srevarshan9600622",
    color: "#323754",
    group: "compete",
    svgPath: "M22.75 0h-21.5C.56 0 0 .56 0 1.25v21.5C0 23.44.56 24 1.25 24h21.5c.69 0 1.25-.56 1.25-1.25V1.25C24 .56 23.44 0 22.75 0zM7.15 16.8H4.8V7.2h2.35V16.8zm9.9 0h-2.36v-4.64H9.26V16.8H6.9V7.2h2.36v2.67h5.43V7.2h2.36V16.8z",
  },
];

export const profileById = (id: string) => PROFILES.find((p) => p.id === id)!;
