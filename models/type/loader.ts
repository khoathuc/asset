import prisma from "@/lib/db/prisma";

export class Loader {
  static async all() {
    return await prisma.types.findMany({
      orderBy: { id: "desc" },
      take: 10,
    });
  }

  static async paginate(query: string | null = null) {
    if (!query || query === "") {
      return await prisma.types.findMany({
        orderBy: { id: "desc" },
      });
    }

    return await prisma.types.findMany({
      orderBy: { id: "desc" },
      where: {
        name: {
          contains: query,
        },
      },
    });
  }

  static async getById(id:number){
    return await prisma.types.findUnique({
      where: {
        id,
      },
    });
  }


  static async getDepreciationConf(id: number){
    const type = await this.getById(id);

    if(!type){
      throw new Error("Invalid type");
    }

    if(!type.is_depreciable){
      throw new Error("This type is not depreciable");
    }

    return type.depreciation_conf;
  }
}
