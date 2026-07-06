import { Flag, Landmark, Route, Scale, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
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
  activeStepId: JourneyStepId;
  steps: JourneyStep[];
}

export function MobileJourneySheet({ activeStepId, steps }: MobileJourneySheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-white/15 bg-white/10 text-stone-50 hover:bg-white/15 lg:hidden"
        >
          Journey Guide
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="pr-10">
          <p className="section-kicker text-stone-400">The Journey</p>
          <SheetTitle>Follow the route with context, not just coordinates.</SheetTitle>
          <SheetDescription>
            Use this guide while exploring the map to keep the geography tied to policy,
            confinement, and the human cost of removal.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="mt-6 h-[calc(100vh-13rem)] pr-3">
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon];
              const isActive = step.id === activeStepId;

              return (
                <div
                  key={step.id}
                  className={`rounded-[1.5rem] border px-4 py-4 ${
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
                </div>
              );
            })}

            <div className="rounded-[1.6rem] border border-white/8 bg-[#101a18] p-5">
              <p className="font-display text-2xl italic leading-8 text-stone-100">
                "This was not a migration. It was a policy carried out through routes, detention,
                and force."
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-stone-400">
                Map reading note
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
