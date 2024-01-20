import { ADMIN_ROLE } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/models/user/user";
import UsersIcon from "@/public/users.svg";
import Link from "next/link";

export default async function UserStat() {
  const user_stat = await User.stat().all();
  const user_role_stat = await User.stat().role();
  const admin_role_count = user_role_stat.find((st) => {
    return st.role == ADMIN_ROLE;
  });
  const user_role_count = user_role_stat.find((st) => {
    return st.role == ADMIN_ROLE;
  });

  return (
    <div className="stat">
      <div className="stat-figure text-neutral">
        <UsersIcon className="h-8 w-8" />
      </div>
      <div className="stat-title">Total Users</div>
      <div className="stat-value">{user_stat}</div>
      <div className="stat-desc">
        {admin_role_count?._count.role.toString()} admins &
        {user_role_count?._count.role.toString()} users
      </div>
      <Link href={"/users"} className="link-hover stat-desc flex justify-start ">
        View all
      </Link>
    </div>
  );
}
