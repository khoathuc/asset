import DisplaySection from "@/components/layout/DisplaySection";
import DisplayField from "@/components/ui/display.field/DisplayField";
import { audits } from "@prisma/client";
import AuditAttrTitle from "../@attrs/AuditAttrTitle";

export default function AuditDisplay({ audit }: { audit: audits }) {
  return (
    <>
      <DisplaySection label="General" className="relative px-6 py-4">
        <div className="grid grid-cols-2 gap-2 border-b-2 py-4">
          <DisplayField field="Audit Name">
            <AuditAttrTitle audit={audit} compact />
          </DisplayField>

          <DisplayField field="Audit Status">
            <AuditAttrTitle audit={audit} compact />
          </DisplayField>

          <DisplayField field="Start Date">
            <AuditAttrTitle audit={audit} compact />
          </DisplayField>

          <DisplayField field="End Date">
            <AuditAttrTitle audit={audit} compact />
          </DisplayField>

          <DisplayField field="Auditors">
            <AuditAttrTitle audit={audit} compact />
          </DisplayField>

          <DisplayField field="Followers">
            <AuditAttrTitle audit={audit} compact />
          </DisplayField>

          <DisplayField field="Created by">
            <AuditAttrTitle audit={audit} compact />
          </DisplayField>

          <DisplayField field="Created at">
            <AuditAttrTitle audit={audit} compact />
          </DisplayField>
        </div>

        <div className="flex flex-col py-4">
          <DisplayField field="Description">
            {audit.description?.toString() || "No description"}
          </DisplayField>

          <DisplayField field="File">No File</DisplayField>
        </div>
      </DisplaySection>
    </>
  );
}
