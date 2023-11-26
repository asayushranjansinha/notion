// Importing necessary modules and components
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

// Creating a Poppins font instance with specified configurations
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

// Defining the Logo component
function Logo() {
  // Returning the JSX for the Logo component
  return (
    <Button
      variant="ghost"
      className="hidden md:flex items-center gap-x-1 py-2"
    >
      {/* Logo Image */}
      <Image src="/logo-light.png" height="40" width="40" alt="Logo" />

      {/* Logo Text */}
      <p className={cn("font-semibold text-primary dark:text-white", font.className)}>
        Note Nirvana
      </p>
    </Button>
  );
}

export default Logo; // Exporting the Logo component as the default export
