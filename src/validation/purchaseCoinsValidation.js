import { z } from "zod";

const coinAmountSchema = z
  .string({
    required_error: "Number of coins is required",
    invalid_type_error: "Number of coins must be a string",
  })
  .min(1, "Number of coins is required")
  .regex(/^\d+$/, "Number of coins is required")
  .transform((val) => parseInt(val))
  .refine((val) => val > 0, "Number of coins must be greater than 0");

export const purchaseCoinsSchema = z.object({
  coinAmount: coinAmountSchema,
});
