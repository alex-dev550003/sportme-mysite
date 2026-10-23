import type { Metadata } from "next";
import { getServerLanguage } from "../app/server-language";
import { makePageMetadata, siteCopy } from "../app/seo-copy";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  return makePageMetadata(language, siteCopy.privacy[language], "https://www.sportme.ro/privacy-policy");
}

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
