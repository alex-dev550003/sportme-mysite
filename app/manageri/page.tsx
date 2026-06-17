import type { Metadata } from "next";
import ManageriPageClient from "./ManageriPageClient";

const title = "SportMe Manager | Software rezervari terenuri sportive";
const description =
  "Platforma pentru manageri de baze sportive: administrare terenuri, software rezervari online, calendar public, notificari si planuri pentru baze sportive.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: "https://www.sportme.ro/manageri",
  },
  keywords: [
    "administrare baze sportive",
    "software rezervari terenuri sportive",
    "platforma manageri baze sportive",
    "SportMe Manager",
    "rezervari terenuri sportive",
    "calendar rezervari terenuri",
  ],
  openGraph: {
    title,
    description,
    url: "https://www.sportme.ro/manageri",
    siteName: "SportMe",
    type: "website",
    images: [
      {
        url: "https://www.sportme.ro/logo-512admin.png",
        width: 512,
        height: 512,
        alt: "SportMe Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://www.sportme.ro/logo-512admin.png"],
  },
};

export default function ManageriPage() {
  return <ManageriPageClient />;
}
