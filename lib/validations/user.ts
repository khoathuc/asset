import { z } from "zod";

export const userAuthSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "password is required")
})