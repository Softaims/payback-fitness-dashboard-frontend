import { z } from "zod";

const nameSchema = z
  .string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  })
  .min(2, "Name must be at least 2 characters long")
  .max(20, "Name must not exceed 20 characters")
  .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces");

export const profileSchema = z.object({
  name: nameSchema,
});
