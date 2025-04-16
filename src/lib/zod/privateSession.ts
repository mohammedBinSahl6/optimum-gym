import { z } from "zod";

const formSchema = z.object({
  member: z
    .string()
    .regex(/[^ ]/, "Member cannot be empty! Select a member from the dropdown"),

  sessions: z.string().min(1, {
    message: "Sessions must be at least 1 session",
  }),
  startDate: z.date(),
});

export default formSchema;
