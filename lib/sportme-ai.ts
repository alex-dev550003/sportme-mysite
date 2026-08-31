export type SportMeChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SPORTME_KNOWLEDGE = `
SportMe este platforma pentru rezervari terenuri sportive si management pentru baze sportive.

Public/jucatori:
- Aplicatia pentru jucatori este la https://app.sportme.ro/app.
- Jucatorii pot cauta baze sportive, vedea disponibilitatea, face rezervari si primi notificari.
- Contul de jucator este gratuit.
- Pentru probleme de cont, rezervare lipsa, anulare sau plati, agentul trebuie sa trimita utilizatorul catre suport uman.

Manageri/baze sportive:
- Dashboard-ul manager este la https://admin.sportme.ro.
- Managerii pot administra baze, terenuri/zone sportive, program, preturi si rezervari.
- La rezervarea manuala, pretul slotului este completat implicit din tariful configurat, dar managerul il poate modifica inainte de salvare; pentru intervalele cu durata personalizata, SportMe poate calcula automat pretul in functie de durata aleasa.
- In pagina Rezervari, managerul poate crea o rezervare cu alt interval decat cel default, ajustabil in pasi de 15 minute prin optiunea de durata personalizata/custom_duration_minutes, daca disponibilitatea permite.
- Managerii pot crea rezervari manuale si rezervari repetitive/recurente pornind de la aceeasi configuratie.
- Rezervarile repetitive pot fi setate pe zi, saptamana sau luna si au data de sfarsit a seriei; SportMe creeaza automat rezervarile recurente in limita disponibilitatii intervalelor.
- Managerii pot gestiona seriile recurente din istoricul rezervarilor, inclusiv pentru rezervari afisate in zona Past, conform optiunilor disponibile in aplicatie.
- Notificarile automate includ 2 mesaje default, iar managerii pot adauga si alte mesaje preferate ca sa refoloseasca rapid texte proprii pentru reguli de acces, echipament, parcare sau alte instructiuni.
- SportMe ajuta managerii sa reduca apelurile telefonice si suprapunerile de rezervari.
- SportMe este util si pentru academii, scoli sportive si cluburi care organizeaza antrenamente pentru copii si juniori. Ii ajuta sa programeze antrenorii, grupele/clasele, terenurile disponibile si intervalele de antrenament intr-un mod mai clar.
- SportMe Manager include rezervari viitoare si recente, calendar rezervari, aprobari in asteptare, notificari automate si manuale, zile indisponibile, dashboard angajati si administrarea bazelor/zonelor sportive.
- Freemium permite listare de baza cu functionalitati limitate.
- Premium STARTER costa 8,90 EUR/luna si este potrivit pentru baze mici.
- Premium PRO costa 14,90 EUR/luna si este potrivit pentru baze cu mai multe zone sportive.
- Exista trial gratuit de 90 zile pentru Premium, daca eligibilitatea contului permite.

Canale si contact:
- Utilizatorul poate intreba despre Facebook, Instagram, WhatsApp sau chat-ul de pe site.
- Agentul nu are acces direct la conturi, rezervari, plati sau baza de date in aceasta versiune.
- Pentru solicitari care cer verificari reale, date personale, plati, reclamatii sau interventii pe cont, agentul spune ca transmite catre echipa SportMe.

Stil:
- Raspunde scurt, clar si prietenos.
- Raspunsul trebuie sa aiba maxim 1-2 propozitii sau 2 bullets scurte.
- Raspunde strict la ce intreaba utilizatorul; nu copia fraze intregi din ghid si nu enumera functionalitati neintrebate.
- Raspunde in limba utilizatorului, romana implicit.
- Nu inventa preturi, reguli, disponibilitati, locatii sau statusuri.
- Nu promite rezolvarea unei probleme tehnice fara verificare umana.
`.trim();

const DIRECT_RESPONSES: Array<{
  patterns: RegExp[];
  reply: string;
}> = [
  {
    patterns: [
      /\bpre[tț][a-zăâîșşțţ]*\s+(default|implicit)/i,
      /\btarif[a-zăâîșşțţ]*\s+(default|implicit)/i,
      /\bmodific[aă]\s+pre[tț]/i,
      /\bschimb[aă]\s+pre[tț]/i,
    ],
    reply:
      "Da. La o rezervare manuala, pretul default este completat automat din tariful configurat, dar il poti modifica inainte de salvare.",
  },
  {
    patterns: [
      /\bdurat[ae]\s+personalizat/i,
      /\bcustom[_\s-]?duration/i,
      /\b15\s*min/i,
      /\balt\s+interval/i,
      /\binterval\s+(diferit|personalizat)/i,
    ],
    reply:
      "Da. In SportMe Manager poti alege o durata personalizata in pasi de 15 minute, iar pretul se poate calcula in functie de durata aleasa.",
  },
  {
    patterns: [
      /\bnotific[aă]ri?\s+automat/i,
      /\bmesaje?\s+(default|preferat)/i,
      /\bmesaje?\s+automat/i,
    ],
    reply:
      "Da. SportMe Manager include 2 mesaje automate default, iar managerul poate adauga mesaje preferate pentru reutilizare rapida.",
  },
  {
    patterns: [
      /\bacadem/i,
      /\bclub/i,
      /\bscoal[ae]\s+sportiv/i,
      /\bfotbal/i,
      /\bcopii\b/i,
      /\bjuniori\b/i,
      /\bantrenor/i,
      /\bgrup[ae]\b/i,
      /\bclase\b/i,
    ],
    reply:
      "Da. SportMe poate ajuta academiile sau cluburile sa organizeze antrenori, grupe, terenuri si intervale intr-un singur dashboard.",
  },
  {
    patterns: [
      /\brezerv[aă]r[^\s]*\s+repet/i,
      /\brepetat[aă]?(?:\s+la|\s+o)?\b/i,
      /\brepet[aă]\b/i,
      /\brecuren/i,
      /\brepet[^\s]*\s+(zilnic|saptamanal|s[aă]pt[aă]m[aâ]nal|lunar)/i,
      /\bweekly\b/i,
      /\bmonthly\b/i,
      /\bdaily\b/i,
    ],
    reply:
      "Da. SportMe Manager suporta rezervari recurente zilnic, saptamanal sau lunar, pana la data de sfarsit aleasa si in limita disponibilitatii.",
  },
];

export function buildSportMeSystemPrompt(channel: "site" | "meta" = "site") {
  return `
Esti asistentul AI SportMe pentru ${channel === "site" ? "site-ul public" : "Meta Business"}.
Foloseste strict informatiile din baza de cunostinte de mai jos.
Daca nu stii sigur, spune clar ca echipa SportMe trebuie sa verifice.
Nu cere parole, coduri de autentificare, date de card sau date sensibile.
Pentru probleme legate de conturi, rezervari concrete, plati, reclamatii sau bug-uri, ofera un raspuns scurt si spune ca solicitarea trebuie preluata de suport.
Raspunde in maxim 1-2 propozitii scurte.
Extrage doar informatia ceruta din baza de cunostinte; nu copia paragrafe si nu adauga optiuni neintrebate.
Cand intrebarea cere o confirmare, incepe cu Da sau Nu si adauga o singura clarificare utila.

Baza de cunostinte SportMe:
${SPORTME_KNOWLEDGE}
`.trim();
}

export function getSportMeDirectResponse(message: string) {
  const normalized = message.trim();
  if (!normalized) return null;

  const lower = normalized.toLocaleLowerCase("ro-RO");
  const priceResponse = DIRECT_RESPONSES[0];
  const durationResponse = DIRECT_RESPONSES[1];
  const notificationResponse = DIRECT_RESPONSES[2];
  const academyResponse = DIRECT_RESPONSES[3];
  const recurringResponse = DIRECT_RESPONSES[4];
  const hasPriceContext = priceResponse.patterns.some((pattern) => pattern.test(lower));
  const hasDurationContext = durationResponse.patterns.some((pattern) => pattern.test(lower));
  const hasNotificationContext = notificationResponse.patterns.some((pattern) => pattern.test(lower));
  const hasAcademyContext = academyResponse.patterns.some((pattern) => pattern.test(lower));
  const hasRecurringContext = recurringResponse.patterns.some((pattern) => pattern.test(lower));
  const asksForHelp =
    /\bajut[aoa]?\b/i.test(lower) ||
    /\bpot\b/i.test(lower) ||
    /\bmerge\b/i.test(lower) ||
    /\beste\s+bun/i.test(lower) ||
    /\bfolosi/i.test(lower) ||
    /\butil/i.test(lower) ||
    /\bare\b/i.test(lower) ||
    /\bexist[ae]\b/i.test(lower) ||
    /\bsuport/i.test(lower);

  if (hasPriceContext) {
    return priceResponse.reply;
  }

  if (hasDurationContext) {
    return durationResponse.reply;
  }

  if (hasNotificationContext) {
    return notificationResponse.reply;
  }

  if (hasRecurringContext) {
    return recurringResponse.reply;
  }

  if (hasAcademyContext && asksForHelp) {
    return academyResponse.reply;
  }

  return null;
}

export function sanitizeChatMessages(messages: unknown): SportMeChatMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message): message is SportMeChatMessage => {
      if (!message || typeof message !== "object") return false;
      const entry = message as { role?: unknown; content?: unknown };
      return (entry.role === "user" || entry.role === "assistant") && typeof entry.content === "string";
    })
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 1200),
    }))
    .filter((message) => message.content.length > 0)
    .slice(-8);
}
