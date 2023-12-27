"use client";

import { viewer } from "@/lib/user";
import { requests } from "@prisma/client";
import React from "react";
import { toast } from "react-toastify";

export function ApproveButton({ request }: { request: requests }) {
  const user = viewer();

  if(!user){
    return <></>;
  }

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onClick = async () => {
    setIsLoading(true);

    var formData = new FormData();
    formData.append("approve", '1');
    formData.append("id", request.id.toString());
    formData.append("approval_id", user.id.toString());

    try{
        await approveRequest(formData);
        toast.success("Approved this request")
    }catch(error){
        if(error instanceof Error){
            toast.error(error.message);
        }
    }

    setIsLoading(false);
  };

  return (
    <button
      className="btn flex gap-2 btn-success w-20 rounded-xl px-4 py-2 text-sm font-light normal-case text-white hover:bg-green-500"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-sm"></span>
      )}
      {!isLoading && <span>Approve</span>}
    </button>
  );
}
