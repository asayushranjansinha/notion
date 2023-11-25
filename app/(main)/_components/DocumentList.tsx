// Importing necessary modules and components
"use client";
import { useParams, useRouter } from "next/navigation";  // Importing Next.js hooks
import { useState } from "react";  // Importing useState hook from React
import { useQuery } from "convex/react";  // Importing Convex useQuery hook
import { FileIcon } from "lucide-react";  // Importing FileIcon component from Lucide

// Importing Convex dataModel and API
import { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

// Importing utility function
import { cn } from "@/lib/utils";

// Importing custom Item component
import { Item } from "./Item";

// Defining the DocumentListProps interface
interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

// Defining the DocumentList component
export const DocumentList = ({
  parentDocumentId,
  level = 0
}: DocumentListProps) => {
  // Using Next.js hooks
  const params = useParams();
  const router = useRouter();

  // Using React state hook
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Handling document expansion
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId]
    }));
  };

  // Fetching documents using Convex useQuery hook
  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId
  });

  // Handling redirection to a document
  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  // Rendering loading skeletons if documents are undefined
  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  // Rendering the DocumentList component JSX
  return (
    <>
      {/* Informational message */}
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined
        }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>

      {/* Mapping over documents and rendering Item components */}
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />

          {/* Recursive rendering for expanded documents */}
          {expanded[document._id] && (
            <DocumentList
              parentDocumentId={document._id}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  );
};
