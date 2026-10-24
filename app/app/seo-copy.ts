import type { Metadata } from "next";
import type { LanguageKey } from "./languages";
import { languages } from "./languages";
import { translateDocumentText } from "./content-locales";

type SeoText = { title: string; description: string };
type LocalizedSeoText = Record<LanguageKey, SeoText>;

const baseSiteCopy = {
  home: {
    RO: { title: "SportMe - Rezervă terenuri sportive rapid", description: "SportMe te ajută să găsești, să verifici disponibilitatea și să rezervi rapid terenuri sportive pentru fotbal, tenis, padel, squash și alte sporturi." },
    EN: { title: "SportMe - Book sports courts quickly", description: "Find sports venues, check availability and book courts for football, tennis, padel, squash and more with SportMe." },
    FR: { title: "SportMe - Réservez rapidement un terrain de sport", description: "Trouvez des centres sportifs, consultez les disponibilités et réservez des terrains de football, tennis, padel, squash et plus avec SportMe." },
    DE: { title: "SportMe - Sportplätze schnell buchen", description: "Finde Sportstätten, prüfe die Verfügbarkeit und buche Plätze für Fußball, Tennis, Padel, Squash und mehr mit SportMe." },
    IT: { title: "SportMe - Prenota rapidamente un campo sportivo", description: "Trova centri sportivi, controlla la disponibilità e prenota campi da calcio, tennis, padel, squash e altro con SportMe." },
    ES: { title: "SportMe - Reserva pistas deportivas rápidamente", description: "Encuentra centros deportivos, consulta la disponibilidad y reserva pistas de fútbol, tenis, pádel, squash y más con SportMe." },
    PT: { title: "SportMe - Reserve campos desportivos rapidamente", description: "Encontre centros desportivos, consulte a disponibilidade e reserve campos de futebol, ténis, padel, squash e muito mais com o SportMe." },
  },
  quickStart: {
    RO: { title: "Ghid rapid SportMe Manager | SportMe", description: "Ghid rapid pentru configurarea bazei sportive și gestionarea rezervărilor în SportMe Manager." },
    EN: { title: "SportMe Manager quick start | SportMe", description: "A quick guide to setting up your sports venue and managing bookings in SportMe Manager." },
    FR: { title: "Guide de démarrage SportMe Manager | SportMe", description: "Guide rapide pour configurer votre centre sportif et gérer les réservations dans SportMe Manager." },
    DE: { title: "Schnellstart für SportMe Manager | SportMe", description: "Kurzanleitung zur Einrichtung deiner Sportstätte und Verwaltung von Buchungen in SportMe Manager." },
    IT: { title: "Guida rapida a SportMe Manager | SportMe", description: "Guida rapida per configurare il centro sportivo e gestire le prenotazioni in SportMe Manager." },
    ES: { title: "Guía rápida de SportMe Manager | SportMe", description: "Guía rápida para configurar tu centro deportivo y gestionar las reservas en SportMe Manager." },
    PT: { title: "Guia rápido do SportMe Manager | SportMe", description: "Guia rápido para configurar o centro desportivo e gerir as reservas no SportMe Manager." },
  },
  terms: {
    RO: { title: "Termeni și condiții | SportMe", description: "Citește termenii și condițiile de utilizare SportMe pentru rezervări de terenuri sportive și accesarea serviciilor platformei." },
    EN: { title: "Terms and conditions | SportMe", description: "Read the SportMe terms and conditions for sports court bookings and use of our services." },
    FR: { title: "Conditions générales | SportMe", description: "Consultez les conditions d’utilisation de SportMe pour la réservation de terrains sportifs et l’accès à nos services." },
    DE: { title: "Allgemeine Geschäftsbedingungen | SportMe", description: "Lies die Nutzungsbedingungen von SportMe für die Buchung von Sportplätzen und die Nutzung unserer Dienste." },
    IT: { title: "Termini e condizioni | SportMe", description: "Leggi i termini e le condizioni di SportMe per prenotare campi sportivi e utilizzare i nostri servizi." },
    ES: { title: "Términos y condiciones | SportMe", description: "Lee los términos y condiciones de SportMe para reservar pistas deportivas y usar nuestros servicios." },
    PT: { title: "Termos e condições | SportMe", description: "Leia os termos e condições do SportMe para reservar campos desportivos e utilizar os nossos serviços." },
  },
  cookies: {
    RO: { title: "Politica de cookie-uri | SportMe", description: "Află cum folosește SportMe cookie-uri și tehnologii similare pe site-ul oficial." },
    EN: { title: "Cookie policy | SportMe", description: "Learn how SportMe uses cookies and similar technologies on its official website." },
    FR: { title: "Politique relative aux cookies | SportMe", description: "Découvrez comment SportMe utilise les cookies et technologies similaires sur son site officiel." },
    DE: { title: "Cookie-Richtlinie | SportMe", description: "Erfahre, wie SportMe Cookies und ähnliche Technologien auf der offiziellen Website verwendet." },
    IT: { title: "Informativa sui cookie | SportMe", description: "Scopri come SportMe utilizza cookie e tecnologie simili sul sito ufficiale." },
    ES: { title: "Política de cookies | SportMe", description: "Descubre cómo SportMe utiliza cookies y tecnologías similares en su sitio web oficial." },
    PT: { title: "Política de cookies | SportMe", description: "Saiba como o SportMe utiliza cookies e tecnologias semelhantes no site oficial." },
  },
  privacy: {
    RO: { title: "Politica de confidențialitate | SportMe", description: "Află cum SportMe colectează, folosește și protejează datele personale în aplicația de rezervări sportive." },
    EN: { title: "Privacy policy | SportMe", description: "Learn how SportMe collects, uses and protects personal data in its sports booking app." },
    FR: { title: "Politique de confidentialité | SportMe", description: "Découvrez comment SportMe collecte, utilise et protège les données personnelles dans son application de réservation sportive." },
    DE: { title: "Datenschutzerklärung | SportMe", description: "Erfahre, wie SportMe personenbezogene Daten in der Sportbuchungs-App erhebt, verwendet und schützt." },
    IT: { title: "Informativa sulla privacy | SportMe", description: "Scopri come SportMe raccoglie, utilizza e protegge i dati personali nell’app per le prenotazioni sportive." },
    ES: { title: "Política de privacidad | SportMe", description: "Descubre cómo SportMe recopila, utiliza y protege los datos personales en su aplicación de reservas deportivas." },
    PT: { title: "Política de privacidade | SportMe", description: "Saiba como o SportMe recolhe, utiliza e protege os dados pessoais na aplicação de reservas desportivas." },
  },
};

type PageKey = keyof typeof baseSiteCopy;
export const siteCopy = Object.fromEntries(
  Object.entries(baseSiteCopy).map(([page, translations]) => [page, Object.fromEntries(
    languages.map(({ code }) => [code, code in translations
      ? translations[code as keyof typeof translations]
      : {
          title: translateDocumentText(translations.EN.title, code),
          description: translateDocumentText(translations.EN.description, code),
        }]),
  )]),
) as Record<PageKey, LocalizedSeoText>;

export function makePageMetadata(language: LanguageKey, text: SeoText, canonical: string, type: "website" | "article" = "website", keywords?: string[]): Metadata {
  return {
    title: { absolute: text.title },
    description: text.description,
    keywords: keywords ?? ["SportMe", text.title],
    alternates: { canonical },
    openGraph: {
      title: text.title,
      description: text.description,
      url: canonical,
      siteName: "SportMe",
      type,
      locale: languages.find(({ code }) => code === language)!.locale.replace("-", "_"),
      images: [{ url: "https://www.sportme.ro/og-image.png", width: 1200, height: 630, alt: text.title }],
    },
    twitter: { card: "summary_large_image", title: text.title, description: text.description, images: ["https://www.sportme.ro/og-image.png"] },
  };
}
