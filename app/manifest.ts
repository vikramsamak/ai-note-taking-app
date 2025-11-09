import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Note-Taking App",
    short_name: "AI Notes",
    description:
      "AI Notes is an intelligent note-taking app powered by Gemini AI. Create, summarize, and organize your notes effortlessly with AI-generated insights and tags.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    id: "/",
    dir: "ltr",
    lang: "en-US",
    categories: ["productivity", "artificial intelligence", "tools", "notes"],

    icons: [
      {
        src: "/android/android-launchericon-72-72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/android/android-launchericon-96-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/ios/128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/android/android-launchericon-144-144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/ios/152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "/android/android-launchericon-192-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android/android-launchericon-512-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],

    screenshots: [
      {
        src: "/screenshots/homepage.png",
        sizes: "1280x720",
        type: "image/png",
      },
      {
        src: "/screenshots/mobile.png",
        sizes: "430x932",
        type: "image/png",
      },
    ],

    shortcuts: [
      {
        name: "My Profile",
        short_name: "Profile",
        description: "View  your profile",
        url: "/dashboard/profile",
      },
      {
        name: "My Notes",
        short_name: "Notes",
        description: "View and manage all your AI-powered notes.",
        url: "/dashboard/notes",
      },
    ],

    prefer_related_applications: false,

    related_applications: [],

    display_override: ["standalone", "minimal-ui", "fullscreen"],
  };
}
