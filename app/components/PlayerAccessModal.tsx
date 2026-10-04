"use client";

import { useI18n } from "../app/i18n";
import AccessChoiceModal from "./AccessChoiceModal";

type Props = {
  onClose: () => void;
  playerWebUrl: string;
  playerPlayStoreUrl: string;
};

export default function PlayerAccessModal({ onClose, playerWebUrl, playerPlayStoreUrl }: Props) {
  const { t, language } = useI18n();
  const isEnglish = language === "EN";

  return (
    <AccessChoiceModal
      onClose={onClose}
      logoSrc="/logo-512.png"
      title={isEnglish ? "SportMe Player" : "SportMe Jucător"}
      subtitle={isEnglish ? "Choose where to open the app and manage your sports bookings." : "Alege unde vrei să deschizi aplicația și să îți gestionezi rezervările sportive."}
      closeLabel={isEnglish ? "Close" : "Închide"}
      sections={[
        {
          label: isEnglish ? "On desktop" : "Pe desktop",
          description: isEnglish ? "Continue in your computer's browser" : "Continuă în browserul de pe calculator",
          icon: "desktop",
          actions: [
            {
              title: "Web Browser",
              eyebrow: isEnglish ? "Open in" : "Deschide în",
              icon: "web",
              href: playerWebUrl,
            },
          ],
        },
        {
          label: isEnglish ? "On mobile" : "Pe mobil",
          description: isEnglish ? "Install the app on your phone" : "Instalează aplicația pe telefon",
          icon: "mobile",
          actions: [
            {
              title: "Google Play",
              eyebrow: isEnglish ? "Available on" : "Disponibil pe",
              icon: "googlePlay",
              href: playerPlayStoreUrl,
              status: { label: t("about.cta.live"), tone: "live" },
            },
            {
              title: "App Store",
              eyebrow: isEnglish ? "Download on the" : "Descarcă din",
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
