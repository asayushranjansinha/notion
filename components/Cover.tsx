// Importing necessary modules and components
"use client";

// Utility functions
import { cn } from "@/lib/utils";

// Next.js components
import Image from "next/image";
import { Button } from "./ui/button";

// Icons
import { ImageIcon, X } from "lucide-react";

// Custom hooks
import { useCoverImage } from "@/hooks/use-cover-image";
import { useMutation } from "convex/react";

// Convex API and data model
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// Next.js utility for handling URL parameters
import { useParams } from "next/navigation";

// EdgeStore and Skeleton component
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "@/components/ui/skeleton";

// Defining the props for the Cover component
interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

// Cover component
export const Cover = ({ url, preview }: CoverImageProps) => {
  // Fetching parameters from the URL
  const params = useParams();

  // Using the EdgeStore and CoverImage hooks
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();

  // Using the Convex mutation for removing cover image
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  // Handling the removal of the cover image
  const onRemove = async () => {
    if (url) {
      // Deleting the public file associated with the URL
      await edgestore.publicFiles.delete({
        url: url,
      });
    }

    // Removing the cover image using Convex mutation
    removeCoverImage({
      id: params.documentId as Id<"documents">,
    });
  };

  // Rendering the cover image component
  return (
    <div
      className={cn(
        "relative w-full h-[35vh] md:h-[45vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}

      {/* Conditional rendering for buttons when not in preview mode */}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          {/* Button to change the cover image */}
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>

          {/* Button to remove the cover image */}
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

// Skeleton component for rendering a loading state
Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
