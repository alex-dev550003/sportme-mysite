import type { Metadata } from "next";
import { SeoContentPage, type SeoFaqItem } from "../components/SeoContentPage";
import { getServerLanguage } from "../app/server-language";
import { makePageMetadata } from "../app/seo-copy";
import { translateDocumentText } from "../app/content-locales";
import { languages } from "../app/languages";

const title = "Întrebări frecvente - SportMe";
const description =
  "Află cum funcționează SportMe, cum rezervi terenuri sportive, cum primești notificări și cum pot administratorii să folosească SportMe Manager.";
const canonical = "https://www.sportme.ro/intrebari-frecvente";

const userFaqItems: SeoFaqItem[] = [
  {
    question: "Cum rezerv un teren sportiv?",
    answer:
      "În aplicația SportMe alegi sportul și locația, verifici intervalele disponibile și rezervi ora potrivită pentru tine sau pentru grupul tău.",
  },
  {
    question: "Cum verific disponibilitatea?",
    answer:
      "Disponibilitatea este afișată în funcție de programul locației și de intervalele gestionate în platformă, astfel încât să vezi mai repede opțiunile potrivite.",
  },
  {
    question: "Ce sporturi sunt disponibile?",
    answer:
      "SportMe poate include fotbal, tenis, padel, squash, baschet și alte sporturi, în funcție de bazele sportive active în zona ta.",
  },
  {
    question: "Primesc notificări pentru rezervări?",
    answer:
      "Da. SportMe poate trimite notificări pentru rezervări, invitații și actualizări relevante, astfel încât să nu pierzi informații importante.",
  },
  {
    question: "Aplicația este gratuită pentru jucători?",
    answer:
      "Jucătorii pot folosi SportMe pentru căutare și rezervare. Tariful terenului este stabilit de baza sportivă la care faci rezervarea.",
  },
];

const managerFaqItems: SeoFaqItem[] = [
  {
    question: "Ce este SportMe Manager?",
    answer:
      "SportMe Manager este platforma dedicată administratorilor de baze sportive pentru gestionarea rezervărilor, calendarelor, angajaților și notificării clienților.",
  },
  {
    question: "Pot administra mai multe terenuri?",
    answer:
      "Da. Platforma poate fi folosită pentru locații cu mai multe terenuri și pentru baze multisport cu program diferit pe activități.",
  },
  {
    question: "Pot crea conturi pentru angajați?",
    answer:
      "Da. SportMe Manager susține lucrul în echipă, astfel încât angajații să poată gestiona mai eficient programul și rezervările locației.",
  },
  {
    question: "Pot reduce neprezentarile?",
    answer:
      "Notificările și evidența rezervărilor ajută clienții să fie informați și oferă operatorilor mai multă claritate asupra programului zilnic.",
  },
  {
    question: "Cum pot înscrie baza sportivă?",
    answer:
      "Poți accesa pagina SportMe Manager pentru informații despre platformă și pentru pașii necesari introducerii bazei sportive în sistem.",
  },
];

const allFaqItems = [...userFaqItems, ...managerFaqItems];

export async function generateMetadata(): Promise<Metadata> {
  const language = await getServerLanguage();
  return makePageMetadata(language, {
    title: translateDocumentText(title, language, "romanian"),
    description: translateDocumentText(description, language, "romanian"),
  }, canonical);
}

function getStructuredData(language: Awaited<ReturnType<typeof getServerLanguage>>) {
  const localize = (value: string) => translateDocumentText(value, language, "romanian");
  return [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: localize(title),
    description: localize(description),
    url: canonical,
    inLanguage: languages.find(({ code }) => code === language)!.locale,
    isPartOf: {
      "@type": "WebSite",
      name: "SportMe",
      url: "https://www.sportme.ro/",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqItems.map((item) => ({
      "@type": "Question",
      name: localize(item.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: localize(item.answer),
      },
    })),
  },
  ];
}

export default async function IntrebariFrecventePage() {
  const language = await getServerLanguage();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData(language)) }} />
      <SeoContentPage
        eyebrow="SportMe FAQ"
        title="Întrebări frecvente despre SportMe"
        description="Răspunsuri clare pentru jucători și administratori: cum rezervi terenuri sportive, cum verifici disponibilitatea și cum poate o bază sportivă să folosească SportMe Manager."
        primaryCta={{
          label: "Rezervă terenuri sportive",
          href: "/",
        }}
        secondaryCta={{
          label: "Vezi SportMe Manager",
          href: "/#pentru-administratori",
        }}
        sections={[
          {
            eyebrow: "Pentru jucători",
            title: "Rezervări online mai ușor de organizat",
            body: "SportMe este construit pentru oameni care vor să găsească rapid un teren disponibil, să confirme ora potrivită și să primească informațiile importante în aplicație.",
          },
          {
            eyebrow: "Pentru administratori",
            title: "O platformă pentru program, echipă și clienți",
            body: "SportMe Manager ajută operatorii de baze sportive să își organizeze rezervările, să comunice mai clar și să urmărească activitatea terenurilor.",
          },
        ]}
        faqGroups={[
          { title: "FAQ pentru utilizatori", items: userFaqItems },
          { title: "FAQ pentru administratori", items: managerFaqItems },
        ]}
        links={[
          { label: "Acasă", href: "/" },
          { label: "Pentru jucători", href: "/#pentru-jucatori" },
          { label: "Pentru administratori", href: "/#pentru-administratori" },
        ]}
      />
    </>
  );
}
