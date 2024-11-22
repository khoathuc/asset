import { OPEN_STATUS } from "@/app/audits/statuses";
import prisma from "@/lib/db/prisma";
import { Audit } from "@/models/audit/audit";
import { AuditLog } from "@/models/audit/audit_log/audit_log";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { asset_log_id: string } },
) {
  try {
    const asset_log_id = params.asset_log_id.toString();
    if (!asset_log_id) {
      throw new Error("Invalid asset log id");
    }
    const audit_asset_log = await AuditLog.loader().getById(
      parseInt(asset_log_id),
    );

    if (!audit_asset_log) {
      throw new Error("Invalid audit asset log");
    }

    const audit = await Audit.loader().getById(audit_asset_log.audit_id)
    if(!audit){
        throw new Error("Invalid audit");
    }
    if(!(audit.status == OPEN_STATUS)){
        throw new Error("Audit is not open");
    }

    const data = await request.formData();

    const is_correct = data.get("is_correct")?.toString();
    const description = data.get("description")?.toString();

    const log = await prisma.audit_logs.update({
        where:{
            id: audit_asset_log.id
        },
        data: {
            is_correct: is_correct=='true'? true: false,
            description: description
        }
    })

    await Audit.finalize(audit);

    return NextResponse.json({ success: true, audit_asset_log: log });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
}
