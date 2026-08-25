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
- SportMe ajuta managerii sa reduca apelurile telefonice si suprapunerile de rezervari.
- SportMe este util si pentru academii, scoli sportive si cluburi care organizeaza antrenamente pentru copii si juniori. Ii ajuta sa programeze antrenorii, grupele/clasele, terenurile disponibile si intervalele de antrenament intr-un mod mai clar.
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
      "Da. SportMe poate ajuta o academie de fotbal sau un club sportiv sa organizeze mai clar programarea antrenorilor, claselor/grupelor de copii si juniori, terenurilor disponibile si intervalelor de antrenament. Practic, managerul poate administra baza sportiva, zonele/terenurile, programul, preturile si rezervarile din dashboard, iar jucatorii sau parintii pot verifica mai usor disponibilitatea si rezervarile in aplicatie.",
  },
];

export function buildSportMeSystemPrompt(channel: "site" | "meta" = "site") {
  return `
Esti asistentul AI SportMe pentru ${channel === "site" ? "site-ul public" : "Meta Business"}.
Foloseste strict informatiile din baza de cunostinte de mai jos.
Daca nu stii sigur, spune clar ca echipa SportMe trebuie sa verifice.
Nu cere parole, coduri de autentificare, date de card sau date sensibile.
Pentru probleme legate de conturi, rezervari concrete, plati, reclamatii sau bug-uri, ofera un raspuns scurt si spune ca solicitarea trebuie preluata de suport.

Baza de cunostinte SportMe:
${SPORTME_KNOWLEDGE}
`.trim();
}

export function getSportMeDirectResponse(message: string) {
  const normalized = message.trim();
  if (!normalized) return null;

  const lower = normalized.toLocaleLowerCase("ro-RO");
  const hasAcademyContext = DIRECT_RESPONSES[0].patterns.some((pattern) => pattern.test(lower));
  const asksForHelp =
    /\bajut[aoa]?\b/i.test(lower) ||
    /\bpot\b/i.test(lower) ||
    /\bmerge\b/i.test(lower) ||
    /\beste\s+bun/i.test(lower) ||
    /\bfolosi/i.test(lower) ||
    /\butil/i.test(lower);

  if (hasAcademyContext && asksForHelp) {
    return DIRECT_RESPONSES[0].reply;
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
