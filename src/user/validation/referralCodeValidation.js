import { z } from "zod";

export const referralCodeSchema = z.object({
  referralCode: z
    .string({
      required_error: "Referral code is required",
    })
    .min(1, "Referral code cannot be empty")
    .trim(),
});
