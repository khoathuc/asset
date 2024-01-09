import { audits } from "@prisma/client";
import { Loader } from "./loader";
import { Reader } from "./reader";
import { Listener } from "./listener";
import { AuditLog, assetExportData } from "./audit_log/audit_log";
import prisma from "@/lib/db/prisma";

export class Audit {
  public static loader() {
    return Loader;
  }

  /**
   * @param FormData formData
   * @returns Reader
   */
  public static reader(formData: FormData) {
    return new Reader(formData);
  }

  public static on(audit: audits) {
    return new Listener(audit);
  }

  //finalized audit
  public static async finalize(audit: audits) {
    const audit_logs = await AuditLog.loader().byAudit(audit);

    const audit_asset_logs = audit_logs.filter((audit_log) => {
      return audit_log.metatype == "asset";
    });

    const correct_logs = audit_asset_logs.filter((audit_asset_log) => {
      return audit_asset_log.is_correct == true;
    });

    const incorrect_logs = audit_asset_logs.filter((audit_asset_log) => {
      return audit_asset_log.is_correct == false;
    });

    var asset_logs = [];
    audit_asset_logs.forEach((audit_asset_log) => {
      const asset_export = audit_asset_log.object_export;
      if (asset_export) {
        asset_logs.push({ id: asset_export.id, name: asset_export.name });
      }
    });

    var audited_logs = [];
    audit_asset_logs.forEach((audit_asset_log)=>{
        const asset_export = audit_asset_log.object_export;
        if(asset_export){
            audited_logs.push({ id: asset_export.id, name: asset_export.name });
        }
    })

    const stat = {
      assets: asset_logs,
      auditeds: audited_logs,
      corrects: correct_logs.length,
      incorrects: incorrect_logs.length,
    };

    console.log(stat)
    await prisma.audits.update({
      where: {
        id: audit.id,
      },
      data: {
        data: {
            stat
        },
      },
    });
  }
}
