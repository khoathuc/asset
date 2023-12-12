import Select, { ActionMeta } from "react-select";
import { LocationOption, getAllLocations } from "./location";
type SelectLocationProps = {
  defaultValue?: any;
  onChange?: (value: any) => void;
  props?: any;
  className?: string;
};

export function SelectLocation({
  defaultValue,
  onChange,
  props,
  className,
}: SelectLocationProps) {
  const locations = getAllLocations();

  const handleChange = function (selected: LocationOption | null, actionMeta: ActionMeta<LocationOption>) {
    if(selected){
        if(onChange){
            onChange(selected.value);
        }
    }
  };
  return (
    <Select
      name="location"
      options={locations}
      className={`basic-multi-select ${className}`}
      onChange={handleChange}
      defaultValue={
        defaultValue
          ? locations.find((location) => location.value == defaultValue)
          : null
      }
    />
  );
}
