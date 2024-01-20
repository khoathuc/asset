import { Location } from "@/models/location/location";
import Link from "next/link";
import Locations from "@/public/building_office2.svg";

export default async function LocationStat() {
  const location_stat = await Location.stat().all();

  const auding_location_stat = await Location.stat().aggregateAuditing();

  return (
    <div className="stat">
      <div className="stat-figure text-neutral">
        <Locations className="h-8 w-8" />
      </div>
      <div className="stat-title">Total Location</div>
      <div className="stat-value">{location_stat}</div>
      <div className="stat-desc">
        {auding_location_stat?._count.auditing.toString()} auditing
      </div>
      <Link
        href={"/locations"}
        className="link-hover stat-desc flex justify-start"
      >
        View all
      </Link>
    </div>
  );
}
