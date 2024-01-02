"use client";

import { request_types } from "@prisma/client";
import { ComponentProps, useState } from "react";

type toggleStatusProps = {
  requestType: request_types;
  action?: (checked: boolean, requestType: request_types) => Promise<void>;
} & ComponentProps<"input">;

export default function ToggleStatus({
  requestType,
  action,
}: toggleStatusProps){
    const [checked, setChecked] = useState(requestType?.status);

  async function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    if (action) {
      await action(!checked, requestType);
    }
    
    setChecked(!checked);
  }

  return (
    <input
      type="checkbox"
      className="toggle toggle-xs"
      checked={checked}
      onChange={handleClick}
    />
  );
};
