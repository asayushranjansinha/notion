// Import necessary components and hooks
"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { SingleImageDropzone } from "@/components/SingleImageDropZone";
import { useCoverImage } from "@/hooks/use-cover-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

// CoverImageModal component
export const CoverImageModal = () => {
  // Get document ID from the route parameters
  const params = useParams();
  
  // Get cover image details and update function from hooks
  const coverImage = useCoverImage();
  const update = useMutation(api.documents.update);

  // Destructure values from the edgestore hook
  const { edgestore } = useEdgeStore();

  // State to store the selected file and submission status
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle file change and submission
  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      // Upload the file to the publicFiles using edgestore
      let res;
      if (coverImage.url) {
        res = await edgestore.publicFiles.upload({
          file,
          options: {
            replaceTargetUrl: coverImage.url,
          },
        });
      } else {
        res = await edgestore.publicFiles.upload({ file });
      }

      // Update the document with the new cover image URL
      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      // Close the modal
      onClose();
    }
  };

  // Function to handle modal closure
  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  // Return the Dialog structure with the modal content
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        {/* SingleImageDropzone for selecting an image */}
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
