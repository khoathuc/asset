import prisma from "@/lib/db/prisma";
import { AssetLog } from "./asset_log/asset_log";

export class Loader {
  static async paginate(query: string | null = null) {
    if (!query || query === "") {
      return await prisma.assets.findMany({
        orderBy: { id: "desc" },
      });
    }

    return await prisma.assets.findMany({
      orderBy: { id: "desc" },
      where: {
        name: {
          contains: query,
        },
      },
    });
  }

  static async getById(id: number) {
    return await prisma.assets.findUnique({
      where: {
        id,
      },
    });
  }


  static async getLog(id: number) {
    const request = await this.getById(id);
    if (!request) {
      throw new Error("Invalid request");
    }

    return await AssetLog.loader().byAsset(request);
  }
}
