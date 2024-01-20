import { depreciations } from "@prisma/client";
import DD from "@/public/arrow_down.svg";
import Trash from "@/public/trash.svg";
// import EditButton from "./EditButton";
import Link from "next/link";

export function MoreButton({ depreciation }: { depreciation: depreciations }) {
  return (
    <>
      <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
        <Link
          href={`/depreciations/${depreciation.id}`}
          tabIndex={0}
          className="btn flex h-6 min-h-fit items-center justify-center px-2"
        >
          <span className="text-sm normal-case">View</span>
          <DD className="h-3 w-3 text-white" />
        </Link>
        <ul
          tabIndex={0}
          className="menu dropdown-content rounded-box z-[1] w-40 bg-base-100 p-2 shadow"
        >
          <li>
            {/* <EditButton depreciation={depreciation} /> */}
          </li>
          <li>
            <button className="flex items-center justify-start text-error hover:bg-error hover:text-neutral-50">
              <Trash className="h-4 w-4" />
              Delete
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
