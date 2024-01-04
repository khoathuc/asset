"use client";
import { ActionMeta } from "react-select";
import Select from "react-select";
import { getAllVendors } from "../vendor";

export interface VendorOption {
  readonly value: string;
  readonly label: string;
}

type SelectVendorProps = {
    value?: number | string | undefined;
    onChange: (value: any) => void;
}

export function InputSelectVendor({value, onChange}: SelectVendorProps) {
  const vendors = getAllVendors();

  const handleChange = (selected: VendorOption | null, actionMeta: ActionMeta<VendorOption>)=>{
    if(selected){
        onChange(selected.value);
    }
  }

  return (
    <Select
      options={vendors}
      defaultValue={
        value
          ? vendors.find((vendor) => vendor.value == value)
          : null
      }
      onChange={handleChange}
    />
  );
}
