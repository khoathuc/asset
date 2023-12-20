"use client";
import { request_types } from "@prisma/client";
import ToggleStatus from "./ToggleStatus";
import { changeStatus } from "../action";
import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import { getUser } from "@/lib/user";
import EditButton from "./EditButton";
import { CFormButton } from "./CFormButton";

function RequestTypeName({ requestType }: { requestType: request_types }) {
  return (
    <div className="flex flex-col pl-2">
      <div className="font-bold">{requestType.name.toString()}</div>
      <span className="max-w-sm truncate text-xs font-light">
        {requestType.description
          ? requestType.description.toString()
          : "No description"}
      </span>
    </div>
  );
}

export default async function RequestTypeBoard({
  requestTypes,
}: {
  requestTypes: request_types[];
}) {
  return (
    <div className="w-full bg-base-100">
      <div className="h-full overflow-x-auto">
        <table className="table table-zebra table-xs table-auto">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {requestTypes.map((requestType, index) => {
              const user = requestType.user_id
                ? getUser(requestType.user_id)
                : null;
              return (
                <tr>
                  <th>{index + 1}</th>

                  <td>
                    <div>
                      <div className="font-bold">{requestType.name}</div>
                      <span>
                        Created by{" "}
                        {user ? <a>{user.username}</a> : "Deactivated account"}{" "}
                        at {requestType.since.toLocaleDateString()}
                      </span>
                      <div className="max-w-sm truncate text-xs font-light">
                        {requestType.description || "No description"}
                      </div>
                    </div>
                  </td>

                  <td>
                    <ToggleStatus
                      requestType={requestType}
                      action={changeStatus}
                    />
                  </td>

                  <td>
                    <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
                      <label
                        tabIndex={0}
                        className="btn h-8 min-h-fit w-8 bg-neutral p-0 text-neutral-content hover:text-neutral-focus"
                      >
                        <More className="h-4 w-4" />
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content rounded-box z-[1] w-44 bg-base-100 p-2 shadow"
                      >
                        <li>
                          <EditButton requestType={requestType} />
                        </li>

                        <li>
                          <CFormButton requestType={requestType} />
                        </li>

                        <li>
                          <button className="flex items-center justify-start text-error hover:bg-error hover:text-neutral-50">
                            <Trash className="h-4 w-4" />
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
