"use client";
import { useData } from "@/context/data.context";
import { audits, locations } from "@prisma/client";
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

export function AuditAttrLocation({ audit }: { audit: audits }) {
  const { contextData } = useData();
  const { locations } = contextData;

  if (!locations) {
    return <EmptyLocation />;
  }

  const audit_locations = KArray.find(
    locations,
    audit.locations as Array<number | string>,
  );
  if (!audit_locations || audit_locations.length == 0) {
    return <EmptyLocation />;
  }

  return (
    <>
      {audit_locations &&
        audit_locations.map((location: locations) => {
          return <span>{location.name} ,</span>;
        })}
    </>
  );
}
