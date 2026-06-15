import z from "zod";

export const createUserSchema = z.object({
  name: z.string("Name is a required field!").min(2),
  email: z.email("Email is a required field!").min(2),
  phoneNumber: z.string().regex(/^[6-9]\d{9}/, "Invalid Phone Number")
})

export const generateOTPSchema = z.object({
  email: z.email().optional(),
  phoneNumber: z.string().regex(/^[6-9]\d{9}/, "Invalid Phone Number").optional()
})

