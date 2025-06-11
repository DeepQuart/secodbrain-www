"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "lucide-react";


const ProfilePage = () => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();

  if (!data?.user) {
    router.push("/login");
    return null;
  }

  const { name, email, username, image } = data.user;

  return (
    <motion.div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md relative p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[20px] shadow-xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="rounded-[18px] bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile Info
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col items-center gap-6 mt-2">
            {/* Avatar with Ping */}
            <motion.div
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/30" />
              <Avatar className="h-24 w-24 border-4 border-blue-400 shadow-md">
                {image ? (
                  <AvatarImage src={image} alt={name} />
                ) : (
                  <AvatarFallback className="text-xl">{name[0]}</AvatarFallback>
                )}
              </Avatar>
            </motion.div>

            {/* Profile Fields */}
            <div className="space-y-4 w-full text-center">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="text-lg font-semibold text-foreground">{name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg font-medium text-foreground">{email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <span className="text-base font-mono px-3 py-1 border rounded border-muted-foreground">
                  @{username}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
