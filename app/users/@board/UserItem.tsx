import { users } from "@prisma/client";
import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import Image from "next/image";
import NoAvatar from "@/public/no_avatar.svg";
import { ADMIN_ROLE } from "@/app/api/auth/[...nextauth]/options";
import ToggleStatus from "../@buttons/ToggleStatus";
import { changeStatus } from "../actions";
import EditButton from "../@buttons/EditButton";

export default function UserItem({ user }: { user: users }) {
  var avatar = <NoAvatar className="h-8" />;
  if (user.avatar) {
    avatar = (
      <Image
        src={user.avatar?.toString()}
        alt={user.avatar?.toString()}
        width={32}
        height={32}
      />
    );
  }

  var role = <></>;
  if (user.role == ADMIN_ROLE) {
    role = (
      <span className="w-15 badge badge-success badge-xs p-2 text-white">
        Admin
      </span>
    );
  } else {
    role = (
      <span className="w-15 badge badge-secondary badge-xs p-2 text-white">
        User
      </span>
    );
  }

  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox checkbox-xs"></input>
        </label>
      </th>
      <td>
        <div className="item-center flex gap-3">
          <div className="avatar w-10">{avatar}</div>
          <div className="flex flex-col gap-1">
            <div className="font-bold">{user.username?.toString()}</div>
            <div className="text-xs opacity-50">{user.email?.toString()}</div>
          </div>
        </div>
      </td>
      <td>{user.first_name ? user.first_name : "No Information"}</td>
      <td>{user.last_name?.toString()}</td>
      <td>{user.job_title ? user.job_title : "No Information"}</td>
      <td>{role}</td>
      <td>{user.address ? user.address : "No information"}</td>
      <td>{user.city ? user.city : "No information"}</td>
      <td className="max-w-xs truncate">{user.description?.toString()}</td>
      <td>
        <ToggleStatus user={user} action={changeStatus} />
      </td>
      <td>
        <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
          <label
            tabIndex={0}
            className="btn h-8 min-h-fit w-8 bg-neutral p-0 text-neutral-content hover:text-neutral-focus"
          >
            <More className="h-4 w-4" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <EditButton user={user} />
            </li>
            <li>
              <button className="flex items-center justify-start text-error hover:bg-error hover:text-neutral-50">
                <Trash className="h-4 w-4" />
                Delete
              </button>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}
