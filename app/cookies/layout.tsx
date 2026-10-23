import type { Metadata } from "next";
import { getServerLanguage } from "../app/server-language";
import { makePageMetadata, siteCopy } from "../app/seo-copy";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  return makePageMetadata(language, siteCopy.cookies[language], "https://www.sportme.ro/cookies");
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
