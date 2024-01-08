import DisplaySection from "@/components/layout/DisplaySection";
import { audits } from "@prisma/client";

export default function AuditSideBar({ audit }: { audit: audits }) {
  const audit_assets = audit.data.stat.assets;
  const audit_auditeds = audit.data.stat.auditeds;

  return (
    <DisplaySection label="Asset Stat" className="relative px-6 py-4">
      <div className="flex justify-between">
        <div className="flex flex-col items-center justify-center gap-2 font-semibold">
          <span>
            {audit_auditeds.length}/{audit_assets.length}
          </span>
          <span>Audited assets</span>
        </div>

        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span
              className={`relative inline-flex h-3 w-3 rounded-full bg-success`}
            ></span>
            Correct: 1
          </div>
          <div className="flex gap-2 items-center">
            <span
              className={`relative inline-flex h-3 w-3 rounded-full bg-error`}
            ></span>
            Incorrect: 0
          </div>
        </div>
      </div>
    </DisplaySection>
  );
}
