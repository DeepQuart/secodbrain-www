"use client";

import React, { useState } from "react";
import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserIcon, Moon, Sun, Search } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type NavigationBarProps = {
  onSearch?: (query: string) => void;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ onSearch }) => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const user = data?.user;

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await betterAuthClient.signOut();
      await queryClient.invalidateQueries();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error while logging out.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/70 border-b shadow-sm text-foreground px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <a href="/" className="text-lg font-semibold hover:text-blue-600">
          Second Brain
        </a>

        {onSearch && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const query = (e.currentTarget as any).q.value;
              onSearch(query);
            }}
            className="relative flex-1 max-w-md"
          >
            <Input
              type="text"
              name="q"
              placeholder="Search memories..."
              className="pr-12 rounded-full border border-input bg-background shadow-sm focus-visible:ring-2 focus-visible:ring-blue-600"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 h-7 text-xs bg-blue-600 text-white hover:bg-blue-700"
            >
              <Search className="h-4 w-4 mr-1" />
              Search
            </Button>
          </form>
        )}

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          {!user ? (
            <a href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
            </a>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-6 w-6">
                    {user.image ? (
                      <AvatarImage src={user.image} />
                    ) : (
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="text-sm hidden sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      {user.image ? (
                        <AvatarImage src={user.image} />
                      ) : (
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  {isLoading ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;