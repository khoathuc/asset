"use client";
import Select, { StylesConfig } from "react-select";
import { useEffect, useState } from "react";
import { ChangeField } from "./ChangeFieldsBuilder";
import { ChangeFieldValueInput } from "./ChangeFieldValueInput";

type ChangeFieldInputProps = {
  field: string;
  input: ChangeField;
  onChange: (field:string, changeField: ChangeField) => void;
};

export function ChangeFieldInput({ field, input, onChange }: ChangeFieldInputProps) {
  const [changeField, setChangeField] = useState<ChangeField>(input);

  const [isUse, setIsUse] = useState(input.isUse);
  const [isSetValue, setIsSetValue] = useState(input.isSetValue ? true : false);
  const [value, setValue] = useState(input.value);

  const handleToggleIsUse = () => {
    setIsUse(!isUse);
    if (isUse) {
      setIsSetValue(false);
    }
  };

  const handleToggleIsSetValue = () => {
    setIsSetValue(!isSetValue);
  };

  const handleValueChange = (val: string | number) => {
    setValue(val);
  };

  useEffect(() => {
    onChange(field, {isUse, isSetValue, value})
  }, [isUse, isSetValue, value]);

  return (
    <tr className={`${isUse ? "bg-neutral-100" : ""}`}>
      <th>
        <input
          type="checkbox"
          className="toggle toggle-sm"
          checked={isUse}
          onChange={handleToggleIsUse}
        />
      </th>
      <td>
        <div className="text-md font-bold uppercase">{field}</div>
      </td>
      <td>
        <input
          type="checkbox"
          className={`checkbox checkbox-sm ${
            !isUse ? "cursor-not-allowed" : ""
          }`}
          checked={isSetValue}
          onChange={handleToggleIsSetValue}
          disabled={!isUse}
        />
      </td>
      <td>
        {!isSetValue ? (
          <Select placeholder="Empty " className="w-50" isDisabled />
        ) : (
          <ChangeFieldValueInput
            field={field}
            className="w-50"
            onChange={(val: string | number) => {
              handleValueChange(val);
            }}
          />
        )}
      </td>
    </tr>
  );
}
