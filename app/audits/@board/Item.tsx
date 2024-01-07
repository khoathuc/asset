"use client";
import Link from "next/link";
import { audits } from "@prisma/client";

export function AuditItem({ index, audit }: { index: number; audit: audits }) {
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
            href={`/requests/${audit.id}`}
            className="link-neutral hover:link"
          ></Link>
        </div>
      </td>
    </tr>
  );
}
