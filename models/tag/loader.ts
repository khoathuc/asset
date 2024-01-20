import prisma from "@/lib/db/prisma";

export class Loader {
  /**
   * @desc get all tags
   * @returns tags
   */
  public static async all() {
    return await prisma.tags.findMany({
      orderBy: { id: "desc" },
    });
  }

  public static async getById(id: number){
    return await prisma.tags.findUnique({
        where: {
          id,
        },
      });
  }

}
