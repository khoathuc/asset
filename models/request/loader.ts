import prisma from "@/lib/db/prisma";

export class Loader {
  static async paginate(query: string | null = null) {
    if (!query || query === "") {
      return await prisma.requests.findMany({
        orderBy: { id: "desc" },
      });
    }

    return await prisma.requests.findMany({
      orderBy: { id: "desc" },
      where: {
        name: {
          contains: query,
        },
      },
    });
  }

  static async getById(id: number) {
    return await prisma.requests.findUnique({
      where: {
        id,
      },
    });
  }
}
