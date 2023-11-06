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

export const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  color: HexColorCodeSchema,
  description: z.string().optional()
});
