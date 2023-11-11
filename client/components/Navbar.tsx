"use client";
import { Coffee, Github } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import axios from "axios";
import { Button } from "./ui/button";
import { Hamburger } from "./Hambuger";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Navbar = () => {
  const [logged, setLogged] = useState(false);
  const isAuth = async () => {
    try {
      const response = await axios.get("http://localhost:8080/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });

      console.log(response);
      if (response.status === 200) {
        toast.success("Logged in successfully");
        setLogged(true);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const router = useRouter();
  return (
    <nav className="border-b">
      <div className="justify-between flex max-w-[1200px] mx-auto p-6">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Coffee size={40} />
          <h1 className="ml-2 ">
            Buy me <span className="font-bold text-green-500">TEA</span>{" "}
          </h1>
        </div>
        <div className="flex justify-center gap-3">
          <Button
            onClick={() => router.push("/register")}
            className="hidden md:block"
          >
            Register
          </Button>
          <Button
            onClick={() => router.push("/login")}
            variant="outline"
            className="hidden md:block"
          >
            Login
          </Button>
          <Button variant="outline" className="hidden md:block">
            <Github />
          </Button>
          <Button onClick={isAuth}>Check auth</Button>
          <Button onClick={isAuth}>{logged ? "u In" : "u Out"}</Button>
          <div className="md:hidden">
            <Hamburger />
          </div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
