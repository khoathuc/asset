"use client"
import Image from "next/image";
import { assets } from "@prisma/client";
import { getUser } from "@/lib/user";

export function Assignee({
  className,
  asset,
}: {
  className?: string;
  asset?: assets;
}) {
  if(asset){
    const assignee_id = asset.assignee_id;
    var assignee = null;
    if (assignee_id) {
      assignee = getUser(assignee_id);
    }
  }

  return (
    <>
      {assignee && (
        <div className={`flex gap-2 ${className} -assignee`}>
          <div className="avatar items-center">
            <div className="mask mask-squircle h-5 w-5">
              <Image
                src={assignee.avatar?.toString()}
                alt={assignee.avatar?.toString()}
                width={40}
                height={40}
              ></Image>
            </div>
          </div>
          <div className="font-light">{assignee.username.toString()}</div>
        </div>
      )}
    </>
  );
}
