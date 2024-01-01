"use server";

import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { actions } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getAllActions(query: string | null = null) {
  if (!query || query === "") {
    return await prisma.actions.findMany({
      orderBy: { id: "desc" },
    });
  }

  return await prisma.actions.findMany({
    orderBy: { id: "desc" },
    where: {
      name: {
        contains: query,
      },
    },
  });
}

function readChangeFields(formData: FormData) {
  const change_fields = formData.get("change_fields")?.toString();
  if (!change_fields) {
    return;
  }

  return JSON.parse(change_fields);
}

function readConditions(formData: FormData) {
  const conditions = formData.get("conditions")?.toString();
  if (!conditions) {
    return;
  }

  return JSON.parse(conditions);
}

async function readData(formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name) {
    throw new Error("Name is required");
  }

  const change_fields = readChangeFields(formData);

  const conditions = readConditions(formData);

  return { name, change_fields, conditions };
}

export async function addAction(formData: FormData) {
  const { name, change_fields, conditions } = await readData(formData);
  const user = await getCurrentUser();

  await prisma.actions.create({
    data: {
      name,
      change_fields,
      user_id: user?.id,
      conditions,
      status: true,
    },
  });

  revalidatePath("/settings/actions");
}

export async function editAction(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const action = await prisma.actions.findUnique({
    where: {
      id,
    },
  });

  if(!action){
    throw new Error("Invalid action");
  }

  const { name, change_fields, conditions } = await readData(formData);
  const user = await getCurrentUser();

  await prisma.actions.update({
    where:{
      id
    },
    data: {
      name,
      change_fields,
      user_id: Number(user?.id),
      conditions,
      status: true,
    },
  });

  revalidatePath("/settings/actions");
}

export async function changeStatus(checked: boolean, action: actions) {
  if (!action) {
    throw new Error("Actoin is invalid");
  }

  return await prisma.actions.update({
    where: {
      id: action.id,
    },
    data: {
      status: checked,
    },
  });
}
