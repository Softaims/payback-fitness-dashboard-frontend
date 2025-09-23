import { z } from "zod";

const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .email("Please enter a valid email address")
  .transform((email) => email.toLowerCase().trim());

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
