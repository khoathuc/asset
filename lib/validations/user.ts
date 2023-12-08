import { z } from "zod";

export const userAuthSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "password is required")
})

export const userSchema = z.object({
    first_name: z.string().min(1, "Fist name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string(),
    country: z.string(),
    job_title: z.string(),
    username: z.string().min(1, "User name is required"),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    description: z.string(),
    avatar: z.any()
})