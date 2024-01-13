"use client";

import { requests } from "@prisma/client";
import { viewer } from "@/lib/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export function RejectButton({ request }: { request: requests }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const user = viewer();
  const router = useRouter();
  if (!user) {
    return <></>;
  }

  const onClick = async () => {
    setIsLoading(true);

    var formData = new FormData();
    formData.append("id", request.id.toString());
    formData.append("approval_id", user.id.toString());

    try {
      const response = await axios.post(
        `/api/requests/${request.id}/reject`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success == false) {
        throw new Error(response.data.message);
      }

      toast.success("You have rejected this request");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    router.refresh();
    setIsLoading(false);
  };
  return (
    <button
      className="btn w-20 rounded-xl bg-red-500 px-4 py-2 text-sm font-light normal-case text-white hover:bg-error"
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading && (
        <span className="loading loading-spinner loading-sm"></span>
      )}
      {!isLoading && <span>Reject</span>}
    </button>
  );
}
