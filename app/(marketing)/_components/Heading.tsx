"use client";

import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className={cn("max-w-3xl space-y-4", font.className)}>
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        <span className="underline">Note Nirvana</span>: <br /> Unleash
        Creativity, Stay Organized.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        From chaos to clarity: Your notes find peace in Note Nirvana.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Note Nirvana
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Your Nirvana Free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Heading;
