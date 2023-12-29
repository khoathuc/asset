"use server";

import { uploadFile } from "../../base/file";
import prisma from "@/lib/db/prisma";
import { locations } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { Location } from "@/models/location/location";

export async function getLocation(id: number) {
  return await prisma.locations.findUnique({
    where: {
      id: id,
    },
  });
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
  const location = new Location();
  await location.init();

  const data = await Location.reader().read(formData);
  location.setLocation(data);

  await location.save();

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
  const location = await Location.loader().getById(id);
  if (!location) {
    throw new Error("Invalid location");
  }

  const data = await Location.reader().read(formData);

  await prisma.locations.update({
    where: { id },
    data: data,
  });

  revalidatePath("/settings/locations");
}
