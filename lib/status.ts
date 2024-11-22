import { useData } from "@/context/data.context";
import { statuses } from "@prisma/client";

/**
 * @desc get location
 * @param id
 */
export function getStatus(id: number) {
  const { contextData } = useData();
  const { statuses } = contextData;
  if (statuses) {
    return statuses.find((status: statuses) => status.id === id);
  }
}
