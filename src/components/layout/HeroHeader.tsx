import { motion } from "framer-motion";

import { MobileJourneySheet } from "@/components/layout/MobileJourneySheet";
import { Badge } from "@/components/ui/badge";
import type { JourneyStep } from "@/types/trail";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "The Law", href: "#journey" },
  { label: "The Lands", href: "#route" },
  { label: "The Route", href: "#route", active: true },
  { label: "The Human Cost", href: "#impact" },
  { label: "Conclusion", href: "#conclusion" },
  { label: "Sources", href: "#sources" },
];

interface HeroHeaderProps {
  journeySteps: JourneyStep[];
}

export function HeroHeader({ journeySteps }: HeroHeaderProps) {
  return (
    <header
      id="home"
      className="relative overflow-hidden border-b border-white/8 bg-[#0f1a18] text-stone-50"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,28,24,0.82),rgba(11,18,17,0.72)),radial-gradient(circle_at_20%_20%,rgba(195,143,53,0.22),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(91,65,170,0.14),transparent_18%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.2)_0.55px,transparent_0.55px)] [background-size:16px_16px]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

      <div className="relative mx-auto max-w-[1720px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <Badge className="border-white/12 bg-white/10 text-stone-100">
              Interactive historical atlas
            </Badge>
            <h1 className="mt-4 font-display text-[clamp(3rem,8vw,6.2rem)] leading-[0.92] tracking-tight text-white">
              Removal by Design
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-base leading-7 text-stone-200/92 sm:text-lg">
              A more cinematic read of the Trail of Tears: layered routes, shifting geography,
              and the policies that pushed the Cherokee, Choctaw, Chickasaw, Creek, and Seminole
              nations west.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-stone-200">
                Editorial timeline
              </div>
              <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-stone-200">
                Interactive route atlas
              </div>
              <div className="rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.28em] text-stone-200">
                Five Nations
              </div>
            </div>
          </motion.div>

          <div className="flex items-start gap-4">
            <MobileJourneySheet steps={journeySteps} />

            <nav className="hidden max-w-[42rem] flex-wrap justify-end gap-x-6 gap-y-3 text-sm text-stone-200 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative pb-2 transition hover:text-white ${
                    link.active ? "text-white" : "text-stone-300"
                  }`}
                >
                  {link.label}
                  {link.active ? (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#d6b36c]" />
                  ) : null}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
