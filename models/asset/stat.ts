import prisma from "@/lib/db/prisma";

export class Stat{
    async all(){
        const asset_count = await prisma.assets.count();
        
        return asset_count;
    }


    async lifeCycleSum(){
        const life_cycle_sum = await prisma.assets.aggregate({
            _sum:{
                life_cost: true
            }
        })

        return life_cycle_sum._sum;
    }
}