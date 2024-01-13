"use server";

import { uploadFile } from "@/app/base/file";
import prisma from "@/lib/db/prisma";
import { Vendor } from "@/models/vendor/vendor";
import { revalidatePath } from "next/cache";

export async function getVendor(id: number) {
  return await Vendor.loader().getById(id);
}

export async function getAllVendors(query: string | null = null) {
  return await Vendor.loader().paginate(query);
}

export async function addVendor(formData: FormData) {
  const { name, phone, contact, url, address, email, description, image_url } =
    await Vendor.reader(formData).read();

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
  const vendor = await Vendor.loader().getById(id);

  if (!vendor) {
    throw new Error("Invalid Vendor");
  }

  const { name, phone, contact, url, address, email, description, image_url } =
    await Vendor.reader(formData).read();

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
