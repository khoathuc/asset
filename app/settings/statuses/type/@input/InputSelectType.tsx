'use client'
import Select, { ActionMeta, StylesConfig } from "react-select";
import { rgba } from "polished";
import { StatusType } from "@prisma/client";
import { useState } from "react";
import {TypeOption, getOption, typeOptions} from "../type";

type SelectTypeProps = {
  value?: StatusType | undefined;
  onChange: (value: string) => void;
}

export function InputSelectType({
  value,
  onChange,
}: SelectTypeProps) {
  const [selectedOption, setSelectedOption] = useState(value?getOption(value):typeOptions[0])

  const colourStyles: StylesConfig<TypeOption> = {
    option: (styles, state) => {
      const { data, isSelected, isFocused } = state;
      return {
        ...styles,
        borderLeft: `4px solid ${data.color}`,
        backgroundColor: isSelected
          ? data.color
          : isFocused
          ? rgba(data.color, 0.1)
          : undefined,
      };
    },
  };

  const handleChange = (selected: TypeOption | null, actionMeta: ActionMeta<TypeOption>)=>{
    if(selected){
      setSelectedOption(selected);
      onChange(selected.value || '');
    }
  }

  return (
    <Select
      value={selectedOption}
      options={typeOptions}
      isMulti={false}
      placeholder="Please select status type"
      styles={colourStyles}
      onChange={handleChange}
    />
  );
}
