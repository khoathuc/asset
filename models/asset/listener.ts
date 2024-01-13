import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { assets } from "@prisma/client";

export class Listener {
  private asset?: assets;

  constructor(asset: assets) {
    this.asset = asset;
  }

  async create() {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Invalid asset creator");
    }
    if (!this.asset) {
      throw new Error("Invalid asset");
    }

    return await prisma.asset_logs.create({
      data: {
        name: "Create",
        user_id: Number(user?.id),
        metatype: "create",
        object_id: this.asset.id,
        object_export: {
          name: this.asset.name,
          id: this.asset.id,
          code: this.asset.code,
        },
        object_type: "asset",
        action_cost: this.asset.purchase_price,
        action_date: this.asset.since,
        changes: {},
        description: `${user.username} has created this request`,
        file: this.asset.file,
      },
    });
  }

  async edit(){
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Invalid asset creator");
    }
    if (!this.asset) {
      throw new Error("Invalid asset");
    }

    return await prisma.asset_logs.create({
      data: {
        name: "Edit",
        user_id: Number(user?.id),
        metatype: "edit",
        object_id: this.asset.id,
        object_export: {
          name: this.asset.name,
          id: this.asset.id,
          code: this.asset.code,
        },
        object_type: "asset",
        action_cost: this.asset.purchase_price,
        action_date: this.asset.since,
        changes: {},
        description: `${user.username} has edited this request`,
        file: this.asset.file,
      },
    });
  }

  async action(action_data: any) {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Invalid asset creator");
    }
    if (!this.asset) {
      throw new Error("Invalid asset");
    }

    const {name, action_cost, action_date, changes_log, description, file_url} = action_data;
    
    await prisma.asset_logs.create({
      data: {
        name: name,
        user_id: Number(user?.id),
        metatype: "update",
        object_id: this.asset.id,
        object_export: {
          name: this.asset.name,
          id: this.asset.id,
          code: this.asset.code,
        },
        object_type: "asset",
        action_cost: action_cost,
        action_date: action_date,
        changes: changes_log,
        description: description,
        file: file_url,
      },
    });
  }
}
