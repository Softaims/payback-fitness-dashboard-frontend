import { z } from "zod";

const coinAmountSchema = z
  .string({
    required_error: "Number of coins is required",
  })
  .min(1, "Number of coins is required")
  .refine((val) => /^\d+$/.test(val), "Number of coins must be digits only")
  .transform((val) => parseInt(val))
  .refine((val) => val > 0, "Number of coins must be greater than 0")
  .refine((val) => val <= 500, "You cannot purchase more than 500 PF coins");

export const purchaseCoinsSchema = z.object({
  coinAmount: coinAmountSchema,
});
