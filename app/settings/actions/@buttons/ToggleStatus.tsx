"use client";
import { actions } from "@prisma/client";
import { ComponentProps, useState } from "react";

type toggleStatusProps = {
  obj: actions;
  action?: (checked: boolean, action: actions) => Promise<void>;
} & ComponentProps<"input">;

export default function Switch({
    obj,
  action,
}: toggleStatusProps) {
  const [checked, setChecked] = useState(obj?.status);

  async function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    if (action) {
      await action(!checked, obj);
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
}
