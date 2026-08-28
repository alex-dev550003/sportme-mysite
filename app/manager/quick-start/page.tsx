import type { Metadata } from "next";
import { PublicTopControls } from "../../components/PublicTopControls";
import { SiteFooter } from "../../components/SiteFooter";
import { LightboxImage } from "./LightboxImage";

const title = "Quick Start SportMe Manager | SportMe";
const description = "Ghid rapid pentru configurarea bazei sportive și gestionarea rezervărilor în SportMe Manager.";
const canonical = "https://www.sportme.ro/manager/quick-start";
const managerUrl = "https://admin.sportme.ro/auth";
const pricingHref = "/#preturi";

type Note = {
  title: "Pont" | "Important" | "Exemplu" | "Explicație";
  body: string;
};

type GuideBlock = {
  title: string;
  image: string;
  body: string[];
  bullets?: string[];
  flow?: string[];
  notes?: Note[];
};

type SetupStep = GuideBlock & {
  step: number;
};

const navigation = [
  { label: "Configurare inițială", href: "#configurare-initiala" },
  { label: "Rezervări", href: "#rezervari" },
  { label: "Baze și zone sportive", href: "#baze-zone" },
  { label: "Abonament", href: "#abonament" },
];

const setupSteps: SetupStep[] = [
  {
    step: 1,
    title: "Completează datele firmei",
    image: "01-date-firma.png",
    body: [
      "Introdu datele de identificare și contact ale firmei care administrează baza sportivă.",
      "Poți completa manual informațiile sau poți introduce CIF/CNP și apăsa „Completează automat” pentru preluarea datelor disponibile.",
      "Verifică în special persoana de contact, telefonul, emailul, denumirea firmei, datele fiscale și adresa.",
    ],
    notes: [
      {
        title: "Pont",
        body: "Dacă folosești „Completează automat”, verifică informațiile înainte de salvare și completează manual câmpurile lipsă.",
      },
    ],
  },
  {
    step: 2,
    title: "Creează baza sportivă",
    image: "02-creare-baza.png",
    body: [
      "Adaugă baza sportivă în care funcționează zonele tale rezervabile.",
      "Completează numele bazei sportive și adresa, apoi folosește „Amplasează locația pe hartă” pentru a indica poziția exactă.",
    ],
    notes: [
      {
        title: "Pont",
        body: "Poziționarea corectă pe hartă îi ajută pe jucători să găsească mai ușor baza sportivă.",
      },
    ],
  },
  {
    step: 3,
    title: "Adaugă prima zonă sportivă",
    image: "03-zona-sportiva.png",
    body: [
      "Creează primul teren sau spațiu care va putea fi rezervat de jucători.",
      "Introdu numele zonei sportive și selectează sportul pentru care este destinată.",
    ],
    notes: [
      { title: "Exemplu", body: "Teren 01 -> Fotbal" },
      { title: "Explicație", body: "O zonă sportivă reprezintă terenul sau spațiul rezervabil." },
      { title: "Pont", body: "Folosește denumiri simple și ușor de recunoscut de jucători." },
    ],
  },
  {
    step: 4,
    title: "Configurează programul și prețurile",
    image: "04-program-preturi.png",
    body: ["Stabilește când este disponibilă zona sportivă pentru rezervări și cât costă un interval."],
    bullets: [
      "zilele de funcționare",
      "ora de început",
      "ora de sfârșit",
      "durata intervalului",
      "prețul intervalului în RON",
    ],
    notes: [
      {
        title: "Exemplu",
        body: "Pentru program 10:00-20:00 și intervale de 60 de minute, SportMe generează automat intervalele disponibile pentru rezervare.",
      },
      { title: "Pont", body: "Programul și prețurile pot fi modificate ulterior." },
    ],
  },
  {
    step: 5,
    title: "Configurează notificările",
    image: "05-notificari.png",
    body: [
      "Configurează mesajele automate pe care SportMe le trimite jucătorilor înainte de rezervare.",
      "Poți seta două notificări diferite și pentru fiecare poți alege momentul trimiterii, ora și mesajul transmis.",
      "Mesajele pot utiliza automat informațiile rezervării precum sportul, locația, data și intervalul orar.",
      "Opțional poate fi activat și Reminder manager.",
    ],
    notes: [
      {
        title: "Pont",
        body: "Folosește notificările atât pentru reamintirea rezervării, cât și pentru reguli de acces sau alte informații utile.",
      },
    ],
  },
  {
    step: 6,
    title: "Verifică și publică baza",
    image: "06-publicare-baza.png",
    body: [
      "Înainte de publicare, verifică dacă toate etapele sunt finalizate.",
      "Dacă totul este corect, apasă „Publică online”.",
      "După publicare, baza sportivă devine disponibilă în SportMe Player și poate primi rezervări.",
    ],
    notes: [
      {
        title: "Important",
        body: "Echipa SportMe poate verifica informațiile introduse și poate contacta managerul dacă sunt necesare corecții.",
      },
    ],
  },
];

const bookingBlocks: GuideBlock[] = [
  {
    title: "Dashboardul rezervărilor",
    image: "07-dashboard.png",
    body: ["După publicarea bazei sportive, pagina Prezentare devine centrul de control pentru activitatea zilnică."],
    bullets: [
      "Calendar rezervări",
      "Rezervări viitoare",
      "Rezervări recente",
      "Analitice rezervări",
      "Gradul de ocupare al intervalelor",
      "Statusuri: Confirmat / În așteptare / Anulat",
    ],
  },
  {
    title: "Creează o rezervare manuală",
    image: "09-rezervare-manuala.png",
    body: [
      "Din meniul Rezervări poți crea rapid o rezervare pentru un client.",
      "Dacă telefonul aparține unui utilizator SportMe, rezervarea poate fi asociată contului acestuia și utilizatorul poate primi notificări.",
    ],
    flow: [
      "alegi zona sportivă din stânga dacă există mai multe",
      "alegi săptămâna",
      "identifici un slot „Liber”",
      "apeși slotul",
      "completezi numele și telefonul",
      "apeși „Rezervă interval”",
    ],
    notes: [
      {
        title: "Important",
        body: "„Închide interval” nu creează o rezervare și nu reprezintă anularea unei rezervări existente.",
      },
    ],
  },
  {
    title: "Aprobă sau respinge o rezervare",
    image: "10-aprobare-rezervare.png",
    body: [
      "Când un jucător trimite o rezervare care necesită confirmare, aceasta apare cu statusul „În așteptare”.",
      "Managerul o poate gestiona direct din calendar sau din pagina „Aprobări în așteptare”.",
      "Din fereastra rezervării poate verifica terenul, data, ora, numele, telefonul și numărul de jucători.",
    ],
    bullets: [
      "„Aprobă rezervarea” -> rezervarea devine confirmată",
      "„Respinge” / „Anulează rezervarea” -> cererea este refuzată",
    ],
    notes: [{ title: "Pont", body: "Pentru mai multe cereri folosește pagina „Aprobări în așteptare”." }],
  },
  {
    title: "Aprobări în așteptare",
    image: "11-aprobari-in-asteptare.png",
    body: [
      "Pagina dedicată pentru aprobări ajută atunci când există mai multe cereri de verificat și vrei să le parcurgi separat de calendar.",
    ],
  },
  {
    title: "Gestionează o rezervare confirmată",
    image: "12-rezervare-confirmata.png",
    body: ["Deschide o rezervare confirmată direct din calendar pentru a vedea toate detaliile."],
    bullets: [
      "vezi terenul, data și ora",
      "vezi clientul și telefonul",
      "vezi numărul de jucători",
      "trimiți o notificare manuală",
      "anulezi rezervarea",
    ],
  },
  {
    title: "Notificări manuale",
    image: "13-notificare-manuala.png",
    body: [
      "Managerul poate alege canalul În Aplicație sau WhatsApp și mesajul Mesaj 01 sau Mesaj 02.",
      "La anularea unei rezervări confirmate, rezervarea este anulată imediat, iar intervalul respectiv devine din nou „Liber” și poate fi rezervat de alt jucător.",
    ],
    notes: [
      {
        title: "Important",
        body: "Notificările manuale sunt suplimentare față de notificările automate configurate anterior sau din Setări.",
      },
    ],
  },
];

const locationBlocks: GuideBlock[] = [
  {
    title: "Baze și zone sportive",
    image: "14-baze-zone.png",
    body: ["Din meniul „Baze și zone sportive” poți administra infrastructura disponibilă pentru rezervări."],
    bullets: [
      "adăuga baze sportive",
      "edita baze existente",
      "elimina baze",
      "publica sau retrage baze din online",
      "adăuga zone sportive",
      "edita zone sportive",
      "șterge zone sportive",
      "seta zile indisponibile",
    ],
  },
  {
    title: "Editează baza sportivă",
    image: "15-editare-baza.png",
    body: ["Poți modifica numele bazei, adresa, site-ul web, localitatea, județul și poziția pe hartă.", "După modificare se apasă „Salvează”."],
  },
  {
    title: "Adaugă sau editează o zonă sportivă",
    image: "16-editare-zona.png",
    body: [
      "Pentru fiecare zonă sportivă se pot configura denumirea, sportul, zilele disponibile, programul, durata intervalului și prețul.",
      "Zona poate fi eliminată dacă nu mai este utilizată.",
      "În zilele închise publicului, managerul poate realiza în continuare rezervări manuale, conform comportamentului actual al aplicației.",
    ],
  },
  {
    title: "Zile indisponibile",
    image: "17-zile-indisponibile.png",
    body: [
      "Pentru zile în care una sau mai multe zone nu sunt disponibile, folosește „Zile indisponibile”.",
      "Managerul poate selecta simultan una sau mai multe zone sportive și una sau mai multe date.",
    ],
    bullets: ["sărbători", "mentenanță", "competiții", "evenimente private", "închidere temporară"],
    notes: [
      {
        title: "Important",
        body: "Zilele care sunt deja închise conform programului normal sunt marcate automat și nu trebuie selectate din nou.",
      },
    ],
  },
  {
    title: "Dashboard angajați",
    image: "19-angajati.png",
    body: [
      "Din Setări → Dashboard angajați poți crea conturi separate pentru membrii echipei și poți controla exact ce funcții și pagini pot accesa în SportMe Manager.",
      "Pentru fiecare angajat poți seta numele, numele de utilizator și parola, apoi poți alege permisiunile disponibile.",
      "Conturile create apar în lista „Conturi existente”, de unde pot fi administrate ulterior.",
    ],
    bullets: [
      "Creare rezervări",
      "Aprobare / anulare rezervări",
      "Trimitere remindere",
      "Prezentare",
      "Rezervări",
      "Aprobări în așteptare",
      "Baze și zone sportive",
      "Setări",
    ],
    notes: [
      {
        title: "Pont",
        body: "Oferă fiecărui angajat doar permisiunile necesare rolului său.",
      },
      {
        title: "Important",
        body: "Funcția Dashboard angajați este disponibilă conform planului de abonament activ.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
    siteName: "SportMe",
    type: "article",
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

function imageSrc(fileName: string) {
  return `/images/quick-start/${fileName}`;
}

function Screenshot({ fileName, alt, priority = false }: { fileName: string; alt: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-white/12 bg-white/[0.05] shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
      <LightboxImage src={imageSrc(fileName)} alt={alt} priority={priority} />
    </div>
  );
}

function NoteCard({ note }: { note: Note }) {
  const tone =
    note.title === "Important"
      ? "border-amber-300/28 bg-amber-300/[0.08] text-amber-100"
      : note.title === "Pont"
        ? "border-sky-300/24 bg-sky-300/[0.08] text-sky-100"
        : "border-white/14 bg-white/[0.06] text-white/84";

  return (
    <div className={`rounded-[16px] border px-4 py-3 ${tone}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em]">{note.title}</p>
      <p className="mt-2 text-sm leading-6 text-white/72">{note.body}</p>
    </div>
  );
}

function GuideContent({ block }: { block: GuideBlock }) {
  return (
    <div>
      <div className="space-y-3 text-base leading-7 text-white/72">
        {block.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {block.bullets ? (
        <ul className="mt-5 grid gap-2 text-sm leading-6 text-white/78 sm:grid-cols-2">
          {block.bullets.map((item) => (
            <li key={item} className="rounded-[14px] border border-white/12 bg-white/[0.055] px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
      {block.flow ? (
        <ol className="mt-5 space-y-2">
          {block.flow.map((item, index) => (
            <li key={item} className="flex gap-3 rounded-[14px] border border-white/12 bg-white/[0.055] px-3 py-2 text-sm leading-6 text-white/78">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#106dff] text-xs font-semibold text-white">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      ) : null}
      {block.title === "Creează o rezervare manuală" ? (
        <div className="mt-5 rounded-[16px] border border-white/14 bg-white/[0.06] px-4 py-3">
          <p className="text-sm font-semibold text-white">Închide interval</p>
          <p className="mt-2 text-sm leading-6 text-white/72">
            Dacă un interval nu mai este disponibil pentru rezervare, selectează slotul și apasă „Închide interval”. Intervalul devine indisponibil pentru jucători și nu mai poate fi rezervat.
          </p>
          <p className="mt-2 text-sm leading-6 text-white/58">Exemple: mentenanță, eveniment intern, indisponibilitate temporară.</p>
        </div>
      ) : null}
      {block.notes ? (
        <div className="mt-5 space-y-3">
          {block.notes.map((note) => (
            <NoteCard key={`${block.title}-${note.title}-${note.body}`} note={note} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SetupStepCard({ step, reverse }: { step: SetupStep; reverse: boolean }) {
  return (
    <article className={`grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center ${reverse ? "lg:[&>div:first-child]:order-2 lg:grid-cols-[1.22fr_0.78fr]" : ""}`}>
      <div>
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#106dff] text-lg font-semibold text-white shadow-[0_16px_32px_rgba(16,109,255,0.28)]">
            {step.step}
          </span>
          <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">{step.title}</h3>
        </div>
        <div className="mt-5">
          <GuideContent block={step} />
        </div>
      </div>
      <Screenshot fileName={step.image} alt={`${step.title} - screenshot SportMe Manager`} priority={step.step === 1} />
    </article>
  );
}

function FeatureBlock({ block, index }: { block: GuideBlock; index: number }) {
  return (
    <article className={`grid gap-7 rounded-[24px] border border-white/12 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center ${index % 2 === 1 ? "lg:[&>div:first-child]:order-2 lg:grid-cols-[1.22fr_0.78fr]" : ""}`}>
      <div className="p-1 md:p-3">
        <h3 className="text-2xl font-semibold leading-tight text-white">{block.title}</h3>
        <div className="mt-4">
          <GuideContent block={block} />
        </div>
      </div>
      <Screenshot fileName={block.image} alt={`${block.title} - screenshot SportMe Manager`} />
    </article>
  );
}

function SectionHeader({ id, eyebrow, title, subtitle }: { id: string; eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div id={id} className="scroll-mt-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6aa7ff]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-4 max-w-3xl text-base leading-7 text-white/70 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}

export default function QuickStartManagerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Quick Start SportMe Manager",
    description,
    inLanguage: "ro-RO",
    url: canonical,
    step: setupSteps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.body.join(" "),
      image: `https://www.sportme.ro${imageSrc(step.image)}`,
    })),
  };

  return (
    <main className="public-site public-dark min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-4 sm:px-5 md:px-8 lg:pb-16 lg:pt-5">
        <div className="flex justify-end">
          <PublicTopControls showBack hideLanguage backLabel="← sportme.ro" />
        </div>

        <header className="pt-6 md:pt-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_0.94fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#6aa7ff]">SPORTME MANAGER</p>
              <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.05] text-white md:text-5xl">
                Quick Start SportMe Manager
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-7 text-white/82 md:text-xl md:leading-8">
                Configurează baza sportivă și învață să gestionezi rezervările în câteva minute.
              </p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/64">
                De la configurarea firmei și publicarea bazei sportive până la rezervări, notificări și administrarea zonelor sportive.
              </p>
            </div>
            <div className="justify-self-end rounded-[24px] border border-white/12 bg-white/[0.06] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:max-w-[640px]">
              <Screenshot fileName="07-dashboard.png" alt="Dashboard SportMe Manager" priority />
            </div>
          </div>
        </header>

          <nav className="sticky top-3 z-40 mt-7 flex flex-wrap gap-2 rounded-[20px] border border-white/10 bg-[#07101d]/82 p-2 shadow-[0_18px_42px_rgba(0,0,0,0.2)] backdrop-blur-xl" aria-label="Navigație ghid Quick Start">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-white/78 transition hover:border-[#2f82ff]/70 hover:bg-[#106dff]/18 hover:text-white sm:text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

        <section className="mt-8 rounded-[24px] border border-white/12 bg-white/[0.06] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:px-6 md:py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/46">Introducere</p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Bun venit în SportMe Manager</h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-white/72">
            După crearea contului vei ajunge în dashboardul SportMe Manager. Ghidul de start te ajută să configurezi baza sportivă pas cu pas înainte de publicare.
          </p>
          <div className="mt-4 rounded-[18px] border border-[#2f82ff]/30 bg-[#106dff]/12 px-5 py-3 text-base font-semibold text-white">
            Apasă „Ghid de start” pentru a începe configurarea.
          </div>
        </section>

        <section className="mt-24 space-y-14">
          <SectionHeader
            id="configurare-initiala"
            eyebrow="Configurare inițială"
            title="Configurează prima bază sportivă în 6 pași."
          />
          {setupSteps.map((step, index) => (
            <SetupStepCard key={step.image} step={step} reverse={index % 2 === 1} />
          ))}
          <div className="rounded-[24px] border border-emerald-300/20 bg-emerald-300/[0.08] p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white">Configurarea este gata!</h3>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/72">
              Baza ta sportivă este online. De acum poți primi și gestiona rezervările direct din SportMe Manager.
            </p>
          </div>
        </section>

        <section className="mt-28 space-y-8">
          <SectionHeader id="rezervari" eyebrow="Rezervări" title="Gestionarea rezervărilor" />
          {bookingBlocks.map((block, index) => (
            <FeatureBlock key={block.image} block={block} index={index} />
          ))}
        </section>

        <section className="mt-28 space-y-8">
          <SectionHeader id="baze-zone" eyebrow="Baze și zone sportive" title="Administrarea bazelor și zonelor sportive" />
          {locationBlocks.map((block, index) => (
            <FeatureBlock key={block.image} block={block} index={index} />
          ))}
        </section>

        <section className="mt-28 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div id="abonament" className="scroll-mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6aa7ff]">Abonament</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">Abonamentul SportMe Manager</h2>
            <div className="mt-5 space-y-3 text-base leading-7 text-white/72">
              <p>În Setări - Abonament poți vedea planul activ, zonele sportive incluse și costul abonamentului.</p>
              <p>Freemium: maximum 1 bază sportivă + 1 zonă sportivă.</p>
              <p>Premium STARTER: maximum 2 zone sportive.</p>
              <p>Premium PRO: zone sportive nelimitate, conform structurii comerciale actuale.</p>
              <p>Costul este calculat automat în funcție de configurația contului și poate fi verificat oricând din Setări.</p>
            </div>
            <a
              href={pricingHref}
              className="mt-6 inline-flex rounded-full border border-white/14 bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#2f82ff]/70 hover:bg-[#106dff]/18"
            >
              Vezi planurile SportMe Manager
            </a>
          </div>
          <Screenshot fileName="18-abonament.png" alt="Abonament SportMe Manager" />
        </section>

        <section className="mt-24 rounded-[24px] border border-white/12 bg-white/[0.06] p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
          <h2 className="text-3xl font-semibold text-white">Ești gata să folosești SportMe Manager?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/72">
            Administrează bazele sportive, rezervările și comunicarea cu jucătorii dintr-un singur loc.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={managerUrl}
              className="inline-flex items-center justify-center rounded-full border border-[#106dff] bg-[#106dff] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(16,109,255,0.3)] transition hover:bg-[#2f82ff]"
            >
              Deschide SportMe Manager
            </a>
            <a
              href={pricingHref}
              className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/[0.08] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
            >
              Vezi planurile
            </a>
          </div>
        </section>

        <div className="mt-12">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
