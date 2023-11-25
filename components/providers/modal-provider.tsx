// Import necessary libraries and components
"use client";
import { useEffect, useState } from "react";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { CoverImageModal } from "@/components/modals/CoverImageModal";

// ModalProvider component to manage and render modals
export const ModalProvider = () => {
  // State to track if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // useEffect to set isMounted to true when the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render null if the component is not yet mounted
  if (!isMounted) return null;

  // Render SettingsModal and CoverImageModal components
  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
