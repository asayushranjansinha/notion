// Importing necessary modules and components
"use client";

// Sonner utility for toasts
import { toast } from "sonner";

// Next.js components and hooks
import Image from "next/image";
import { useRouter } from "next/navigation";

// Lucide icons
import { PlusCircle } from "lucide-react";

// Clerk authentication hook
import { useUser } from "@clerk/clerk-react";

// Convex hooks and API
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// Custom UI components
import { Button } from "@/components/ui/button";

// Defining the DocumentsPage component
function DocumentsPage() {
  // Using the useUser and useRouter hooks
  const { user } = useUser();
  const router = useRouter();

  // Using the useMutation hook for creating a new document
  const create = useMutation(api.documents.create);

  // Handling the creation of a new document
  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    // Displaying a toast message based on the promise status
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created!",
      error: "Failed to create a new note.",
    });
  };

  // Returning the JSX for the DocumentsPage component
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      {/* Empty Image */}
      <Image src="/empty.png" alt="Empty" height="300" width="300" priority />

      {/* Welcome Message */}
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notes
      </h2>

      {/* Create a Note Button */}
      <Button onClick={handleCreate} className="text-white">
        <PlusCircle className="h-4 w-4 mr-2" /> <span>Create a note</span>
      </Button>
    </div>
  );
}

export default DocumentsPage; // Exporting the DocumentsPage component as the default export
