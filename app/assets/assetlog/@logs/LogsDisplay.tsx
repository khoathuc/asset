"use client";
import DisplaySection from "@/components/layout/DisplaySection";
import { asset_logs } from "@prisma/client";

import Edit from "@/public/pencil_square.svg";
import Create from "@/public/cog.svg";
import Update from "@/public/x_circle.svg";
import CheckinIcon from "@/public/archive_box_arrow.svg"

import { getUser } from "@/lib/user";
import { Currency } from "@/utils/currency";
import { ShowLogButton } from "../@buttons/ShowLogButton";
import { CHECKIN_TYPE, CREATE_TYPE, UPDATE_TYPE } from "../asset_log";

export default function LogsDisplay({ logs }: { logs: asset_logs[] }) {
  return (
    <DisplaySection label="Logs" className="px-6 py-4">
      <div className="flex flex-col">
        {logs.map((log) => {
          var user = null;
          if (log.user_id) {
            user = getUser(log.user_id);
          }

          var icon_html = (
            <div className="rounded-full bg-orange-200 p-2">
              <Edit className="h-4 w-4" />
            </div>
          );

          if (log.metatype == CREATE_TYPE) {
            icon_html = (
              <div className="rounded-full bg-info p-2">
                <Create className="h-4 w-4" />
              </div>
            );
          } else if (log.metatype == CHECKIN_TYPE) {
            icon_html = (
              <div className="rounded-full bg-error p-2">
                <CheckinIcon className="h-4 w-4" />
              </div>
            );
          } else if (log.metatype == UPDATE_TYPE) {
            icon_html = (
              <div className="rounded-full bg-warning p-2">
                <Update className="h-4 w-4" />
              </div>
            );
          }

          return (
            <div className="mb-3 flex flex-col gap-1">
              <div className="text-xs font-light">
                {log.action_date.toLocaleDateString()}
              </div>
              <div className="flex gap-2">
                <div className="flex-start flex flex-col">{icon_html}</div>
                <div className="flex flex-1 justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{log.name}</span>
                    <span className="text-xs font-normal">
                      Implemented by {user?.username} at{" "}
                      {log.action_date.toLocaleDateString()}
                    </span>
                    <span className="text-xs font-extralight">
                      Cost:{" "}
                      {Currency.DecimalToUSD(
                        parseFloat(log.action_cost.toString()),
                      )}
                    </span>
                  </div>
                  <ShowLogButton log={log} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DisplaySection>
  );
}
