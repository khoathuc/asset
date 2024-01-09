import DisplaySection from "@/components/layout/DisplaySection";
import Side from "@/components/layout/Side";
import Arrow from "@/public/chevron_right.svg";
import { audits } from "@prisma/client";
import Link from "next/link";

export default function AuditSideBar({ audit }: { audit: audits }) {
  const audit_assets = audit.data.stat.assets;
  const audit_auditeds = audit.data.stat.auditeds;

  return (
    <DisplaySection label="Asset Stat" className="relative px-6 py-4 !w-11/12">
      <div className="flex justify-between">
        <div className="flex flex-col items-center justify-center gap-2 font-semibold">
          <span>
            {audit_auditeds.length}/{audit_assets.length}
          </span>
          <span>Audited assets</span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={`relative inline-flex h-3 w-3 rounded-full bg-success`}
            ></span>
            Correct: {audit.data.stat.corrects || 0}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`relative inline-flex h-3 w-3 rounded-full bg-error`}
            ></span>
            Incorrect: {audit.data.stat.incorrects || 0}
          </div>
        </div>
      </div>
      <Side className="right-6 h-fit rounded-full p-2 hover:bg-base-300">
        <div className="tooltip tooltip-right" data-tip="To Audit Page">
          <Link href={`/audits/${audit.id}/audit`}>
            <Arrow className="h-3 w-3" />
          </Link>
        </div>
      </Side>
    </DisplaySection>
  );
}
