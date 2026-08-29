"use client";

import { useMemo } from "react";
import { useI18n } from "../../app/i18n";
import type { LanguageKey } from "../../app/translations";
import { PublicTopControls } from "../../components/PublicTopControls";
import { SiteFooter } from "../../components/SiteFooter";
import { LightboxImage } from "./LightboxImage";

const description = "Ghid rapid pentru configurarea bazei sportive și gestionarea rezervărilor în SportMe Manager.";
const canonical = "https://www.sportme.ro/manager/quick-start";
const managerUrl = "https://admin.sportme.ro/auth";
const pricingHref = "/#preturi";

type Note = {
  title: "Pont" | "Important" | "Exemplu" | "Explicație" | "Tip" | "Example" | "Explanation";
  body: string;
};

type Subsection = {
  title: string;
  body: string[];
  notes?: Note[];
};

type GuideBlock = {
  title: string;
  image: string;
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
  hero: { eyebrow: string; title: string; subtitle: string; body: string; dashboardAlt: string };
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
  aria: { navigation: string; screenshotSuffix: string; subscriptionAlt: string };
  closeSlot: { title: string; body: string; examples: string };
};

const copy: Record<LanguageKey, QuickStartCopy> = {
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
      dashboardAlt: "Dashboard SportMe Manager",
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
        "În Setări - Abonament poți vedea planul activ, zonele sportive incluse și costul abonamentului.",
        "Freemium: maximum 1 bază sportivă + 1 zonă sportivă.",
        "Premium STARTER: maximum 2 zone sportive.",
        "Premium PRO: zone sportive nelimitate, conform structurii comerciale actuale.",
        "Costul este calculat automat în funcție de configurația contului și poate fi verificat oricând din Setări.",
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
      screenshotSuffix: "screenshot SportMe Manager",
      subscriptionAlt: "Abonament SportMe Manager",
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
        image: "01-date-firma.png",
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
        image: "02-creare-baza.png",
        body: [
          "Adaugă baza sportivă în care funcționează zonele tale rezervabile.",
          "Completează numele bazei sportive și adresa, apoi folosește „Amplasează locația pe hartă” pentru a indica poziția exactă.",
        ],
        notes: [{ title: "Pont", body: "Poziționarea corectă pe hartă îi ajută pe jucători să găsească mai ușor baza sportivă." }],
      },
      {
        step: 3,
        title: "Adaugă prima zonă sportivă",
        image: "03-zona-sportiva.png",
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
        image: "04-program-preturi.png",
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
        image: "05-notificari.png",
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
        image: "06-publicare-baza.png",
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
        image: "07-dashboard.png",
        body: ["După publicarea bazei sportive, pagina Prezentare devine centrul de control pentru activitatea zilnică."],
        bullets: ["Calendar rezervări", "Rezervări viitoare", "Rezervări recente", "Analitice rezervări", "Gradul de ocupare al intervalelor", "Statusuri: Confirmat / În așteptare / Anulat"],
      },
      {
        title: "Creează o rezervare manuală",
        image: "09-rezervare-manuala.png",
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
        image: "09-rezervare-manuala.png",
        body: [
          "Pentru rezervările care se repetă, managerul poate crea automat mai multe rezervări pornind de la aceeași configurație.",
          "SportMe va crea rezervările recurente până la data selectată, în limita disponibilității intervalelor.",
          "Seriile recurente pot fi gestionate și din istoricul rezervărilor, inclusiv pentru rezervările afișate în zona Past, conform opțiunilor disponibile în aplicație.",
        ],
        bullets: ["repetare zilnică", "repetare săptămânală", "repetare lunară", "data de sfârșit a seriei"],
      },
      {
        title: "Aprobă sau respinge o rezervare",
        image: "10-aprobare-rezervare.png",
        body: [
          "Când un jucător trimite o rezervare care necesită confirmare, aceasta apare cu statusul „În așteptare”.",
          "Managerul o poate gestiona direct din calendar sau din pagina „Aprobări în așteptare”.",
          "Din fereastra rezervării poate verifica terenul, data, ora, numele, telefonul și numărul de jucători.",
        ],
        bullets: ["„Aprobă rezervarea” -> rezervarea devine confirmată", "„Respinge” / „Anulează rezervarea” -> cererea este refuzată"],
        notes: [{ title: "Pont", body: "Pentru mai multe cereri folosește pagina „Aprobări în așteptare”." }],
      },
      { title: "Aprobări în așteptare", image: "11-aprobari-in-asteptare.png", body: ["Pagina dedicată pentru aprobări ajută atunci când există mai multe cereri de verificat și vrei să le parcurgi separat de calendar."] },
      {
        title: "Gestionează o rezervare confirmată",
        image: "12-rezervare-confirmata.png",
        body: ["Deschide o rezervare confirmată direct din calendar pentru a vedea toate detaliile."],
        bullets: ["vezi terenul, data și ora", "vezi clientul și telefonul", "vezi numărul de jucători", "trimiți o notificare manuală", "anulezi rezervarea"],
      },
      {
        title: "Notificări manuale",
        image: "13-notificare-manuala.png",
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
        image: "14-baze-zone.png",
        body: ["Din meniul „Baze și zone sportive” poți administra infrastructura disponibilă pentru rezervări."],
        bullets: ["adăuga baze sportive", "edita baze existente", "elimina baze", "publica sau retrage baze din online", "adăuga zone sportive", "edita zone sportive", "șterge zone sportive", "seta zile indisponibile"],
      },
      { title: "Editează baza sportivă", image: "15-editare-baza.png", body: ["Poți modifica numele bazei, adresa, site-ul web, localitatea, județul și poziția pe hartă.", "După modificare se apasă „Salvează”."] },
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
        body: ["Pentru zile în care una sau mai multe zone nu sunt disponibile, folosește „Zile indisponibile”.", "Managerul poate selecta simultan una sau mai multe zone sportive și una sau mai multe date."],
        bullets: ["sărbători", "mentenanță", "competiții", "evenimente private", "închidere temporară"],
        notes: [{ title: "Important", body: "Zilele care sunt deja închise conform programului normal sunt marcate automat și nu trebuie selectate din nou." }],
      },
      {
        title: "Dashboard angajați",
        image: "19-angajati.png",
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
      dashboardAlt: "SportMe Manager dashboard",
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
        "In Settings - Subscription you can see the active plan, included sports areas and subscription cost.",
        "Freemium: maximum 1 sports venue + 1 sports area.",
        "Premium STARTER: maximum 2 sports areas.",
        "Premium PRO: unlimited sports areas, according to the current commercial structure.",
        "The cost is calculated automatically based on the account configuration and can be checked anytime from Settings.",
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
      screenshotSuffix: "SportMe Manager screenshot",
      subscriptionAlt: "SportMe Manager subscription",
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
        image: "01-date-firma.png",
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
        image: "02-creare-baza.png",
        body: ["Add the sports venue that contains your bookable sports areas.", "Enter the venue name and address, then use “Place location on map” to indicate the exact position."],
        notes: [{ title: "Tip", body: "Correct map positioning helps players find the sports venue more easily." }],
      },
      {
        step: 3,
        title: "Add the first sports area",
        image: "03-zona-sportiva.png",
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
        image: "04-program-preturi.png",
        body: ["Set when the sports area is available for bookings and how much each slot costs."],
        bullets: ["operating days", "start time", "end time", "slot duration", "slot price in RON"],
        notes: [{ title: "Example", body: "For a 10:00-20:00 schedule and 60-minute slots, SportMe automatically generates the available booking slots." }, { title: "Tip", body: "Schedule and pricing can be changed later." }],
      },
      {
        step: 5,
        title: "Configure notifications",
        image: "05-notificari.png",
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
        image: "06-publicare-baza.png",
        body: ["Before publishing, check that all steps are complete.", "If everything is correct, press “Publish online”.", "After publishing, the sports venue becomes available in SportMe Player and can receive bookings."],
        notes: [{ title: "Important", body: "The SportMe team may review the information and contact the manager if corrections are needed." }],
      },
    ],
    bookingBlocks: [
      {
        title: "Bookings dashboard",
        image: "07-dashboard.png",
        body: ["After publishing the sports venue, the Overview page becomes the control center for daily activity."],
        bullets: ["Bookings calendar", "Upcoming bookings", "Recent bookings", "Booking analytics", "Slot occupancy", "Statuses: Confirmed / Pending / Cancelled"],
      },
      {
        title: "Create a manual booking",
        image: "09-rezervare-manuala.png",
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
        image: "09-rezervare-manuala.png",
        body: [
          "For repeating bookings, the manager can automatically create multiple bookings based on the same configuration.",
          "SportMe creates the recurring bookings up to the selected end date, subject to slot availability.",
          "Recurring series can also be managed from booking history, including bookings shown in the Past section, according to the options available in the application.",
        ],
        bullets: ["daily recurrence", "weekly recurrence", "monthly recurrence", "an end date for the series"],
      },
      {
        title: "Approve or reject a booking",
        image: "10-aprobare-rezervare.png",
        body: ["When a player sends a booking that requires confirmation, it appears with the “Pending” status.", "The manager can handle it directly from the calendar or from the “Pending approvals” page.", "From the booking window, the manager can check the court, date, time, name, phone number and number of players."],
        bullets: ["“Approve booking” -> the booking becomes confirmed", "“Reject” / “Cancel booking” -> the request is refused"],
        notes: [{ title: "Tip", body: "For multiple requests, use the “Pending approvals” page." }],
      },
      { title: "Pending approvals", image: "11-aprobari-in-asteptare.png", body: ["The dedicated approvals page helps when there are several requests to review and you want to handle them separately from the calendar."] },
      {
        title: "Manage a confirmed booking",
        image: "12-rezervare-confirmata.png",
        body: ["Open a confirmed booking directly from the calendar to see all details."],
        bullets: ["view the court, date and time", "view the customer and phone number", "view the number of players", "send a manual notification", "cancel the booking"],
      },
      {
        title: "Manual notifications",
        image: "13-notificare-manuala.png",
        body: ["The manager can select one of the saved messages and send it through the App or WhatsApp.", "The two default messages remain available, and additional messages added by the manager can also be reused.", "When a confirmed booking is cancelled, the booking is cancelled immediately and that slot becomes “Free” again, so another player can book it."],
        notes: [{ title: "Important", body: "Manual notifications are additional to the automatic notifications configured earlier or from Settings." }],
      },
    ],
    locationBlocks: [
      {
        title: "Sports venues and sports areas",
        image: "14-baze-zone.png",
        body: ["From the “Sports venues and areas” menu, you can manage the infrastructure available for bookings."],
        bullets: ["add sports venues", "edit existing venues", "remove venues", "publish or unpublish venues", "add sports areas", "edit sports areas", "delete sports areas", "set unavailable days"],
      },
      { title: "Edit the sports venue", image: "15-editare-baza.png", body: ["You can change the venue name, address, website, city, county and map position.", "After making changes, press “Save”."] },
      {
        title: "Add or edit a sports area",
        image: "16-editare-zona.png",
        body: ["For each sports area, you can configure its name, sport, available days, schedule, slot duration and price.", "The area can be removed if it is no longer used.", "On days closed to the public, the manager can still create manual bookings, according to the current application behavior."],
      },
      {
        title: "Unavailable days",
        image: "17-zile-indisponibile.png",
        body: ["For days when one or more areas are unavailable, use “Unavailable days”.", "The manager can select one or more sports areas and one or more dates at the same time."],
        bullets: ["holidays", "maintenance", "competitions", "private events", "temporary closure"],
        notes: [{ title: "Important", body: "Days that are already closed according to the normal schedule are marked automatically and do not need to be selected again." }],
      },
      {
        title: "Staff dashboard",
        image: "19-angajati.png",
        body: ["From Settings -> Staff dashboard, you can create separate accounts for team members and control exactly which features and pages they can access in SportMe Manager.", "For each staff member, you can set the name, username and password, then choose the available permissions.", "Created accounts appear in the “Existing accounts” list, where they can be managed later."],
        bullets: ["Create bookings", "Approve / cancel bookings", "Send reminders", "Overview", "Bookings", "Pending approvals", "Sports venues and areas", "Settings"],
        notes: [{ title: "Tip", body: "Give each staff member only the permissions they need for their role." }, { title: "Important", body: "The Staff dashboard feature is available according to the active subscription plan." }],
      },
    ],
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
      : note.title === "Pont" || note.title === "Tip"
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
  const isManualBooking = block.image === "09-rezervare-manuala.png" && block.title !== "Rezervări repetitive" && block.title !== "Recurring bookings";

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

function SetupStepCard({ step, reverse, text }: { step: SetupStep; reverse: boolean; text: QuickStartCopy }) {
  return (
    <article className={`grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center ${reverse ? "lg:[&>div:first-child]:order-2 lg:grid-cols-[1.22fr_0.78fr]" : ""}`}>
      <div>
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#106dff] text-lg font-semibold text-white shadow-[0_16px_32px_rgba(16,109,255,0.28)]">{step.step}</span>
          <h3 className="text-2xl font-semibold leading-tight text-white md:text-3xl">{step.title}</h3>
        </div>
        <div className="mt-5">
          <GuideContent block={step} closeSlot={text.closeSlot} />
        </div>
      </div>
      <Screenshot fileName={step.image} alt={`${step.title} - ${text.aria.screenshotSuffix}`} priority={step.step === 1} />
    </article>
  );
}

function FeatureBlock({ block, index, text }: { block: GuideBlock; index: number; text: QuickStartCopy }) {
  const isManualBooking = block.image === "09-rezervare-manuala.png" && block.subsections;

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
          <Screenshot fileName={block.image} alt={`${block.title} - ${text.aria.screenshotSuffix}`} />
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
    <article className={`grid gap-7 rounded-[24px] border border-white/12 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center ${index % 2 === 1 ? "lg:[&>div:first-child]:order-2 lg:grid-cols-[1.22fr_0.78fr]" : ""}`}>
      <div className="p-1 md:p-3">
        <h3 className="text-2xl font-semibold leading-tight text-white">{block.title}</h3>
        <div className="mt-4">
          <GuideContent block={block} closeSlot={text.closeSlot} />
        </div>
      </div>
      <Screenshot fileName={block.image} alt={`${block.title} - ${text.aria.screenshotSuffix}`} />
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
  const { language } = useI18n();
  const text = copy[language];
  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: text.hero.title,
      description,
      inLanguage: language === "EN" ? "en-GB" : "ro-RO",
      url: canonical,
      step: text.setupSteps.map((step) => ({
        "@type": "HowToStep",
        name: step.title,
        text: step.body.join(" "),
        image: `https://www.sportme.ro${imageSrc(step.image)}`,
      })),
    }),
    [language, text]
  );

  return (
    <main className="public-site public-dark min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-12 pt-4 sm:px-5 md:px-8 lg:pb-16 lg:pt-5">
        <div className="flex justify-end">
          <PublicTopControls showBack backLabel="← sportme.ro" />
        </div>

        <header className="pt-6 md:pt-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_0.94fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#6aa7ff]">{text.hero.eyebrow}</p>
              <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.05] text-white md:text-5xl">{text.hero.title}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-7 text-white/82 md:text-xl md:leading-8">{text.hero.subtitle}</p>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/64">{text.hero.body}</p>
            </div>
            <div className="justify-self-end rounded-[24px] border border-white/12 bg-white/[0.06] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:max-w-[640px]">
              <Screenshot fileName="07-dashboard.png" alt={text.hero.dashboardAlt} priority />
            </div>
          </div>
        </header>

        <nav className="sticky top-3 z-40 mt-7 flex flex-wrap gap-2 rounded-[20px] border border-white/10 bg-[#07101d]/82 p-2 shadow-[0_18px_42px_rgba(0,0,0,0.2)] backdrop-blur-xl" aria-label={text.aria.navigation}>
          {text.navigation.map((item) => (
            <a key={item.href} href={item.href} className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-white/78 transition hover:border-[#2f82ff]/70 hover:bg-[#106dff]/18 hover:text-white sm:text-sm">
              {item.label}
            </a>
          ))}
        </nav>

        <section className="mt-8 rounded-[24px] border border-white/12 bg-white/[0.06] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:px-6 md:py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/46">{text.intro.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{text.intro.title}</h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-white/72">{text.intro.body}</p>
          <div className="mt-4 rounded-[18px] border border-[#2f82ff]/30 bg-[#106dff]/12 px-5 py-3 text-base font-semibold text-white">{text.intro.callout}</div>
        </section>

        <section className="mt-24 space-y-14">
          <SectionHeader id="configurare-initiala" eyebrow={text.sections.setupEyebrow} title={text.sections.setupTitle} />
          {text.setupSteps.map((step, index) => (
            <SetupStepCard key={step.image} step={step} reverse={index % 2 === 1} text={text} />
          ))}
          <div className="rounded-[24px] border border-emerald-300/20 bg-emerald-300/[0.08] p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-white">{text.sections.setupDoneTitle}</h3>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/72">{text.sections.setupDoneBody}</p>
          </div>
        </section>

        <section className="mt-28 space-y-8">
          <SectionHeader id="rezervari" eyebrow={text.sections.bookingsEyebrow} title={text.sections.bookingsTitle} />
          {text.bookingBlocks.map((block, index) => (
            <FeatureBlock key={`${block.title}-${block.image}`} block={block} index={index} text={text} />
          ))}
        </section>

        <section className="mt-28 space-y-8">
          <SectionHeader id="baze-zone" eyebrow={text.sections.locationsEyebrow} title={text.sections.locationsTitle} />
          {text.locationBlocks.map((block, index) => (
            <FeatureBlock key={block.image} block={block} index={index} text={text} />
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
            <a href={pricingHref} className="mt-6 inline-flex rounded-full border border-white/14 bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#2f82ff]/70 hover:bg-[#106dff]/18">
              {text.sections.subscriptionCta}
            </a>
          </div>
          <Screenshot fileName="18-abonament.png" alt={text.aria.subscriptionAlt} />
        </section>

        <section className="mt-24 rounded-[24px] border border-white/12 bg-white/[0.06] p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8">
          <h2 className="text-3xl font-semibold text-white">{text.finalCta.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/72">{text.finalCta.body}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={managerUrl} className="inline-flex items-center justify-center rounded-full border border-[#106dff] bg-[#106dff] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(16,109,255,0.3)] transition hover:bg-[#2f82ff]">
              {text.finalCta.manager}
            </a>
            <a href={pricingHref} className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/[0.08] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.12]">
              {text.finalCta.pricing}
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
