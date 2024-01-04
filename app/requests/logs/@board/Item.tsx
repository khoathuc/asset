"use client";
import { getUser } from "@/lib/user";
import { request_logs } from "@prisma/client";
import Edit from "@/public/pencil_square.svg";
import { ShowLogButton } from "../@buttons/ShowLogButton";

export default function Item({ log }: { log: request_logs }) {
  var user = null;
  if (log.user_id) {
    user = getUser(log.user_id);
  }

  var icon_html = (
    <div className="rounded-full bg-orange-200 p-2">
      <Edit className="h-4 w-4" />
    </div>
  );

  return (
    <div className="mb-3 flex flex-col gap-1">
      <div className="text-xs font-light">
        {log.since.toLocaleDateString()}
      </div>
      <div className="flex gap-2">
        <div className="flex-start flex flex-col">{icon_html}</div>
        <div className="flex flex-1 justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{log.note}</span>
            <span className="text-xs font-normal">
              Implemented by {user?.username} at{" "}
              {log.since.toLocaleDateString()}
            </span>
          </div>
          <ShowLogButton log={log} />
        </div>
      </div>
    </div>
  );
}
