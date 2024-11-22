import { z } from "zod";

export const userAuthSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "password is required")
})

export const userRegisterSchema = z.object({
    first_name: z.string().min(1, "Fist name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string(),
    country: z.string(),
    job_title: z.string(),
    password: z.string().min(1, "password is required"),
    confirm_password: z.string().min(1, "Confirm password is required"),
    username: z.string().min(1, "User name is required"),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    description: z.string(),
    avatar: z.any()
}).refine((data) => data.password === data.confirm_password, {
    message: "Confirm password don't match",
    path: ["confirm_password"],
});


export const userEditSchema = z.object({
    first_name: z.string().min(1, "Fist name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone: z.string(),
    country: z.string(),
    job_title: z.string(),
    password: z.string(),
    confirm_password: z.string(),
    username: z.string().min(1, "User name is required"),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    description: z.string(),
    avatar: z.any()
}).refine((data) => data.password === data.confirm_password, {
    message: "Confirm password don't match",
    path: ["confirm_password"],
});