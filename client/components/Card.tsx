"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { SmilePlus } from "lucide-react";
import { Picker } from "emoji-mart";
import data from "emoji-mart";

type FormData = {
  message: string;
  name: string;
};
const Card = () => {
  const [toggled, setToggled] = useState(1);
  const [fieldValue, setValueField] = useState("1");
  const [isPikerVisible, setIspickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (buttonNumber: number) => {
    setToggled(buttonNumber);
    setValueField(`${buttonNumber}`); // i could use buttonNumber.toString()
  };

  const handleInputChange = (event: any) => {
    setValueField(event.target.value);
  };

  const schema: ZodType<FormData> = z.object({
    message: z.string().min(3),
    name: z.string().min(3).max(30),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const price = parseInt(fieldValue) * 5;
      const data = { ...formData, price };
      const response = await fetch("http://localhost:8080/payment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Payment successful");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
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
          <form
            onSubmit={handleSubmit(submitData)}
            className="flex flex-col w-full gap-2"
          >
            <Input
              {...register("name")}
              placeholder="Your name or @twitter (optional)"
            />
            {errors.name && (
              <span className="text-red-400">
                Please enter minimum 3 characters long name
              </span>
            )}
            <div className="relative w-full">
              <Textarea
                {...register("message")}
                placeholder="Say something nice!"
              />
              {errors.message && (
                <span className="text-red-400">
                  Don&apos;t be shy write something longer
                </span>
              )}
              <div className="absolute right-3 bottom-3">
                <SmilePlus
                  className="cursor-pointer"
                  onClick={() => setIspickerVisible(!isPikerVisible)}
                />
              </div>
              <div className={`${isPikerVisible ? "block" : "hidden"}`}></div>
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Support ${parseInt(fieldValue) * 5}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Card;
