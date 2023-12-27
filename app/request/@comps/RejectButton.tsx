"use client";

import { requests } from "@prisma/client";

export function RejectButton({request}:{request:requests}) {
  return (
    <button className="btn btn-error w-20 rounded-xl px-4 py-2 text-sm font-light normal-case text-white hover:bg-red-500">
      Reject
    </button>
  );
}
