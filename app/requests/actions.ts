"use server";
import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { getUserById } from "../users/actions";
import { uploadFile } from "../base/file";
import { APPROVED_STATUS, PENDING_STATUS, getStatus } from "./statuses";
import { revalidatePath } from "next/cache";
import { getRequestType } from "../settings/request_types/action";
import { requests } from "@prisma/client";
import { PARALLEL_FLOW } from "@/components/ui/form/Select/approval_flow/approval.flow";

async function readFile(formData: FormData) {
  const file: File | null = formData.get("file") as unknown as File;
  var file_url;
  if (file) {
    file_url = await uploadFile(file);
  }

  return file_url;
}

function readName(formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name) {
    throw new Error("Name is required");
  }

  return name;
}

function readCForm(formData: FormData) {
  const form = formData.get("form")?.toString();

  console.log(form);
  if (!form) {
    return;
  }
  return JSON.parse(form);
}

async function readRequestType(formData: FormData) {
  const request_type_id = formData.get("request_type_id")?.toString();
  if (request_type_id) {
    const request_type = await getRequestType(parseInt(request_type_id));
    if (!request_type) {
      throw new Error("This request type is not exist");
    }
    return request_type;
  }

  throw new Error("Request type is invalid");
}

function readApprovalFlow(formData: FormData) {
  const approval_follow = formData.get("approval_follow")?.toString();
  if (!approval_follow) {
    throw new Error("Approval flow is required");
  }

  if (!["sequential", "parallel", "one_approver"].includes(approval_follow)) {
    throw new Error("Invalid approval flow");
  }

  return approval_follow;
}

export async function validateUser(user_id: number){
  const user = await getUserById(user_id);

  if (!user) {
    throw new Error("Invalid approvers");
  }
  if (!user.activated) {
    throw new Error("One approver is not activate anymore");
  }

  return user;
}

async function readApprovers(formData: FormData) {
  const approvers = formData.get("approvers")?.toString();
  if (!approvers || approvers.length == 0) {
    throw new Error("Empty or invalid approvers");
  }

  const approver_ids = JSON.parse(approvers);
  approver_ids.forEach(async (approver_id: string | number) => {
    await validateUser(parseInt(approver_id.toString()));
  });

  return approver_ids;
}

async function readFollowers(formData: FormData) {
  const followers = formData.get("followers")?.toString();
  if (!followers || followers.length == 0) {
    throw new Error("Empty or invalid followers");
  }

  const follower_ids = JSON.parse(followers);
  follower_ids.forEach(async (follower_id: string | number) => {
    await validateUser(parseInt(follower_id.toString()));
  });

  return follower_ids;
}

function readDesc(formData: FormData) {
  return formData.get("description")?.toString();
}

async function readData(formData: FormData) {
  const name = readName(formData);
  const request_type_id = await readRequestType(formData).then((res) => {
    return res.id;
  });

  const approval_follow = readApprovalFlow(formData);
  const approvers = await readApprovers(formData);
  const followers = await readFollowers(formData);
  const file_url = await readFile(formData);
  const description = readDesc(formData);
  const form = readCForm(formData);

  return {
    name,
    request_type_id,
    approval_follow,
    approvers,
    followers,
    file_url,
    form,
    description,
  };
}

export async function addRequest(formData: FormData) {
  const data = await readData(formData);

  const user = await getCurrentUser();

  await prisma.requests.create({
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

export async function getRequestLogs(id: number) {
  return await prisma.request_logs.findMany({
    orderBy: { id: "desc" },
    where: {
      request_id: {
        equals: id,
      },
    },
  });
}