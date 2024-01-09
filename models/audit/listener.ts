import prisma from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/session";
import { audits } from "@prisma/client";
import { Asset } from "../asset/asset";
import { auditAssetLogData } from "./audit_log/audit_log";

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

      //ADD AUDIT CREATE LOG
      await prisma.audit_logs.create({
        data: {
          metatype: "create",
          user_id: user.id,
          audit_id: this.audit.id,
        },
      });

      //ADD AUDIT ASSET LOG
      var audit_assets_data: auditAssetLogData[] = [];
      const location_assets = await Asset.loader().getInLocations(
        this.audit.locations as any,
      );
      location_assets.forEach((location_asset) => {
        audit_assets_data.push({
          asset_id: location_asset.id,
          object_export: {
            id: location_asset.id,
            name: location_asset.name,
            code: location_asset.code,
            assignee_id: location_asset.assignee_id,
            type_id: location_asset.type_id,
            status_id: location_asset.status_id
          },
          audit_id: this.audit?.id,
          user_id: user.id,
          metatype: "asset",
        });
      });

      await prisma.audit_logs.createMany({
        data: audit_assets_data,
      });

      //UPDATE LOCATION STATUS
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
