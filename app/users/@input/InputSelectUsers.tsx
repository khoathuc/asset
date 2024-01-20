"use client"
import Select, { ActionMeta, MultiValue } from "react-select";
import { UserOption, getAllUsers } from "../user";
import { useEffect } from "react";
type SelectUserProps = {
  name?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
  props?: any;
  isDisabled?: boolean;
  className?: string;
};

export function InputSelectUsers({
  name = "users",
  defaultValue,
  onChange,
  props,
  isDisabled,
  className,
}: SelectUserProps) {
  const users = getAllUsers();

  const handleChange = function (
    selected: MultiValue<UserOption> | null,
    actionMeta: ActionMeta<UserOption>,
  ) {
    if (selected) {
      if (onChange) {
        onChange(selected.map((option) => option.value));
      }
    }
  };

  useEffect(()=>{
    if(defaultValue){
      if(onChange){
        onChange(defaultValue)
      }
    }
  }, [])

  return (
    <Select
      name={name}
      isMulti
      options={users}
      className={`basic-multi-select ${className}`}
      onChange={handleChange}
      isDisabled={isDisabled}
      defaultValue={
        defaultValue ? users.filter((user) => {return defaultValue.includes(user.value)}) : null
      }
    />
  );
}
