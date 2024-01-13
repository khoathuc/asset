"use server";
import prisma from "@/lib/db/prisma";
import { locations } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { Location } from "@/models/location/location";

export async function getAllLocations(query: string | null = null) {
  return await Location.loader().getAllLocations();
}

export async function addLocation(formData: FormData) {
  const data = await Location.reader().read(formData);

  await prisma.locations.create({
    data: { ...data, status: true, auditing: false },
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
