import DisplaySection from "@/components/layout/DisplaySection";
import DisplayField from "@/components/ui/display.field/DisplayField";
import { audits } from "@prisma/client";
import AuditAttrTitle from "../@attrs/AuditAttrTitle";
import Side from "@/components/layout/Side";
import BarIcon from "@/public/bar_3_center_left.svg";
import FileIcon from "@/public/document_text.svg";
import DateIcon from "@/public/calendar.svg";
import StatusIcon from "@/public/check_badge.svg";
import UserGroup from "@/public/user_group.svg";
import UserIcon from "@/public/user.svg";
import AuditActionsButton from "../@buttons/AuditActionsButton";
import AuditAttrStatus from "../@attrs/AuditAttrStatus";
import { UserAvaGroup } from "@/components/ui/user/UserAvaGroup";
import UserInfo from "@/components/ui/user/UserInfo";
import UserAva from "@/components/ui/user/UserAva";

export default function AuditDisplay({ audit }: { audit: audits }) {
  return (
    <>
      <DisplaySection label="General" className="relative px-6 py-4">
        <div className="grid grid-cols-2 gap-2 border-b-2 py-4">
          <DisplayField field="Audit Name">
            <AuditAttrTitle audit={audit} compact />
          </DisplayField>

          <DisplayField
            field="Audit Status"
            icon={<StatusIcon className="h-5 w-5" />}
          >
            <AuditAttrStatus audit={audit} compact />
          </DisplayField>

          <DisplayField
            field="Start Date"
            icon={<DateIcon className="h-5 w-5" />}
          >
            <div>{audit.start_date.toLocaleDateString()}</div>
          </DisplayField>

          <DisplayField
            field="End Date"
            icon={<DateIcon className="h-5 w-5" />}
          >
            <div>{audit.end_date.toLocaleDateString()}</div>
          </DisplayField>

          <DisplayField
            field="Auditors"
            icon={<UserGroup className="h-5 w-5" />}
          >
            <UserAvaGroup user_ids={audit.auditors} />
          </DisplayField>

          <DisplayField
            field="Followers"
            icon={<UserGroup className="h-5 w-5" />}
          >
            <UserAvaGroup user_ids={audit.followers} />
          </DisplayField>

          <DisplayField
            field="Created by"
            icon={<UserIcon className="h-5 w-5" />}
          >
            <div className="flex items-center gap-2 pt-2">
              <UserAva user_id={audit.user_id} size={6} />
              <UserInfo user_id={audit.user_id} compact />
            </div>
          </DisplayField>

          <DisplayField
            field="Created at"
            icon={<DateIcon className="h-5 w-5" />}
          >
            <div>{audit.since.toLocaleDateString()}</div>
          </DisplayField>
        </div>

        <div className="flex flex-col py-4">
          <DisplayField
            field="Description"
            icon={<BarIcon className="h-5 w-5" />}
          >
            {audit.description?.toString() || "No description"}
          </DisplayField>

          <DisplayField field="File" icon={<FileIcon className="h-5 w-5" />}>
            No File
          </DisplayField>
        </div>

        <Side className="right-6">
          <AuditActionsButton audit={audit} />
        </Side>
      </DisplaySection>
    </>
  );
}
