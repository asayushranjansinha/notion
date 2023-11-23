"use client";

// External libraries
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// External icons
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";

// Internal modules
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

// Internal components
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// External hooks
import { useUser } from "@clerk/clerk-react";

interface ItemProps {
  active?: boolean;
  documentIcon?: string;
  expanded?: boolean;
  icon: LucideIcon;
  id?: Id<"documents">;
  isSearch?: boolean;
  label: string;
  level?: number;
  onExpand?: () => void;
  onClick?: () => void;
}

export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const { user } = useUser();

  // Define a function to handle the creation of a new document
  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Stop event propagation to prevent unnecessary parent event handling
    event.stopPropagation();

    // If the 'id' is not available, do nothing
    if (!id) return;

    // Create a new document with a default title and the specified parent document ID
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        // If the 'expanded' state is not set, trigger the 'onExpand' callback (if provided)
        if (!expanded) {
          onExpand?.();
        }
        // TODO: Uncomment the line below to navigate to the newly created document using a router
        // router.push(`/documents/${documentId}`);
      }
    );

    // Display a toast notification based on the promise result
    toast.promise(promise, {
      loading: "Creating a new note...", // Display loading message during document creation
      success: "New note created!", // Display success message when the document is created successfully
      error: "Failed to create a new note.", // Display error message if document creation fails
    });
  };

  // Define a function to handle the archiving of a note
  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Stop event propagation to prevent unnecessary parent event handling
    event.stopPropagation();

    // If the 'id' is not available, do nothing
    if (!id) return;

    // Archive the note by calling the 'archive' function with the specified document ID
    const promise = archive({ id });

    // Display a toast notification based on the promise result
    toast.promise(promise, {
      loading: "Moving to trash...", // Display loading message during the archiving process
      success: "Note moved to trash!", // Display success message when the note is successfully archived
      error: "Failed to archive note.", // Display error message if archiving fails
    });
  };

  // Define a function to handle the expansion of a document
  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Stop event propagation to prevent unnecessary parent event handling
    event.stopPropagation();

    // Trigger the 'onExpand' callback (if provided)
    onExpand?.();
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          {/* Dropdown Menu for additional actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <p className="text-sm text-muted-foreground p-2">
                Last Edited By: {user?.fullName}
              </p>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Create new document button */}
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
