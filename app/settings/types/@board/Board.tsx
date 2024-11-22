import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import EditButton from "../@buttons/EditButton";
import CFormButton from "../@buttons/CFormButton";
import { Type } from "@/models/type/type";
import Name from "../@attr/name";

export default async function TypeBoard() {
  const types = await Type.loader().all();

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
                  <Name type={type} />
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
                        <CFormButton type={type} />
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
