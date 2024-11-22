import { z } from "zod";
import { isValidPriceFormat } from "@/lib/utils/price";

const priceSchema = z
  .string()
  .min(1, "Purchase price is required")
  .refine(
    (value) => {
      return isValidPriceFormat(value);
    },
    {
      message: "Invalid format for price",
    },
  );

export const assetLogSchema = z.object({
  action_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  action_cost: priceSchema,
  file: z.any(),
  description: z.string()
});
