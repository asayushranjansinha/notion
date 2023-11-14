"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function Heading() {
  return (
    <div className={cn("max-w-3xl space-y-4", font.className)}>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        <span className="underline">Note Nirvana</span>: <br /> Unleash
        Creativity, Stay Organized.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        From chaos to clarity: Your notes find peace in Note Nirvana.
      </h3>
      <Button>
        Enter Note Nirvana
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}

export default Heading;
