import type { Metadata } from "next";
import { SeoContentPage, type SeoFaqItem } from "../components/SeoContentPage";

const title = "Rezervare terenuri sportive online - SportMe";
const description =
  "Găsește terenuri sportive disponibile și rezervă rapid online pentru fotbal, tenis, padel, squash și alte sporturi prin SportMe.";
const canonical = "https://www.sportme.ro/terenuri-sportive";

const faqItems: SeoFaqItem[] = [
  {
    question: "Cum rezerv un teren sportiv prin SportMe?",
    answer:
      "Alegi sportul dorit, verifici intervalele disponibile și finalizezi rezervarea direct din aplicația SportMe, fără apeluri telefonice sau mesaje separate.",
  },
  {
    question: "Pot vedea disponibilitatea terenurilor în timp real?",
    answer:
      "Da. SportMe afișează intervalele disponibile pentru locațiile conectate la platformă, astfel încât să alegi rapid ora potrivită pentru joc.",
  },
  {
    question: "Ce sporturi pot rezerva online?",
    answer:
      "SportMe este potrivit pentru fotbal, tenis, padel, squash, baschet și alte sporturi, în funcție de bazele sportive disponibile în zona ta.",
  },
  {
    question: "Primesc notificări pentru rezervare?",
    answer:
      "Da. Aplicația poate trimite notificări legate de rezervări, invitații și actualizări importante, astfel încât să ai informațiile la timp.",
  },
  {
    question: "Aplicația SportMe este gratuită pentru jucători?",
    answer:
      "Jucătorii pot folosi aplicația pentru a căuta locații și a rezerva terenuri sportive. Costul terenului este stabilit de fiecare bază sportivă.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "rezervare teren sportiv",
    "rezervare teren fotbal",
    "rezervare teren tenis",
    "rezervare teren padel",
    "terenuri sportive online",
    "aplicație rezervări sport",
  ],
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: "SportMe",
    type: "website",
    locale: "ro_RO",
    images: ["https://www.sportme.ro/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://www.sportme.ro/og-image.png"],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonical,
    inLanguage: "ro-RO",
    isPartOf: {
      "@type": "WebSite",
      name: "SportMe",
      url: "https://www.sportme.ro/",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
];

export default function TerenuriSportivePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SeoContentPage
        eyebrow="SportMe pentru jucători"
        title="Rezervă terenuri sportive rapid, direct din aplicație"
        description="SportMe te ajută să găsești terenuri sportive disponibile, să verifici programul locațiilor și să rezervi online intervalul potrivit pentru echipa ta."
        primaryCta={{
          label: "Descarcă aplicația",
          href: "https://play.google.com/store/apps/details?id=ro.sportme.app",
        }}
        secondaryCta={{
          label: "Vezi întrebările frecvente",
          href: "/intrebari-frecvente",
        }}
        showStoreCta
        sections={[
          {
            eyebrow: "Sporturi disponibile",
            title: "Terenuri pentru sporturile pe care le joci cel mai des",
            body: "În SportMe poți căuta rapid locații pentru sporturile populare și poți alege un interval disponibil fără să pierzi timp cu verificări manuale.",
            items: ["Fotbal", "Tenis", "Padel", "Squash", "Baschet", "Alte sporturi"],
          },
          {
            eyebrow: "Cum funcționează",
            title: "Rezervarea este simplă și rapidă",
            body: "Fluxul este construit pentru jucători care vor să treacă repede de la căutare la rezervare confirmată.",
            orderedItems: ["Alegi sportul", "Verifici disponibilitatea", "Rezervi intervalul dorit"],
          },
          {
            eyebrow: "Disponibilitate",
            title: "Vezi intervalele potrivite înainte să suni la baza sportivă",
            body: "SportMe reduce incertitudinea din procesul de rezervare. Când o locație își gestionează programul în platformă, vezi mai ușor ce intervale sunt libere și poți lua o decizie informată.",
          },
          {
            eyebrow: "Beneficii",
            title: "Mai puține mesaje, mai multă mișcare",
            body: "Aplicația păstrează rezervările într-un singur loc, trimite notificări utile și ajută grupurile de jucători să se organizeze mai clar pentru următorul meci.",
          },
        ]}
        faqGroups={[{ title: "FAQ pentru rezervări online", items: faqItems }]}
        links={[
          { label: "Acasă", href: "/" },
          { label: "Întrebări frecvente", href: "/intrebari-frecvente" },
          { label: "SportMe Manager", href: "/manageri" },
        ]}
      />
    </>
  );
}
