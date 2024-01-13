import { z } from "zod";

export const locationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string(),
    address: z.string(),
    owners: z.string(),
    file: z.any(),
  });