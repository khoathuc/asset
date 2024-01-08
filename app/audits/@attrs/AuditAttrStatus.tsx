"use client";
import { auditStatuses } from "@/app/audits/statuses";
import StatusNotFound from "@/public/shield_check.svg";
import { audits } from "@prisma/client";

function EmptyAuditStatus() {
  return (
    <div className="flex gap-2">
      <StatusNotFound className="h-5 w-5" />
      <div className="text-xs font-light">Status not found</div>
    </div>
  );
}

export default function AuditAttrStatus({ audit }: { audit: audits }) {
  const auditStatus = auditStatuses.find((status: any) => {
    return status.value == audit.status;
  });

  if (!auditStatus) {
    return <EmptyAuditStatus />;
  }

  return (
    <div
      className={`badge p-2 text-xs text-white`}
      style={{ backgroundColor: auditStatus.color }}
    >
      {auditStatus.label}
    </div>
  );
}
