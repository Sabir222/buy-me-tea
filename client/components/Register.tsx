"use client";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
type FormData = {
  email: string;
  password: string;
  name: string;
  verifyPassword: string;
};

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const schema: ZodType<FormData> = z
    .object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(3).max(30),
      verifyPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.verifyPassword, {
      message: "Passwords do not match",
      path: ["verifyPassword"],
    });
  const router = useRouter();
  const submitData = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const data = {
        ...formData,
        email: formData.email.toLowerCase(),
        name: formData.name.toLowerCase(),
      };
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        await response.json();
        setIsLoading(false);
        toast.success("Registration Successful!");
        router.push("/login");
      } else {
        toast.error("Registration Failed!");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Registration Failed!");
      console.log("Ops bad programmer", error);
    }
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Icons.gitHub className="w-4 h-4 mr-2" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="w-4 h-4 mr-2" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-background text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex flex-col gap-4"
          action=""
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="example@example.com"
            />
            {errors.email && (
              <span className="text-red-400">Please enter an email</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Full name</Label>
            <Input {...register("name")} id="email" type="text" />
            {errors.name && (
              <span className="text-red-400">Please enter a longer name</span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input {...register("password")} id="password" type="password" />
            {errors.password && (
              <span className="text-red-400">
                Password must be at least 8 characters long
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password"> Verify password</Label>
            <Input
              {...register("verifyPassword")}
              id="password"
              type="password"
            />
            {errors.verifyPassword && (
              <span className="text-red-400">Password do not match</span>
            )}
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Register;
