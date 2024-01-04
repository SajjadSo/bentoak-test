import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email Address is required!" }).email({
    message: "Email is not valid!"
  }),
  password: z.string().min(1, { message: "Password is required!" })
});

export default loginSchema;
