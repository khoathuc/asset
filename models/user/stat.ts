import prisma from "@/lib/db/prisma";

export class Stat{
    async all(){
        const user_count = await prisma.users.count();
        
        return user_count;
    }


    async role(){
        const user_role_stat = await prisma.users.groupBy({
            by: ['role'],
            _count:{
                role:true
            }
        })
        
        return user_role_stat;
    }
}