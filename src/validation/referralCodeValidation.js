import { z } from "zod";

export const referralCodeSchema = z.object({
  referralCode: z
    .string({
      required_error: "Referral code is required",
    })
    .length(5, "Referral code must be exactly 5 digits")
    .regex(/^\d{5}$/, "Referral code must contain only numbers"),
});
