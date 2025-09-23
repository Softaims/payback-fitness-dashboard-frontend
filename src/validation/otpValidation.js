import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string({
      required_error: "Verification code is required",
    })
    .length(5, "Verification code must be exactly 5 digits")
    .regex(/^\d{5}$/, "Verification code must contain only numbers"),
});
