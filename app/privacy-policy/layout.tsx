import type { Metadata } from "next";

const title = "Politica de confidentialitate";
const description =
  "Afla cum SportMe colecteaza, foloseste si protejeaza datele personale pentru aplicatia de rezervari terenuri sportive.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: ["SportMe", "politica de confidentialitate", "date personale", "GDPR", "rezervari terenuri sportive"],
  alternates: {
    canonical: "https://www.sportme.ro/privacy-policy",
  },
  openGraph: {
    title,
    description,
    url: "https://www.sportme.ro/privacy-policy",
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

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
