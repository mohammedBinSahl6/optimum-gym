import { z } from "zod";

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last Name must be at least 2 characters.",
    }),
    email: z.string().email(),
    password: z
      .string()
      .regex(/[^ ]/, "Password cannot be empty")
      .regex(/[A-Z]/, "Password must contain at least one capital letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .regex(/[^ ]/, "Confirm Password cannot be empty"),
    role: z.enum(["admin", "member", "coach"], {
      message: "Role must be one of the following: admin, member, coach",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export default formSchema;
