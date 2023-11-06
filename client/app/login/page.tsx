import Login from "@/components/Login";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-2 ">
      <div className=" w-[400px] md:w-[600px]  sm:w-[500px]">
        <Login />
      </div>
    </div>
  );
};

export default page;
