import { motion } from "framer-motion";
import { BookOpenText, Landmark } from "lucide-react";

import favicon from "../../../assets/favicon.png";
import { trailRoutes } from "@/data/trailData";

export function StatementBanner() {
  const routeSources = trailRoutes.flatMap((route) => route.sources);
  const sources = Array.from(new Map(routeSources.map((source) => [source.url, source])).values());

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
          <p className="mt-4 max-w-xl text-sm leading-7 text-stone-300">
            Enslaved people also traveled with Cherokee detachments. For Black Seminoles, removal
            west brought the additional danger of kidnapping and re-enslavement.
          </p>
          <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#d5b471]">
            <a
              href="https://www.nps.gov/articles/000/trail-of-tears-at-pea-ridge-national-military-park.htm"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-[#d5b471]/60 underline-offset-4 transition hover:text-white"
            >
              Cherokee evidence
            </a>
            <a
              href="https://www.nps.gov/articles/000/black-seminole-indian-scouts.htm"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-[#d5b471]/60 underline-offset-4 transition hover:text-white"
            >
              Black Seminole history
            </a>
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm uppercase tracking-[0.24em] text-[#d5b471]">
            <Landmark className="h-4 w-4" />
            <span>Read routes as infrastructure of policy</span>
          </div>
        </div>

        <div id="conclusion" className="bg-[#132620] p-6 sm:p-8">
          <p className="section-kicker text-stone-400">Conclusion</p>
          <h3 className="mt-4 max-w-lg font-display text-3xl leading-none text-white sm:text-4xl">
            The map shows movement. The system behind it matters just as much.
          </h3>
          <div className="mt-5 space-y-4">
            <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.04] p-4">
              <div className="flex items-center gap-3 text-[#d5b471]">
                <BookOpenText className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.26em]">Read critically</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-stone-300">
                Each nation encountered removal through different corridors and forms of violence,
                but law, treaty pressure, and military enforcement formed one system. The map cannot
                show every camp, delay, death, act of resistance, or the rebuilding that followed.
              </p>
            </div>
          </div>
        </div>

        <div id="sources" className="bg-[#10201c] p-6 sm:p-8">
          <p className="section-kicker text-stone-400">Sources</p>
          <p className="mt-4 text-sm leading-7 text-stone-300">
            These direct references ground the project in tribal, federal, and public-history
            sources used to identify the routes and their historical context.
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

          <div className="mt-6 text-[#d5b471]">
            <div className="flex items-center gap-3">
              <img
                src={favicon}
                alt=""
                aria-hidden="true"
                className="h-5 w-5 rounded-sm object-contain"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                Project by Riley Griffin : CC1030660
              </span>
            </div>
            <a
              href="https://www.linkedin.com/in/riley-griffin-a6a4b3b1"
              target="_blank"
              rel="noreferrer"
              className="mt-3 ml-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-300 transition hover:text-white"
            >
              <span
                aria-hidden="true"
                className="flex h-4 w-4 items-center justify-center rounded-[0.16rem] bg-[#0a66c2] text-[0.65rem] font-black lowercase leading-none text-white"
              >
                in
              </span>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
