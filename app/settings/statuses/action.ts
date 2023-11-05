"use server";
import prisma from "@/lib/db/prisma";
import { StatusType } from "@prisma/client";
import { revalidatePath } from "next/cache";

function readType(formData: FormData): StatusType | undefined {
  const validType = ["1", "2", "3", "4"];
  const type = formData.get("type")?.toString();
  if (!type) {
    throw new Error("Status type is required");
  }

  if (validType.includes(type)) {
    switch (type) {
      case "1":
        return "DEPLOYABLE";
        break;
      case "2":
        return "PENDING";
        break;
      case "3":
        return "UNDEPLOYABLE";
        break;
      case "4":
        return "ARCHIVED";
        break;
      default:
        throw new Error("Type is invalid");
        break;
    }
  }
}

function readName(formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name) {
    throw new Error("Name is required");
  }

  return name;
}

function readIsDefault(formData: FormData) {
  const isDefault = formData.get("default")?.toString();
  if (isDefault === "true") {
    return true;
  }
  if (isDefault === "false") {
    return false;
  }

  throw new Error("Invalid is default");
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

function readData(formData: FormData) {
  const name = readName(formData);

  const type = readType(formData);

  const notes = formData.get("notes")?.toString();

  const isDefault = readIsDefault(formData);

  const color = readColor(formData);

  return { name, type, notes, isDefault, color };
}

export async function addStatus(formData: FormData) {
  const { name, type, notes, isDefault, color } = readData(formData);

  await prisma.statuses.create({
    data: {
      name,
      type,
      notes,
      default: isDefault,
      color,
    },
  });

  revalidatePath("/settings/statuses");
}

export async function editStatus(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const status = await prisma.statuses.findUnique({
    where: {
      id,
    },
  });

  if (!status) {
    throw new Error("Invalid status");
  }

  const { name, type, notes, isDefault, color } = readData(formData);

  await prisma.statuses.update({
    where: {
      id: id,
    },
    data: {
      name,
      type,
      notes,
      default: isDefault,
      color,
    },
  });

  revalidatePath("/settings/locations");
}
