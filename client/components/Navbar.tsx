"use client";
import { Coffee, Github } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import axios from "axios";
import { Button } from "./ui/button";
import { Hamburger } from "./Hambuger";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [logged, setLogged] = useState({});
  const isAuth = async () => {
    try {
      const response = await axios.get("http://localhost:8080/checkAuth");
      if (response.status === 200) {
        setLogged(response.data);
      }
    } catch (error) {
      console.log("nop catch");
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

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
