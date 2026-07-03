import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OJEE-Tracker | Premium Study Command Centre",
    short_name: "OJEE-Tracker",
    description: "An offline-first study command center built for JEE, NEET & OJEE aspirants. Track syllabus, log study hours, and analyze progress.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#0080ff",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
