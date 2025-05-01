"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
export interface BlogProps {
  title: string;
  subtitle: string;
  content: string;
  handleRemove?: () => void;
}
const Blog = ({ content, subtitle, title, handleRemove }: BlogProps) => {
  const [expand, setExpand] = useState(false);

  function handleExpandContent() {
    setExpand(!expand);
  }
  return (
    <section className="flex flex-col border-primary-blue border-2 shadow-sm gap-8 w-full md:w-1/2  md:text-xl">
      <X
        onClick={handleRemove}
        size={32}
        className="cursor-pointer text-primary-blue hover:text-primary-red self-end "
      />
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-4xl ">{title}</h1>
        <h4>{subtitle}</h4>
        <Button
          className="self-start"
          variant="ghost"
          onClick={handleExpandContent}
        >
          {expand ? "Less" : "Read More"}
        </Button>
      </div>

      {expand && <p className="p-8 text-primary-blue">{content}</p>}
    </section>
  );
};

export default Blog;
