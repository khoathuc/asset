import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const vendorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  contact: z.string(),
  url: z.string().url("Invalid url"),
  address: z.string(),
  email: z.string().email("Invalid email"),
  description: z.string(),
  image: z.any(),
  files: z.any(),
});
