// Importing necessary modules and components
"use client";

// BlockNote library components and utilities
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

// Next.js utilities
import { useTheme } from "next-themes";

// Custom EdgeStore hook
import { useEdgeStore } from "@/lib/edgestore";

// Defining the props for the Editor component
interface EditorProps {
  editable?: boolean;
  initialContent?: string;
  onChange: (value: string) => void;
}

// Editor component definition
const Editor = ({ initialContent, editable, onChange }: EditorProps) => {
  // Theme and EdgeStore hooks
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  // Handling file upload to EdgeStore
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  // Initializing BlockNoteEditor with specified configurations
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      // Callback to handle content changes and pass them to the parent component
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  // Rendering the BlockNoteView component
  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

// Exporting the Editor component as the default export
export default Editor;
