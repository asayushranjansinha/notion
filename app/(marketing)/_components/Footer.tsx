// React import
import React from "react";

// Component imports
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react"; // Importing the Heart icon from Lucid icons

// Defining the Footer component
function Footer() {
  // Returning the JSX for the Footer component
  return (
    <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-background">
      {/* Logo */}
      <Logo />

      {/* Button container with Lucid icons */}
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        {/* Privacy Policy Button */}
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>

        {/* todo: Heart icon with text */}

        {/* Terms & Conditions Button */}
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
}

export default Footer; // Exporting the Footer component as the default export
