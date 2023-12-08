"use client";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import NoAvatar from "@/public/no_avatar.svg";

export default function UserNav() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return <></>;
  }

  const name = user.username ? user.username : "User";
  var role;
  if (user.role == "ADMIN") {
    role = "Manager";
  } else {
    role = "User";
  }

  var avatar = <NoAvatar className="h-6 w-6" />;
  if (user.avatar) {
    avatar = (
      <Image
        src={user.avatar?.toString()}
        alt={user.avatar?.toString()}
        width={40}
        height={40}
      ></Image>
    );
  }

  return (
    <div className="flex h-16 gap-3 px-4">
      <div className="avatar items-center">
        <div className="w-6 rounded-full">{avatar}</div>
      </div>
      <div className="flex flex-grow flex-col justify-center text-sm font-light">
        <div className="dropdown dropdown-hover dropdown-bottom hover:cursor-pointer">
          <label tabIndex={0} className="pt-1 text-base font-bold">{name}</label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] w-40 bg-base-100 p-2 shadow"
          >
            <li>
              <button onClick={()=>signOut().then()}>Logout</button>
            </li>
          </ul>
        </div>
        <div className="pt-1 text-xs text-neutral-400">{role}</div>
      </div>
    </div>
  );
}
