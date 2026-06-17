import type { Metadata } from "next";

const title = "Politica de cookies";
const description =
  "Afla cum foloseste SportMe cookie-uri si tehnologii similare pe website-ul oficial SportMe.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: ["SportMe", "politica de cookies", "cookie-uri", "website SportMe", "confidentialitate"],
  alternates: {
    canonical: "https://www.sportme.ro/cookies",
  },
  openGraph: {
    title,
    description,
    url: "https://www.sportme.ro/cookies",
    siteName: "SportMe",
    type: "website",
    locale: "ro_RO",
    images: ["https://www.sportme.ro/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://www.sportme.ro/og-image.png"],
  },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
