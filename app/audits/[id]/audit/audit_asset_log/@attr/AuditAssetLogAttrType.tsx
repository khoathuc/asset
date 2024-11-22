'use client'
import { useData } from "@/context/data.context";
import KArray from "@/utils/array";
import TypeNotFound from "@/public/screen_disable.svg";
import Link from "next/link";
import { assetExportData } from "@/models/audit/audit_log/audit_log";

function EmptyType() {
  return (
    <>
      <div className="flex gap-2">
        <TypeNotFound className="h-5 w-5" />
        <div className="text-xs font-light">Type not found</div>
      </div>
    </>
  );
}

export function AuditAssetLogAttrType({ asset }: { asset: assetExportData }) {
  const { contextData } = useData();
  const { types } = contextData;
  if (!types) {
    return <EmptyType />;
  }

  const type = KArray.findById(types, asset.type_id);
  if (!type) {
    return <EmptyType />;
  }

  return (
    <Link href="/" className="link-neutral link -type">
      {type.name.toString()}
    </Link>
  );
}
