import { useData } from "@/context/data.context";

export interface StatusOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
}

export function getAllStatuses() {
  const { contextData } = useData();
  const { statuses } = contextData;

  var statusOptions: StatusOption[] = [];

  statuses.forEach((status: any) => {
    statusOptions.push({
      value: status.id,
      label: status.name,
      color: status.color,
    });
  });

  return statusOptions;
}
