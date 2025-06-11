"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <motion.div
        className="text-center max-w-2xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          variants={itemVariants}
        >
          Welcome to Second Brain
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-8"
          variants={itemVariants}
        >
          Your personal memory vault and AI-powered assistant to organize and retrieve your thoughts effortlessly.
        </motion.p>
        <motion.div className="flex gap-4 justify-center" variants={itemVariants}>
          <Button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full"
          >
            Log In
          </Button>
          <Button
            onClick={() => router.push("/sign-up")}
            variant="outline"
            className="px-6 py-3 rounded-full"
          >
            Sign Up
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}