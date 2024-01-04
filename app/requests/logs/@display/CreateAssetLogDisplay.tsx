"use client";
import { getAssetLogById } from "@/app/assets/actions";
import LogDetail from "@/app/assets/assetlog/@logs/LogDetail";
import UserInfo from "@/components/ui/user/UserInfo";
import { getUser } from "@/lib/user";
import { asset_logs, request_logs } from "@prisma/client";
import { useEffect, useState } from "react";

export default function CreateAssetLogDisplay({ log }: { log: request_logs }) {
  const [asset_log, setAssetLog] = useState<asset_logs | null>();
  const user = getUser(log.user_id);

  useEffect(() => {
    const getAssetLog = async () => {
      if (!log.ref) {
        return;
      }
      const res = await fetch(`/api/assetlog/${log.ref}`);

      const result = await res.json();
      console.log(result)
      setAssetLog(result.asset_log);
    };

    getAssetLog();
  }, []);

  return <>{asset_log && <LogDetail log={asset_log} />}</>;

  return (
    <div className="request-log-approve">
      <div className="flex flex-col bg-base-200 p-4">
        <span className="text-md font-semibold">Approve</span>
        <div className="flex text-sm font-light">
          <span className="text-sm font-light">Approved by &nbsp;</span>

          <UserInfo
            user_id={user.id}
            compact
            className="link-hover link underline"
          />

          <span>&nbsp; at {log.since.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex flex-col p-4">
        <span className="text-md font-semibold">Note</span>
        <span>{log.note || "No description"}</span>
      </div>
    </div>
  );
}
