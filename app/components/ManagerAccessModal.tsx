"use client";

import { useI18n } from "../app/i18n";
import AccessChoiceModal from "./AccessChoiceModal";

type Props = {
  onClose: () => void;
  adminUrl: string;
  managerPlayStoreUrl: string;
};

export default function ManagerAccessModal({ onClose, adminUrl, managerPlayStoreUrl }: Props) {
  const { t, language } = useI18n();
  const isEnglish = language === "EN";

  return (
    <AccessChoiceModal
      onClose={onClose}
      logoSrc="/logo-512admin.png"
      title="SportMe Manager"
      subtitle={isEnglish ? "Choose where to create your account and manage your sports venue." : "Alege unde vrei să creezi contul și să îți administrezi baza sportivă."}
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
              href: adminUrl,
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
              href: managerPlayStoreUrl,
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
