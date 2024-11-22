"use client";
import { useEffect, useState } from "react";
import { ChangeFieldInput } from "./ChangeFieldInput";

export type ChangeField = {
  isUse: boolean;
  value: any;
  isSetValue: any;
};

export type ChangeFields = {
  assignee: ChangeField;
  location: ChangeField;
  status: ChangeField;
};

type ChangeFieldsProps = {
  fields: ChangeFields;
  onChangeFieldsChange: (changeFields: ChangeFields) => void;
};

export function ChangeFieldsBuilder({ fields, onChangeFieldsChange }: ChangeFieldsProps) {
  const [changeFields, setChangeFields] = useState<ChangeFields>(fields);

  const onChange = (field: string, input: ChangeField) => {
    setChangeFields((changeFields) => ({ ...changeFields, [field]: input }));
  };

  useEffect(()=>{
    onChangeFieldsChange(changeFields)
  }, [changeFields])

  return (
    <div className="bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Field</th>
            <th>Set value</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(changeFields).map(([key, value]) => (
            <ChangeFieldInput
              key={key}
              field={key}
              input={value}
              onChange={(field: string, changeField: ChangeField) =>
                onChange(field, changeField)
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
