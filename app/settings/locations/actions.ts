"use server";

import { uploadFile } from "../../base/file";
import prisma from "@/lib/db/prisma";
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

  if(!name){
    throw Error("Missing required fields");
  }

  await prisma.locations.create({
    data: {
      name,description, address, image:file_path
    },
  });

  revalidatePath('/settings/locations');
}
