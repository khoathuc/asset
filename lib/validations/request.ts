import { z } from "zod";

export const requestSchema = z.object({
    name: z.string().min(1, "Name is required"),
    request_type_id: z.string().min(1, "Request type is required"),
    description: z.string().optional(),
    file: z.any(),
    form: z.any(),
    approvers: z.string(),
    followers: z.string().optional(),
    approval_follow: z.string(),
})
