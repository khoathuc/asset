"use server";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { Asset } from "@/models/asset/asset";

export async function getAssetById(id: number){
  return await prisma.assets.findUnique({
    where:{
      id: id
    }
  })
}

export async function getAllAssets(query: string | null = null){
  if(!query || query == ''){
    return await prisma.assets.findMany({
      orderBy:{id:'desc'}
    })
  }

  return await prisma.assets.findMany({
    orderBy:{id:'desc'},
    where:{
      name: {
        contains: query
      }
    }
  })
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
      purchase_price: data.purchase_price,
    },
  });

  await Asset.on(asset).create();

  revalidatePath("/assets");
}