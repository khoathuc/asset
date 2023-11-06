import prisma from "@/lib/db/prisma";
import { types } from "@prisma/client";
import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import EditButton from "./EditButton";
import{CFormButton} from './CFormButton';

function TypeName({ type }: { type: types }) {
  return (
    <div
      className="flex flex-col pl-2"
    >
      <div className="text-sm">{type.name.toString()}</div>
      <span className="truncate text-xs font-light max-w-sm">
        {type.description ? type.description.toString() : "No description"}
      </span>
    </div>
  );
}

export default async function TypeBoard() {
  const types = await prisma.types.findMany({
    orderBy: { id: "desc" },
    take: 10,
  });
  return (
    <div className="w-full">
      <table className="table table-zebra table-xs table-auto">
        <thead>
          <tr>
            <th className="w-10"></th>
            <th>Name</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {types.map((type, index) => {
            return (
              <tr>
                <th>{index + 1}</th>

                <th>
                  <TypeName type={type} />
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
                      className="menu dropdown-content rounded-box z-[1] w-44 bg-base-100 p-2 shadow"
                    >
                      <li>
                        <EditButton type={type} />
                      </li>

                      <li>
                        <CFormButton type={type}/>
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
