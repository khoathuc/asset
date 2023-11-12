import prisma from "@/lib/db/prisma";
import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import { tags } from "@prisma/client";
import EditButton from "./EditButton";
import { rgba } from "polished";

function TagName({tag}:{tag: tags}){
    return (
        <>
            <div className="flex flex-col pl-2" style={{borderLeft: `4px solid ${tag.color.toString()}`, backgroundColor: rgba(tag.color, 0.1)}}>
                <div className="text-sm">
                    {tag.name.toString()}
                </div>
                <span className="text-xs font-light truncate">
                    {tag.description ? tag.description.toString(): "No description"}
                </span>
            </div>
        </>
    )
}

export async function TagBoard() {
  const tags = await prisma.tags.findMany({
    orderBy: { id: "desc" },
    take: 10,
  });

  return (
    <div className="w-full">
      <table className="table table-xs table-auto">
        <thead>
          <tr>
            <th className="w-10"></th>
            <th>Tag</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag, index) => {
            return (
              <tr>
                <th>{index + 1}</th>

                <th>
                  <TagName tag={tag} />
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
                        <EditButton tag={tag} />
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
