// PublicLayout component definition
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // Apply a dark background color to the entire layout
    <div className="h-full">{children}</div>
  );
};

// Export the PublicLayout component as the default export
export default PublicLayout;
