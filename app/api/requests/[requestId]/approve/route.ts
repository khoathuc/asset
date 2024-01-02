import { APPROVED_STATUS } from "@/app/requests/statuses";
import { PARALLEL_FLOW } from "@/app/settings/request_types/approval_flow/approval.flow";
import prisma from "@/lib/db/prisma";
import { User } from "@/models/user/user";
import { requests } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    await approveRequest(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
}

/**
 * @desc return status of request depend on the approval_flow and approvals
 * @param request
 * @param approvals
 */
function readStatus(request: requests, approvals: any, rejections: any) {
  const approval_flow = request.approval_follow;

  if (!request.approvers || !Array.isArray(request.approvers)) {
    throw new Error("Request approvers is invalid");
  }

  if (approval_flow == PARALLEL_FLOW) {
    if (approvals.length == request.approvers.length) {
      return APPROVED_STATUS;
    }
  }
}

async function approveRequest(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const request = await prisma.requests.findUnique({
    where: {
      id,
    },
  });

  if (!request) {
    throw new Error("Invalid request");
  }

  const approver_id = parseInt(formData.get("approval_id")?.toString() ?? "");
  const approver = await User.loader().getById(approver_id);
  if (!approver) {
    throw new Error("Invalid approvers");
  }
  if (!approver.activated) {
    throw new Error("One approver is not activate anymore");
  }

  if (!request.approvers || !Array.isArray(request.approvers)) {
    throw new Error("Request do not have approvers");
  }

  if (!request.approvers.includes(approver_id)) {
    throw new Error("User is not allowed to approve request");
  }

  if (request.approvals && Array.isArray(request.approvals)) {
    if (request.approvals.includes(approver_id)) {
      throw new Error("User has already approved this request");
    }
  }

  var approvals: any = request.approvals ? request.approvals : [];
  approvals.push(approver_id);

  const status = readStatus(request, approvals, request.rejections);

  await prisma.requests.update({
    where: {
      id: id,
    },
    data: {
      approvals: approvals,
      status: status,
    },
  });
}

