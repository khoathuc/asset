import prisma from "@/lib/db/prisma";
import { Asset } from "@/models/asset/asset";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const res = await editAsset(data);

    await Asset.on(res).edit();

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
}

async function editAsset(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const r_asset = await Asset.loader().getById(id);
  if (!r_asset) {
    throw new Error("Invalid asset");
  }
  const data = await Asset.reader(formData).read();

  const asset = await prisma.assets.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      description: data.description,
      code: data.code,
      tag_ids: data.tag_ids,
      serial_number: data.serial_number,
      type_id: data.type_id,
      location_id: data.location_id,
      vendor_id: data.vendor_id,
      status_id: data.status_id,
      active_date: data.active_date,
      image: data.image,
      form: data.form,
      is_depreciable: data.depreciation ? true : false,
      useful_life: data.depreciation
        ? parseInt(data.depreciation.useful_life)
        : null,
      salvage_price: data.depreciation ? data.depreciation.salvage_value : null,
      purchase_price: data.purchase_price,
    },
  });

  return asset;
}
