import type { Metadata } from "next";
import { QuickStartContent } from "./QuickStartContent";
import { getServerLanguage } from "../../app/server-language";
import { makePageMetadata, siteCopy } from "../../app/seo-copy";

const canonical = "https://www.sportme.ro/manager/quick-start";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  return makePageMetadata(language, siteCopy.quickStart[language], canonical, "article");
}

export default function QuickStartManagerPage() {
  return <QuickStartContent />;
}
