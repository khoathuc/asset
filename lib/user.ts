import { useData } from "@/context/data.context";
import { users } from "@prisma/client";

/**
 * @desc get user in sesssion ( client )
 * @param id
 */
export function getUser(id: number) {
  const { contextData } = useData();
  const { users } = contextData;
  if (users) {
    return users.find((user: users) => user.id === id);
  }
}
