import { useData } from "@/context/data.context";
import { locations } from "@prisma/client";
export function getLocation(id: number) {
  const { contextData } = useData();
  const { locations } = contextData;
  if (locations) {
    return locations.find((location: locations) => location.id === id);
  }
}
