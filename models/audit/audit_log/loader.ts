import prisma from "@/lib/db/prisma";
import { audits } from "@prisma/client";

export class Loader {
  static async byAudit(audit: audits) {
    return await prisma.audit_logs.findMany({
      orderBy: { id: "desc" },
      where: {
        audit_id: audit.id,
      },
    });
  }
}
