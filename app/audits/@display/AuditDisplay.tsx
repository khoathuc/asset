import DisplaySection from "@/components/layout/DisplaySection";
import DisplayField from "@/components/ui/display.field/DisplayField";
import { audits } from "@prisma/client";
import AuditAttrTitle from "../@attrs/AuditAttrTitle";

export default function AuditDisplay({ audit }: { audit: audits }) {
  return (
    <DisplaySection label="General" className="relative px-6 py-4">
      <div className="grid grid-cols-2 gap-2 border-b-2 py-4">
        <DisplayField
          field="Audit Name"
        >
          <AuditAttrTitle audit={audit} compact />
        </DisplayField>
      </div>
    </DisplaySection>
  );
}
