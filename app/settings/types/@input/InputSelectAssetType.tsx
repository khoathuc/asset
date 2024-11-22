"use client";
import { ActionMeta } from "react-select";
import { getAllAssetTypes } from "../asset_type";
import Select from "react-select";

export interface TypeOption {
  readonly value: string|number;
  readonly label: string;
}

type SelectTypeProps = {
    value?: number | string | undefined;
    onChange: (value: string|number) => void;
}

export function InputSelectAssetType({value, onChange}: SelectTypeProps) {
  const asset_types = getAllAssetTypes();
  const handleChange = (selected: TypeOption | null, actionMeta: ActionMeta<TypeOption>)=>{
    if(selected){
        onChange(selected.value);
    }
  }

  return (
    <Select
      options={asset_types}
      defaultValue={
        value
          ? asset_types.find((asset_type) => asset_type.value == value)
          : null
      }
      onChange={handleChange}
    />
  );
}
