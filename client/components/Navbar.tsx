import { Coffee } from "lucide-react";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="justify-between flex max-w-[1200px] mx-auto p-6">
        <div className="flex items-center">
          <Coffee size={40} />
          <h1 className="ml-2 ">
            Buy me <span className="font-bold text-green-500">TEA</span>{" "}
          </h1>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
