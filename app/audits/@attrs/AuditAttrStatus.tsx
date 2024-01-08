"use client";
import { CLOSED_STATUS, OPEN_STATUS, OVERDUE_STATUS, auditStatuses } from "@/app/audits/statuses";
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
    if(audit.status == OPEN_STATUS){
        const end_date = new Date(audit.end_date);
        const current_date = new Date();

        if(end_date < current_date){
            return status.value == OVERDUE_STATUS;
        }

        else return status.value == OPEN_STATUS;
    }

    return status.value == CLOSED_STATUS;
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
