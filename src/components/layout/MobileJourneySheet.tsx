import { Flag, Landmark, Menu, Route, Scale, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { JourneyStep, JourneyStepId } from "@/types/trail";

const iconMap = {
  landmark: Landmark,
  scale: Scale,
  route: Route,
  users: Users,
  flag: Flag,
};

interface MobileJourneySheetProps {
  activeNavLabel: string;
  activeStepId: JourneyStepId;
  navLinks: Array<{
    href: string;
    journeyStepId?: JourneyStepId;
    label: string;
  }>;
  onNavigate: (navLabel: string, journeyStepId?: JourneyStepId) => void;
  steps: JourneyStep[];
}

const navLabelByStepId: Record<JourneyStepId, string> = {
  "before-removal": "The Lands",
  "the-law": "The Law",
  "the-route": "The Route",
  "the-human-cost": "The Human Cost",
  conclusion: "Conclusion",
};

export function MobileJourneySheet({
  activeNavLabel,
  activeStepId,
  navLinks,
  onNavigate,
  steps,
}: MobileJourneySheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-11 gap-2 border-white/15 bg-white/10 px-4 text-stone-50 hover:bg-white/15 xl:hidden"
        >
          <Menu className="h-4 w-4" />
          Menu
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="max-w-[22rem] bg-[#142420]/98 p-5 sm:max-w-sm">
        <SheetHeader className="pr-10">
          <p className="section-kicker text-stone-400">Navigation</p>
          <SheetTitle>Open the journey, the sections, and the route notes in one place.</SheetTitle>
          <SheetDescription>
            On phones and tablets, this menu keeps the full project within reach without squeezing
            the map and timeline into a desktop layout.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="mt-6 h-[calc(100vh-12.5rem)] pr-3">
          <div className="space-y-6">
            <div>
              <p className="section-kicker text-[0.64rem] text-stone-400">Quick jump</p>
              <div className="mt-3 grid gap-2">
                {navLinks.map((link) => {
                  const isActive = link.label === activeNavLabel;

                  return (
                    <SheetClose key={link.label} asChild>
                      <a
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => onNavigate(link.label, link.journeyStepId)}
                        className={`rounded-[1.1rem] border px-4 py-3 text-sm transition ${
                          isActive
                            ? "border-white/14 bg-white/14 text-white"
                            : "border-white/8 bg-white/[0.04] text-stone-200"
                        }`}
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="section-kicker text-[0.64rem] text-stone-400">Journey guide</p>
              <p className="mt-2 text-sm leading-6 text-stone-300">
                Use this menu on smaller screens to keep the map tied to policy, detention,
                logistics, resistance, and the human cost of removal.
              </p>
            </div>

            <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon];
              const isActive = step.id === activeStepId;
              const stepLink = navLinks.find((link) => link.journeyStepId === step.id);
              const href = stepLink?.href ?? "#route";
              const navLabel = navLabelByStepId[step.id];

              return (
                <SheetClose
                  key={step.id}
                  asChild
                >
                  <a
                    href={href}
                    onClick={() => onNavigate(navLabel, step.id)}
                    className={`block rounded-[1.5rem] border px-4 py-4 ${
                      isActive
                        ? "border-white/12 bg-white/12"
                        : "border-white/8 bg-white/[0.04] text-stone-200"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
                          {index + 1}
                        </p>
                        <h3 className="mt-2 font-display text-2xl text-white">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-stone-300">{step.description}</p>
                      </div>
                    </div>
                  </a>
                </SheetClose>
              );
            })}
            </div>

            <div className="rounded-[1.6rem] border border-white/8 bg-[#101a18] p-5">
              <p className="font-display text-2xl italic leading-8 text-stone-100">
                "This was not a migration by choice. It was policy carried out through pressure,
                detention, transport, and force."
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-stone-400">
                Mobile reading note
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-300">
                Rotate to landscape for a wider view of the trails, then scroll below the map for
                the route panel, the swipeable timeline, the sources, and the feedback form.
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
