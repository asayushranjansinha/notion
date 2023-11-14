import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function Logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image src="/logo-light.png" height="40" width="40" alt="Logo" />

      <p className={cn("font-semibold text-blue-500", font.className)}>Note Nirvana</p>
    </div>
  );
}

export default Logo;
