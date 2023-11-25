// Import necessary components and hooks
"use client";
import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ModeToggle } from "@/components/theme-toggle";
import { Label } from "@/components/ui/label";

// SettingsModal component
export const SettingsModal = () => {
  // Get settings details and update function from the useSettings hook
  const settings = useSettings();

  // Return the Dialog structure with the modal content
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My Settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          {/* Section for Appearance settings */}
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Note Nirvana looks on your device.
            </span>
          </div>

          {/* ModeToggle component for toggling appearance modes */}
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};
