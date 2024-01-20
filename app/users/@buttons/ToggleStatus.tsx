"use client"
import { users } from "@prisma/client";
import { ComponentProps, useState } from "react";

type toggleStatusProps = {
  user: users;
  action?: (checked: boolean, user: users) => Promise<void>;
} & ComponentProps<"input">;

export default function Switch({ user, action }: toggleStatusProps) {
    const[checked, setChecked] = useState(user?.activated);

    async function handleClick(e: React.ChangeEvent<HTMLInputElement>){
        if(action){
            await action(!checked, user);
        }

        setChecked(!checked);
    }

    return (
        <input type="checkbox" className="toggle toggle-xs" checked={checked} onChange={handleClick}></input>
    )
}
