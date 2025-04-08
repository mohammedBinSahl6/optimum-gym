import { z } from "zod";

const formSchema = z.object({
  plan: z
    .string()
    .regex(
      /[^ ]/,
      "Plan cannot be empty! Try 1 month, 3 months, 6 months, 1 year"
    ),
  height: z.string().min(1, {
    message: "Height must be at least 1 meter",
  }),
  weight: z.string().min(1, {
    message: "Weight must be at least 1 kilogram",
  }),
  startDate: z.date(),
  endDate: z.date(),
  subscriptionCost: z.string().min(1, {
    message: "Subscription cost must be at least 1 dollar",
  }),
});

export default formSchema;
