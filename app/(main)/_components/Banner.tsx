// Importing necessary modules and components
"use client";

// Custom components
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";

// Convex-related imports
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

// Next.js related imports
import { useRouter } from "next/navigation";

// Sonner for toasts
import { toast } from "sonner";

// Defining the BannerProps interface
interface BannerProps {
  documentId: Id<"documents">;
}

// Defining the Banner component
export const Banner = ({ documentId }: BannerProps) => {
  // Using the useRouter hook
  const router = useRouter();

  // Using the useMutation hook for removing and restoring documents
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  // Handling the removal of a document
  const onRemove = () => {
    const promise = remove({ id: documentId });

    // Displaying a toast message based on the promise status
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note",
    });

    // Redirecting to the documents page
    router.push("/documents");
  };

  // Handling the restoration of a document
  const onRestore = () => {
    const promise = restore({ id: documentId });

    // Displaying a toast message based on the promise status
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note",
    });
  };

  // Rendering the Banner component JSX
  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 jc">
      <p>This page in the trash</p>

      {/* Restore Button */}
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>

      {/* Delete Forever Button with ConfirmModal */}
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
