"use client";

import { betterAuthClient } from "@/lib/integrations/better-auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

interface FormData {
  username: string;
  email: string;
  name: string;
  password: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  name?: string;
  password?: string;
  general?: string;
}

const SignUpPage = () => {
  const { data } = betterAuthClient.useSession();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    name: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    setErrors({});

    const validation = signUpSchema.safeParse(formData);
    if (!validation.success) {
      const newErrors: FormErrors = {};
      validation.error.errors.forEach((err) => {
        newErrors[err.path[0] as keyof FormErrors] = err.message;
      });
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await betterAuthClient.signUp.email({
        username: formData.username,
        email: formData.email,
        name: formData.name,
        password: formData.password,
      });
      router.push("/memories");
    } catch (err: any) {
      setErrors({ general: err.message || "Signup failed" });
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
          <CardTitle className="text-2xl text-center">Create Your Second Brain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {["username", "email", "name", "password"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <Input
                id={field}
                name={field}
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className={errors[field as keyof FormErrors] ? "border-red-500" : ""}
                disabled={isLoading}
                required
              />
              {errors[field as keyof FormErrors] && (
                <p className="text-red-500 text-sm" aria-live="polite">
                  {errors[field as keyof FormErrors]}
                </p>
              )}
            </div>
          ))}
          {errors.general && (
            <p className="text-red-500 text-sm text-center" aria-live="polite">
              {errors.general}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 underline hover:opacity-80">
              Log In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SignUpPage;
