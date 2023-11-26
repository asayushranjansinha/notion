// Importing necessary modules and components
"use client";
import { useMutation, useQuery } from "convex/react";  // Importing Convex hooks
import dynamic from "next/dynamic";  // Importing dynamic from Next.js
import { useMemo } from "react";  // Importing useMemo from React

import { api } from "@/convex/_generated/api";  // Importing Convex API
import { Id } from "@/convex/_generated/dataModel";  // Importing dataModel types

// Importing components related to the DocumentIdPage
import { Toolbar } from "@/components/Toolbar";
import { Cover } from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";

// Defining the DocumentIdPageProps interface
interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

// Defining the DocumentIdPage component
const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  // Dynamically loading the Editor component
  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );

  // Using the useQuery hook to fetch document data
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  // Using the useMutation hook for updating document data
  const update = useMutation(api.documents.update);

  // Handling changes in the document content
  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content: content,
    });
  };

  // Rendering loading skeleton if document data is undefined
  if (document === undefined) {
    return (
      <div>
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

  // Rendering "Not found" message if document data is null
  if (document === null) {
    return <div>Not found</div>;
  }

  // Rendering the main content with Cover, Toolbar, and Editor components
  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default DocumentIdPage;  // Exporting the DocumentIdPage component as the default export
