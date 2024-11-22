import prisma from "@/lib/db/prisma";

export class Stat{
    async all(){
        const vendor_stat = await prisma.vendors.count();

        return vendor_stat;
    }
}