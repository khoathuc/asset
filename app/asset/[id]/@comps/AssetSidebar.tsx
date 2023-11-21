"use client";
import { assets } from "@prisma/client";
import Image from "next/image";
import User from "@/public/user.svg";
import Email from "@/public/at_symbol.svg";
import Phone from "@/public/phone.svg";
import Checkout from "@/public/archive_box_arrow.svg";
import qr_temp from "@/assets/qr_code.png";

type AssetSidebarProps = {
  asset: assets;
};

function AssetDefaultAction() {
  function onClick() {}
  const defaultActions = [
    { label: "Checkin Asset", url: onClick },
    { label: "Edit Asset", url: onClick },
    { label: "Clone Asset", url: onClick },
    { label: "Audit", url: onClick },
    { label: "Remove", url: onClick, style: "red" },
  ];

  return (
    <div className="flex w-full flex-col gap-1 py-2">
      {defaultActions.map((action, index) => {
        var addClass = ``;
        if (action.style && action.style == "red") {
          addClass += " bg-red-600 hover:bg-error hover:text-neutral-content";
        }

        return (
          <button
            className={`btn h-8 min-h-0 w-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus ${addClass}`}
            onClick={action.url}
          >
            {action.label}
          </button>
        );
      })}
    </div>
  );
}

function AssetSidebarUser() {
  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="font-semibold">Checked out to</h3>
      <span className="flex">
        <User className="h-4 w-4" />
        Khoale
      </span>
      <span className="flex">
        <Email className="h-4 w-4" />
        khoathuc141201@gmail.com
      </span>
      <span className="flex">
        <Phone className="h-4 w-4" />
        1-707-344-3583
      </span>
    </div>
  );
}

function AssetSidebarQr() {
  return <Image className='self-end' src={qr_temp} width={150} height={150} alt={""}></Image>;
}

export default function AssetSidebar({ asset }: AssetSidebarProps) {
  return (
    <div className="flex flex-col items-center justify-start">
      {asset.image && (
        <Image
          src={asset.image.toString()}
          alt={asset.name?.toString()}
          width={150}
          height={150}
        ></Image>
      )}
      <div className="w-full">
        <AssetDefaultAction />
      </div>
      <div className="flex flex-col w-full text-xs">
        <AssetSidebarUser />
        <AssetSidebarQr />
      </div>
    </div>
  );
}
