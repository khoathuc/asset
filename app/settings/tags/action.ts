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

function validColor(color: string) {
  // Regular expression to match valid hexadecimal color codes
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
  return hexColorRegex.test(color);
}

function readColor(formData: FormData) {
  const color = formData.get("color")?.toString();

  if (!color) {
    throw new Error("Color is required");
  }

  if (!validColor(color)) {
    throw new Error("Color is invalid");
  }

  return color;
}

function readDesc(formData: FormData) {
  return formData.get("description")?.toString();
}

function readData(formData: FormData) {
  const name = readName(formData);

  const color = readColor(formData);

  const description = readDesc(formData);

  return { name, color, description };
}

export async function getAllTags(){
  return await prisma.tags.findMany({
    orderBy: {id: 'desc'}
  })
}

export async function addTag(formData: FormData) {
  const { name, color, description } = readData(formData);

  await prisma.tags.create({
    data: {
      name,
      color,
      description,
    },
  });

  revalidatePath("/settings/tags");
}

export async function editTag(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const tag = await prisma.tags.findUnique({
    where: {
      id,
    },
  });

  if (!tag) {
    throw new Error("Invalid tag");
  }

  const { name, color, description } = readData(formData);
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
