'use client'
import { assets } from "@prisma/client";
import { useData } from "@/context/data.context";
import StatusNotFound from "@/public/shield_check.svg";
import KArray from "@/utils/array";
import { assetExportData } from "@/models/audit/audit_log/audit_log";

function EmptyStatus() {
  return (
    <>
      <div className="flex gap-2">
        <StatusNotFound className="h-5 w-5" />
        <div className="text-xs font-light">Status not found</div>
      </div>
    </>
  );
}

export function AuditAssetLogAttrStatus({ asset }: { asset: assetExportData }) {
  const { contextData } = useData();
  const { statuses } = contextData;

  if (!statuses) {
    return <EmptyStatus />;
  }

  const status = KArray.findById(statuses, asset.status_id);
  if (!status) {
    return <EmptyStatus />;
  }

  return (
    <>
      <div
        className="badge p-2 text-white text-xs -status"
        style={{ backgroundColor: status.color }}
      >
        {status.name}
      </div>
    </>
  );
}
