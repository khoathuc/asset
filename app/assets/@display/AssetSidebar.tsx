"use client";
import { assets } from "@prisma/client";
import Image from "next/image";
import User from "@/public/user.svg";
import Email from "@/public/at_symbol.svg";
import Phone from "@/public/phone.svg";
import QRCode from "qrcode.react";
import { usePathname } from "next/navigation";
import EditButton from "../@buttons/EditButton";
import DuplicateButton from "../@buttons/DuplicateButton";
import ExportQrButton from "../@buttons/ExportQrButton";
import RemoveButton from "../@buttons/RemoveButton";
import { getUser } from "@/lib/user";
import UserInfo from "@/components/ui/user/UserInfo";
import CheckinButton from "../@buttons/CheckinButton";

type AssetSidebarProps = {
  asset: assets;
};

function AssetDefaultAction({ asset }: { asset: assets }) {
  function onClick() {}
  const defaultActions = [
    { label: "Edit Asset", url: onClick },
    { label: "Clone Asset", url: onClick },
    { label: "Download Qr Code", url: onClick },
    { label: "Export", url: onClick },
    { label: "Remove", url: onClick, style: "red" },
  ];

  return (
    <div className="flex w-full flex-col gap-1 py-2">
      <div className="btn h-4 w-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus">
        <EditButton
          asset={asset}
          className="flex h-full w-full flex-1 items-center justify-center"
        />
      </div>
      <div className="btn h-4 w-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus">
        <DuplicateButton
          asset={asset}
          className="flex h-full w-full flex-1 items-center justify-center"
        />
      </div>
      <div className="btn h-4 w-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus">
        <ExportQrButton
          asset={asset}
          className="flex h-full w-full flex-1 items-center justify-center"
        />
      </div>
      {!asset.assignee_id && (
        <div className="btn h-4 w-full bg-red-600 hover:bg-error hover:text-neutral-content normal-case text-neutral-content">
          <RemoveButton
            asset={asset}
            className="flex h-full w-full flex-1 items-center justify-center"
          />
        </div>
      )}
      {asset.assignee_id && (
        <div className="btn h-4 w-full bg-red-600 hover:bg-error hover:text-neutral-content normal-case text-neutral-content">
          <CheckinButton
            asset={asset}
            className="flex h-full w-full flex-1 items-center justify-center"
          />
        </div>
      )}
    </div>
  );
}

function AssetSidebarUser({asset}:{asset:assets}) {
  if(!asset.assignee_id){
    return <></>
  }
  const user = getUser(asset.assignee_id);
  console.log(user)
  
  return (
    <div className="flex flex-col items-start gap-2">
      <h3 className="font-semibold">Assigned to</h3>
      <span className="flex">
        <User className="h-4 w-4" />
        <UserInfo user_id={user.id} compact/>
      </span>
      <span className="flex">
        <Email className="h-4 w-4" />
        {user.email.toString()}
      </span>
      <span className="flex">
        <Phone className="h-4 w-4" />
        {user.phone.toString() || 'No information'}
      </span>
    </div>
  );
}

export default function AssetSidebar({ asset }: AssetSidebarProps) {
  const pathname = usePathname();
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
        <AssetDefaultAction asset={asset} />
      </div>
      <div className="flex w-full flex-col text-xs">
        {asset.assignee_id && <AssetSidebarUser asset={asset}/>}
        <QRCode value={`${pathname}`} className="self-end" />;
      </div>
    </div>
  );
}
