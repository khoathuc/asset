"use server";
import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { RequestType } from "@/models/request_type/request_type";
import { request_types } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function addRequestType(formData: FormData) {
  const {
    name,
    default_approvers,
    default_followers,
    allow_change_approvers,
    description,
    approval_follow,
  } = await RequestType.reader(formData).read();

  const user = await getCurrentUser();

  await prisma.request_types.create({
    data: {
      user_id: user ? user.id : 0,
      name,
      default_approvers,
      default_followers,
      allow_change_approvers,
      approval_follow,
      description,
      status: true,
    },
  });

  revalidatePath("/settings/request_types");
}

export async function changeStatus(
  checked: boolean,
  requestType: request_types,
) {
  if (!requestType) {
    throw Error("Request Type is required");
  }

  return await prisma.request_types.update({
    where: {
      id: requestType.id,
    },
    data: {
      status: checked,
    },
  });
}

export async function editRequestType(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const requestType = await RequestType.loader().getById(id);
  if (!requestType) {
    throw new Error("Invalid request type");
  }

  const {
    name,
    default_approvers,
    default_followers,
    allow_change_approvers,
    approval_follow,
    description
  } = await RequestType.reader(formData).read();

  await prisma.request_types.update({
    where: {
      id,
    },
    data: {
      name,
      default_approvers,
      default_followers,
      allow_change_approvers,
      description,
      approval_follow,
    },
  });

  revalidatePath("/settings/request_types");
}

export async function getAllRequestTypes(query: string | null = null) {
  return await RequestType.loader().paginate(query);
}

export async function editCform(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const requestType = await RequestType.loader().getById(id);
  if (!requestType) {
    throw new Error("Invalid request type");
  }

  const form = await RequestType.reader(formData).readCForm();

  await prisma.request_types.update({
    where: {
      id: id,
    },
    data: {
      form:form || null
    },
  });
  
  revalidatePath("/settings/request_types");
}


export async function getRequestTypeById(id: number){
  return await RequestType.loader().getById(id);
}
