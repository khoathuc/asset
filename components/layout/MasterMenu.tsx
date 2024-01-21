"use client";
import Link from "next/link";
import Setting from "@/public/setting.svg";
import Home from "@/public/home.svg";
import Asset from "@/public/asset.svg";
import UserIcon from "@/public/users-group-rounded-svgrepo-com.svg";
import Dashboard from "@/public/code-scan-svgrepo-com.svg";
import Accessories from "@/public/accessories.svg";
import Licenses from "@/public/licenses.svg";
import Request from "@/public/request.svg";
import Audit from "@/public/audit.svg";
import Depreciation from "@/public/depreciation.svg";
import { usePathname } from "next/navigation";
import styles from "../../styles/layout.module.scss";
import UserNav from "../ui/user/UserNav";
import { useSession } from "next-auth/react";
import { ADMIN_ROLE } from "@/app/api/auth/[...nextauth]/options";

export default function MasterMenu() {
  const currentRoute = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const isAdmin = user?.role == ADMIN_ROLE;

  return (
    <aside className="w-56 border-r-2 bg-base-100">
      <ul className="menu w-56">
        <UserNav />
      </ul>
      <ul className="menu w-56">
        {isAdmin && (
          <li>
            <Link
              href={"/dashboard"}
              className={currentRoute.includes("/dashboard") ? "active" : ""}
            >
              <Dashboard
                className={`${
                  currentRoute.includes("/dashboard")
                    ? styles.active_menu_svg
                    : "stroke-current"
                } h-5 w-5`}
              />{" "}
              Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link href={"/"} className={currentRoute === "/" ? "active" : ""}>
            <Home
              className={`${
                currentRoute === "/" ? styles.active_menu_svg : "stroke-current"
              } h-5 w-5`}
            />{" "}
            My assets
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link
              href={"/settings/locations"}
              className={currentRoute.includes("/settings") ? "active" : ""}
            >
              <Setting
                className={`${
                  currentRoute.includes("/settings")
                    ? styles.active_menu_svg
                    : "stroke-current"
                } h-5 w-5`}
              />{" "}
              Setting
            </Link>
          </li>
        )}
      </ul>

      {isAdmin && (
        <ul className="menu  w-56">
          <li className="menu-title">MANAGEMENT</li>
          <li>
            <Link
              href={"/assets"}
              className={currentRoute === "/assets" ? "active" : ""}
            >
              <Asset
                className={`${
                  currentRoute === "/assets"
                    ? styles.active_menu_svg
                    : "stroke-current"
                } h-5 w-5`}
              />{" "}
              Assets
            </Link>
          </li>
          <li>
            <Link
              href={"/users"}
              className={currentRoute === "/users" ? "active" : ""}
            >
              <UserIcon
                className={`${
                  currentRoute === "/users"
                    ? styles.active_menu_svg
                    : "stroke-current"
                } h-5 w-5`}
              />{" "}
              Users
            </Link>
          </li>
        </ul>
      )}

      <ul className="menu w-56">
        <li className="menu-title">ASSET OPERATIONS</li>
        <li>
          <Link
            href={"/requests"}
            className={currentRoute === "/requests" ? "active" : ""}
          >
            <Request
              className={`${
                currentRoute === "/requests"
                  ? styles.active_menu_svg
                  : "stroke-current"
              } h-5 w-5`}
            />
            Requests
          </Link>
        </li>
        <li>
          <Link
            href={"/audits"}
            className={currentRoute === "/audits" ? "active" : ""}
          >
            <Audit
              className={`${
                currentRoute === "/audits"
                  ? styles.active_menu_svg
                  : "stroke-current"
              } h-5 w-5`}
            />
            Audits
          </Link>
        </li>
        {isAdmin && (
          <li>
            <Link
              href={"/depreciations"}
              className={currentRoute === "/depreciations" ? "active" : ""}
            >
              <Depreciation
                className={`${
                  currentRoute === "/depreciations"
                    ? styles.active_menu_svg
                    : "stroke-current"
                } h-5 w-5`}
              />
              Depreciation
            </Link>
          </li>
        )}
      </ul>

      {/* <ul className="menu w-56">
        <li className="menu-title">LOGS AND REPORTS</li>
      </ul> */}
    </aside>
  );
}
