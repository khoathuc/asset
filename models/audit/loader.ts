import prisma from "@/lib/db/prisma";

export class Loader{
    static async all(query: string | null = null){
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
}