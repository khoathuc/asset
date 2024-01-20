"use client"
import { actions } from "@prisma/client";
import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import ToggleStatus from "../@buttons/ToggleStatus";
import { changeStatus } from "../action";
import { getUser } from "@/lib/user";
import EditButton from "../@buttons/EditButton";


export default function ActionBoard({ actions }: { actions: actions[] }) {
  return (
    <div className="w-full bg-base-100">
      <div className="h-full overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Action</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {actions.map((action, index) => {
              const user = action.user_id ? getUser(action.user_id): null;

              return (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div>
                      <div className="font-bold">{action.name}</div>
                      <span>Created by {user? <a>{user.username}</a> : 'Deactivated account'} at {action.since.toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>
                    <ToggleStatus obj={action} action={changeStatus} />
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
                        className="menu dropdown-content rounded-box z-[1] w-40 bg-base-100 p-2 shadow"
                      >
                        <li>
                          <EditButton action={action} />
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
