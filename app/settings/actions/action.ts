import prisma from "@/lib/db/prisma";

export async function getAllActions(query: string | null = null){
    if (!query || query === "") {
        return await prisma.actions.findMany({
          orderBy: { id: "desc" },
        });
      }
    
      return await prisma.actions.findMany({
        orderBy: { id: "desc" },
        where: {
          name: {
            contains: query,
          },
        },
      });
}