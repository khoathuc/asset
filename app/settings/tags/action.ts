"use server";

import prisma from "@/lib/db/prisma";
import { Tag } from "@/models/tag/tag";
import { revalidatePath } from "next/cache";

export async function getAllTags(){
  return await Tag.loader().all();
}

export async function addTag(formData: FormData) {
  const data = await Tag.reader(formData).read();

  await prisma.tags.create({
    data: data,
  });

  revalidatePath("/settings/tags");
}

export async function editTag(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const tag = await Tag.loader().getById(id);
  if (!tag) {
    throw new Error("Invalid tag");
  }

  const { name, color, description } = await Tag.reader(formData).read();
  await prisma.tags.update({
    where: {
      id: id,
    },
    data: {
      name,
      color,
      description,
    },
  });

  revalidatePath("/settings/tags");
}
