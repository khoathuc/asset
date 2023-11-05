"use server";

import { uploadFile } from "@/app/base/file";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

async function readData(formData: FormData) {
  const phone = formData.get("phone")?.toString();
  const contact = formData.get("contact")?.toString();
  const url = formData.get("url")?.toString();
  const address = formData.get("address")?.toString();
  const email = formData.get("email")?.toString();
  const description = formData.get("description")?.toString();

  const file: File | null = formData.get("image") as unknown as File;
  var image_url;
  if (file) {
    image_url = await uploadFile(file);
  }

  const name = formData.get("name")?.toString();
  if (!name) {
    throw Error("Name is required");
  }

  return { name, phone, contact, url, address, email, description, image_url };
}

export async function addVendor(formData: FormData) {
  const { name, phone, contact, url, address, email, description, image_url } =
    await readData(formData);

  await prisma.vendors.create({
    data: {
      name,
      phone,
      contact,
      url,
      address,
      email,
      description,
      image: image_url,
    },
  });

  revalidatePath("/settings/vendors");
}

export async function editVendor(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const vendor = await prisma.vendors.findUnique({
    where: {
      id,
    },
  });

  if (!vendor) {
    throw new Error("Invalid Vendor");
  }

  const { name, phone, contact, url, address, email, description, image_url } =
    await readData(formData);

  await prisma.vendors.update({
    where: {
      id,
    },
    data: {
      name,
      phone,
      contact,
      url,
      address,
      email,
      description,
      image: image_url,
    },
  });

  revalidatePath("/settings/vendors");
}
