"use server";

import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

function readName(formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name) {
    throw new Error("Name is required");
  }

  return name;
}

function getPrefix(name: string) {
  const cleanName = name.replace(/[^a-zA-Z0-9]+/g, "").toLowerCase();
  const prefix = cleanName.substring(0, 2); // You can change the length as per your requirement
  return prefix;
}

function readPrefix(formData: FormData) {
  var prefix = formData.get("prefix")?.toString();
  if (!prefix) {
    const name = readName(formData);
    prefix = getPrefix(name);
  }

  return prefix;
}

function readData(formData: FormData) {
  const name = readName(formData);

  const prefix = readPrefix(formData);

  const description = formData.get("description")?.toString();

  return { name, prefix, description };
}

export async function addType(formData: FormData) {
  const { name, prefix, description } = readData(formData);

  await prisma.types.create({
    data: {
      name,
      prefix,
      description,
    },
  });

  revalidatePath("/settings/types");
}

export async function editType(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const type = await prisma.types.findUnique({
    where: {
      id,
    },
  });

  if (!type) {
    throw new Error("Invalid type");
  }

  const { name, prefix, description } = readData(formData);

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
