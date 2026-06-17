import { PublicTopControls } from "./PublicTopControls";
import { SiteFooter } from "./SiteFooter";

export type SeoFaqItem = {
  question: string;
  answer: string;
};

type SeoContentPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  sections: Array<{
    eyebrow?: string;
    title: string;
    body?: string;
    items?: string[];
    orderedItems?: string[];
  }>;
  faqGroups: Array<{
    title: string;
    items: SeoFaqItem[];
  }>;
  links: Array<{
    label: string;
    href: string;
  }>;
  showStoreCta?: boolean;
};

export function SeoContentPage({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  sections,
  faqGroups,
  links,
  showStoreCta = false,
}: SeoContentPageProps) {
  return (
    <main className="public-site public-dark min-h-screen text-white">
      <div className="relative overflow-hidden">
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-5 sm:space-y-8 sm:px-5 sm:py-6 lg:space-y-10 lg:py-10">
          <div className="flex justify-end">
            <PublicTopControls showBack />
          </div>

          <header className="rounded-[28px] border border-[#d8d1bf] bg-white/80 px-6 py-8 shadow-[0_24px_60px_-40px_rgba(32,33,31,0.7)] backdrop-blur lg:px-8 lg:py-10">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-[#7a7566]">{eyebrow}</p>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">{title}</h1>
              <p className="text-base leading-7 text-[#5b564b] sm:text-lg">{description}</p>
              {(primaryCta || secondaryCta) ? (
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  {primaryCta ? (
                    <a
                      href={primaryCta.href}
                      className="inline-flex items-center justify-center rounded-full border border-[#1877F2] bg-[#1877F2] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-[#0f6de5]"
                    >
                      {primaryCta.label}
                    </a>
                  ) : null}
                  {secondaryCta ? (
                    <a
                      href={secondaryCta.href}
                      className="inline-flex items-center justify-center rounded-full border border-[#d8d1bf] bg-white px-6 py-3 text-sm font-semibold text-[#1f211f] transition hover:-translate-y-0.5"
                    >
                      {secondaryCta.label}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </header>

          {showStoreCta ? (
            <section className="grid gap-4 md:grid-cols-2">
              <a
                href="https://play.google.com/store/apps/details?id=ro.sportme.app"
                className="rounded-[24px] border border-[#d8d1bf] bg-white p-5 text-center text-base font-semibold text-[#1f211f] shadow-[0_25px_50px_-40px_rgba(32,33,31,0.6)] transition hover:-translate-y-0.5"
              >
                Descarcă aplicația din Google Play
              </a>
              <a
                href="https://www.sportme.ro/app"
                className="rounded-[24px] border border-[#d8d1bf] bg-white p-5 text-center text-base font-semibold text-[#1f211f] shadow-[0_25px_50px_-40px_rgba(32,33,31,0.6)] transition hover:-translate-y-0.5"
              >
                Descarcă aplicația din App Store
              </a>
            </section>
          ) : null}

          <section className="grid gap-5 md:grid-cols-2">
            {sections.map((section) => (
              <article key={section.title} className="rounded-[28px] border border-[#d8d1bf] bg-white p-6 shadow-[0_25px_50px_-40px_rgba(32,33,31,0.6)]">
                {section.eyebrow ? <p className="text-xs uppercase tracking-[0.25em] text-[#7a7566]">{section.eyebrow}</p> : null}
                <h2 className="mt-2 text-2xl font-semibold text-[#1f211f]">{section.title}</h2>
                {section.body ? <p className="mt-3 text-sm leading-6 text-[#5b564b]">{section.body}</p> : null}
                {section.items ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <div key={item} className="rounded-2xl border border-[#e6e0d2] bg-[#f1f2f4] p-4 text-sm font-semibold text-[#1f211f]">
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}
                {section.orderedItems ? (
                  <ol className="mt-5 space-y-3">
                    {section.orderedItems.map((item, index) => (
                      <li key={item} className="flex gap-3 rounded-2xl border border-[#e6e0d2] bg-[#f1f2f4] p-4 text-sm text-[#5b564b]">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-xs font-semibold text-white">{index + 1}</span>
                        <span className="pt-1 font-semibold text-[#1f211f]">{item}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </article>
            ))}
          </section>

          <section className="rounded-[28px] border border-[#d8d1bf] bg-white p-6 shadow-[0_25px_50px_-40px_rgba(32,33,31,0.6)] lg:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7a7566]">Întrebări frecvente</p>
            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              {faqGroups.map((group) => (
                <div key={group.title}>
                  <h2 className="text-xl font-semibold text-[#1f211f]">{group.title}</h2>
                  <div className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <details key={item.question} className="rounded-2xl border border-[#e6e0d2] bg-[#f1f2f4] p-4">
                        <summary className="cursor-pointer text-sm font-semibold text-[#1f211f]">{item.question}</summary>
                        <p className="mt-3 text-sm leading-6 text-[#5b564b]">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#d8d1bf] bg-white p-6 shadow-[0_25px_50px_-40px_rgba(32,33,31,0.6)]">
            <p className="text-xs uppercase tracking-[0.25em] text-[#7a7566]">Linkuri utile</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="rounded-full border border-[#d8d1bf] bg-white px-4 py-2 text-sm font-semibold text-[#1d5f63] underline transition hover:-translate-y-0.5">
                  {link.label}
                </a>
              ))}
            </div>
          </section>

          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
