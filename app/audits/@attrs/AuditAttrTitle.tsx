import { getUser } from "@/lib/user";
import { audits } from "@prisma/client";

export default function AuditAttrTitle({
  audit,
  className,
  ...props
}: {
  audit: audits;
  className?: string;
  props?: any;
}) {
  var html;

  html = (
    <div className="">
        <div className="font-semibold">{audit.name}</div>
    </div>
  )

  if (props.hasOwnProperty("compact")) {
    html = <>{audit.name}</>;
  }
  
  return <div className={`${className}`}>{html}</div>
}
