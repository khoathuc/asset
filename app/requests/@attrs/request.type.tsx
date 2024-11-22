'use client'
import { useData } from "@/context/data.context";
import { requests } from "@prisma/client";
import TypeNotFound from "@/public/screen_disable.svg";
import KArray from "@/utils/array";
import Link from "next/link";

function EmptyRequestType() {
  return (
    <div className="flex gap-2">
      <TypeNotFound className="h-5 w-5" />
      <div className="text-xs font-light">Type not found</div>
    </div>
  );
}

export default function RequestAttrRequestType({
  request,
}: {
  request: requests;
}) {
  const { contextData } = useData();
  const { requestTypes } = contextData;

  if (!requestTypes) {
    return <EmptyRequestType />;
  }

  const request_type = KArray.findById(requestTypes, request.request_type_id);
  if(!request_type){
    return <EmptyRequestType />;
  }

  return (
    <Link href="/" className="link-neutral link">
        {request_type.name.toString()}
    </Link>
  )
}
