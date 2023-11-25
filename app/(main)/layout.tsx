// Importing necessary modules and components
"use client";

// React and Next.js imports
import React from "react";
import { redirect } from "next/navigation";

// Convex authentication and spinner component imports
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";

// Navigation and SearchCommand component imports
import { Navigation } from "./_components/Navigation";
import { SearchCommand } from "@/components/SearchCommand";

// Defining the MainLayout component
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // Using authentication hook from Convex
  const { isAuthenticated, isLoading } = useConvexAuth();

  // Loading state check
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // Redirecting to home if not authenticated
  if (!isAuthenticated) {
    return redirect("/");
  }

  // Returning the JSX for the MainLayout component
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      {/* Navigation Component */}
      <Navigation />

      {/* Main Content */}
      <main className="h-full flex-1 overflow-y-auto">
        {/* SearchCommand Component */}
        <SearchCommand />

        {/* Child Components */}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;  // Exporting the MainLayout component as the default export
