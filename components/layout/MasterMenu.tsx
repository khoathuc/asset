'use client'
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Setting from "@/public/setting.svg";
import Home from "@/public/home.svg";
import Asset from "@/public/asset.svg";
import Accessories from "@/public/accessories.svg";
import Licenses from "@/public/licenses.svg";
import Request from "@/public/request.svg";
import Audit from "@/public/audit.svg";
import Depreciation from "@/public/depreciation.svg";
import {usePathname} from 'next/navigation';
import styles from '../../styles/layout.module.scss'

export default function MasterMenu() {
  const currentRoute =usePathname();

  return (
    <aside className="w-56 bg-base-100 border-r-2">
      <ul className="menu w-56">
        <div className="flex h-16 gap-3 px-4">
          <div className="avatar items-center">
            <div className="w-6 rounded-full">
              <Image
                src={logo}
                alt="avatar"
                style={{ width: "40px", height: "40px" }}
              ></Image>
            </div>
          </div>
          <div className="flex flex-grow flex-col justify-center text-sm font-light">
            <div className="pt-1 text-base font-bold">Le Dinh Khoa</div>
            <div className="pt-1 text-xs text-neutral-400">Manager</div>
          </div>
        </div>
      </ul>
      <ul className="menu w-56">
        <li>
          <Link href={"/"} className={currentRoute === '/' ? 'active' : ''}>
            <Home className={`${currentRoute === '/' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} /> My assets
          </Link>
        </li>
        <li>
          <Link href={"/settings/locations"} className={currentRoute.includes('/settings') ? 'active' : ''}>
            <Setting className={`${currentRoute.includes('/settings') ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} /> Setting
          </Link>
        </li>
      </ul>
      <ul className="menu  w-56">
        <li className="menu-title">ASSET MANAGEMENT</li>
        <li>
          <Link href={"/assets"} className={currentRoute === '/assets' ? 'active' : ''}>
            <Asset className={`${currentRoute === '/assets' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} /> Assets
          </Link>
        </li>
        <li>
          <Link href={"/accessories"} className={currentRoute === '/accessories' ? 'active' : ''}>
            <Accessories className={`${currentRoute === '/accessories' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} />
            Accessories
          </Link>
        </li>
        <li>
          <Link href={"/licenses"} className={currentRoute === '/licenses' ? 'active' : ''}>
            <Licenses className={`${currentRoute === '/licenses' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} />
            Licenses
          </Link>
        </li>
      </ul>

      <ul className="menu w-56">
        <li className="menu-title">ASSET OPERATIONS</li>
        <li>
          <Link href={"/requests"} className={currentRoute === '/requests' ? 'active' : ''}>
            <Request className={`${currentRoute === '/requests' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} />
            Requests
          </Link>
        </li>
        <li>
          <Link href={"/audits"} className={currentRoute === '/audits' ? 'active' : ''}>
            <Audit className={`${currentRoute === '/audits' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} />
            Audits
          </Link>
        </li>
        <li>
          <Link href={"/depreciation"} className={currentRoute === '/depreciation' ? 'active' : ''}>
            <Depreciation className={`${currentRoute === '/depreciation' ? styles.active_menu_svg : 'stroke-current' } h-5 w-5`} />
            Depreciation
          </Link>
        </li>
      </ul>

      <ul className="menu w-56">
        <li className="menu-title">LOGS AND REPORTS</li>
      </ul>
    </aside>
  );
}
