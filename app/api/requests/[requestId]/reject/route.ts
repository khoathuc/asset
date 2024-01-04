import prisma from "@/lib/db/prisma";
import { Request } from "@/models/request/request";
import { User } from "@/models/user/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const res = await rejectRequest(data);

    await Request.on(res).reject();
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
}

async function rejectRequest(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const request = await prisma.requests.findUnique({
    where: {
      id,
    },
  });

  if (!request) {
    throw new Error("Invalid request");
  }

  const rejector_id = parseInt(formData.get("approval_id")?.toString() ?? "");
  //Check if rejector is validate user
  const rejector = await User.loader().getById(rejector_id);
  const req_checkout = Request.checkout(request, null, rejector);
  const verify = req_checkout.verifyReject();
  if (!verify.res) {
    throw new Error(verify.message);
  }

  req_checkout.reject();
  const status = req_checkout.checkout();

  return await prisma.requests.update({
    where: {
      id: id,
    },
    data: {
      rejections: req_checkout.getRejections() as any,
      status: status,
    },
  });
}
