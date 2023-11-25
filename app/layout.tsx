// Import necessary modules and components
import "./globals.css"; // Import global styles
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

// Load the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata for the document head
export const metadata: Metadata = {
  title: "Note Nirvana",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:dark)",
        url: "/logo-light.png",
        href: "/logo-light.png",
      },
      {
        media: "(prefers-color-scheme:light)",
        url: "/logo-dark.png",
        href: "/logo-dark.png",
      },
    ],
  },
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // HTML document with language attribute
    <html lang="en" suppressHydrationWarning>
      {/* Body of the HTML document */}
      <body className={inter.className}>
        {/* Convex client provider */}
        <ConvexClientProvider>
          {/* EdgeStore provider */}
          <EdgeStoreProvider>
            {/* Theme provider for managing themes */}
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="note-nirvana-theme"
            >
              {/* Toast notifications */}
              <Toaster position="bottom-center" />
              {/* Modal provider for managing modals */}
              <ModalProvider />
              {/* Render the children components */}
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
