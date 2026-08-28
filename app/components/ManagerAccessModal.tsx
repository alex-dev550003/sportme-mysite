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
      subtitle={isEnglish ? "Choose how you want to create your account and manage your sports venue." : "Alege cum vrei sa creezi contul si sa iti administrezi baza sportiva."}
      safetyTitle={isEnglish ? "Secure. Fast. No headaches." : "Sigur. Rapid. Fara batai de cap."}
      safetyBody={isEnglish ? "Your data is safe with SportMe." : "Datele tale sunt in siguranta cu SportMe."}
      loginLabel={isEnglish ? "Already have an account? Sign in" : "Ai deja cont? Intra in cont"}
      loginUrl={adminUrl}
      sections={[
        {
          label: isEnglish ? "On desktop" : "Pe desktop",
          icon: "desktop",
          actions: [
            {
              title: "Web Browser",
              eyebrow: isEnglish ? "Open in" : "Deschide in",
              icon: "web",
              href: adminUrl,
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
              href: managerPlayStoreUrl,
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
