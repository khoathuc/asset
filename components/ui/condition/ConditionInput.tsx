"use client";
import Select, { StylesConfig } from "react-select";
import X from "@/public/x_circle.svg";
import { useState } from "react";
import { ConditionValueInput } from "./ConditionValueInput";
import { Condition, FieldOptionType } from "./ConditionBuilder";

const compareOptions = [
  { value: "equal", label: "equal" },
  { value: "not equal", label: "not equal" },
];

type ConditionInputProps = {
  fieldOptions: FieldOptionType[],
  condition: Condition;
  onInputChange: (condition: Condition) => void;
  onInputRemove: (condition: Condition) => void;
};

export function ConditionInput({
  fieldOptions,
  condition,
  onInputChange,
  onInputRemove
}: ConditionInputProps) {
  const key = condition.key;
  const [isShow, setIsShow] = useState(true);
  const [field, setField] = useState(condition.field);
  const [compare, setCompare] = useState(condition.condition);
  const [value, setValue] = useState(condition.value);

  const handleConditionFieldChange = async (selected: any) => {
    setField(selected.value);
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
            defaultValue={
              condition
                ? fieldOptions.find((option) => option.value == condition.field)
                : null
            }
          ></Select>
          <Select
            name="compare"
            options={compareOptions}
            className="basic-multi-select w-40"
            defaultValue={
              compare
                ? compareOptions.find(
                    (option) => option.value == compare,
                  )
                : compareOptions[0]
            }
            onChange={(selected) => {
              if (selected) {
                setCompare(selected.value);
              }
            }}
          ></Select>
          {!field ? (
            <Select placeholder="Empty " className="w-80" isDisabled />
          ) : (
            <ConditionValueInput
              field={field}
              condition={condition}
              className="w-80"
              defaultValue={value}
              onChange={(e) => {
                setValue(e);
                onInputChange({ key, field, condition: compare, value: e });
              }}
            />
          )}
          <button
            onClick={(e) => {
              setIsShow(false);
              onInputRemove({ key, field, condition: compare, value })
            }}
          >
            <X className="h-4 w-4 hover:cursor-pointer hover:text-red-600" />
          </button>
        </div>
      )}
    </>
  );
}
