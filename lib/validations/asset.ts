import { z } from "zod";


const priceSchema = z.number().refine(
  (value) => {
    if(!value){
      return true;
    }

    const decimalRegex = /^\d{1,6}(\.\d{1,2})?$/; // Regular expression for decimal(8,2)
    return decimalRegex.test(value.toString());
  },
  {
    message: "Invalid format for price",
  },
);

export const assetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string(),
  serial_number: z.string(),
  tag_ids: z.array(z.string()),
  type_id: z.string().min(1, "Asset type is required"),
  location_id: z.string().min(1, "Location is required"),
  vendor_id: z.string(),
  description: z.string(),
  active_date: z.string().datetime(),
  images: z.any(),
  files: z.any(),
  purchase_date: z.string().datetime(),
  purchase_price: priceSchema,
});
