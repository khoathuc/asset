import prisma from "@/lib/db/prisma";

export class Loader {
  /**
   * @desc return all locations with paginate
   * @returns locations
   */
  public static async paginate() {
    const locations = await prisma.locations.findMany({
      orderBy: { id: "desc" },
      take: 10,
    });

    return locations;
  }

  /**
   * @desc return location by id
   * @param id
   * @return locations|undefined
   */
  public static async getById(id: number) {
    return await prisma.locations.findUnique({
      where: {
        id: id,
      },
    });
  }
}
