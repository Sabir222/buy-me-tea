import Register from "@/components/Register";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-2 ">
      <div className=" w-[400px] md:w-[600px]  sm:w-[500px]">
        <Register />
      </div>
    </div>
  );
};

export default page;
