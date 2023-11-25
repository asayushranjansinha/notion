// Importing necessary modules and components
"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

// Components for the search command UI
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

// Custom hook for handling search functionality
import { useSearch } from "@/hooks/use-search";

// Convex API for querying documents
import { api } from "@/convex/_generated/api";

// SearchCommand component definition
export const SearchCommand = () => {
  // User information
  const { user } = useUser();

  // Next.js router
  const router = useRouter();

  // Convex query for fetching search results
  const documents = useQuery(api.documents.getSearch);

  // State for checking if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // Custom hooks for search functionality
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  // Effect to set the component as mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect to handle keyboard shortcut for opening the search
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  // Function to handle selection of a document in search results
  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  // If the component is not mounted, return null
  if (!isMounted) {
    return null;
  }

  // Rendering the search command UI
  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={`Search ${user?.fullName}'s Notes...`}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">
                  {document.icon}
                </p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>
                {document.title}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
