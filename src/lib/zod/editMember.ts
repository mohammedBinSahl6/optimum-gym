import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, "First name cannot be empty"),
  lastName: z.string().min(1, "Last name cannot be empty"),
  fullName: z.string().min(1, "Full name cannot be empty"),
  email: z.string().email(),
  phoneNumber: z.string().min(1, "Phone number cannot be empty"),
  nationality: z.string().min(1, "Nationality cannot be empty"),
  address: z.string().min(1, "Address cannot be empty"),
  info: z.string().min(1, "Info cannot be empty"),
  dateOfBirth: z.date(),
  gender: z.enum(["MALE", "FEMALE"]),
  username: z.string().min(1, "Username cannot be empty"),
});

export default formSchema;
