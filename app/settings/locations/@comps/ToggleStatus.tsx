"use client";
import { locations } from "@prisma/client";
import { ComponentProps, useState } from "react";

type toggleStatusProps = {
  location: locations;
  action?: (checked: boolean, location: locations) => Promise<void>;
} & ComponentProps<"input">;

export default function Switch({
  location,
  action,
}: toggleStatusProps) {
  const [checked, setChecked] = useState(location?.status);

  async function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    if (action) {
      await action(!checked, location);
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
