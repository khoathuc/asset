import prisma from "@/lib/db/prisma";

export class Loader {
  static async all() {
    return await prisma.statuses.findMany({
      orderBy: { id: "desc" },
      take: 10,
    });
  }
}
