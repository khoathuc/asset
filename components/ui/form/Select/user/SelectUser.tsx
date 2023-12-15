import Select, { ActionMeta } from "react-select";
import { UserOption, getAllUsers } from "./user";
type SelectUserProps = {
  defaultValue?: any;
  onChange?: (value: any) => void;
  props?: any;
  isDisabled?: boolean,
  className?: string;
};

export function SelectUser({
  defaultValue,
  onChange,
  props,
  isDisabled,
  className,
}: SelectUserProps) {
  const users = getAllUsers();

  const handleChange = function (selected: UserOption | null, actionMeta: ActionMeta<UserOption>) {
    if(selected){
        if(onChange){
            onChange(selected.value);
        }
    }
  };
  return (
    <Select
      name="user"
      options={users}
      className={`basic-multi-select ${className}`}
      onChange={handleChange}
      isDisabled={isDisabled}
      defaultValue={
        defaultValue
          ? users.find((user) => user.value == defaultValue)
          : null
      }
    />
  );
}
