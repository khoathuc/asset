import { requests } from "@prisma/client";
import Link from "next/link";

export default function RequestAttrTitle({
  request,
  className,
  ...props
}: {
  request: requests;
  className?: string;
  props?: any;
}) {
  var html;
  if (props.hasOwnProperty("compact")) {
    html = (
      <Link href={`/request/${request.id}`} className="link-neutral hover:link">
        {request.name}
      </Link>
    );
  }

  return <div className={` ${className}`}>{html}</div>;
}
