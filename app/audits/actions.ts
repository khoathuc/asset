import prisma from "@/lib/db/prisma";

export async function getAllAudits(query: string | null = null) {
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