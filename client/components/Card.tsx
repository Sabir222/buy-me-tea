"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SmilePlus } from "lucide-react";
import { Picker } from "emoji-mart";
import data from "emoji-mart";
const Card = () => {
  const [toggled, setToggled] = useState(1);
  const [fieldValue, setValueField] = useState("1");
  const [isPikerVisible, setIspickerVisible] = useState(false);

  const handleToggle = (buttonNumber: number) => {
    setToggled(buttonNumber);
    setValueField(`${buttonNumber}`); // i could use buttonNumber.toString()
  };

  const handleInputChange = (event: any) => {
    setValueField(event.target.value);
  };
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="p-6 border rounded-md bg-card">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-semibold">Buy me Tea</h1>
          <div className="flex items-center gap-4">
            <Image
              src="/tea.svg"
              width={40}
              height={40}
              alt="Picture of the author"
            />
            <span className="text-xl font-semibold">x</span>
            <div className="flex items-center gap-4">
              <Button
                className={`w-10 border rounded-full hover:bg-primary-foreground border-green-600 ${
                  toggled === 1
                    ? "bg-green-600 text-white"
                    : "bg-transparent text-green-600"
                } font-bold`}
                onClick={() => handleToggle(1)}
              >
                1
              </Button>
              <Button
                className={`w-10 border rounded-full hover:bg-primary-foreground border-green-600 ${
                  toggled === 3
                    ? "bg-green-600 text-white"
                    : "bg-transparent text-green-600"
                } font-bold`}
                onClick={() => handleToggle(3)}
              >
                3
              </Button>
              <Button
                className={`w-10 border rounded-full hover:bg-primary-foreground border-green-600 ${
                  toggled === 5
                    ? "bg-green-600 text-white"
                    : "bg-transparent text-green-600"
                } font-bold`}
                onClick={() => handleToggle(5)}
              >
                5
              </Button>
            </div>
            <Input
              className="w-10 pl-2 text-center"
              value={fieldValue}
              onChange={handleInputChange}
              type="number"
            />
          </div>
          <Input placeholder="Your name or @twitter (optional)" />
          <div className="relative w-full">
            <Textarea placeholder="Say something nice!" />
            <div className="absolute right-3 bottom-3">
              <SmilePlus
                className="cursor-pointer"
                onClick={() => setIspickerVisible(!isPikerVisible)}
              />
            </div>
            <div className={`${isPikerVisible ? "block" : "hidden"}`}></div>
          </div>

          <Button className="w-full">
            Support ${parseInt(fieldValue) * 5}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Card;
