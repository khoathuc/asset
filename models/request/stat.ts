import prisma from "@/lib/db/prisma";

export class Stat {
  async all() {
    const asset_count = await prisma.requests.count();

    return asset_count;
  }

  async groupByStatus(){
    const stat = await prisma.requests.groupBy({
        by: ['status'],
        _count:{
            status:true
        }
    })

    return stat;
  }
}
