import { InputSelectLocation } from "../../../app/settings/locations/@input/InputSelectLocation";
import { InputSelectStatus } from "../../../app/settings/statuses/@input/InputSelectStatus";
import { InputSelectUser } from "../../../app/users/@input/InputSelectUser";
import { Condition } from "./ConditionBuilder";

export function ConditionValueInput({
  field,
  className,
  onChange,
  condition,
  defaultValue,
}: {
  field: string;
  className: string;
  onChange: (e: any) => void;
  condition?: Condition;
  defaultValue?: any;
}) {
  if (field == "status") {
    return (
      <InputSelectStatus
        className={`${className}`}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    );
  }

  if (field == "assignee") {
    return (
      <InputSelectUser
        className={`${className}`}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    );
  }

  if (field == "location") {
    return (
      <InputSelectLocation
        className={`${className}`}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    );
  }
}
