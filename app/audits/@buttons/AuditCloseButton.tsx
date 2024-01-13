"use client";
import { audits } from "@prisma/client";
import { closeAudit } from "../actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export function AuditCloseButton({ audit }: { audit: audits }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    try {
      await axios.post(`/api/audits/${audit.id}/close`);
      toast.success("Close audit successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    router.refresh();
    setIsLoading(false);
  };
  return (
    <>
      <button
        className="btn- btn h-full min-h-full bg-success normal-case text-white hover:text-success"
        onClick={onClick}
      >
        Close Audit
      </button>
    </>
  );
}
