import type { Metadata } from "next";
import { getServerLanguage } from "../../app/server-language";
import { makePageMetadata } from "../../app/seo-copy";
import { PlayerQuickStartContent } from "./PlayerQuickStartContent";
import { playerGuideCopy } from "./guide-copy";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  const copy = playerGuideCopy[language];
  return makePageMetadata(
    language,
    { title: `${copy.title} | SportMe`, description: copy.intro },
    "https://www.sportme.ro/player/quick-start",
    "article",
  );
}

export default function QuickStartPlayerPage() {
  return <PlayerQuickStartContent />;
}
