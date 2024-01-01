"use server";
import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { User } from "@/models/user/user";
import { request_types } from "@prisma/client";
import { revalidatePath } from "next/cache";

function readName(formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name) {
    throw new Error("Name is required");
  }

  return name;
}

function readAllowChangeApprovers(formData: FormData) {
  const allow_change_approvers = formData
    .get("allow_change_approvers")
    ?.toString();

  if (allow_change_approvers === "true") {
    return true;
  } else if (allow_change_approvers === "false") {
    return false;
  }

  throw new Error("Invalid allow change approvers type");
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

async function readDefaultApprovers(formData: FormData) {
  const default_approvers = formData.get("default_approvers")?.toString();
  if (!default_approvers || default_approvers.length == 0) {
    throw new Error("Empty or invalid default approvers");
  }

  const approver_ids = JSON.parse(default_approvers);
  approver_ids.forEach(async (approver_id: string | number) => {
    const user = await User.loader().getById(parseInt(approver_id.toString()));
    if (!user) {
      throw new Error("Invalid approvers");
    }
    if (!user.activated) {
      throw new Error("One approver is not activate anymore");
    }
  });

  return approver_ids;
}

async function readDefaultFollowers(formData: FormData) {
  const default_followers = formData.get("default_followers")?.toString();
  if (!default_followers || default_followers.length == 0) {
    throw new Error("Empty or invalid default followers");
  }

  const follower_ids = JSON.parse(default_followers);
  follower_ids.forEach(async (follower_id: string | number) => {
    const user = await User.loader().getById(parseInt(follower_id.toString()));
    if (!user) {
      throw new Error("Invalid followers");
    }
    if (!user.activated) {
      throw new Error("One follower is not activate anymore");
    }
  });

  return follower_ids;
}

function readCForm(formData: FormData){
  const form = formData.get("form")?.toString();
  if(!form){
    return ;
  }
  return JSON.parse(form)
}

function readDescription(formData: FormData){
  return formData.get("description")?.toString();
}

async function readData(formData: FormData) {
  const name = readName(formData);
  const default_approvers = await readDefaultApprovers(formData);
  const default_followers = await readDefaultFollowers(formData);
  const allow_change_approvers = readAllowChangeApprovers(formData);
  const approval_follow = readApprovalFlow(formData);
  const description = readDescription(formData);

  return {
    name,
    default_approvers,
    default_followers,
    allow_change_approvers,
    description,
    approval_follow,
  };
}

export async function addRequestType(formData: FormData) {
  const {
    name,
    default_approvers,
    default_followers,
    allow_change_approvers,
    description,
    approval_follow,
  } = await readData(formData);

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
  const requestType = await prisma.request_types.findUnique({
    where: {
      id,
    },
  });

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
  } = await readData(formData);

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
  if (!query || query === "") {
    return await prisma.request_types.findMany({
      orderBy: { id: "desc" },
    });
  }

  return await prisma.request_types.findMany({
    orderBy: { id: "desc" },
    where: {
      name: {
        contains: query,
      },
    },
  });
}

export async function editCform(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const type = await prisma.request_types.findUnique({
    where: {
      id,
    },
  });

  if (!type) {
    throw new Error("Invalid type");
  }

  const form = readCForm(formData);

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


export async function getRequestType(id: number) {
  return await prisma.request_types.findUnique({
    where: {
      id: id,
    },
  });
}
