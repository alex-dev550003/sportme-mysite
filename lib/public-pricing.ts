export type PublicMonthlyPrice = { amount: string; currency: string };

const currencyDisplay: Record<string, { symbol: string; before?: boolean }> = {
  RON: { symbol: "RON" },
  EUR: { symbol: "€" },
  PLN: { symbol: "zł" },
  HUF: { symbol: "Ft" },
  CZK: { symbol: "Kč" },
  DKK: { symbol: "kr" },
  SEK: { symbol: "kr" },
  NOK: { symbol: "kr" },
  ISK: { symbol: "kr" },
  CHF: { symbol: "CHF" },
  GBP: { symbol: "£", before: true },
  TRY: { symbol: "₺", before: true },
};

const countryPrices: Record<string, PublicMonthlyPrice> = {
  RO: { amount: "12,99", currency: "RON" },
  PL: { amount: "12,99", currency: "PLN" },
  HU: { amount: "999", currency: "HUF" },
  CZ: { amount: "69,99", currency: "CZK" },
  DK: { amount: "19,99", currency: "DKK" },
  SE: { amount: "32,99", currency: "SEK" },
  NO: { amount: "29,99", currency: "NOK" },
  IS: { amount: "399", currency: "ISK" },
  CH: { amount: "2,99", currency: "CHF" },
  LI: { amount: "2,99", currency: "CHF" },
  GB: { amount: "2,49", currency: "GBP" },
  TR: { amount: "149,99", currency: "TRY" },
};

const euroPrice: PublicMonthlyPrice = { amount: "2,99", currency: "EUR" };

const timeZoneCountries: Record<string, string> = {
  "Europe/Bucharest": "RO",
  "Europe/Warsaw": "PL",
  "Europe/Budapest": "HU",
  "Europe/Prague": "CZ",
  "Europe/Copenhagen": "DK",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Atlantic/Reykjavik": "IS",
  "Europe/Zurich": "CH",
  "Europe/Vaduz": "LI",
  "Europe/London": "GB",
  "Europe/Istanbul": "TR",
};

// The public site uses the visitor's country cookie set by middleware. Countries
// outside the specified list use the euro price until a local price is defined.
// Browser time zone is only a fallback for local development or missing IP data.
export function getPublicMonthlyPremiumPrice(country: string | null | undefined, timeZone?: string): PublicMonthlyPrice {
  const resolvedCountry = country?.toUpperCase() ?? timeZoneCountries[timeZone ?? ""];
  return countryPrices[resolvedCountry ?? ""] ?? euroPrice;
}

export function formatPublicMonthlyPrice(amount: string, currency: string): string {
  const display = currencyDisplay[currency] ?? { symbol: currency };
  return display.before ? `${display.symbol}${amount}` : `${amount} ${display.symbol}`;
}
