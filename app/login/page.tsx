"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await betterAuthClient.signIn.username({
        username: loginData.username,
        password: loginData.password,
      });
      if ("data" in response && response.data?.user) {
        router.push("/memories");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  if (data?.user) {
    router.push("/memories");
    return null;
  }

  return (
    <motion.div
      className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md shadow-lg border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Log In to Second Brain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={loginData.username}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-600 underline hover:opacity-80">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LoginPage;