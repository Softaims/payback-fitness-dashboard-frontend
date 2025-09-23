import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string({
      required_error: "Verification code is required",
    })
    .length(6, "Verification code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Verification code must contain only numbers"),
});
