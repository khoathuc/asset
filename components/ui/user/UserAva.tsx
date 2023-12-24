"use client";
import { useData } from "@/context/data.context";
import NoAvatar from "@/public/no_avatar.svg";
import Image from "next/image";
import KArray from "@/utils/array";

export default function UserAva({ user_id, size }: { user_id: any, size: number }) {
  const { contextData } = useData();
  const { users } = contextData;

  if (!users) {
    return;
  }

  const user = KArray.findById(users, user_id);
  var avatar = <NoAvatar className={`w-${size} h-${size}`} />;
  if (user.avatar) {
    avatar = (
      <Image
        src={user.avatar?.toString()}
        alt={user.avatar?.toString()}
        width={size}
        height={size}
      ></Image>
    );
  }

  return (
    <div className="avatar">
      {avatar}
    </div>
  );
}
