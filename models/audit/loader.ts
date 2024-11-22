import prisma from "@/lib/db/prisma";
import { AuditLog } from "./audit_log/audit_log";

export class Loader {
  static async all(query: string | null = null) {
    if (!query || query == "") {
      return await prisma.audits.findMany({
        orderBy: { id: "desc" },
      });
    }

    return await prisma.audits.findMany({
      orderBy: { id: "desc" },
      where: {
        name: {
          contains: query,
        },
      },
    });
  }

  static async getById(id: number) {
    return await prisma.audits.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async getLog(id: number) {
    const audit = await this.getById(id);
    if (!audit) {
      throw new Error("Invalid request");
    }

    return await AuditLog.loader().byAudit(audit);
  }
}
