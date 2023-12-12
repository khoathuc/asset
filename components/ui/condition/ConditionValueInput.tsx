import { SelectLocation } from "../form/Select/location/SelectLocation";
import { SelectStatus } from "../form/Select/status/SelectStatus";
import { SelectUser } from "../form/Select/user/SelectUser";
import { Condition } from "./ConditionBuilder";

export function ConditionValueInput({
  field,
  className,
  onChange,
  condition,
  defaultValue
}: {
  field: string;
  className: string;
  onChange: (e: any)=>void;
  condition?:Condition
  defaultValue?:any
}) {
  if (field == "status") {
    return <SelectStatus className={`${className}`} onChange={onChange} defaultValue={defaultValue}/>;
  }

  if (field == "assignee"){
    return <SelectUser className={`${className}`} onChange={onChange} defaultValue={defaultValue}/>
  }

  if (field == "location"){
    return <SelectLocation className={`${className}`} onChange={onChange} defaultValue={defaultValue}/>
  }
}
