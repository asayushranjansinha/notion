// PublicLayout component definition
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // Apply a dark background color to the entire layout
    <div className="h-full dark:bg-[#1F1F1F]">{children}</div>
  );
};

// Export the PublicLayout component as the default export
export default PublicLayout;
