"use client";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { useSession } from "next-auth/react";

export default function UserNav() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return <></>;
  }
  
  const name = user.name ? user.name : "User";
  var role;
  if (user.role == "admin") {
    role = "Manager";
  }

  return (
    <div className="flex h-16 gap-3 px-4">
      <div className="avatar items-center">
        <div className="w-6 rounded-full">
          <Image
            src={logo}
            alt="avatar"
            style={{ width: "40px", height: "40px" }}
          ></Image>
        </div>
      </div>
      <div className="flex flex-grow flex-col justify-center text-sm font-light">
        <div className="pt-1 text-base font-bold">{name}</div>
        <div className="pt-1 text-xs text-neutral-400">{role}</div>
      </div>
    </div>
  );
}
