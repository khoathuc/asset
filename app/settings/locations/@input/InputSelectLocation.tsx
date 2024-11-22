import Select, { ActionMeta } from "react-select";
import { LocationOption, getAllLocations } from "../location";
type SelectLocationProps = {
  name?:string,
  defaultValue?: any;
  onChange?: (value: any) => void;
  props?: any;
  isDisabled?: boolean,
  isMulti?: boolean,
  className?: string;
};

export function InputSelectLocation({
  name, 
  defaultValue,
  onChange,
  props,
  isDisabled,
  isMulti,
  className,
}: SelectLocationProps) {
  const locations = getAllLocations();

  const handleChange = function (selected: LocationOption | LocationOption[]| any, actionMeta: ActionMeta<LocationOption>) {
    if(selected){
        if(onChange){
            if(isMulti){
              onChange(selected.map((option:LocationOption) => option.value));
            }
            else {
              onChange(selected.value);
            }
        }
    }
  };
  return (
    <Select
      name={name?name:'location'}
      options={locations}
      className={`basic-multi-select ${className}`}
      isMulti={isMulti}
      onChange={handleChange}
      isDisabled={isDisabled}
      defaultValue={
        defaultValue
          ? locations.find((location) => location.value == defaultValue)
          : null
      }
    />
  );
}
