import type { Metadata } from "next";
import { QuickStartContent } from "./QuickStartContent";

const title = "Quick Start SportMe Manager | SportMe";
const description = "Ghid rapid pentru configurarea bazei sportive și gestionarea rezervărilor în SportMe Manager.";
const canonical = "https://www.sportme.ro/manager/quick-start";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: "SportMe",
    type: "article",
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

export default function QuickStartManagerPage() {
  return <QuickStartContent />;
}
