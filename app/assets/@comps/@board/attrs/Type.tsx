'use client'
import { assets } from "@prisma/client";
import { useData } from "@/context/data.context";
import KArray from "@/utils/array";
import TypeNotFound from "@/public/screen_disable.svg";
import Link from "next/link";

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

export function Type({ asset }: { asset: assets }) {
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
    <Link href="/" className="link-neutral link">
      {type.name.toString()}
    </Link>
  );
}
