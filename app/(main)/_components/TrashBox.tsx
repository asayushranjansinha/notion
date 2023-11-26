// React and Next.js
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Convex
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

// Lucide Icons
import { Search, Trash, Undo } from "lucide-react";

// Sonner (Toast library) and UI Components
import { toast } from "sonner";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";

// TrashBox component definition
function TrashBox() {
  // Next.js router and params
  const router = useRouter();
  const params = useParams();

  // Convex queries and mutations
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  // Local state for search functionality
  const [search, setSearch] = useState("");

  // Filter documents based on search input
  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  // Event handler to navigate to a document
  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  // Event handler to restore a document
  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring note",
      success: "Note Restored",
      error: "Failed to restore",
    });
  };

  // Event handler to remove a document
  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting note",
      success: "Note Deleted",
      error: "Failed to Delete",
    });

    // Redirect to documents page if the currently viewed document is deleted
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  // JSX for rendering the TrashBox component
  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="px-1 pb-1 mt-2 max-h-80 overflow-y-auto">
        <p className="hidden last:block text-xs text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(event) => onRestore(event, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-secondary"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-secondary"
                  role="button"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrashBox;
