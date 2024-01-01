"use client";
import { SelectLocation } from "@/components/ui/form/Select/location/SelectLocation";
import { SelectStatus } from "@/app/settings/statuses/@input/SelectStatus";
import { SelectUser } from "@/components/ui/form/Select/user/SelectUser";
import { assets } from "@prisma/client";
import { useEffect, useState } from "react";

type AssetActionChangeFieldProps = {
  field: string;
  change_field: any;
  onChange: (field: string, value: any) => void;
};

export default function AssetActionChangeField({
  field,
  change_field,
  onChange,
}: AssetActionChangeFieldProps) {
  if (change_field.isUse == false) {
    return <></>;
  }
  const [value, setValue] = useState(change_field.value);

  const handleValueChange = (val: string | number) => {
    setValue(val);
  };

  useEffect(() => {
    onChange(field, value);
  }, [value]);


  useEffect(()=>{
    if(change_field.isSetValue){
      console.log("zsdfasdfasdf")
      onChange(field, change_field.value);
    }
  }, []);

  var html;

  switch (field) {
    case "status":
      html = (
        <SelectStatus
          isDisabled={change_field.isSetValue}
          defaultValue={change_field.isSetValue ? change_field.value : null}
          onChange={handleValueChange}
        />
      );
      break;
    case "location":
      html = (
        <SelectLocation
          isDisabled={change_field.isSetValue}
          defaultValue={change_field.isSetValue ? change_field.value : null}
          onChange={handleValueChange}
        />
      );
      break;
    case "assignee":
      html = (
        <SelectUser
          isDisabled={change_field.isSetValue}
          defaultValue={change_field.isSetValue ? change_field.value : null}
          onChange={handleValueChange}
        />
      );
      break;
    default:
      break;
  }

  return (
    <div className="form-control flex flex-col">
      <label className="pb-1 text-sm font-bold text-current capitalize">{field}</label>
      {html}
    </div>
  );
}
