// External module imports
import Image from "next/image";

// Defining the Heroes component
function Heroes() {
  // Returning the JSX for the Heroes component
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      {/* Image container */}
      <div className="flex items-center">
        {/* Responsive image container with Next.js Image component */}
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image
            src="/documents.png"
            fill
            className="object-contain"
            alt="Documents"
          />
        </div>
      </div>
    </div>
  );
}

export default Heroes;  // Exporting the Heroes component as the default export
