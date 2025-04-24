import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface BlogProps {
  title: string;
  subtitle: string;
  content: string;
}
const Blog = ({ content, subtitle, title }: BlogProps) => {
  const [expand, setExpand] = useState(false);

  function handleExpandContent() {
    setExpand(!expand);
  }
  return (
    <section className="flex flex-col text-primary-light">
      <div>
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
        <Button variant="ghost" onClick={handleExpandContent}>
          {expand ? "Less" : "Read More"}
        </Button>
      </div>

      {expand && <p>{content}</p>}
    </section>
  );
};

export default Blog;
