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
      title="SportMe"
      subtitle={isEnglish ? "Choose how you want to open the app and manage your sports bookings." : "Alege cum vrei sa deschizi aplicatia si sa iti gestionezi rezervarile sportive."}
      safetyTitle={isEnglish ? "Secure. Fast. No headaches." : "Sigur. Rapid. Fara batai de cap."}
      safetyBody={isEnglish ? "Your data is safe with SportMe." : "Datele tale sunt in siguranta cu SportMe."}
      loginLabel={isEnglish ? "Already have an account? Sign in" : "Ai deja cont? Intra in cont"}
      loginUrl={playerWebUrl}
      sections={[
        {
          label: isEnglish ? "On desktop" : "Pe desktop",
          icon: "desktop",
          actions: [
            {
              title: "Web Browser",
              eyebrow: isEnglish ? "Open in" : "Deschide in",
              icon: "web",
              href: playerWebUrl,
            },
          ],
        },
        {
          label: isEnglish ? "On mobile" : "Pe mobil",
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
              eyebrow: isEnglish ? "Download on the" : "Descarca din",
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
