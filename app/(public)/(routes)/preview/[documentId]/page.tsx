"use client";

// React and Convex
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// Convex API and data model
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// UI Components
import { Cover } from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Toolbar } from "@/components/Toolbar";

// Interface for DocumentIdPageProps
interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

// Dynamic import of the Editor component to enable client-side rendering
const Editor = useMemo(() => dynamic(() => import("@/components/Editor"), { ssr: false }), []);

// DocumentIdPage component definition
const DocumentIdPage = ({
  params,
}: DocumentIdPageProps) => {
  // Fetch document data based on the documentId
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  // Mutation for updating document content
  const update = useMutation(api.documents.update);

  // Callback for handling content changes in the editor
  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  // Loading state: If document data is still being fetched
  if (document === undefined) {
    return (
      <div>
        {/* Display a loading skeleton for the cover and document details */}
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  // Error state: If the document is not found
  if (document === null) {
    return <div>Not found</div>;
  }

  // Render the DocumentIdPage with cover, toolbar, and editor
  return (
    <div className="pb-40">
      {/* Display the cover image */}
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        {/* Display the toolbar for the document */}
        <Toolbar preview initialData={document} />
        {/* Display the editor with read-only content */}
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;