"use server";

import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { Action } from "@/models/action/action";
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

export async function addAction(formData: FormData) {
  const { name, change_fields, conditions } = await Action.reader(formData).read();
  
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
  const action = await Action.loader().getById(id);

  if(!action){
    throw new Error("Invalid action");
  }

  const { name, change_fields, conditions } = await Action.reader(formData).read();
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
    throw new Error("Action is invalid");
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
