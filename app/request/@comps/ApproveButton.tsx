"use client";

import { approveRequest } from "@/app/requests/actions";
import { viewer } from "@/lib/user";
import { requests } from "@prisma/client";
import axios from "axios";
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
    formData.append("id", request.id.toString());
    formData.append("approval_id", user.id.toString());

    try{
      const response = await axios.post(`/api/requests/${request.id}/approve`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      
      if(response.data.success == false){
        throw new Error(response.data.message);
      }
    }catch(error){
        if(error instanceof Error){
            toast.error(error.message);
        }
    }

    setIsLoading(false);
  };

  return (
    <button
      className="btn flex gap-2 bg-green-500 w-20 rounded-xl px-4 py-2 text-sm font-light normal-case text-white hover:bg-success"
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
