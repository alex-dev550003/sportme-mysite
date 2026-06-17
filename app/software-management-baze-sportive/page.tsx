import type { Metadata } from "next";
import { SeoContentPage, type SeoFaqItem } from "../components/SeoContentPage";

const title = "Software management baze sportive - SportMe Manager";
const description =
  "SportMe Manager ajută bazele sportive să administreze rezervări, calendare, angajați, notificări și activitatea terenurilor într-o platformă simplă.";
const canonical = "https://www.sportme.ro/software-management-baze-sportive";

const faqItems: SeoFaqItem[] = [
  {
    question: "Ce este SportMe Manager?",
    answer:
      "SportMe Manager este platforma pentru administrarea bazelor sportive, cu instrumente pentru rezervări, calendar, disponibilitate, angajați și comunicare cu jucătorii.",
  },
  {
    question: "Pot administra mai multe terenuri în aceeași platformă?",
    answer:
      "Da. Platforma este gândită pentru locații cu unul sau mai multe terenuri, inclusiv baze multisport care au programe și reguli diferite pentru fiecare activitate.",
  },
  {
    question: "Pot crea conturi pentru angajați?",
    answer:
      "Da. SportMe Manager include fluxuri pentru echipe operaționale, astfel încât angajații să poată lucra mai ușor cu rezervările și programul locației.",
  },
  {
    question: "Cum ajuta platforma la reducerea neprezentarilor?",
    answer:
      "Notificările și evidența rezervărilor ajută clienții să fie informați, iar operatorii pot urmări mai clar programul și modificările apărute.",
  },
  {
    question: "Cum pot înscrie baza sportivă în SportMe?",
    answer:
      "Poți începe din pagina SportMe Manager, unde găsești informații despre platformă și pașii pentru accesarea soluției de administrare.",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "software management baze sportive",
    "aplicație administrare terenuri",
    "sistem rezervări terenuri",
    "calendar rezervări teren sportiv",
    "SportMe Manager",
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

export default function SoftwareManagementBazeSportivePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SeoContentPage
        eyebrow="SportMe Manager"
        title="Administrează baza sportivă mai simplu cu SportMe Manager"
        description="SportMe Manager centralizează rezervările, disponibilitatea terenurilor și activitatea echipei într-o platformă clară pentru operatorii de baze sportive."
        primaryCta={{
          label: "Vezi SportMe Manager",
          href: "/manageri",
        }}
        secondaryCta={{
          label: "Întrebări frecvente",
          href: "/intrebari-frecvente",
        }}
        sections={[
          {
            eyebrow: "Beneficii",
            title: "Operare mai clară pentru fiecare teren",
            body: "Platforma ajută echipele să urmărească programul, rezervările și modificările într-un singur loc, cu mai puține verificări manuale.",
            items: ["Calendar rezervări", "Notificări automate", "Conturi pentru angajați", "Reducerea neprezentărilor", "Evidență activitate"],
          },
          {
            eyebrow: "Potrivit pentru",
            title: "Baze sportive cu program dinamic",
            body: "SportMe Manager poate susține locații specializate sau baze cu mai multe tipuri de terenuri și activități.",
            items: ["Terenuri de fotbal", "Cluburi de tenis", "Terenuri de padel", "Săli de squash", "Baze multisport"],
          },
          {
            eyebrow: "Rezervări",
            title: "Calendar și disponibilitate într-un flux ușor de urmărit",
            body: "Administratorii pot lucra mai eficient când rezervările, intervalele disponibile și actualizările sunt organizate într-un sistem dedicat bazelor sportive.",
          },
          {
            eyebrow: "Echipa",
            title: "Instrumente pentru angajați și activitatea zilnică",
            body: "Conturile pentru angajați și evidența operațională ajută baza sportivă să păstreze controlul asupra programului, fără dependență de foi separate sau mesaje împrăștiate.",
          },
        ]}
        faqGroups={[{ title: "FAQ pentru administratori", items: faqItems }]}
        links={[
          { label: "SportMe Manager", href: "/manageri" },
          { label: "Întrebări frecvente", href: "/intrebari-frecvente" },
          { label: "Acasă", href: "/" },
        ]}
      />
    </>
  );
}
