import prisma from "@/lib/db/prisma";
import { requests } from "@prisma/client";

export class Loader{
    static async byRequest(request: requests){
        return await prisma.request_logs.findMany({
            orderBy:{id:'desc'},
            where:{
              object_id:{
                equals: request.id
              },
              object_type: 'request'
            }
          })
    }
}
