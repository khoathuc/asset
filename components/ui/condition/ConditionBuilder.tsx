"use client";
import { useEffect, useState } from "react";
import Plus from "@/public/circle_plus.svg";
import { ConditionInput } from "./ConditionInput";
import { v4 as uuidv4 } from "uuid";

export type Condition = {
  key: string | number;
  condition?: string;
  field?: string;
  value?: string;
};

export type FieldOptionType = {
  value: string;
  label: string;
};

const fieldDefaultOptions = [
  { value: "location", label: "location" },
  { value: "assignee", label: "assignee" },
  { value: "status", label: "status" },
];

export function ConditionsBuilder({
  conds,
  onSubmit,
}: {
  conds: Condition[];
  onSubmit?: (conds: Condition[]) => void;
}) {
  const [fieldOptions, setFieldOptions] =
    useState<FieldOptionType[]>(fieldDefaultOptions);
  const [conditions, setConditions] = useState<Condition[]>(conds);

  const removeFieldOptions = (field: string) => {
    setFieldOptions(fieldOptions.filter((fieldOption)=>fieldOption.value != field))
  };

  const addFieldOptions = (field: string) => {};

  const handleConditionInputChange = (input: Condition) => {
    const updatedConditions = conditions.map((condition) => {
      if (condition.key == input.key) {
        if (input.field) {
          removeFieldOptions(input.field);
        }
        return input;
      } else {
        return condition;
      }
    });

    setConditions(updatedConditions);
  };

  const handleConditionInputRemoved = (input: Condition) => {
    if(input.field){
      addFieldOptions(input.field);
    }
    setConditions(conditions.filter((condition) => condition.key != input.key));
  };

  useEffect(() => {}, [conditions]);

  return (
    <div className="flex flex-col gap-3">
      {conditions.map((condition, index) => (
        <ConditionInput
          key={index}
          fieldOptions={fieldOptions}
          condition={condition}
          onInputChange={(input: Condition) => {
            handleConditionInputChange(input);
          }}
          onInputRemove={(input: Condition) => {
            handleConditionInputRemoved(input);
          }}
        />
      ))}
      <div className="flex items-center justify-end gap-2 hover:cursor-pointer hover:underline">
        <Plus className="h-5" />
        <button
          onClick={(e) => {
            e.preventDefault();
            setConditions((conditions) => [...conditions, { key: uuidv4() }]);
          }}
        >
          Add new
        </button>
      </div>
    </div>
  );
}
