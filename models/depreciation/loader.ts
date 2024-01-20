import prisma from "@/lib/db/prisma";

export class Loader {
  static async all(query: string | null = null) {
    if (!query || query == "") {
      return await prisma.depreciations.findMany({
        orderBy: { id: "desc" },
      });
    }

    return await prisma.depreciations.findMany({
      orderBy: { id: "desc" },
      where: {
        name: {
          contains: query,
        },
      },
    });
  }

  static async getById(id: number){
    return await prisma.depreciations.findUnique({
      where: {
        id: id,
      },
    });
  }

}
