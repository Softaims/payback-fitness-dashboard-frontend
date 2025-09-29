import { z } from "zod";

const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
  .max(100, "Password must not exceed 100 characters");

export const changePasswordSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string({
      required_error: "Please confirm your new password",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });
