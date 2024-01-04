import prisma from "@/lib/db/prisma";
import { assets } from "@prisma/client";

export class Loader{
    static async byAsset(asset: assets){
        return await prisma.asset_logs.findMany({
            orderBy:{id:'desc'},
            where:{
              object_id:{
                equals: asset.id
              },
              object_type: 'asset'
            }
          })
    }
}
