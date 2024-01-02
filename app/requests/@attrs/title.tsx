'use client'
import { requests } from "@prisma/client";

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
      <>
        {request.name}
      </>
    );
  }

  return <div className={` ${className}`}>{html}</div>;
}
