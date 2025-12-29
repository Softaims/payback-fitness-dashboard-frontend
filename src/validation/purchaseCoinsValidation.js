import { z } from "zod";

const coinAmountSchema = z
  .string({
    required_error: "PF Points are required",
  })
  .refine((val) => /^\d+$/.test(val), "PF Points must be digits only")
  .transform((val) => parseInt(val, 10))
  .refine((val) => val >= 10, "Must be 10 PF Points or more")
  .refine((val) => val <= 500, "You cannot purchase more than 500 PF Points");

export const purchaseCoinsSchema = z.object({
  coinAmount: coinAmountSchema,
});
