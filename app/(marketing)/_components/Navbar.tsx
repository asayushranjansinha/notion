// Importing necessary modules and components
"use client";

// Style and utility imports
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import Link from "next/link";

// Authentication-related imports
import { SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

// Custom hooks and components imports
import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";


// Defining the Navbar component
function Navbar() {
  // Using custom hooks and authentication hook from Convex
  const scrolled = useScrollTop(); // Tracking the scroll position
  const { isAuthenticated, isLoading } = useConvexAuth(); // Checking authentication status and loading state

  // Returning the JSX for the Navbar component
  return (
    <div
      // Applying dynamic classNames based on scroll position and theme
      className={cn(
        "bg-background z-50 fixed top-0 flex items-center w-full p-6",
        scrolled &&
          "border-b border-muted transition ease-linear duration-200"
      )}
    >
      <Logo /> {/* Rendering the Logo component */}
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 dark:text-white">
        {isLoading && <Spinner />}{" "}
        {/* Showing a spinner while authentication is in progress */}
        {!isAuthenticated && !isLoading && (
          // Displaying Sign In and Sign Up buttons if not authenticated
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Find Your Nirvana</Button>
            </SignUpButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          // Displaying Home and UserButton components if authenticated
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Home</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle /> {/* Rendering the theme toggle component */}
      </div>
    </div>
  );
}

export default Navbar; // Exporting the Navbar component as the default export
