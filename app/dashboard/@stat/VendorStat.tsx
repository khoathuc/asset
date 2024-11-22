import { Vendor } from "@/models/vendor/vendor";
import VendorIcon from "@/public/truck.svg";
import Link from "next/link";

export default async function VendorStat() {
  const vendor_stat = await Vendor.stat().all();
  return (
    <div className="stat">
      <div className="stat-figure text-neutral">
        <VendorIcon className="h-8 w-8" />
      </div>
      <div className="stat-title">Total Vendors</div>
      <div className="stat-value">{vendor_stat}</div>
      <div className="stat-desc"></div>
      <Link
        href={"/vendors"}
        className="link-hover stat-desc flex justify-start"
      >
        View all
      </Link>
    </div>
  );
}
