import { useData } from "@/context/data.context";
import { assets } from "@prisma/client";
import LocationNotFound from "@/public/location_med_1.svg";
import KArray from "@/utils/array";
import Link from "next/link";

function EmptyLocation() {
  return (
    <>
      <div className="flex gap-2">
        <LocationNotFound className="h-5 w-5" />
        <div className="text-xs font-light">Location not found</div>
      </div>
    </>
  );
}

export function Location({ asset }: { asset: assets }) {
  const { contextData } = useData();
  const { locations } = contextData;

  if (!locations) {
    return <EmptyLocation />;
  }

  const location = KArray.findById(locations, asset.location_id);
  if (!location) {
    return <EmptyLocation />;
  }


  return (
    <Link href="/" className="link-neutral link">
      {location.name.toString()}
    </Link>
  );
}
