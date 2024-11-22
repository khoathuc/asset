import { CLOSED_STATUS } from "@/app/audits/statuses";
import prisma from "@/lib/db/prisma";
import { Audit } from "@/models/audit/audit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { audit_id: string } },
) {
  try {
    const audit_id = params.audit_id.toString();
    if (!audit_id) {
      throw new Error("Invalid audit id");
    }

    var audit = await Audit.loader().getById(parseInt(audit_id));
    if(!audit){
        throw new Error("Invalid audit");
    }

    if(audit.status == CLOSED_STATUS){
        throw new Error("Audit already closed");
    }

    audit = await prisma.audits.update({
        where:{
            id: audit.id
        },
        data: {
            status: CLOSED_STATUS
        }
    })

    return NextResponse.json({ success: true, audit: audit });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
}
