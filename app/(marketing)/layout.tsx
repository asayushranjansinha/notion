// Importing necessary modules and components
import Navbar from "./_components/Navbar";

// Defining the MarketingLayout component
const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  // Returning the JSX for the MarketingLayout component
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <main className="h-full pt-40">{children}</main>
    </div>
  );
};

export default MarketingLayout;  // Exporting the MarketingLayout component as the default export
