"use server";

import { uploadFile } from "../../base/file";
import prisma from "@/lib/db/prisma";
import { locations } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addLocation(formData: FormData) {
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const address = formData.get("address")?.toString();

  const file: File | null = formData.get("file") as unknown as File;
  var file_path;
  if (file) {
    file_path = await uploadFile(file);
  }

  if (!name) {
    throw Error("Name is required");
  }

  await prisma.locations.create({
    data: {
      name,
      description,
      address,
      image: file_path,
      status: true,
    },
  });

  revalidatePath("/settings/locations");
}

export async function changeStatus(checked: boolean, location: locations) {
  if (!location) {
    throw Error("Location is required");
  }

  return await prisma.locations.update({
    where: {
      id: location.id,
    },
    data: {
      status: checked,
    },
  });
}

export async function editLocation(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const address = formData.get("address")?.toString();

  const file: File | null = formData.get("file") as unknown as File;
  var file_path;
  if (file) {
    file_path = await uploadFile(file);
  }

  if (!name || !id) {
    throw Error("Name is required");
  }

  await prisma.locations.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description,
      address,
    },
  });
}
