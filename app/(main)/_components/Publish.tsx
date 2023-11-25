"use client";

// React
import { useState } from "react";

// Convex
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

// Hooks and Api endpoints
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";

// Lucide Icons
import { Check, Copy, Globe } from "lucide-react";

// UI Components
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Interface for props passed to the Publish component
interface PublishProps {
  initialData: Doc<"documents">;
}

// Publish component definition
export default function Publish({ initialData }: PublishProps) {
  // Custom hook to get the origin of the application
  const origin = useOrigin();

  // Mutation hook for updating document data
  const update = useMutation(api.documents.update);

  // State for tracking copy success
  const [copied, setCopied] = useState(false);

  // State for tracking form submission/loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // URL for the published note
  const url = `${origin}/preview/${initialData._id}`;

  // Function to handle publishing a note
  const onPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    // Toast notification for publishing
    toast.promise(promise, {
      loading: "Publishing Note",
      success: "Note Published!",
      error: "Failed to Publish",
    });
  };

  // Function to handle unpublishing a note
  const onUnPublish = () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    // Toast notification for unpublishing
    toast.promise(promise, {
      loading: "UnPublishing Note",
      success: "Note UnPublished!",
      error: "Failed to UnPublish",
    });
  };

  // Function to copy the note URL to the clipboard
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    // Reset copied state after a short delay
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  // JSX for rendering the Publish button and popover
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {/* Conditional rendering based on whether the note is published or not */}
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-400 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-sky-500">
                This note is live on the web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                value={url}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this Note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
