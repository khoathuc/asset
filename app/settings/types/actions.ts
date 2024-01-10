"use server";

import prisma from "@/lib/db/prisma";
import { Type } from "@/models/type/type";
import { revalidatePath } from "next/cache";

export async function getAllTypes(query: string | null = null){
  return await Type.loader().paginate();
}

export async function addType(formData: FormData) {
  const { name, prefix, description, is_depreciable, depreciation_conf } = await Type.reader(formData).read();

  await prisma.types.create({
    data: {
      name,
      prefix,
      description,
      is_depreciable,
      depreciation_conf: depreciation_conf||undefined
    },
  });

  revalidatePath("/settings/types");
}

export async function editType(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const type = await Type.loader().getById(id)
  if (!type) {
    throw new Error("Invalid type");
  }

  const { name, prefix, description } = await Type.reader(formData).read();

  await prisma.types.update({
    where: {
      id: id,
    },
    data: {
      name,
      prefix,
      description,
    },
  });
  
  revalidatePath("/settings/types");
}

export async function editCform(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const type = await Type.loader().getById(id)
  if (!type) {
    throw new Error("Invalid type");
  }
  const form = await Type.reader(formData).readCForm();

  await prisma.types.update({
    where: {
      id: id,
    },
    data: {
      form:form || null
    },
  });
  
  revalidatePath("/settings/types");
}


export async function getTypeById(type_id: number){
  return await Type.loader().getById(type_id)
}
