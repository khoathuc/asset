import { InputSelectLocation } from "../../../app/settings/locations/@input/InputSelectLocation";
import { SelectStatus } from "../../../app/settings/statuses/@input/SelectStatus";
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
    return <InputSelectLocation className={`${className}`} onChange={onChange} defaultValue={defaultValue}/>
  }
}
