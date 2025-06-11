"use client";


import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./globals.css";
import { motion } from "framer-motion";
import NavigationBar from "@/components/ui/navigation-bar";

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider attribute="class" defaultTheme="light">
          {/* Wrap the app with QueryClientProvider */}
          <QueryClientProvider client={queryClient}>
            <NavigationBar />
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-16"
            >
              {children}
            </motion.main>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}