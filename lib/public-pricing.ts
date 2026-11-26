type StorePrices = { googlePlay: string; appStore: string; note: string };

const prices = {
  googlePlay: { ron: "28,80", eur: "4,80" },
  appStore: { ron: "28,49", eur: "4,79" },
} as const;

export function getManagerPremiumPrices(language: string): StorePrices {
  const { googlePlay, appStore } = prices;
  if (language === "RO") {
    return {
      googlePlay: `Google Play (achiziții noi): ${googlePlay.ron} lei/lună în România sau ${googlePlay.eur} €/lună în țările cu tarif în euro.`,
      appStore: `App Store (tarife salvate): ${appStore.ron} lei/lună în România sau ${appStore.eur} €/lună în țările cu tarif în euro. Versiunea iOS este în evaluare la Apple.`,
      note: "Prețul local apare în magazin înainte de confirmarea achiziției.",
    };
  }

  const decimal = (amount: string) => amount.replace(",", ".");
  return {
    googlePlay: `Google Play (new purchases): RON ${decimal(googlePlay.ron)}/month in Romania or €${decimal(googlePlay.eur)}/month in countries priced in euros.`,
    appStore: `App Store (saved prices): RON ${decimal(appStore.ron)}/month in Romania or €${decimal(appStore.eur)}/month in countries priced in euros. The iOS version is under Apple review.`,
    note: "The local price appears in the store before you confirm your purchase.",
  };
}

export function getManagerPremiumFaq(language: string) {
  const { googlePlay, appStore, note } = getManagerPremiumPrices(language);
  return {
    question: language === "RO" ? "Cât costă SportMe Manager Premium?" : "How much does SportMe Manager Premium cost?",
    answer: [googlePlay, appStore, note].join(" "),
  };
}
