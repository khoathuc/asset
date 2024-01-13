import { useData } from "@/context/data.context";

export interface UserOption {
  readonly value: string;
  readonly label: string;
}

export function getAllUsers() {
  const { contextData } = useData();
  const { users } = contextData;

  var userOptions: UserOption[] = [];

  if (users) {
    users.forEach((user: any) => {
      userOptions.push({
        value: user.id,
        label: user.username,
      });
    });
  }

  return userOptions;
}
