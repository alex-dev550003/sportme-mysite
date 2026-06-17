import type { Metadata } from "next";

const title = "Termeni si conditii";
const description =
  "Citeste termenii si conditiile de utilizare SportMe pentru rezervari de terenuri sportive si accesarea serviciilor platformei.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: ["SportMe", "termeni si conditii", "conditii utilizare", "rezervari terenuri sportive", "platforma sport"],
  alternates: {
    canonical: "https://www.sportme.ro/terms",
  },
  openGraph: {
    title,
    description,
    url: "https://www.sportme.ro/terms",
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

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
