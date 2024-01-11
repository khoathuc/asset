import { getCurrentUser } from "@/lib/session";
import { depreciations } from "@prisma/client";

export class Listener {
  private depreciation?: depreciations;

  constructor(depreciation: depreciations) {
    this.depreciation = depreciation;
  }

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
