// Importing necessary modules and components
import Footer from "./_components/Footer";
import Heading from "./_components/Heading";
import Heroes from "./_components/Heroes";

// Defining the MarketingPage component
const MarketingPage = () => {
  // Returning the JSX for the MarketingPage component
  return (
    <div className="min-h-full flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col items-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 dark:text-white">
        {/* Heading Component */}
        <Heading />

        {/* Heroes Component */}
        <Heroes />
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default MarketingPage; // Exporting the MarketingPage component as the default export
