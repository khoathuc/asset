"use server";

import { uploadFile } from "../../base/file";
import prisma from "@/lib/db/prisma";
import { locations } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function readData(formData: FormData) {
  const description = formData.get("description")?.toString();
  const address = formData.get("address")?.toString();

  const file: File | null = formData.get("file") as unknown as File;
  var image_url;
  if (file) {
    image_url = await uploadFile(file);
  }

  const name = formData.get("name")?.toString();
  if (!name) {
    throw Error("Name is required");
  }

  return { name, description, address, image_url };
}

export async function getLocation(id: number){
  return await prisma.locations.findUnique({
    where:{
      id: id
    }
  })
}

export async function getAllLocations(query: string | null = null) {
  if (!query || query === "") {
    return await prisma.locations.findMany({
      orderBy: { id: "desc" },
    });
  }
  
  return await prisma.locations.findMany({
    orderBy: { id: "desc" },
    where: {
      name: {
        contains: query,
      },
    },
  });
}

export async function addLocation(formData: FormData) {
  const { name, description, address, image_url } = await readData(formData);

  await prisma.locations.create({
    data: {
      name,
      description,
      address,
      image: image_url,
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
  const location = await prisma.locations.findUnique({
    where: {
      id,
    },
  });

  if (!location) {
    throw new Error("Invalid Location");
  }

  const { name, description, address, image_url } = await readData(formData);

  await prisma.locations.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description,
      address,
      image: image_url,
    },
  });

  revalidatePath("/settings/locations");
}
