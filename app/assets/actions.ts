"use server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { Asset } from "@/models/asset/asset";
import { AssetLog } from "@/models/asset/asset_log/asset_log";

export async function getAssetById(id: number) {
  return await prisma.assets.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getAssetLogById(id: number | string) {
  return await AssetLog.loader().getById(id);
}

export async function getAllAssets(query: string | null = null) {
  if (!query || query == "") {
    return await prisma.assets.findMany({
      orderBy: { id: "desc" },
    });
  }

  return await prisma.assets.findMany({
    orderBy: { id: "desc" },
    where: {
      name: {
        contains: query,
      },
    },
  });
}

export async function getMyAssets() {
  return await Asset.loader().getUserAsset();
}

export async function addAsset(formData: FormData) {
  const data = await Asset.reader(formData).read();

  const asset = await prisma.assets.create({
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

  await Asset.on(asset).create();

  revalidatePath("/assets");
}

export async function editAsset(formData: FormData) {
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

  await Asset.on(asset).edit();

  revalidatePath("/assets");
}
