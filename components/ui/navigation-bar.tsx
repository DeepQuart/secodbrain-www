"use client";

import React, { useState } from "react";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon, Moon, Sun } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const NavigationBar: React.FC = () => {
  const { data, isPending } = betterAuthClient.useSession();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const queryClient = useQueryClient();
  const user = data?.user;

  // Don't render navbar until session is resolved
  if (isPending || !user) return null;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await betterAuthClient.signOut();
      await queryClient.invalidateQueries();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error while logging out.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 border-b shadow-md backdrop-blur-sm px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-400"
        >
          Second Brain
        </motion.a>

        <div className="flex items-center gap-4">
          <motion.div whileTap={{ rotate: 360 }}>
            <Button
              variant="ghost"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 hover:text-yellow-500 transition-colors"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 group">
                <Avatar className="h-7 w-7 ring-2 ring-blue-500 group-hover:ring-blue-400 transition-all">
                  {user.image ? (
                    <AvatarImage src={user.image} />
                  ) : (
                    <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                  )}
                </Avatar>
                <span className="text-sm hidden sm:inline text-gray-900 dark:text-gray-100">
                  {user.name}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 mt-2 shadow-lg">
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    {user.image ? (
                      <AvatarImage src={user.image} />
                    ) : (
                      <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/profile")}
                className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
              >
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavigationBar;
