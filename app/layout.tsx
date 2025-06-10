"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { PropsWithChildren, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import NavigationWrapper from "@/components/NavigationWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



const RootLayout = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <NavigationWrapper />
              <main className="flex-1 p-4 pt-[4.5rem]">{children}</main>
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
