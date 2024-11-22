"use client";
import { useData } from "@/context/data.context";
import { depreciations, locations } from "@prisma/client";
import LocationNotFound from "@/public/location_med_1.svg";
import KArray from "@/utils/array";

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

export function DepreciationAttrLocation({ depreciation }: { depreciation: depreciations }) {
  const { contextData } = useData();
  const { locations } = contextData;

  if (!locations) {
    return <EmptyLocation />;
  }

  const depreciation_locations = KArray.find(
    locations,
    depreciation.locations as Array<number | string>,
  );
  if (!depreciation_locations || depreciation_locations.length == 0) {
    return <EmptyLocation />;
  }

  return (
    <>
      {depreciation_locations &&
        depreciation_locations.map((location: locations) => {
          return <span>{location.name} ,</span>;
        })}
    </>
  );
}
