import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
}

const Loader = ({ size = "md" }: LoaderProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full overflow-hidden">
      <Image
        className={cn('animate-dumbell-bounce',{
          "w-4 -h-4": size === "sm",
          "w-12 -h-12": size === "md",
          "w-20 -h-20": size === "lg",
        })}
        src="/assets/dumbell.svg"
        alt="Loading..."
        width={200}
        height={200}
      />
    </div>
  );
};

export default Loader;
