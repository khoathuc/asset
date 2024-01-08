"use client";
import Link from "next/link";
import { audits } from "@prisma/client";
import AuditAttrTitle from "../@attrs/AuditAttrTitle";
import { AuditAttrLocation } from "../@attrs/AuditAttrLocation";
import { UserAvaGroup } from "@/components/ui/user/UserAvaGroup";
import AuditAttrStatus from "../@attrs/AuditAttrStatus";
import { MoreButton } from "../@buttons/MoreButton";
import { getUser } from "@/lib/user";

export function AuditItem({ index, audit }: { index: number; audit: audits }) {
  const user = getUser(audit.user_id);
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox checkbox-xs" />
        </label>
      </th>
      <td>
        <div>
          <Link
            href={`/audits/${audit.id}`}
            className="link-neutral hover:link"
          >
            <AuditAttrTitle audit={audit} />
          </Link>
          <div>Create by {user ? user.username?.toString() : "Undefined"} </div>
        </div>
      </td>
      <td>
        <div className="">
          <AuditAttrLocation audit={audit} />
        </div>
      </td>
      <td>
        <div>
          <div className="-date">{audit.start_date.toLocaleDateString()}</div>
        </div>
      </td>
      <td>
        <div>
          <div className="-date">{audit.end_date.toLocaleDateString()}</div>
        </div>
      </td>
      <td>
        <div>Asset stat</div>
      </td>
      <td>
        <UserAvaGroup user_ids={audit.auditors} />
      </td>
      <td>
        <AuditAttrStatus audit={audit} />
      </td>
      <td>
        <MoreButton audit={audit} />
      </td>
    </tr>
  );
}
