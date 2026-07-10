import { motion } from "framer-motion";
import { Flag, Landmark, Route, Scale, Users } from "lucide-react";

import {
  journeyGuideDescription,
  journeyGuideTitle,
  journeyGuideYears,
  journeyQuote,
  journeyQuoteAttribution,
  journeyQuoteSourceUrl,
} from "@/data/trailData";
import { cn } from "@/lib/utils";
import type { JourneyStep, JourneyStepId } from "@/types/trail";

const iconMap = {
  landmark: Landmark,
  scale: Scale,
  route: Route,
  users: Users,
  flag: Flag,
};

interface JourneySidebarProps {
  activeStepId: JourneyStepId;
  steps: JourneyStep[];
  className?: string;
}

export function JourneySidebar({ steps, className }: JourneySidebarProps) {
  return (
    <aside id="journey" className={cn("lg:sticky lg:top-6 lg:h-fit", className)}>
      <div className="paper-panel overflow-hidden rounded-[2rem] p-6">
        <div className="rounded-[1.6rem] border border-stone-400/18 bg-[#152722] px-5 py-6 text-stone-50 shadow-[0_14px_36px_rgba(20,28,24,0.22)]">
          <p className="section-kicker text-stone-300">The Journey</p>
          <h2 className="mt-3 font-display text-4xl leading-none">{journeyGuideTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-stone-200/88">{journeyGuideDescription}</p>
          <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-stone-200">
            {journeyGuideYears}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];

            return (
              <motion.div
                key={step.id}
                id={step.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.45 }}
                className="scroll-mt-8 rounded-[1.55rem] border border-stone-400/14 bg-white/54 px-4 py-4 transition hover:bg-white/68"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-400/20 bg-white/85 text-stone-700">
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                      {index + 1}
                    </p>
                    <h3 className="mt-2 font-display text-[1.65rem] leading-none text-stone-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-700">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-5 rounded-[1.6rem] border border-stone-400/14 bg-[linear-gradient(180deg,rgba(237,229,213,0.96),rgba(233,223,204,0.92))] p-5">
          <p className="font-display text-[1.55rem] italic leading-8 text-stone-900">
            {journeyQuote}
          </p>
          <p className="mt-4 text-sm leading-6 text-stone-700">{journeyQuoteAttribution}</p>
          <a
            href={journeyQuoteSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-sm font-medium text-stone-700 underline decoration-stone-400 underline-offset-4 transition hover:text-stone-950"
          >
            Read the full message
          </a>
        </div>
      </div>
    </aside>
  );
}
