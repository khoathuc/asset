import DisplaySection from "@/components/layout/DisplaySection";
import DisplayField from "@/components/ui/display.field/DisplayField";
import { requests } from "@prisma/client";
import RequestAttrRequestType from "../@attrs/request.type";
import RequestIcon from "@/public/document_text.svg";
import StatusIcon from "@/public/check_badge.svg";
import RequestTypeIcon from "@/public/code_bracket_square.svg";
import BarIcon from "@/public/bar_3_center_left.svg";
import UserIcon from "@/public/user.svg";
import UserInfo from "@/components/ui/user/UserInfo";
import RequestAttrTitle from "../@attrs/title";
import RequestAttrStatus from "../@attrs/status";
type RequestDisplayProps = {
  request: requests;
};

export default function RequestDisplay({ request }: RequestDisplayProps) {
  return (
    <DisplaySection label="Detail" className="relative px-6 py-4">
      <div className="grid grid-cols-2 gap-2 border-b-2 py-4">
        <DisplayField
          field="Request Name"
          icon={<RequestIcon className="h-5 w-5" />}
        >
          <RequestAttrTitle request={request} compact />
        </DisplayField>

        <DisplayField
          field="Request Status"
          icon={<StatusIcon className="h-5 w-5" />}
        >
          <RequestAttrStatus request={request} />
        </DisplayField>

        <DisplayField
          field="Request Type"
          icon={<RequestTypeIcon className="h-5 w-5" />}
        >
          <RequestAttrRequestType request={request} />
        </DisplayField>

        <DisplayField
          field="Request By"
          icon={<UserIcon className="h-5 w-5" />}
        >
          <UserInfo user_id={request.user_id} compact className="font-semibold"/>
        </DisplayField>
      </div>

      <div className="flex flex-col border-b-2 py-4">
        <DisplayField
          field="Description"
          icon={<BarIcon className="h-5 w-5" />}
        >
          {request.description?.toString() || "No description"}
        </DisplayField>

        <DisplayField
          field="File"
          icon={<RequestIcon className="h-5 w-5" />}
        ></DisplayField>
      </div>

      <div className="pt-2">
        <span className="text-lg font-semibold">Custom fields</span>
      </div>
      <div className="grid grid-cols-2 gap-2 py-4">
        {request.form &&
          Array.isArray(request.form) &&
          request.form.map((field: any, index: number) => {
            return (
              <DisplayField
                field={field.name}
                icon={<BarIcon className="h-5 w-5" />}
              >
                <div>{field.value}</div>
              </DisplayField>
            );
          })}
      </div>
    </DisplaySection>
  );
}
