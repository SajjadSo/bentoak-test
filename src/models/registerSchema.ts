import { z } from "zod";

const registerSchema = z
  .object({
    firstname: z.string().min(1, {
      message: "First Name is required!"
    }),
    lastname: z.string().min(1, {
      message: "Last Name is required!"
    }),
    email: z.string().min(1, { message: "Email Address is required!" }).email({
      message: "Email is not valid!"
    }),
    password: z.string().min(6, { message: "Password length should be more than 6 characters!" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required!" })
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirm Password doesn't match!"
  });
export default registerSchema;
