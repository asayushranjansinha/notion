// Importing necessary modules and components
"use client";

// Lucide-react icons
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react"; // Importing Lucide icons

// Next.js-related imports
import { useParams, usePathname, useRouter } from "next/navigation"; // Importing Next.js navigation hooks
import { ElementRef, useEffect, useRef, useState } from "react"; // Importing React hooks

// Custom hooks and components
import { useMediaQuery } from "usehooks-ts"; // Importing custom useMediaQuery hook
import { useMutation } from "convex/react"; // Importing Convex useMutation hook
import { toast } from "sonner"; // Importing Sonner toast

import { cn } from "@/lib/utils"; // Importing utility functions
import { api } from "@/convex/_generated/api"; // Importing Convex API
import { UserItem } from "./UserItem"; // Importing internal UserItem component
import { Item } from "./Item"; // Importing internal Item component
import { DocumentList } from "./DocumentList"; // Importing internal DocumentList component
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Importing internal Popover components
import TrashBox from "./TrashBox"; // Importing internal TrashBox component
import { useSearch } from "@/hooks/use-search"; // Importing custom useSearch hook
import { useSettings } from "@/hooks/use-settings"; // Importing custom useSettings hook
import Navbar from "./Navbar"; // Importing internal Navbar component

export const Navigation = () => {
  // Custom hooks and state for handling navigation, settings, and UI elements
  const search = useSearch(); // Custom hook for handling search functionality
  const settings = useSettings(); // Custom hook for handling settings

  // Next.js-related hooks for handling route parameters and navigation
  const params = useParams(); // Accessing parameters from the current route
  const router = useRouter(); // Next.js router for programmatic navigation
  const pathname = usePathname(); // Hook to get the current pathname

  // Responsive design handling using a custom media query hook
  const isMobile = useMediaQuery("(max-width: 768px)"); // Checks if the screen is mobile-sized

  // Convex-related hooks and mutation function for API interactions
  const create = useMutation(api.documents.create); // Mutation hook for creating new documents

  // State variables for handling UI resizing and collapsing behavior
  const isResizingRef = useRef(false); // Ref to track whether resizing is in progress
  const sidebarRef = useRef<ElementRef<"aside">>(null); // Ref for accessing the sidebar element
  const navbarRef = useRef<ElementRef<"div">>(null); // Ref for accessing the navbar element
  const [isResetting, setIsResetting] = useState(false); // State for controlling the resetting animation
  const [isCollapsed, setIsCollapsed] = useState(isMobile); // State to manage the collapsed state of the sidebar

  // Effect to handle initial collapse or reset of the sidebar based on the screen width
  useEffect(() => {
    if (isMobile) {
      // If on a mobile screen, collapse the sidebar
      collapse();
    } else {
      // If not on a mobile screen, reset the sidebar width
      resetWidth();
    }
  }, [isMobile]);

  // Effect to handle collapsing the sidebar when the screen is mobile-sized or pathname changes
  useEffect(() => {
    if (isMobile) {
      // If on a mobile screen, collapse the sidebar
      collapse();
    }
  }, [pathname, isMobile]);

  // Function to handle the mouse down event when resizing the sidebar
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    // Set the flag to indicate that resizing is in progress
    isResizingRef.current = true;

    // Add event listeners for mouse move and mouse up events
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Function to handle the mouse move event when resizing the sidebar
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    // Calculate the new width based on the mouse position
    let newWidth = event.clientX;

    // Ensure the new width stays within specified bounds
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    // Update the sidebar and navbar styles based on the new width
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  // Function to handle the mouse up event when resizing the sidebar
  const handleMouseUp = () => {
    // Reset the resizing flag and remove event listeners
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Function to reset the width of the sidebar
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      // Expand the sidebar and reset styles for non-mobile screens
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      // Set a timeout to end the resetting animation
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  // Function to collapse the sidebar
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      // Collapse the sidebar and reset styles for mobile screens
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      // Set a timeout to end the resetting animation
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  // Function to handle the creation of a new document
  const handleCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`)
    );

    // Display a toast notification based on the promise result
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        {/* Collapse/Expand button for the sidebar */}
        <div
          onClick={collapse}
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-primary-foreground absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        {/* Sidebar content */}
        <div>
          <UserItem />
          <Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
          <Item label="Settings" icon={Settings} onClick={settings.onOpen} />
          <Item onClick={handleCreate} label="New page" icon={PlusCircle} />
        </div>

        {/* Trash section */}
        <div className="mt-4">
          <DocumentList />
          <Popover>
            {/* Trigger for Trash popover */}
            <PopoverTrigger className="w-full mt-4">
              <Item label="Trash" icon={Trash} />
            </PopoverTrigger>

            {/* Content of Trash popover */}
            <PopoverContent
              side={isMobile ? "bottom" : "right"}
              className="p-0 w-72"
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        {/* Resizing handle for the sidebar */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>

      {/* Main content area */}
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {/* Render Navbar or MenuIcon based on the existence of documentId */}
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {/* Render MenuIcon when the sidebar is collapsed */}
            {isCollapsed && (
              <MenuIcon
                onClick={resetWidth}
                role="button"
                className="h-6 w-6 text-muted-foreground"
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};
