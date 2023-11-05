import prisma from "@/lib/db/prisma";
import { randomInt } from "crypto";
import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import Checked from "@/public/checked.svg";
import XMark from "@/public/x-mark.svg";
import EditButton from "./EditButton";
import { getOption } from "../type";

//TODO: Implement status type here
function StatusType({ status }: { status: string }) {
  const statusDetail = getOption(status);
  if (!statusDetail) {
    return;
  }

  switch (statusDetail.code) {
    case "DEPLOYABLE":
      return (
        <div>
          <div className="badge badge-success badge-xs mr-1"></div>
          {statusDetail?.label}
        </div>
      );
    case "PENDING":
      return (
        <div>
          <div className="badge badge-warning badge-xs mr-1"></div>
          {statusDetail?.label}
        </div>
      );
    case "UNDEPLOYABLE":
      return (
        <div>
          <div className="badge badge-error badge-xs mr-1"></div>
          {statusDetail?.label}
        </div>
      );
    case "ARCHIVED":
      return (
        <div>
          <div className="badge badge-error badge-xs mr-1"></div>
          {statusDetail?.label}
        </div>
      );
    default:
      return;
  }
}

export default async function StatusBoard() {
  const statuses = await prisma.statuses.findMany({
    orderBy: { id: "desc" },
    take: 10,
  });
  return (
    <div className="w-full">
      <table className="table table-zebra table-xs table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Statuses label</th>
            <th>Statuses type</th>
            <th>Assets</th>
            <th>Default label</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((status, index) => {
            return (
              <tr>
                <th>{index + 1}</th>

                <th>{status.name?.toString()}</th>

                <th>
                  <StatusType status={status.type?.toString()} />
                </th>

                <th>{randomInt(20, 50)}</th>

                <th>
                  {status.default ? (
                    <Checked className="w-4 text-success" />
                  ) : (
                    <XMark className="w-4 text-error" />
                  )}
                </th>

                <th>
                  <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
                    <label
                      tabIndex={0}
                      className="btn h-8 min-h-fit w-8 bg-neutral p-0 text-neutral-content hover:text-neutral-focus"
                    >
                      <More className="h-4 w-4" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content rounded-box z-[1] w-40 bg-base-100 p-2 shadow"
                    >
                      <li>
                        <EditButton status={status} />
                      </li>
                      <li>
                        <button className="flex items-center justify-start text-error hover:bg-error hover:text-neutral-50">
                          <Trash className="h-4 w-4" />
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
