import { audit_logs, audits } from "@prisma/client";
import DD from "@/public/arrow_down.svg";
import Trash from "@/public/trash.svg";
import Link from "next/link";
import ViewAuditedAssetLogButton from "./ViewAuditedAssetLogButton";

export function MoreButton({ asset_log }: { asset_log: audit_logs }) {
  return (
    <>
      <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
            <ViewAuditedAssetLogButton asset_log={asset_log}/>
        <ul
          tabIndex={0}
          className="menu dropdown-content rounded-box z-[1] w-40 bg-base-100 p-2 shadow"
        >
          <li>
            {/* <AdjustButton audit={audit} /> */}
          </li>
        </ul>
      </div>
    </>
  );
}
