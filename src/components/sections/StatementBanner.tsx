import { motion } from "framer-motion";
import { ArrowDown, BookOpenText, Compass, Landmark } from "lucide-react";

import { trailRoutes } from "@/data/trailData";

const sourceLabelOverrides: Record<string, string> = {
  "cherokee.org": "Cherokee Nation",
  "chickasaw.net": "Chickasaw Nation",
  "choctawnation.com": "Choctaw Nation",
  "ftking.org": "Fort King Heritage Foundation",
  "muscogeenation.com": "The Muscogee Nation",
  "nps.gov": "National Park Service",
  "sno-nsn.gov": "The Seminole Nation of Oklahoma",
};

function getSourceSiteKey(url: string) {
  return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
}

function getSourceSiteHomePage(url: string) {
  const parsed = new URL(url);

  return `${parsed.protocol}//${parsed.hostname}/`;
}

function getSourceSiteLabel(siteKey: string, fallbackLabel: string) {
  return (
    sourceLabelOverrides[siteKey] ??
    fallbackLabel
      .replace(/:\s.*$/, "")
      .replace(/\s+(History|Historical Documents|Removal)$/i, "")
      .trim()
  );
}

export function StatementBanner() {
  const routeSources = trailRoutes.flatMap((route) => route.sources);
  const sourceCountsBySite = routeSources.reduce((counts, source) => {
    const siteKey = getSourceSiteKey(source.url);

    counts.set(siteKey, (counts.get(siteKey) ?? 0) + 1);
    return counts;
  }, new Map<string, number>());

  const sources = Array.from(
    new Map(
      routeSources.map((source) => {
        const siteKey = getSourceSiteKey(source.url);
        const useHomePage = (sourceCountsBySite.get(siteKey) ?? 0) > 1;
        const normalizedSource = useHomePage
          ? {
              label: getSourceSiteLabel(siteKey, source.label),
              url: getSourceSiteHomePage(source.url),
            }
          : source;

        return [normalizedSource.url, normalizedSource] as const;
      }),
    ).values(),
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="overflow-hidden rounded-[2rem] bg-[#11211d] text-stone-100 shadow-[0_24px_60px_rgba(18,26,22,0.28)]"
    >
      <div className="grid gap-px bg-white/8 xl:grid-cols-[1.1fr_0.9fr_0.8fr]">
        <div id="impact" className="bg-[#11211d] p-6 sm:p-8">
          <p className="section-kicker text-stone-400">The Human Cost</p>
          <h3 className="mt-4 max-w-xl font-display text-4xl leading-none text-white sm:text-5xl">
            Every line on the map stands in for waiting, hunger, pressure, grief, and rebuilding.
          </h3>
          <p className="mt-5 max-w-xl text-sm leading-7 text-stone-300 sm:text-base">
            The routes on this page mark only the visible spine of a much larger story: stockades,
            confiscated homelands, military escort, disease, weather, disrupted families, and the
            long work of reconstituting community in the west.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-[#d5b471]">
            <Landmark className="h-4 w-4" />
            <span>Read routes as infrastructure of policy</span>
          </div>
        </div>

        <div id="conclusion" className="bg-[#132620] p-6 sm:p-8">
          <p className="section-kicker text-stone-400">Conclusion</p>
          <h3 className="mt-4 max-w-lg font-display text-3xl leading-none text-white sm:text-4xl">
            The map is only the surface. The system behind it matters just as much.
          </h3>
          <div className="mt-5 space-y-4">
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
              <div className="flex items-center gap-3 text-[#d5b471]">
                <Compass className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.26em]">Routes differ</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-300">
                Each nation encountered removal through different corridors, logistics, seasons,
                and forms of violence. Similar policy did not produce identical experience.
              </p>
            </div>

            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
              <div className="flex items-center gap-3 text-[#d5b471]">
                <BookOpenText className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.26em]">Read critically</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-300">
                Law, treaty pressure, and military enforcement formed one system. The map shows
                where people were forced to move, but not every camp, detachment, delay, death, or
                act of resistance.
              </p>
            </div>

            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
              <div className="flex items-center gap-3 text-[#d5b471]">
                <Compass className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.26em]">Look beyond the endpoint</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-300">
                Arrival in Indian Territory did not close the story. Nations still had to rebuild
                government, kin networks, and daily life after coerced relocation.
              </p>
            </div>
          </div>
        </div>

        <div id="sources" className="bg-[#10201c] p-6 sm:p-8">
          <p className="section-kicker text-stone-400">Sources</p>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            These references ground the project in tribal, federal, and public-history sources
            used across the routes. Repeated sites are listed once at the home-page level to keep
            the bibliography cleaner.
          </p>
          <div className="mt-5 space-y-3 text-sm leading-6 text-stone-300">
            {sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-[1.2rem] border border-white/8 bg-white/[0.04] px-4 py-3 transition hover:bg-white/[0.08]"
              >
                {source.label}
              </a>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 text-[#d5b471]">
            <ArrowDown className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em]">
              Project by Riley Griffin : CC1030660
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
