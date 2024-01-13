import { z } from "zod";

export const typeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  prefix: z.string(),
  description: z.string().optional()
});
