import prisma from "@/lib/db/prisma";
import { Request } from "@/models/request/request";
import { User } from "@/models/user/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const res = await approveRequest(data);

    await Request.on(res).approve();

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
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
  //Check if approver is validate user
  const approver = await User.loader().getById(approver_id);
  const req_checkout = Request.checkout(request, approver);
  const verify = req_checkout.verifyApprove();
  if(!verify.res){
    throw new Error(verify.message);
  }

  req_checkout.approve();
  const status = req_checkout.checkout();

  const res = await prisma.requests.update({
    where: {
      id: id,
    },
    data: {
      approvals: req_checkout.getApprovals() as any,
      status: status,
    },
  });

  return res
}

