import type { Metadata } from "next";
import { getServerLanguage } from "../app/server-language";
import { makePageMetadata, siteCopy } from "../app/seo-copy";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  return makePageMetadata(language, siteCopy.terms[language], "https://www.sportme.ro/terms");
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
