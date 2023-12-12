import { useData } from "@/context/data.context";

export interface LocationOption {
  readonly value: string;
  readonly label: string;
}

export function getAllLocations() {
  const { contextData } = useData();
  const { locations } = contextData;

  var locationOptions: LocationOption[] = [];

  locations.forEach((location: any) => {
    locationOptions.push({
      value: location.id,
      label: location.name,
    });
  });

  return locationOptions;
}
