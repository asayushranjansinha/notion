"use client"
// Import necessary modules and components
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";

// Define the error component
export default function ErrorPage() {
  return (
    // Container for error page content
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      {/* Display an error image */}
      <Image src={"/error.png"} alt="Error" height={300} width={300} />
      
      {/* Display an error message */}
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      
      {/* Button to go back to the "/documents" page using Next.js Link */}
      <Button asChild>
        <Link href={"/documents"}>Go back</Link>
      </Button>
    </div>
  );
}
