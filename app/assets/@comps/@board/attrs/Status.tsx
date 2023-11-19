import { assets } from "@prisma/client";
import { useData } from "@/context/data.context";
import StatusNotFound from "@/public/shield_check.svg";
import KArray from "@/utils/array";

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

export function Status({ asset }: { asset: assets }) {
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
        className="badge p-3 text-white"
        style={{ backgroundColor: status.color }}
      >
        {status.name}
      </div>
    </>
  );
}
