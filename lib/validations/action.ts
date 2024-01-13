import {z} from "zod";

export const actionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    change_fields: z.any(),
    conditions: z.any()
})