import UserInfo from "@/components/ui/user/UserInfo";
import { getUser } from "@/lib/user";
import { request_logs } from "@prisma/client";

export default function RejectLogDisplay({ log }: { log: request_logs }) {
  const user = getUser(log.user_id);

  return (
    <div className="request-log-reject">
      <div className="flex flex-col bg-base-200 p-4">
        <span className="text-md font-semibold">Reject</span>
        <div className="flex text-sm font-light">
          <span className="text-sm font-light">Rejected by &nbsp;</span>

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
