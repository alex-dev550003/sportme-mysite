import AboutDeferredSections from "./AboutDeferredSections";

// Keep public product, pricing and footer content in the initial HTML.
// Crawlers and section links must not depend on scrolling to discover content.
export function AboutDeferredLoader() {
  return (
    <div id="sectiunea-2" className="about-dark-section w-full px-5 py-12 lg:pb-16 lg:pt-8">
      <AboutDeferredSections />
    </div>
  );
}
