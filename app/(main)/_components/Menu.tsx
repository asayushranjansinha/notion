// Importing necessary modules and components
"use client";

// Convex-related imports
import { Id } from "@/convex/_generated/dataModel";  // Importing Convex dataModel
import { useMutation } from "convex/react";  // Importing Convex useMutation hook
import { api } from "@/convex/_generated/api";  // Importing Convex API

// Next.js-related imports
import { useRouter } from "next/navigation";  // Importing Next.js useRouter hook

// Clerk-related imports
import { useUser } from "@clerk/clerk-react";  // Importing useUser hook from Clerk

// UI components and utility imports
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";  // Importing DropdownMenu components
import { toast } from "sonner";  // Importing Sonner toast for notifications
import { Button } from "@/components/ui/button";  // Importing Button component
import { MoreHorizontal, Trash } from "lucide-react";  // Importing Lucide icons
import { Skeleton } from "@/components/ui/skeleton";  // Importing Skeleton component

// Defining the MenuProps interface
interface MenuProps {
  documentId: Id<"documents">;
}

// Defining the Menu component
export const Menu = ({ documentId }: MenuProps) => {
  // Using Next.js useRouter hook
  const router = useRouter();

  // Using Clerk useUser hook
  const { user } = useUser();

  // Using Convex useMutation hook for document archiving
  const archive = useMutation(api.documents.archive);

  // Define a function to handle the archiving of a document
  const onArchive = () => {
    // Archive the document by calling the 'archive' function with the specified document ID
    const promise = archive({ id: documentId });

    // Display a toast notification based on the promise result
    toast.promise(promise, {
      loading: "Moving to trash...", // Display loading message during the archiving process
      success: "Moved to trash!", // Display success message when the document is successfully archived
      error: "Failed to move", // Display error message if archiving fails
    });

    // Redirect to the documents page after archiving
    router.push("/documents");
  };

  // Rendering the Menu component JSX
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xm text-muted-foreground p-2">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Adding Skeleton functionality to the Menu component
Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10"></Skeleton>;
};
