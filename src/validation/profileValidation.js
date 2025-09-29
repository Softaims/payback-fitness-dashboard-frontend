import { z } from "zod";

const nameSchema = z
  .string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  })
  .min(2, "Name must be at least 2 characters long")
  .max(50, "Name must not exceed 50 characters");

export const profileSchema = z.object({
  name: nameSchema,
});
