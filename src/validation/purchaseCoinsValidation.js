import { z } from "zod";

const coinAmountSchema = z
  .string({
    required_error: "Number of coins is required",
  })
  .refine((val) => /^\d+$/.test(val), "Number of coins must be digits only")
  .transform((val) => parseInt(val, 10))
  .refine((val) => val >= 10, "Must be 10 PF coins or more")
  .refine((val) => val <= 500, "You cannot purchase more than 500 PF coins");

export const purchaseCoinsSchema = z.object({
  coinAmount: coinAmountSchema,
});
