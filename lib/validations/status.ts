import { z } from "zod";

const HexColorCodeSchema = z.string().refine(
  (value) => {
    // Regular expression to match valid hexadecimal color codes
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    return hexColorRegex.test(value);
  },
  {
    message: "Invalid hexadecimal color code",
  },
);
//for status: 1: Deployable ; 2: Pending, 3: Undeployable, 4: Archived
const typeSchema = z
  .enum(["1", "2", "3", "4"])
  .optional()
  .refine((value) => value !== undefined, {
    message: "Please specify your status type.",
  });

export const statusSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: typeSchema,
  notes: z.string(),
  default: z.boolean(),
  color: HexColorCodeSchema,
});
