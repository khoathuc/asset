import prisma from "@/lib/db/prisma";

export class Loader {
  static async all() {
    return await prisma.statuses.findMany({
      orderBy: { id: "desc" },
      take: 10,
    });
  }


  static async getDefault(){
    return await prisma.statuses.findFirst({
      where:{
        default: true
      }
    })
  }
  

  static async getById(id: number){
    return await prisma.statuses.findUnique({
      where:{
        id: id
      }
    })
  }
}
