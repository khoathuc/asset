"use server";
import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { APPROVED_STATUS, PENDING_STATUS, getStatus } from "./statuses";
import { revalidatePath } from "next/cache";
import { User } from "@/models/user/user";
import { Request } from "@/models/request/request";

export async function validateUser(user_id: number){
  const user = await User.loader().getById(user_id);

  if (!user) {
    throw new Error("Invalid approvers");
  }
  if (!user.activated) {
    throw new Error("One approver is not activate anymore");
  }

  return user;
}

export async function addRequest(formData: FormData) {
  const data = await Request.reader(formData).read();

  const user = await getCurrentUser();

  const request = await prisma.requests.create({
    data: {
      user_id: user? user.id : 0,
      name: data.name,
      request_type_id: data.request_type_id,
      approval_follow: data.approval_follow,
      approvers: data.approvers,
      followers: data.followers,
      files: data.file_url,
      form: data.form,
      status: getStatus(PENDING_STATUS)?.value,
      description: data.description,
    },
  });

  await Request.on(request).create();

  revalidatePath("/requests");
}

export async function getAllRequests(query: string | null = null) {
  if (!query || query == "") {
    return await prisma.requests.findMany({
      orderBy: { id: "desc" },
    });
  }

  return await prisma.requests.findMany({
    orderBy: { id: "desc" },
    where: {
      name: {
        contains: query,
      },
    },
  });
}

export async function getRequestById(id: number) {
  return await prisma.requests.findUnique({
    where: {
      id: id,
    },
  });
}