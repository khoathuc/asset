"use client"
import Link from "next/link";
import Location from "@/public/location.svg";
import Vendor from "@/public/vendor.svg";
import Type from "@/public/type.svg";
import Tag from "@/public/tag.svg";
import Status from "@/public/status.svg";
import Caction from "@/public/caction.svg";
import PrintTemplate from "@/public/printTemplate.svg";
import RequestPurpose from "@/public/requestPurpose.svg";
import { usePathname } from "next/navigation";
import styles from '@/styles/layout.module.scss'

export default function SettingMenu({ className }: { className: string }) {
  const currentRoute = usePathname();
  
  return (
    <div className={`${className} flex flex-col`}>
      <ul className="menu w-52">
        <li>
          <Link href={"/settings/locations"} className={currentRoute === '/settings/locations' ? 'active' : ''}>
            <Location className={`${currentRoute === '/settings/locations' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} />
            Location
          </Link>
          <Link href={"/settings/vendors"} className={currentRoute === '/settings/vendors' ? 'active' : ''}>
            <Vendor className={`${currentRoute === '/settings/vendors' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} /> Vendors
          </Link>
          <Link href={"/settings/types"} className={currentRoute === '/settings/types' ? 'active' : ''}>
            <Type className={`${currentRoute === '/settings/types' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} /> Asset Types
          </Link>
          <Link href={"/settings/tags"} className={currentRoute === '/settings/tags' ? 'active' : ''}>
            <Tag className={`${currentRoute === '/settings/tags' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} /> Tags
          </Link>
        </li>
      </ul>

      <ul className="menu w-52">
        <li>
          <Link href={"/settings/statuses"} className={currentRoute === '/settings/statuses' ? 'active' : ''}>
            <Status className={`${currentRoute === '/settings/statuses' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} /> Asset Status
          </Link>
          <Link href={"/settings/actions"} className={currentRoute === '/settings/actions' ? 'active' : ''}>
            <Caction className={`${currentRoute === '/settings/actions' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} /> Custom Actions
          </Link>
          <Link href={"/settings/print"} className={currentRoute === '/settings/print' ? 'active' : ''}>
            <PrintTemplate className={`${currentRoute === '/settings/print' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} /> Print Template
          </Link>
          <Link href={"/settings/req_purpose"} className={currentRoute === '/settings/req_purpose' ? 'active' : ''}>
            <RequestPurpose className={`${currentRoute === '/settings/req_purpose' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} /> Request Purposes
          </Link>
        </li>
      </ul>
    </div>
  );
}
