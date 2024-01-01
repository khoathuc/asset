import prisma from "@/lib/db/prisma";

export class Loader {
  static async all() {
    return prisma.vendors.findMany({
      orderBy: { id: "desc" },
      take: 10,
    });
  }

  static async paginate(query: string | null = null) {
    if (!query || query === "") {
      return await prisma.vendors.findMany({
        orderBy: { id: "desc" },
      });
    }

    return await prisma.vendors.findMany({
      orderBy: { id: "desc" },
      where: {
        name: {
          contains: query,
        },
      },
    });
  }

  static async getById(id:number){
    return await prisma.vendors.findUnique({
      where: {
        id: id,
      },
    });
  }
}
