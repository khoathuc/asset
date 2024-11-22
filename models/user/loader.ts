import prisma from "@/lib/db/prisma";

export class Loader {
  static async all(query: string | null = null) {
    if (!query || query === "") {
      return await prisma.users.findMany({
        orderBy: { id: "desc" },
      });
    }

    return await prisma.users.findMany({
      orderBy: { id: "desc" },
      where: {
        username: {
          contains: query,
        },
      },
    });
  }

  static async getById(id: number) {
    return await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }
}
