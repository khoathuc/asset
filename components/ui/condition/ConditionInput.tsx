"use client";
import Select, { StylesConfig } from "react-select";
import X from "@/public/x_circle.svg";
import { useState } from "react";
import { ConditionValueInput } from "./ConditionValueInput";
import { Condition } from "./ConditionBuilder";

const fieldOptions = [
  { value: "location", label: "location" },
  { value: "assignee", label: "assignee" },
  { value: "status", label: "status" },
];

const compareOptions = [
  { value: "equal", label: "equal" },
  { value: "not equal", label: "not equal" },
];

export function ConditionInput({condition}:{condition: Condition}) {
  const [isShow, setIsShow] = useState(true);
  const [field, setField] = useState(null);
  const [compare, setCompare] = useState(compareOptions[0].value);
  const [value, setValue] = useState(null);

  const handleConditionFieldChange = async (selected: any) => {
    setField(selected.value)
  };

  return (
    <>
      {isShow && (
        <div className="flex items-center justify-between">
          <Select
            name="field"
            options={fieldOptions}
            className="basic-multi-select w-40"
            onChange={handleConditionFieldChange}
            defaultValue={condition?fieldOptions.find(option => option.value == condition.field):null}
          ></Select>
          <Select
            name="compare"
            options={compareOptions}
            className="basic-multi-select w-40"
            defaultValue={condition?compareOptions.find(option => option.value == condition.field):compareOptions[0]}
            onChange={(selected)=>{
                if(selected){
                    setCompare(selected.value)
                }
            }}
          ></Select>
          {!field ? (
            <Select placeholder="Empty " className="w-80" isDisabled />
          ) : (
            <ConditionValueInput field={field} condition={condition} className="w-80" onChange={(e)=>{setValue(e)}}/>
          )}
          <button
            onClick={(e) => {
              setIsShow(false);
            }}
          >
            <X className="h-4 w-4 hover:cursor-pointer hover:text-red-600" />
          </button>
        </div>
      )}
    </>
  );
}
