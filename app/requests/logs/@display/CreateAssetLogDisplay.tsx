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
      setAssetLog(result.asset_log);
    };

    getAssetLog();
  }, []);

  return <>{asset_log && <LogDetail log={asset_log} />}</>;
}
