"use client";

import { useI18n } from "../app/i18n";
import AccessChoiceModal from "./AccessChoiceModal";

type Props = {
  onClose: () => void;
  playerWebUrl: string;
  playerPlayStoreUrl: string;
};

export default function PlayerAccessModal({ onClose, playerWebUrl, playerPlayStoreUrl }: Props) {
  const { t, text } = useI18n();

  return (
    <AccessChoiceModal
      onClose={onClose}
      logoSrc="/logo-512.png"
      title={text("SportMe Player", "SportMe Jucător")}
      subtitle={text("Choose where to open the app and manage your sports bookings.", "Alege unde vrei să deschizi aplicația și să îți gestionezi rezervările sportive.")}
      closeLabel={text("Close", "Închide")}
      sections={[
        {
          label: text("On desktop", "Pe desktop"),
          description: text("Continue in your computer's browser", "Continuă în browserul de pe calculator"),
          icon: "desktop",
          actions: [
            {
              title: text("Web Browser", "Web Browser"),
              eyebrow: text("Open in", "Deschide în"),
              icon: "web",
              href: playerWebUrl,
            },
          ],
        },
        {
          label: text("On mobile", "Pe mobil"),
          description: text("Install the app on your phone", "Instalează aplicația pe telefon"),
          icon: "mobile",
          actions: [
            {
              title: "Google Play",
              eyebrow: text("Available on", "Disponibil pe"),
              icon: "googlePlay",
              href: playerPlayStoreUrl,
              status: { label: t("about.cta.live"), tone: "live" },
            },
            {
              title: "App Store",
              eyebrow: text("Download on the", "Descarcă din"),
              icon: "appStore",
              status: { label: t("about.cta.soon"), tone: "soon" },
              disabled: true,
            },
          ],
        },
      ]}
    />
  );
}
