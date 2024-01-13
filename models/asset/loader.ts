import prisma from "@/lib/db/prisma";
import { AssetLog } from "./asset_log/asset_log";
import { users } from "@prisma/client";
import { getCurrentUser } from "@/lib/session";

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

  static async getUserAsset(user: users|null = null){
    if(!user){
      user = await getCurrentUser();
    }

    return await prisma.assets.findMany({
      orderBy: {id: "desc"},
      where: {
        assignee_id: user?.id
      }
    })
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

  static async getInLocations(location_ids: number[], opts: any = null) {
    var query:any = {
      location_id: {
        in: location_ids,
      },
    };
    if (opts) {
      if (opts.depreciable != null) {
        query = { ...query, is_depreciable: opts.depreciable };
      }
    }

    return await prisma.assets.findMany({
      where: query,
    });
  }
}
