"use client";
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import {Navigation} from "./_components/Navigation";
import { SearchCommand } from "@/components/SearchCommand";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
        <Navigation />
      <main className="h-full flex-1 overflow-y-auto">
        <SearchCommand />
        {children}</main>
    </div>
  );
};

export default MainLayout;