"use client";

import { getUser } from "@/lib/user";
import { depreciations } from "@prisma/client";
import Link from "next/link";
import DepreciationAttrTitle from "../@attr/DepreciationAttrTitle";
import { DepreciationAttrLocation } from "../@attr/DepreciationAttrLocation";
import { MoreButton } from "../@buttons/MoreButton";

export function DepreciationItem({
  index,
  depreciation,
}: {
  index: number;
  depreciation: depreciations;
}) {
  const user = getUser(depreciation.user_id);

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox checkbox-xs" />
        </label>
      </th>
      <td>
        <div className="flex flex-col gap-1">
          <Link
            href={`/depreciations/${depreciation.id}`}
            className="link-neutral hover:link"
          >
            <DepreciationAttrTitle
              depreciation={depreciation}
              className="font-semibold"
            />
          </Link>
          <div>Create by {user ? user.username?.toString() : "Undefined"} </div>
        </div>
      </td>
      <td className="max-w-80">
        <div>
          <DepreciationAttrLocation depreciation={depreciation} />
        </div>
      </td>
      <td>
        <div>
          <div className="-date">{depreciation.start_date.toLocaleDateString()}</div>
        </div>
      </td>
      <td>
        <div>
          <div className="-date">{depreciation.end_date.toLocaleDateString()}</div>
        </div>
      </td>
      <td>
        <MoreButton depreciation={depreciation} />
      </td>
    </tr>
  );
}
