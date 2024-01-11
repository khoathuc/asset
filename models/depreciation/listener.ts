import { getCurrentUser } from "@/lib/session";
import { depreciations } from "@prisma/client";

export class Listener {
  private depreciation?: depreciations;

  constructor(depreciation: depreciations) {
    this.depreciation = depreciation;
  }


  //Not doing somuch this time
  async create(){
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Invalid depreciation creator");
    }
    if (!this.depreciation) {
      throw new Error("Invalid depreciation");
    }

  }
}
