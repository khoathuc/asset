'use client'
import { useData } from "@/context/data.context";
import { assets } from "@prisma/client";
import VendorNotFound from "@/public/location_med_1.svg";
import KArray from "@/utils/array";
import Link from "next/link";

function EmptyVendor() {
  return (
    <>
      <div className="flex gap-2">
        <VendorNotFound className="h-5 w-5" />
        <div className="text-xs font-light">Vendor not found </div>
      </div>
    </>
  );
}

export function Vendor({ asset }: { asset: assets }) {
  const { contextData } = useData();
  const { vendors } = contextData;

  if (!vendors) {
    return <EmptyVendor />;
  }

  const vendor = KArray.findById(vendors, asset.vendor_id);
  if (!vendor) {
    return <EmptyVendor />;
  }


  return (
    <Link href="/" className="link-neutral link -vendor">
      {vendor.name.toString()}
    </Link>
  );
}
