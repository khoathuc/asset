"use client"
import RequestAttrRequestType from "@/app/requests/@attrs/request.type";
import RequestAttrStatus from "@/app/requests/@attrs/status";
import RequestAttrTitle from "@/app/requests/@attrs/title";
import { UserAvaGroup } from "@/components/ui/user/UserAvaGroup";
import { requests } from "@prisma/client";
import { MoreButton } from "../@buttons/MoreButton";
import UserAva from "@/components/ui/user/UserAva";
import UserInfo from "@/components/ui/user/UserInfo";
import Link from "next/link";

export function RequestItem({
  index,
  request,
}: {
  index: number;
  request: requests;
}) {
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox checkbox-xs" />
        </label>
      </th>
      <td>
        <div className="font-semibold">
          <Link
            href={`/requests/${request.id}`}
            className="link-neutral hover:link"
          >
            <RequestAttrTitle request={request} compact />
          </Link>
        </div>
      </td>
      <td>
        <div className="flex gap-2">
          <UserInfo user_id={request.user_id} />
        </div>
      </td>
      <td>
        <RequestAttrRequestType request={request} />
      </td>
      <td>
        <RequestAttrStatus request={request} />
      </td>
      <td>
        <UserAvaGroup user_ids={request.approvers} />
      </td>
      <td>
        <UserAvaGroup user_ids={request.followers} />
      </td>
      <td>
        <MoreButton request={request} />
      </td>
    </tr>
  );
}
