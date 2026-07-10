import { motion } from "framer-motion";

import { MobileJourneySheet } from "@/components/layout/MobileJourneySheet";
import { Badge } from "@/components/ui/badge";
import type { JourneyStep, JourneyStepId } from "@/types/trail";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "The Law", href: "#the-law", journeyStepId: "the-law" as JourneyStepId },
  { label: "The Lands", href: "#before-removal", journeyStepId: "before-removal" as JourneyStepId },
  { label: "The Route", href: "#route", journeyStepId: "the-route" as JourneyStepId },
  { label: "The Human Cost", href: "#impact", journeyStepId: "the-human-cost" as JourneyStepId },
  { label: "Conclusion", href: "#conclusion", journeyStepId: "conclusion" as JourneyStepId },
  { label: "Sources", href: "#sources", journeyStepId: "conclusion" as JourneyStepId },
];

interface HeroHeaderProps {
  activeNavLabel: string;
  activeStepId: JourneyStepId;
  journeySteps: JourneyStep[];
  onNavigate: (navLabel: string, journeyStepId?: JourneyStepId) => void;
}

export function HeroHeader({
  activeNavLabel,
  activeStepId,
  journeySteps,
  onNavigate,
}: HeroHeaderProps) {
  return (
    <header
      id="home"
      className="relative overflow-hidden border-b border-white/8 bg-[#0f1a18] text-stone-50"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,28,24,0.84),rgba(9,15,14,0.78)),radial-gradient(circle_at_18%_18%,rgba(195,143,53,0.26),transparent_28%),radial-gradient(circle_at_84%_22%,rgba(91,65,170,0.14),transparent_18%),radial-gradient(circle_at_58%_80%,rgba(45,88,72,0.2),transparent_24%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.2)_0.55px,transparent_0.55px)] [background-size:16px_16px]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(7,11,10,0.34))]" />

      <div className="relative mx-auto w-full max-w-[1920px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10 2xl:px-12">
        <div className="mb-5 flex items-center justify-between gap-4 xl:hidden">
          <MobileJourneySheet
            activeNavLabel={activeNavLabel}
            activeStepId={activeStepId}
            navLinks={navLinks}
            onNavigate={onNavigate}
            steps={journeySteps}
          />

          <div className="rounded-full border border-white/12 bg-white/8 px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-stone-200">
            {activeNavLabel}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-6xl"
          >
            <Badge className="border-white/12 bg-white/10 text-stone-100">
              Interactive historical atlas
            </Badge>
            <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6.2rem)] leading-[0.92] tracking-tight text-white">
              Removal by Design
            </h1>
            <p className="mt-4 max-w-4xl text-pretty text-base leading-7 text-stone-200/92 sm:text-lg">
              A route-by-route account of the Trail of Tears: not one march, but five overlapping removals shaped by law, military force, 
              detention, weather, rivers, and survival.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-stone-200">
                Five Nations
              </div>
              <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-stone-200">
                Linked map and timeline
              </div>
              <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-stone-200">
                Human cost in focus
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
