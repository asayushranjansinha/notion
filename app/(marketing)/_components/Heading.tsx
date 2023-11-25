// Importing necessary modules and components
"use client";

// Utility and styling imports
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Authentication and external library imports
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { Poppins } from "next/font/google";

// Creating a Poppins font instance with specified configurations
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

// Defining the Heading component
function Heading() {
  // Using authentication hook from Convex
  const { isAuthenticated, isLoading } = useConvexAuth();

  // Returning the JSX for the Heading component
  return (
    <div className={cn("max-w-3xl space-y-4", font.className)}>
      {/* Heading section */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        <span className="underline">Note Nirvana: </span> <br /> Where Your
        Ideas Ascend.
      </h1>

      {/* Subheading section */}
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        From chaos to clarity: Your notes find peace in Note Nirvana.
      </h3>

      {/* Loading spinner section */}
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}

      {/* Authenticated user section */}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Your Nirvana Starts Here.
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}

      {/* Unauthenticated user section */}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Your Nirvana Starts Here.
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default Heading; // Exporting the Heading component as the default export
