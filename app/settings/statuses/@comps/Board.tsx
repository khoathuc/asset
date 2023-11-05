import prisma from "@/lib/db/prisma";
import { randomInt } from "crypto";
import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import EditButton from "./EditButton";

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
          {statuses.map((statuses, index) => {
            return (
              <tr>
                <th>{index + 1}</th>

                <th>{statuses.name?.toString()}</th>

                <th>{statuses.deployable?.toString()}</th>

                <th>{randomInt(20, 50)}</th>

                <th>default</th>

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
                        <EditButton />
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
