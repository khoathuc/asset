import { z } from "zod";

export const auditSchema = z.object({
    name: z.string().min(1, "Name is required"),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    locations: z.any(),
    auditors: z.string(),
    followers: z.string(),
    description: z.string().optional(),
    file: z.any(),
})