'use server'
import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { Depreciation } from "@/models/depreciation/depreciation";
import { depreciations } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getAllDepreciations(query: string | null = null) {
  return await Depreciation.loader().all(query);
}

export async function getDepreciationById(id: number) {
  return await Depreciation.loader().getById(id)
}

export async function runDepreciation(formData: FormData) {
  const data = await Depreciation.reader(formData).read();
  if (!data) {
    throw new Error("Can not read data");
  }

  const user = await getCurrentUser();

  const depreciation = await prisma.depreciations.create({
    data: {
      user_id: user ? user.id : 0,
      name: data.name,
      locations: data.locations,
      start_date: data.start_date,
      end_date: data.end_date,
      description: data.description
    },
  });

  await Depreciation.on(depreciation).create();

  revalidatePath("/depreciations");
}


export async function getDepreciationRecords(depreciation: depreciations){
  const records = await Depreciation.run(depreciation).generateRecords();

  return records;
}
