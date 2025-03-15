import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(/[^ ]/, "Password cannot be empty"),
});

export default formSchema;
