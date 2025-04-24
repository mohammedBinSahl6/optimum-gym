import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 Char",
  }),
  subtitle: z.string().min(1, {
    message: "Subtitle must be at least 1 Char",
  }),
  content: z.string().min(1, {
    message: "Content must be at least 1 Char",
  }),
});

export default formSchema;
