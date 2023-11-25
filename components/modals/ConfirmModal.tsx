// Import necessary components from the alert dialog module
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define the props for ConfirmModal
interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
}

// ConfirmModal component
export const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
  // Function to handle the confirmation action
  const handleConfirm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevents triggering events on parent elements
    onConfirm(); // Calls the onConfirm callback provided by the parent
  };

  // Return the AlertDialog structure with the provided content and buttons
  return (
    <AlertDialog>
      {/* Trigger for the AlertDialog, usually wrapped around the action that triggers the modal */}
      <AlertDialogTrigger onClick={(event) => event.stopPropagation()} asChild>
        {children}
      </AlertDialogTrigger>

      {/* Content of the AlertDialog */}
      <AlertDialogContent>
        {/* Header section with title and description */}
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Footer section with cancel and confirm buttons */}
        <AlertDialogFooter>
          {/* Cancel button */}
          <AlertDialogCancel onClick={(event) => event.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          
          {/* Confirm button with the handleConfirm callback */}
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
