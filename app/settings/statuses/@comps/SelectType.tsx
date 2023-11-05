'use client'
import Select, { ActionMeta, SingleValue , StylesConfig } from "react-select";
import { rgba } from "polished";
import { StatusType } from "@prisma/client";
import { useState } from "react";

type SelectTypeProps = {
  value?: StatusType | undefined;
  onChange: (value: string) => void;
}

export function getOption(code: string){
  return typeOptions.find((option) => option.code === code);
}

interface TypeOption {
  readonly code: string;
  readonly value: string;
  readonly label: string;
  readonly color: string;
}

const typeOptions = [
  { code: "DEPLOYABLE", value: "1", label: "Deployable", color: "#339900" },
  { code: "PENDING", value: "2", label: "Pending", color: "#ffcc00" },
  { code: "UNDEPLOYABLE", value: "3", label: "Undeployable", color: "#cc3300" },
  { code: "ARCHIVED", value: "4", label: "Archived", color: "#cc3300" },
];

export function SelectType({
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
