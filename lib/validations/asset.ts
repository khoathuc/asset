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

export const assetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().optional(),
  serial_number: z.string().optional(),
  // tag_ids: z.array(z.string()),
  type_id: z.string().min(1, "Asset type is required"),
  location_id: z.string().min(1, "Location is required"),
  vendor_id: z.string().optional(),
  description: z.string().optional(),
  active_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  image: z.any(),
  file: z.any(),
  form: z.any(),
  purchase_price: priceSchema,
});
