import { Assignee } from "@/app/assets/@attrs/Assignee";
import { Status } from "@/app/assets/@attrs/Status";
import { Type } from "@/app/assets/@attrs/Type";
import DisplaySection from "@/components/layout/DisplaySection";
import UserAva from "@/components/ui/user/UserAva";
import { audit_logs, audits } from "@prisma/client";
import Link from "next/link";
import AuditAssetLogAttrName from "../@attr/AuditAssetLogAttrName";
import { assetExportData } from "@/models/audit/audit_log/audit_log";
import { AuditAssetLogAttrType } from "../@attr/AuditAssetLogAttrType";
import { AuditAssetLogAttrResult } from "../@attr/AuditAssetLogAttrResult";
import { AuditAssetLogAttrStatus } from "../@attr/AuditAssetLogAttrStatus";
import AuditAssetCheckbox from "../@button/AuditAssetCheckbox";

type AuditAssetBoardType = {
  audit: audits;
  audit_asset_logs: audit_logs[];
};

export default function AuditAssetBoard({
  audit,
  audit_asset_logs,
}: AuditAssetBoardType) {
  return (
    <table className="table table-zebra table-auto">
      <thead>
        <tr>
          <th>Code</th>
          <th>Asset</th>
          <th>Assignee</th>
          <th>Type</th>
          <th>Status</th>
          <th>Audited</th>
          <th>Result</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {audit_asset_logs.map((asset_log) => {
          const asset = asset_log.object_export as assetExportData;
          if (!asset) {
            return <></>;
          }
          return (
            <tr>
              <td>{asset.code || "-----"}</td>
              <th>
                <Link
                  href={`/assets/${asset.id}`}
                  target="_blank"
                  className="link-neutral hover:link"
                >
                  <AuditAssetLogAttrName asset={asset} />
                </Link>
              </th>
              <td>
                {asset.assignee_id ? (
                  <UserAva user_id={asset.assignee_id} size={6} />
                ) : (
                  "----"
                )}
              </td>
              <td>
                <AuditAssetLogAttrType asset={asset} />
              </td>
              <td>
                <AuditAssetLogAttrStatus asset={asset} />
              </td>
              <td>
                <div className="flex justify-center">
                  <AuditAssetCheckbox asset_log={asset_log} />
                </div>
              </td>
              <td>
                <AuditAssetLogAttrResult asset_log={asset_log} asset={asset} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
