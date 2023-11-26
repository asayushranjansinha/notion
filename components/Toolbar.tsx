"use client";

// React hooks and components
import { ElementRef, useRef, useState } from "react";

// Icons from lucide-react
import { ImageIcon, Smile, X } from "lucide-react";

// Convex hook for mutations
import { useMutation } from "convex/react";

// Autosize textarea component
import TextareaAutosize from "react-textarea-autosize";

// Convex API and data model
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

// Custom Button component
import { Button } from "@/components/ui/button";

// Custom IconPicker component
import { IconPicker } from "./ui/icon-picker";

// Custom hook for cover image
import { useCoverImage } from "@/hooks/use-cover-image";

// Props definition for the Toolbar component
interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  // Ref for the textarea input
  const inputRef = useRef<ElementRef<"textarea">>(null);

  // State for tracking editing mode and input value
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  // Convex mutations for document updates
  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  // Custom hook for managing cover image
  const coverImage = useCoverImage();

  // Function to enable input editing
  const enableInput = () => {
    // Preview mode: Do nothing
    if (preview) return;

    // Enable editing mode and focus on the input after a short delay
    setIsEditing(true);
    setTimeout(() => {
      // Reset input value and focus on it
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  // Function to disable input editing
  const disableInput = () => setIsEditing(false);

  // Function to handle input changes
  const onInput = (value: string) => {
    // Update local state and perform Convex mutation for document update
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  // Function to handle Enter key press
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If Enter key is pressed, prevent default behavior and disable input editing
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  // Function to handle icon selection
  const onIconSelect = (icon: string) => {
    // Perform Convex mutation for updating document with the selected icon
    update({
      id: initialData._id,
      icon,
    });
  };

  // Function to handle icon removal
  const onIconRemove = () => {
    // Perform Convex mutation for removing the icon from the document
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <div className="pl-[54px] group relative">
      {/* Displaying icon and remove button when there is an icon and not in preview mode */}
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>

          {/* Button to remove the icon */}
          <Button
            onClick={onIconRemove}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Displaying icon when there is an icon and in preview mode */}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      {/* Group of buttons */}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {/* Displaying cover image button when there is no cover image and not in preview mode */}

        {!initialData.coverImage && !preview && (
          <Button
            onClick={coverImage.onOpen}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add Cover
          </Button>
        )}
      </div>

      {/* Displaying textarea for editing title when in editing mode and not in preview */}
      {/* Displaying title when not in editing mode or in preview */}
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
