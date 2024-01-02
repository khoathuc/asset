"use server";
import prisma from "@/lib/db/prisma";

export async function getAssetLogs(id: number){
  return await prisma.asset_logs.findMany({
    orderBy:{id:'desc'},
    where:{
      object_id:{
        equals: id
      },
      object_type: 'asset'
    }
  })
}