"use client";

import { useI18n } from "../app/i18n";
import AccessChoiceModal from "./AccessChoiceModal";

type Props = {
  onClose: () => void;
  adminUrl: string;
  managerPlayStoreUrl: string;
};

export default function ManagerAccessModal({ onClose, adminUrl, managerPlayStoreUrl }: Props) {
  const { t, text } = useI18n();

  return (
    <AccessChoiceModal
      compact
      onClose={onClose}
      logoSrc="/logo-512admin.png"
      title="SportMe Manager"
      subtitle={text("Choose where to create your account and manage your sports venue.", "Alege unde vrei să creezi contul și să îți administrezi baza sportivă.")}
      closeLabel={text("Close", "Închide")}
      sections={[
        {
          label: text("On mobile", "Pe mobil"),
          description: text("Install the app on your phone", "Instalează aplicația pe telefon"),
          icon: "mobile",
          actions: [
            {
              title: "Google Play",
              eyebrow: text("Available on", "Disponibil pe"),
              icon: "googlePlay",
              href: managerPlayStoreUrl,
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
        {
          label: text("On desktop", "Pe desktop"),
          description: text("Continue in your computer's browser", "Continuă în browserul de pe calculator"),
          icon: "desktop",
          actions: [
            {
              title: text("Web Browser", "Web Browser"),
              eyebrow: text("Open in", "Deschide în"),
              icon: "web",
              href: adminUrl,
              status: { label: text("Any device", "Orice device"), tone: "live" },
            },
          ],
        },
      ]}
    />
  );
}
