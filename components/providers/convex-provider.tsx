// Import necessary libraries and components
"use client";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";

// Create an instance of ConvexReactClient with the provided Convex URL
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// ConvexClientProvider component that wraps the application with Convex and Clerk providers
export const ConvexClientProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  return (
    // Provide Clerk authentication with the ClerkProvider
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      {/* Use ConvexProviderWithClerk to integrate Convex and Clerk */}
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
