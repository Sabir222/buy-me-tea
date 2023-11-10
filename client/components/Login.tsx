"use client";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type FormData = {
  email: String;
  password: String;
};
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: FormData = { email, password };
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Logged in successfully");
        router.push("/");
        setIsLoading(false);
      } else {
        toast.error("Invalid Credentials");
        console.log("not working dude");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Log-in</CardTitle>
        <CardDescription>
          Enter your email below to log-in to your account
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={handleEmailChange}
              required
              id="email"
              type="email"
              placeholder="example@example.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type="password"
              onChange={handlePasswordChange}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="w-full">
            Log-in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
