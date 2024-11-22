import prisma from "@/lib/db/prisma";

export class Loader {
  static async paginate(query: string | null = null) {
    if (!query || query === "") {
      return await prisma.request_types.findMany({
        orderBy: { id: "desc" },
      });
    }

    return await prisma.request_types.findMany({
      orderBy: { id: "desc" },
      where: {
        name: {
          contains: query,
        },
      },
    });
  }

  static async getById(id: number) {
    return await prisma.request_types.findUnique({
      where: {
        id: id,
      },
    });
  }
}
