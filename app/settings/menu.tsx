import Link from "next/link";
import Location from "@/public/location.svg";
import Vendor from "@/public/vendor.svg";
import Type from "@/public/type.svg";
import Tag from "@/public/tag.svg";
import Status from "@/public/status.svg";
import Caction from "@/public/caction.svg";
import PrintTemplate from "@/public/printTemplate.svg";
import RequestPurpose from "@/public/requestPurpose.svg";

export default function SettingMenu({ className }: { className: string }) {
  return (
    <div className={`${className} flex flex-col`}>
      <ul className="menu w-52">
        <li>
          <Link href={"/"}>
            <Location className="h-5 w-5" />
            Location
          </Link>
          <Link href={"/"}>
            <Vendor className="h-5 w-5" /> Vendors
          </Link>
          <Link href={"/"}>
            <Type className="h-5 w-5" /> Asset Types
          </Link>
          <Link href={"/"}>
            <Tag className="h-5 w-5" /> Tags
          </Link>
        </li>
      </ul>

      <ul className="menu w-52">
        <li>
          <Link href={"/"}>
            <Status className="h-5 w-5" /> Asset Status
          </Link>
          <Link href={"/"}>
            <Caction className="h-5 w-5" /> Custom Actions
          </Link>
          <Link href={"/"}>
            <PrintTemplate className="h-5 w-5" /> Print Template
          </Link>
          <Link href={"/"}>
            <RequestPurpose className="h-5 w-5" /> Request Purposes
          </Link>
        </li>
      </ul>
    </div>
  );
}
