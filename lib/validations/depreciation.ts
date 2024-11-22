import { z } from "zod";

export const depreciationSchema = z.object({
    name: z.string().optional(),
    year: z.string().refine(value => /^\d{4}$/.test(value), {
        message: "Invalid year, must be a 4-digit integer",
    }),
    period_from: z.string().refine(value => /^\d+$/.test(value), {
        message: "Invalid period_from, must be an integer",
    }),
    period_to: z.string().refine(value => /^\d+$/.test(value), {
        message: "Invalid period_to, must be an integer",
    }),
    locations: z.any(),
    description: z.string().optional(),
})