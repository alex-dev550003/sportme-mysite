"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useI18n } from "../../app/i18n";
import type { BaseLanguageKey } from "../../app/languages";
import { localizeContent, translateDocumentText } from "../../app/content-locales";
import { LanguageSelector } from "../../components/LanguageSelector";
import { PublicTopControls } from "../../components/PublicTopControls";
import { SiteFooter } from "../../components/SiteFooter";

const ProductChoiceModal = dynamic(() => import("../../components/ProductChoiceModal"), { ssr: false });
type HeaderChoice = "download" | "signIn" | "signUp";

const canonical = "https://www.sportme.ro/manager/quick-start";
const managerUrl = "https://admin.sportme.ro/auth";
const managerPlayStoreUrl = "https://play.google.com/store/apps/details?id=com.sportme.dashboard";
const playerWebUrl = "https://app.sportme.ro/app";
const playerPlayStoreUrl = "https://play.google.com/store/apps/details?id=ro.sportme.app";
const pricingHref = "/#preturi";

type Note = {
  title: string;
  body: string;
};

type Subsection = {
  title: string;
  body: string[];
  notes?: Note[];
};

type GuideBlock = {
  title: string;
  body: string[];
  bullets?: string[];
  flow?: string[];
  subsections?: Subsection[];
  notes?: Note[];
};

type SetupStep = GuideBlock & {
  step: number;
};

type QuickStartCopy = {
  navigation: { label: string; href: string }[];
  setupSteps: SetupStep[];
  bookingBlocks: GuideBlock[];
  locationBlocks: GuideBlock[];
  hero: { eyebrow: string; title: string; subtitle: string; body: string };
  intro: { eyebrow: string; title: string; body: string; callout: string };
  sections: {
    setupEyebrow: string;
    setupTitle: string;
    setupDoneTitle: string;
    setupDoneBody: string;
    bookingsEyebrow: string;
    bookingsTitle: string;
    locationsEyebrow: string;
    locationsTitle: string;
    subscriptionEyebrow: string;
    subscriptionTitle: string;
    subscriptionBody: string[];
    subscriptionCta: string;
  };
  finalCta: { title: string; body: string; manager: string; pricing: string };
  aria: { navigation: string };
  closeSlot: { title: string; body: string; examples: string };
};

const copy: Record<BaseLanguageKey, QuickStartCopy> = {
  RO: {
    navigation: [
      { label: "Configurare inițială", href: "#configurare-initiala" },
      { label: "Rezervări", href: "#rezervari" },
      { label: "Baze și zone sportive", href: "#baze-zone" },
      { label: "Abonament", href: "#abonament" },
    ],
    hero: {
      eyebrow: "SPORTME MANAGER",
      title: "Quick Start SportMe Manager",
      subtitle: "Configurează baza sportivă și învață să gestionezi rezervările în câteva minute.",
      body: "De la configurarea firmei și publicarea bazei sportive până la rezervări, notificări și administrarea zonelor sportive.",
    },
    intro: {
      eyebrow: "Introducere",
      title: "Bun venit în SportMe Manager",
      body: "După crearea contului vei ajunge în dashboardul SportMe Manager. Ghidul de start te ajută să configurezi baza sportivă pas cu pas înainte de publicare.",
      callout: "Apasă „Ghid de start” pentru a începe configurarea.",
    },
    sections: {
      setupEyebrow: "Configurare inițială",
      setupTitle: "Configurează prima bază sportivă în 6 pași.",
      setupDoneTitle: "Configurarea este gata!",
      setupDoneBody: "Baza ta sportivă este online. De acum poți primi și gestiona rezervările direct din SportMe Manager.",
      bookingsEyebrow: "Rezervări",
      bookingsTitle: "Gestionarea rezervărilor",
      locationsEyebrow: "Baze și zone sportive",
      locationsTitle: "Administrarea bazelor și zonelor sportive",
      subscriptionEyebrow: "Abonament",
      subscriptionTitle: "Abonamentul SportMe Manager",
      subscriptionBody: [
        "În Setări - Abonament poți vedea planul activ și costul asociat contului tău.",
        "Pe site, opțiunile sunt prezentate ca Free și Premium. Free include administrarea de bază, iar Premium adaugă rezervări din aplicație, confirmări, notificări și statistici.",
        "Prețul Premium afișat pe site depinde de țara din care este accesat.",
      ],
      subscriptionCta: "Vezi planurile SportMe Manager",
    },
    finalCta: {
      title: "Ești gata să folosești SportMe Manager?",
      body: "Administrează bazele sportive, rezervările și comunicarea cu jucătorii dintr-un singur loc.",
      manager: "Deschide SportMe Manager",
      pricing: "Vezi planurile",
    },
    aria: {
      navigation: "Navigație ghid Quick Start",
    },
    closeSlot: {
      title: "Închide interval",
      body: "Dacă un interval nu mai este disponibil pentru rezervare, selectează slotul și apasă „Închide interval”. Intervalul devine indisponibil pentru jucători și nu mai poate fi rezervat.",
      examples: "Exemple: mentenanță, eveniment intern, indisponibilitate temporară.",
    },
    setupSteps: [
      {
        step: 1,
        title: "Completează datele firmei",
        body: [
          "Introdu datele de identificare și contact ale firmei care administrează baza sportivă.",
          "Poți completa manual informațiile sau poți introduce CIF/CNP și apăsa „Completează automat” pentru preluarea datelor disponibile.",
          "Verifică în special persoana de contact, telefonul, emailul, denumirea firmei, datele fiscale și adresa.",
        ],
        notes: [{ title: "Pont", body: "Dacă folosești „Completează automat”, verifică informațiile înainte de salvare și completează manual câmpurile lipsă." }],
      },
      {
        step: 2,
        title: "Creează baza sportivă",
        body: [
          "Adaugă baza sportivă în care funcționează zonele tale rezervabile.",
          "Completează numele bazei sportive și adresa, apoi folosește „Amplasează locația pe hartă” pentru a indica poziția exactă.",
        ],
        notes: [{ title: "Pont", body: "Poziționarea corectă pe hartă îi ajută pe jucători să găsească mai ușor baza sportivă." }],
      },
      {
        step: 3,
        title: "Adaugă prima zonă sportivă",
        body: [
          "Creează primul teren sau spațiu care va putea fi rezervat de jucători.",
          "Introdu numele zonei sportive și selectează sportul pentru care este destinat.",
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
        body: ["Stabilește când este disponibilă zona sportivă pentru rezervări și cât costă un interval."],
        bullets: ["zilele de funcționare", "ora de început", "ora de sfârșit", "durata intervalului", "prețul intervalului în RON"],
        notes: [
          { title: "Exemplu", body: "Pentru program 10:00-20:00 și intervale de 60 de minute, SportMe generează automat intervalele disponibile pentru rezervare." },
          { title: "Pont", body: "Programul și prețurile pot fi modificate ulterior." },
        ],
      },
      {
        step: 5,
        title: "Configurează notificările",
        body: [
          "SportMe include două mesaje implicite pe care le poți configura pentru notificările automate.",
          "Pe lângă acestea, managerul poate adăuga și alte mesaje preferate, astfel încât să poată reutiliza rapid texte proprii pentru diferite situații.",
          "Mesajele pot include informații despre rezervare precum sportul, locația, data și intervalul orar.",
          "Pentru fiecare mesaj poți alege momentul trimiterii și ora trimiterii.",
          "Opțional poate fi activat și Reminder manager.",
        ],
        notes: [{ title: "Pont", body: "Poți salva mesaje suplimentare pentru reguli de acces, echipament necesar, informații despre parcare sau alte instrucțiuni specifice bazei sportive." }],
      },
      {
        step: 6,
        title: "Verifică și publică baza",
        body: [
          "Înainte de publicare, verifică dacă toate etapele sunt finalizate.",
          "Dacă totul este corect, apasă „Publică online”.",
          "După publicare, baza sportivă devine disponibilă în SportMe Player și poate primi rezervări.",
        ],
        notes: [{ title: "Important", body: "Echipa SportMe poate verifica informațiile introduse și poate contacta managerul dacă sunt necesare corecții." }],
      },
    ],
    bookingBlocks: [
      {
        title: "Dashboardul rezervărilor",
        body: ["După publicarea bazei sportive, pagina Prezentare devine centrul de control pentru activitatea zilnică."],
        bullets: ["Calendar rezervări", "Rezervări viitoare", "Rezervări recente", "Analitice rezervări", "Gradul de ocupare al intervalelor", "Statusuri: Confirmat / În așteptare / Anulat"],
      },
      {
        title: "Creează o rezervare manuală",
        body: [
          "Din meniul Rezervări poți crea rapid o rezervare pentru un client.",
          "Dacă telefonul aparține unui utilizator SportMe, rezervarea poate fi asociată contului acestuia și utilizatorul poate primi notificări.",
        ],
        flow: ["alegi zona sportivă din stânga dacă există mai multe", "alegi săptămâna", "identifici un slot „Liber”", "apeși slotul", "completezi numele și telefonul", "apeși „Rezervă interval”"],
        subsections: [
          {
            title: "Prețul rezervării",
            body: [
              "SportMe completează automat prețul rezervării pe baza tarifului configurat pentru zona sportivă și durata selectată.",
              "Dacă este necesar, managerul poate modifica manual prețul înainte de salvarea rezervării.",
              "Pentru intervalele cu durată personalizată, prețul poate fi calculat automat în funcție de durata aleasă.",
            ],
            notes: [{ title: "Pont", body: "Verifică prețul înainte de confirmare atunci când folosești o durată diferită de intervalul standard." }],
          },
          {
            title: "Rezervă o durată diferită",
            body: [
              "Pe lângă durata standard configurată pentru zonă, managerul poate crea o rezervare cu o durată personalizată.",
              "Durata poate fi ajustată în pași de 15 minute folosind opțiunea disponibilă în formularul de rezervare.",
              "Exemplu: Dacă intervalul standard este de 60 de minute, managerul poate crea, dacă disponibilitatea permite, o rezervare de 45, 75, 90 de minute etc.",
              "SportMe verifică intervalele implicate și calculează durata rezervării conform selecției.",
            ],
          },
        ],
        notes: [{ title: "Important", body: "„Închide interval” nu creează o rezervare și nu reprezintă anularea unei rezervări existente." }],
      },
      {
        title: "Rezervări repetitive",
        body: [
          "Pentru rezervările care se repetă, managerul poate crea automat mai multe rezervări pornind de la aceeași configurație.",
          "SportMe va crea rezervările recurente până la data selectată, în limita disponibilității intervalelor.",
          "Seriile recurente pot fi gestionate și din istoricul rezervărilor, inclusiv pentru rezervările afișate în zona Past, conform opțiunilor disponibile în aplicație.",
        ],
        bullets: ["repetare zilnică", "repetare săptămânală", "repetare lunară", "data de sfârșit a seriei"],
      },
      {
        title: "Aprobă sau respinge o rezervare",
        body: [
          "Când un jucător trimite o rezervare care necesită confirmare, aceasta apare cu statusul „În așteptare”.",
          "Managerul o poate gestiona direct din calendar sau din pagina „Aprobări în așteptare”.",
          "Din fereastra rezervării poate verifica terenul, data, ora, numele, telefonul și numărul de jucători.",
        ],
        bullets: ["„Aprobă rezervarea” -> rezervarea devine confirmată", "„Respinge” / „Anulează rezervarea” -> cererea este refuzată"],
        notes: [{ title: "Pont", body: "Pentru mai multe cereri folosește pagina „Aprobări în așteptare”." }],
      },
      { title: "Aprobări în așteptare", body: ["Pagina dedicată pentru aprobări ajută atunci când există mai multe cereri de verificat și vrei să le parcurgi separat de calendar."] },
      {
        title: "Gestionează o rezervare confirmată",
        body: ["Deschide o rezervare confirmată direct din calendar pentru a vedea toate detaliile."],
        bullets: ["vezi terenul, data și ora", "vezi clientul și telefonul", "vezi numărul de jucători", "trimiți o notificare manuală", "anulezi rezervarea"],
      },
      {
        title: "Notificări manuale",
        body: [
          "Managerul poate selecta unul dintre mesajele salvate și îl poate trimite prin Aplicație sau WhatsApp.",
          "Cele două mesaje implicite rămân disponibile, iar mesajele suplimentare adăugate de manager pot fi reutilizate.",
          "La anularea unei rezervări confirmate, rezervarea este anulată imediat, iar intervalul respectiv devine din nou „Liber” și poate fi rezervat de alt jucător.",
        ],
        notes: [{ title: "Important", body: "Notificările manuale sunt suplimentare față de notificările automate configurate anterior sau din Setări." }],
      },
    ],
    locationBlocks: [
      {
        title: "Baze și zone sportive",
        body: ["Din meniul „Baze și zone sportive” poți administra infrastructura disponibilă pentru rezervări."],
        bullets: ["adăuga baze sportive", "edita baze existente", "elimina baze", "publica sau retrage baze din online", "adăuga zone sportive", "edita zone sportive", "șterge zone sportive", "seta zile indisponibile"],
      },
      { title: "Editează baza sportivă", body: ["Poți modifica numele bazei, adresa, site-ul web, localitatea, județul și poziția pe hartă.", "După modificare se apasă „Salvează”."] },
      {
        title: "Adaugă sau editează o zonă sportivă",
        body: [
          "Pentru fiecare zonă sportivă se pot configura denumirea, sportul, zilele disponibile, programul, durata intervalului și prețul.",
          "Zona poate fi eliminată dacă nu mai este utilizată.",
          "În zilele închise publicului, managerul poate realiza în continuare rezervări manuale, conform comportamentului actual al aplicației.",
        ],
      },
      {
        title: "Zile indisponibile",
        body: ["Pentru zile în care una sau mai multe zone nu sunt disponibile, folosește „Zile indisponibile”.", "Managerul poate selecta simultan una sau mai multe zone sportive și una sau mai multe date."],
        bullets: ["sărbători", "mentenanță", "competiții", "evenimente private", "închidere temporară"],
        notes: [{ title: "Important", body: "Zilele care sunt deja închise conform programului normal sunt marcate automat și nu trebuie selectate din nou." }],
      },
      {
        title: "Dashboard angajați",
        body: [
          "Din Setări -> Dashboard angajați poți crea conturi separate pentru membrii echipei și poți controla exact ce funcții și pagini pot accesa în SportMe Manager.",
          "Pentru fiecare angajat poți seta numele, numele de utilizator și parola, apoi poți alege permisiunile disponibile.",
          "Conturile create apar în lista „Conturi existente”, de unde pot fi administrate ulterior.",
        ],
        bullets: ["Creare rezervări", "Aprobare / anulare rezervări", "Trimitere remindere", "Prezentare", "Rezervări", "Aprobări în așteptare", "Baze și zone sportive", "Setări"],
        notes: [{ title: "Pont", body: "Oferă fiecărui angajat doar permisiunile necesare rolului său." }, { title: "Important", body: "Funcția Dashboard angajați este disponibilă conform planului de abonament activ." }],
      },
    ],
  },
  EN: {
    navigation: [
      { label: "Initial setup", href: "#configurare-initiala" },
      { label: "Bookings", href: "#rezervari" },
      { label: "Sports venues and areas", href: "#baze-zone" },
      { label: "Subscription", href: "#abonament" },
    ],
    hero: {
      eyebrow: "SPORTME MANAGER",
      title: "Quick Start SportMe Manager",
      subtitle: "Set up your sports venue and learn how to manage bookings in just a few minutes.",
      body: "From company details and publishing your sports venue to bookings, notifications and sports area administration.",
    },
    intro: {
      eyebrow: "Introduction",
      title: "Welcome to SportMe Manager",
      body: "After creating your account, you will land in the SportMe Manager dashboard. The quick start guide helps you configure your sports venue step by step before publishing.",
      callout: "Press “Start guide” to begin the setup.",
    },
    sections: {
      setupEyebrow: "Initial setup",
      setupTitle: "Set up your first sports venue in 6 steps.",
      setupDoneTitle: "Setup is complete!",
      setupDoneBody: "Your sports venue is online. You can now receive and manage bookings directly from SportMe Manager.",
      bookingsEyebrow: "Bookings",
      bookingsTitle: "Managing bookings",
      locationsEyebrow: "Sports venues and areas",
      locationsTitle: "Managing sports venues and sports areas",
      subscriptionEyebrow: "Subscription",
      subscriptionTitle: "SportMe Manager subscription",
      subscriptionBody: [
        "In Settings - Subscription you can see the active plan and the cost associated with your account.",
        "On the site, the options are shown as Free and Premium. Free includes basic management, while Premium adds in-app bookings, confirmations, notifications and statistics.",
        "The Premium price shown on the site depends on the country from which it is accessed.",
      ],
      subscriptionCta: "See SportMe Manager plans",
    },
    finalCta: {
      title: "Ready to use SportMe Manager?",
      body: "Manage sports venues, bookings and player communication from one place.",
      manager: "Open SportMe Manager",
      pricing: "See plans",
    },
    aria: {
      navigation: "Quick Start guide navigation",
    },
    closeSlot: {
      title: "Close slot",
      body: "If a slot is no longer available for booking, select it and press “Close slot”. The slot becomes unavailable to players and can no longer be booked.",
      examples: "Examples: maintenance, internal event, temporary unavailability.",
    },
    setupSteps: [
      {
        step: 1,
        title: "Complete company details",
        body: [
          "Enter the identification and contact details of the company that manages the sports venue.",
          "You can fill in the information manually or enter the company/personal tax ID and press “Autofill” to retrieve available data.",
          "Check the contact person, phone number, email, company name, tax details and address in particular.",
        ],
        notes: [{ title: "Tip", body: "If you use “Autofill”, review the information before saving and manually complete any missing fields." }],
      },
      {
        step: 2,
        title: "Create the sports venue",
        body: ["Add the sports venue that contains your bookable sports areas.", "Enter the venue name and address, then use “Place location on map” to indicate the exact position."],
        notes: [{ title: "Tip", body: "Correct map positioning helps players find the sports venue more easily." }],
      },
      {
        step: 3,
        title: "Add the first sports area",
        body: ["Create the first court or space that players will be able to book.", "Enter the sports area name and select the sport it is intended for."],
        notes: [
          { title: "Example", body: "Court 01 -> Football" },
          { title: "Explanation", body: "A sports area is the court or space that can be booked." },
          { title: "Tip", body: "Use simple names that players can recognize easily." },
        ],
      },
      {
        step: 4,
        title: "Configure schedule and pricing",
        body: ["Set when the sports area is available for bookings and how much each slot costs."],
        bullets: ["operating days", "start time", "end time", "slot duration", "slot price in RON"],
        notes: [{ title: "Example", body: "For a 10:00-20:00 schedule and 60-minute slots, SportMe automatically generates the available booking slots." }, { title: "Tip", body: "Schedule and pricing can be changed later." }],
      },
      {
        step: 5,
        title: "Configure notifications",
        body: [
          "SportMe includes two default messages that can be configured for automatic notifications.",
          "In addition, the manager can add other preferred messages, making it easy to reuse custom texts for different situations.",
          "Messages can include booking information such as sport, location, date and time interval.",
          "For each message, you can choose the send timing and send time.",
          "Manager reminder can also be enabled optionally.",
        ],
        notes: [{ title: "Tip", body: "You can save additional messages for access rules, required equipment, parking information or other venue-specific instructions." }],
      },
      {
        step: 6,
        title: "Review and publish the venue",
        body: ["Before publishing, check that all steps are complete.", "If everything is correct, press “Publish online”.", "After publishing, the sports venue becomes available in SportMe Player and can receive bookings."],
        notes: [{ title: "Important", body: "The SportMe team may review the information and contact the manager if corrections are needed." }],
      },
    ],
    bookingBlocks: [
      {
        title: "Bookings dashboard",
        body: ["After publishing the sports venue, the Overview page becomes the control center for daily activity."],
        bullets: ["Bookings calendar", "Upcoming bookings", "Recent bookings", "Booking analytics", "Slot occupancy", "Statuses: Confirmed / Pending / Cancelled"],
      },
      {
        title: "Create a manual booking",
        body: ["From the Bookings menu, you can quickly create a booking for a customer.", "If the phone number belongs to a SportMe user, the booking can be linked to that account and the user can receive notifications."],
        flow: ["choose the sports area on the left if there is more than one", "choose the week", "identify a “Free” slot", "press the slot", "fill in the name and phone number", "press “Book slot”"],
        subsections: [
          {
            title: "Booking price",
            body: [
              "SportMe automatically fills in the booking price based on the configured rate for the sports area and the selected duration.",
              "If needed, the manager can manually adjust the price before saving the booking.",
              "For custom-duration bookings, the price can be calculated automatically based on the selected duration.",
            ],
            notes: [{ title: "Tip", body: "Check the price before confirming when using a duration different from the standard slot." }],
          },
          {
            title: "Book a custom duration",
            body: [
              "In addition to the standard duration configured for the sports area, the manager can create a booking with a custom duration.",
              "The duration can be adjusted in 15-minute increments using the option available in the booking form.",
              "Example: If the standard slot is 60 minutes, the manager can create, subject to availability, a 45, 75, 90-minute booking, etc.",
              "SportMe checks the affected slots and calculates the booking duration based on the selection.",
            ],
          },
        ],
        notes: [{ title: "Important", body: "“Close slot” does not create a booking and does not cancel an existing booking." }],
      },
      {
        title: "Recurring bookings",
        body: [
          "For repeating bookings, the manager can automatically create multiple bookings based on the same configuration.",
          "SportMe creates the recurring bookings up to the selected end date, subject to slot availability.",
          "Recurring series can also be managed from booking history, including bookings shown in the Past section, according to the options available in the application.",
        ],
        bullets: ["daily recurrence", "weekly recurrence", "monthly recurrence", "an end date for the series"],
      },
      {
        title: "Approve or reject a booking",
        body: ["When a player sends a booking that requires confirmation, it appears with the “Pending” status.", "The manager can handle it directly from the calendar or from the “Pending approvals” page.", "From the booking window, the manager can check the court, date, time, name, phone number and number of players."],
        bullets: ["“Approve booking” -> the booking becomes confirmed", "“Reject” / “Cancel booking” -> the request is refused"],
        notes: [{ title: "Tip", body: "For multiple requests, use the “Pending approvals” page." }],
      },
      { title: "Pending approvals", body: ["The dedicated approvals page helps when there are several requests to review and you want to handle them separately from the calendar."] },
      {
        title: "Manage a confirmed booking",
        body: ["Open a confirmed booking directly from the calendar to see all details."],
        bullets: ["view the court, date and time", "view the customer and phone number", "view the number of players", "send a manual notification", "cancel the booking"],
      },
      {
        title: "Manual notifications",
        body: ["The manager can select one of the saved messages and send it through the App or WhatsApp.", "The two default messages remain available, and additional messages added by the manager can also be reused.", "When a confirmed booking is cancelled, the booking is cancelled immediately and that slot becomes “Free” again, so another player can book it."],
        notes: [{ title: "Important", body: "Manual notifications are additional to the automatic notifications configured earlier or from Settings." }],
      },
    ],
    locationBlocks: [
      {
        title: "Sports venues and sports areas",
        body: ["From the “Sports venues and areas” menu, you can manage the infrastructure available for bookings."],
        bullets: ["add sports venues", "edit existing venues", "remove venues", "publish or unpublish venues", "add sports areas", "edit sports areas", "delete sports areas", "set unavailable days"],
      },
      { title: "Edit the sports venue", body: ["You can change the venue name, address, website, city, county and map position.", "After making changes, press “Save”."] },
      {
        title: "Add or edit a sports area",
        body: ["For each sports area, you can configure its name, sport, available days, schedule, slot duration and price.", "The area can be removed if it is no longer used.", "On days closed to the public, the manager can still create manual bookings, according to the current application behavior."],
      },
      {
        title: "Unavailable days",
        body: ["For days when one or more areas are unavailable, use “Unavailable days”.", "The manager can select one or more sports areas and one or more dates at the same time."],
        bullets: ["holidays", "maintenance", "competitions", "private events", "temporary closure"],
        notes: [{ title: "Important", body: "Days that are already closed according to the normal schedule are marked automatically and do not need to be selected again." }],
      },
      {
        title: "Staff dashboard",
        body: ["From Settings -> Staff dashboard, you can create separate accounts for team members and control exactly which features and pages they can access in SportMe Manager.", "For each staff member, you can set the name, username and password, then choose the available permissions.", "Created accounts appear in the “Existing accounts” list, where they can be managed later."],
        bullets: ["Create bookings", "Approve / cancel bookings", "Send reminders", "Overview", "Bookings", "Pending approvals", "Sports venues and areas", "Settings"],
        notes: [{ title: "Tip", body: "Give each staff member only the permissions they need for their role." }, { title: "Important", body: "The Staff dashboard feature is available according to the active subscription plan." }],
      },
    ],
  },
};

function NoteCard({ note }: { note: Note }) {
  const { language } = useI18n();
  const tone =
    note.title === translateDocumentText("Important", language)
      ? "border-amber-300/28 bg-amber-300/[0.08] text-amber-100"
      : note.title === "Pont" || note.title === translateDocumentText("Tip", language)
        ? "border-sky-300/24 bg-sky-300/[0.08] text-sky-100"
        : "border-white/14 bg-white/[0.06] text-white/84";

  return (
    <div className={`rounded-[16px] border px-4 py-3 ${tone}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em]">{note.title}</p>
      <p className="mt-2 text-sm leading-6 text-white/72">{note.body}</p>
    </div>
  );
}

function BodyCopy({ paragraphs, className = "text-base leading-7" }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`space-y-3 text-white/72 ${className}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function BulletGrid({ bullets }: { bullets: string[] }) {
  return (
    <ul className="mt-5 grid gap-2 text-sm leading-6 text-white/78 sm:grid-cols-2">
      {bullets.map((item) => (
        <li key={item} className="rounded-[14px] border border-white/12 bg-white/[0.055] px-3 py-2">
          {item}
        </li>
      ))}
    </ul>
  );
}

function FlowList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-2">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 rounded-[14px] border border-white/12 bg-white/[0.055] px-3 py-2 text-sm leading-6 text-white/78">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#106dff] text-xs font-semibold text-white">{index + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function SubsectionList({ sections }: { sections: Subsection[] }) {
  return (
    <div className="mt-5 space-y-4">
      {sections.map((section) => (
        <div key={section.title} className="rounded-[16px] border border-white/14 bg-white/[0.045] px-4 py-4">
          <h4 className="text-sm font-semibold text-white">{section.title}</h4>
          <BodyCopy paragraphs={section.body} className="mt-3 text-sm leading-6" />
          {section.notes ? (
            <div className="mt-4 space-y-3">
              {section.notes.map((note) => (
                <NoteCard key={`${section.title}-${note.title}-${note.body}`} note={note} />
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function CloseSlotCard({ closeSlot }: { closeSlot: QuickStartCopy["closeSlot"] }) {
  return (
    <div className="rounded-[16px] border border-white/14 bg-white/[0.06] px-4 py-3">
      <p className="text-sm font-semibold text-white">{closeSlot.title}</p>
      <p className="mt-2 text-sm leading-6 text-white/72">{closeSlot.body}</p>
      <p className="mt-2 text-sm leading-6 text-white/58">{closeSlot.examples}</p>
    </div>
  );
}

function GuideContent({ block, closeSlot }: { block: GuideBlock; closeSlot: QuickStartCopy["closeSlot"] }) {
  const isManualBooking = Boolean(block.flow && block.subsections);

  return (
    <div>
      <BodyCopy paragraphs={block.body} />
      {block.bullets ? <BulletGrid bullets={block.bullets} /> : null}
      {block.flow ? (
        <div className="mt-5">
          <FlowList items={block.flow} />
        </div>
      ) : null}
      {block.subsections ? <SubsectionList sections={block.subsections} /> : null}
      {isManualBooking ? (
        <div className="mt-5">
          <CloseSlotCard closeSlot={closeSlot} />
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

function SetupStepCard({ step, text }: { step: SetupStep; text: QuickStartCopy }) {
  return (
    <article className="max-w-5xl">
      <div>
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#106dff] text-lg font-semibold text-white shadow-[0_16px_32px_rgba(16,109,255,0.28)]">{step.step}</span>
          <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">{step.title}</h3>
        </div>
        <div className="mt-5">
          <GuideContent block={step} closeSlot={text.closeSlot} />
        </div>
      </div>
    </article>
  );
}

function FeatureBlock({ block, text }: { block: GuideBlock; text: QuickStartCopy }) {
  const isManualBooking = Boolean(block.flow && block.subsections);

  if (isManualBooking) {
    return (
      <article className="grid gap-7 rounded-[24px] border border-white/12 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-5 lg:grid-cols-[1.22fr_0.78fr] lg:items-stretch">
        <div className="flex flex-col justify-between gap-5 p-1 md:p-3">
          <div>
            <h3 className="text-2xl font-semibold leading-tight text-white">{block.title}</h3>
            <div className="mt-4">
              <BodyCopy paragraphs={block.body} />
            </div>
          </div>
          <CloseSlotCard closeSlot={text.closeSlot} />
        </div>
        <div className="p-1 md:p-3">
          {block.flow ? <FlowList items={block.flow} /> : null}
          {block.subsections ? <SubsectionList sections={block.subsections} /> : null}
          {block.notes ? (
            <div className="mt-5 space-y-3">
              {block.notes.map((note) => (
                <NoteCard key={`${block.title}-${note.title}-${note.body}`} note={note} />
              ))}
            </div>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article className="max-w-5xl rounded-[24px] border border-white/12 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-5">
      <div className="p-1 md:p-3">
        <h3 className="text-2xl font-semibold leading-tight text-white">{block.title}</h3>
        <div className="mt-4">
          <GuideContent block={block} closeSlot={text.closeSlot} />
        </div>
      </div>
    </article>
  );
}

function SectionHeader({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6aa7ff]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">{title}</h2>
    </div>
  );
}

export function QuickStartContent() {
  const { language, locale, text: translate } = useI18n();
  const [headerChoice, setHeaderChoice] = useState<HeaderChoice | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const headerLabels = {
    download: translate("Download", "Descarcă"),
    signIn: translate("Sign in", "Autentificare"),
    signUp: translate("Sign up for free", "Înscrie-te gratuit"),
  };
  const closeMenus = () => {
    setShowMenu(false);
    setShowResources(false);
  };
  const openChoice = (choice: HeaderChoice) => {
    closeMenus();
    setHeaderChoice(choice);
  };
  const openSelectedApp = (product: "manager" | "player") => {
    setHeaderChoice(null);
    const webUrl = product === "manager" ? managerUrl : playerWebUrl;
    if (/Android/i.test(navigator.userAgent)) {
      const appHostAndPath = product === "manager" ? "login/auth" : "app";
      const appScheme = product === "manager" ? "com.sportme.dashboard" : "ro.sportme.app";
      const playStoreUrl = product === "manager" ? managerPlayStoreUrl : playerPlayStoreUrl;
      window.location.assign(`intent://${appHostAndPath}#Intent;scheme=${appScheme};package=${appScheme};S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`);
      return;
    }
    window.location.assign(webUrl);
  };
  const text = useMemo(() => localizeContent(copy[language === "RO" ? "RO" : "EN"], language), [language]);
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: text.hero.title,
      description: text.hero.subtitle,
      inLanguage: locale,
      url: canonical,
      step: text.setupSteps.map((step) => ({
        "@type": "HowToStep",
        name: step.title,
        text: step.body.join(" "),
      })),
    }),
    [locale, text]
  );

  return (
    <main className="public-site public-dark min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-24 sm:px-5 md:px-8 lg:pb-16 lg:pt-28">
        <nav className="quickstart-nav quickstart-home-nav fixed inset-x-0 top-[env(safe-area-inset-top)] z-50 w-full rounded-none border py-2" aria-label={language === "RO" ? "Navigare principală" : translateDocumentText("Main navigation", language)}>
          <div className="relative mx-auto flex w-full max-w-[1040px] items-center gap-1 px-5 sm:gap-2 sm:px-6">
            <a href="/" className="sportme-sidebar-brand flex shrink-0 items-center gap-1.5 rounded-[10px] px-1.5 py-1.5 sm:gap-2 sm:px-3" aria-label="SportMe">
              <img src="/logo-512.png" alt="" className="h-6 w-6 rounded-[6px] sm:h-7 sm:w-7 sm:rounded-[7px]" />
              <span className="sportme-sidebar-wordmark"><span>sport</span><span className="sportme-sidebar-wordmark-me">me</span></span>
            </a>
            <div className="modern-desktop-links ml-auto hidden items-center gap-1.5 lg:flex">
              <button type="button" onClick={() => openChoice("download")} className="rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">{headerLabels.download}</button>
              <a href={pricingHref} className="rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">{translate("Pricing", "Prețuri")}</a>
              <div className="relative">
                <button type="button" aria-expanded={showResources} onClick={() => setShowResources((value) => !value)} className="flex items-center gap-1.5 rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">{translate("Resources", "Resurse")} <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={`h-3.5 w-3.5 shrink-0 transition-transform ${showResources ? "rotate-180" : ""}`}><path d="m3.5 6 4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
                {showResources ? <div className="modern-menu absolute right-0 top-[calc(100%+10px)] z-30 w-56 overflow-hidden rounded-[18px] border p-2 backdrop-blur-xl"><a href="/manager/quick-start" onClick={closeMenus} className="block rounded-xl px-4 py-3 text-sm transition">{translate("For sports venues", "Pentru baze sportive")}</a><a href="/#pentru-jucatori" onClick={closeMenus} className="block rounded-xl px-4 py-3 text-sm transition">{translate("For players", "Pentru jucători")}</a></div> : null}
              </div>
              <button type="button" onClick={() => openChoice("signIn")} className="rounded-full px-3 py-2 text-base text-[#182032] transition hover:bg-[#e8ecf3]">{headerLabels.signIn}</button>
            </div>
            <div className="ml-auto hidden shrink-0 items-center gap-1.5 lg:ml-0 lg:flex">
              <button type="button" onClick={() => openChoice("signUp")} className="modern-signup inline-flex h-9 items-center justify-center rounded-full border border-[#b8c0c9] bg-white/20 px-2.5 text-[11px] font-normal leading-5 text-[#182032] transition hover:bg-white/70 sm:h-10 sm:px-4 sm:text-base sm:leading-6">{headerLabels.signUp}</button>
            </div>
            <button type="button" onClick={() => setShowMenu((value) => !value)} aria-label={translate("Open menu", "Deschide meniul")} aria-expanded={showMenu} className="modern-mobile-menu ml-auto flex h-9 w-8 shrink-0 items-center justify-center rounded-[7px] transition lg:hidden">
              <span className="flex w-4 flex-col gap-1"><span className="block h-0.5 w-4 rounded-full" /><span className="block h-0.5 w-4 rounded-full" /><span className="block h-0.5 w-4 rounded-full" /></span>
            </button>
            {showMenu ? (
              <div className="modern-menu absolute right-5 top-[calc(100%+12px)] z-30 w-[min(360px,calc(100vw-40px))] overflow-visible rounded-[22px] border p-2 backdrop-blur-xl sm:right-6 lg:hidden">
                <button type="button" onClick={() => openChoice("download")} className="block w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition">{headerLabels.download}</button>
                <a href={pricingHref} onClick={closeMenus} className="block rounded-2xl px-4 py-3 text-base font-medium transition">{translate("Pricing", "Prețuri")}</a>
                <div className="my-1 border-t border-[#d9dee7]" />
                <button type="button" aria-expanded={showResources} onClick={() => setShowResources((value) => !value)} className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">{translate("Resources", "Resurse")} <span aria-hidden="true">{showResources ? "−" : "+"}</span></button>
                {showResources ? <div className="mb-1 ml-3 border-l border-[#d9dee7] pl-2"><a href="/manager/quick-start" onClick={closeMenus} className="block rounded-2xl px-4 py-2.5 text-sm transition">{translate("For sports venues", "Pentru baze sportive")}</a><a href="/#pentru-jucatori" onClick={closeMenus} className="block rounded-2xl px-4 py-2.5 text-sm transition">{translate("For players", "Pentru jucători")}</a></div> : null}
                <button type="button" onClick={() => openChoice("signIn")} className="block w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">{headerLabels.signIn}</button>
                <button type="button" onClick={() => openChoice("signUp")} className="mt-1 block w-full rounded-2xl px-4 py-3 text-left text-base font-medium transition hover:bg-[#e8ecf3]">{headerLabels.signUp}</button>
                <div className="my-1 border-t border-[#d9dee7]" />
                <div className="flex items-center justify-between gap-3 px-4 py-2"><span className="text-sm font-medium text-[#526078]">{translate("Switch language", "Schimbă limba")}</span><LanguageSelector /></div>
              </div>
            ) : null}
          </div>
        </nav>
        <div className="quickstart-language fixed right-5 top-[calc(env(safe-area-inset-top)+18px)] z-[60] hidden lg:block">
          <PublicTopControls hideLanguage={false} />
        </div>

        <section className="mt-8 space-y-14">
          <SectionHeader id="configurare-initiala" eyebrow={text.sections.setupEyebrow} title={text.sections.setupTitle} />
          {text.setupSteps.map((step) => (
            <SetupStepCard key={step.step} step={step} text={text} />
          ))}
          <div className="rounded-[24px] border border-emerald-300/20 bg-emerald-300/[0.08] p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white">{text.sections.setupDoneTitle}</h3>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/72">{text.sections.setupDoneBody}</p>
          </div>
        </section>

        <section className="mt-28 space-y-8">
          <SectionHeader id="rezervari" eyebrow={text.sections.bookingsEyebrow} title={text.sections.bookingsTitle} />
          {text.bookingBlocks.map((block) => (
            <FeatureBlock key={block.title} block={block} text={text} />
          ))}
        </section>

        <section className="mt-28 space-y-8">
          <SectionHeader id="baze-zone" eyebrow={text.sections.locationsEyebrow} title={text.sections.locationsTitle} />
          {text.locationBlocks.map((block) => (
            <FeatureBlock key={block.title} block={block} text={text} />
          ))}
        </section>

        <section className="mt-28 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div id="abonament" className="scroll-mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#6aa7ff]">{text.sections.subscriptionEyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl">{text.sections.subscriptionTitle}</h2>
            <div className="mt-5 space-y-3 text-base leading-7 text-white/72">
              {text.sections.subscriptionBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12">
          <SiteFooter />
        </div>
      </div>
      {headerChoice ? (
        <ProductChoiceModal
          mode="signIn"
          title={headerLabels[headerChoice]}
          onClose={() => setHeaderChoice(null)}
          onSelect={openSelectedApp}
        />
      ) : null}
    </main>
  );
}
