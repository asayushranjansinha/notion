// Importing necessary modules and components
"use client";

// Convex-related imports
import { api } from "@/convex/_generated/api"; // Importing Convex API
import { Id } from "@/convex/_generated/dataModel"; // Importing Convex dataModel
import { useQuery } from "convex/react"; // Importing Convex useQuery hook

// Next.js-related imports
import { useParams } from "next/navigation"; // Importing Next.js useParams hook

// Lucide-react icons
import { MenuIcon } from "lucide-react"; // Importing Lucide MenuIcon

// Internal components
import { Banner } from "./Banner"; // Importing internal Banner component
import { Menu } from "./Menu"; // Importing internal Menu component
import Publish from "./Publish"; // Importing internal Publish component
import { Title } from "./Title"; // Importing internal Title component

// Defining the NavbarProps interface
interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

// Defining the Navbar component
function Navbar({ isCollapsed, onResetWidth }: NavbarProps) {
  // Using Next.js useParams hook to get parameters
  const params = useParams();

  // Using Convex useQuery hook to fetch document data
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  // Conditional rendering based on document status
  if (document === undefined) {
    // Skeleton loading state when document data is still loading
    return (
      <nav className="bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full flex items-center gap-x-4">
        <Title.Skeleton />
        <div className="flex items-center justify-between gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    // If document is not found, return null (no rendering)
    return null;
  }

  // Rendering the actual Navbar component JSX
  return (
    <>
      <nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          // MenuIcon for collapsed state with onClick handler to reset width
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}

        <div className="flex items-center justify-between w-full">
          {/* Title component displaying document title */}
          <Title initialData={document} />

          <div className="flex items-center gap-x-2">
            {/* Publish component for document publishing */}
            <Publish initialData={document} />
            {/* Menu component for additional actions */}
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>

      {/* Displaying Banner component if document is archived */}
      {document?.isArchived && <Banner documentId={document._id} />}
    </>
  );
}

// Exporting the Navbar component as default
export default Navbar;
