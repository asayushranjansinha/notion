"use client";
import { toast } from "sonner";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";

function DocumentsPage() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const handleCreate = () => {
    const promise = create({ title: "Untitled" });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created!",
      error: "Failed to create a new note.",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image src="/empty.png" alt="Empty" height="300" width="300" />

      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notes
      </h2>
      <Button onClick={handleCreate}>
        <PlusCircle className="h-4 w-4 mr-2" /> Create a note
      </Button>
    </div>
  );
}

export default DocumentsPage;
