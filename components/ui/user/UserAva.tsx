"use client";
import { useData } from "@/context/data.context";
import NoAvatar from "@/public/no_avatar.svg";
import Image from "next/image";
import KArray from "@/utils/array";

export default function UserAva({
  user_id,
  size,
}: {
  user_id: any;
  size: number;
}) {
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
        className={`w-${size} h-${size}`}
      ></Image>
    );
  }

  return (
    <div
      className="avatar tooltip hover:cursor-pointer"
      data-tip={user.username}
    >
      <div className="avatar items-center">
        <div className="mask mask-squircle h-5 w-5">{avatar}</div>
      </div>
    </div>
  );
}
