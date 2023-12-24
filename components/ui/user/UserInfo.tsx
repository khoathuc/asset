"use client";
import { useData } from "@/context/data.context";
import NoAvatar from "@/public/no_avatar.svg";
import Image from "next/image";
import KArray from "@/utils/array";
import UserAva from "./UserAva";

export default function UserInfo({
  user_id,
  ...props
}: {
  user_id: any;
  props: any;
}) {
  const { contextData } = useData();
  const { users } = contextData;

  if (!users) {
    return;
  }
  const user = KArray.findById(users, user_id);
  if (!user) {
    return <></>;
  }

  if (props.hasOwnProperty("compact")) {
  }

  return (
    <div className="flex gap-2 items-center">
      <UserAva user_id={user_id} size={6}/>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">{user.username.toString()}</span>
        <span className="font-light text-gray-600">
          {user.email.toString()}
        </span>
      </div>
    </div>
  );
}
