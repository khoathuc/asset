"use client";
import { useData } from "@/context/data.context";
import { users } from "@prisma/client";
import NoAvatar from "@/public/no_avatar.svg";
import Image from "next/image";

export function UserAvaGroup({ user_ids }: { user_ids: any }) {
  const { contextData } = useData();
  const { users } = contextData;
  
  if (!users) {
    return;
  }

  const data_users = users.filter((user: users) => {
    return user_ids.includes(user.id);
  });

  const html = data_users.map((user: users) => {
    var avatar = <NoAvatar className="h-6 w-6" />;
    if (user.avatar) {
      avatar = (
        <Image
          src={user.avatar?.toString()}
          alt={user.avatar?.toString()}
          width={6}
          height={6}
        ></Image>
      );
    }

    return (
      <div className="avatar">
        {avatar}
      </div>
    );
  });

  return (
    <div className="avatar-group -space-x-6 rtl:space-x-reverse">{html}</div>
  );
}
