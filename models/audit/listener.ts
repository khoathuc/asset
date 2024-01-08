import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { audits } from "@prisma/client";

export class Listener {
  private audit?: audits;

  constructor(audit: audits) {
    this.audit = audit;
  }

  async create() {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("Invalid audit creator");
    }
    if (!this.audit) {
      throw new Error("Invalid audit");
    }

    await prisma.audit_logs.create({
        data:{
            metatype: 'create',
            user_id: user.id,
            audit_id: this.audit.id,
        }
    })

    if(!this.audit.locations || !Array.isArray(this.audit.locations)){
        throw new Error('Invalid location');
    }

    await prisma.locations.updateMany({
        where:{
            id:{
                in: this.audit.locations as number[]
            }
        },
        data: {
            auditing: true
        }
    })
  }
}
