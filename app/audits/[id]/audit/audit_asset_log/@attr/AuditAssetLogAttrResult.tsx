import {
  assetExportData,
} from "@/models/audit/audit_log/audit_log";
import { audit_logs } from "@prisma/client";

export function AuditAssetLogAttrResult({
  asset,
  asset_log,
}: {
  asset: assetExportData;
  asset_log: audit_logs;
}) {
  if (asset_log.is_correct == null) {
    return <></>;
  }

  if (asset_log.is_correct) {
    return (
      <div className="-status badge badge-success p-2 text-xs text-white">
        Correct
      </div>
    );
  }

  return (
    <div className="-status badge badge-error p-2 text-xs text-white">
      Incorrect
    </div>
  );
}
