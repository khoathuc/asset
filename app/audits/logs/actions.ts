"use server";
import { Audit } from "@/models/audit/audit";
import { audits } from "@prisma/client";

export async function getAuditLogs(audit: audits) {
  return await Audit.loader().getLog(audit.id);
}
