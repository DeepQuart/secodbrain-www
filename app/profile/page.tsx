"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Avatar className="h-20 w-20">
            {image ? (
              <AvatarImage src={image} alt={name} />
            ) : (
              <AvatarFallback>{name[0]}</AvatarFallback>
            )}
          </Avatar>
          <div className="text-center">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-muted-foreground">{email}</p>
            <p className="text-muted-foreground">@{username}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProfilePage;