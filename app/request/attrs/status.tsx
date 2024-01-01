"use client";
import { requestStatuses } from "@/app/requests/statuses";
import StatusNotFound from "@/public/shield_check.svg";
import { requests } from "@prisma/client";

function EmptyRequestStatus() {
  return (
    <div className="flex gap-2">
      <StatusNotFound className="h-5 w-5" />
      <div className="text-xs font-light">Status not found</div>
    </div>
  );
}

export default function RequestAttrStatus({ request }: { request: requests }) {
  const requestStatus = requestStatuses.find((status: any) => {
    return status.value == request.status;
  });

  if (!requestStatus) {
    return <EmptyRequestStatus />;
  }

  return (
    <div
      className={`badge p-2 text-xs text-white`}
      style={{ backgroundColor: requestStatus.color }}
    >
      {requestStatus.label}
    </div>
  );
}
