import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { audits } from "@prisma/client";
import { Asset } from "../asset/asset";

type auditAssetData = {
  asset_id: number;
  object_export: { id: number | string; name: string };
  audit_id: number;
  user_id: number;
  metatype: string;
};

export class Listener {
  private audit?: audits;

  constructor(audit: audits) {
    this.audit = audit;
  }

  async create() {
    try {
      const user = await getCurrentUser();

      if (!user) {
        throw new Error("Invalid audit creator");
      }
      if (!this.audit) {
        throw new Error("Invalid audit");
      }

      await prisma.audit_logs.create({
        data: {
          metatype: "create",
          user_id: user.id,
          audit_id: this.audit.id,
        },
      });

      var audit_assets_data: auditAssetData[] = [];
      const location_assets = await Asset.loader().getInLocations(
        this.audit.locations as any,
      );
      location_assets.forEach((location_asset) => {
        audit_assets_data.push({
          asset_id: location_asset.id,
          object_export: { id: location_asset.id, name: location_asset.name },
          audit_id: this.audit?.id,
          user_id: user.id,
          metatype: "asset",
        });
      });

      await prisma.audit_logs.createMany({
        data: audit_assets_data
      })

      if (!this.audit.locations || !Array.isArray(this.audit.locations)) {
        throw new Error("Invalid location");
      }

      await prisma.locations.updateMany({
        where: {
          id: {
            in: this.audit.locations as number[],
          },
        },
        data: {
          auditing: true,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
    }
  }
}
