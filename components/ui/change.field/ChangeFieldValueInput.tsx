import { InputSelectLocation } from "../../../app/settings/locations/@input/InputSelectLocation";
import { InputSelectStatus } from "../../../app/settings/statuses/@input/InputSelectStatus";
import { InputSelectUser } from "../../../app/users/@input/InputSelectUser";

type ChangeFieldInputProps = {
  field: string;
  defaultValue?: string | number,
  className: string;
  onChange: (e: any) => void;
};
export function ChangeFieldValueInput({
  field,
  defaultValue,
  className,
  onChange,
}: ChangeFieldInputProps) {
  if (field == "status") {
    return <InputSelectStatus defaultValue={defaultValue} className={`${className}`} onChange={onChange} />;
  }

  if (field == "assignee") {
    return <InputSelectUser defaultValue={defaultValue} className={`${className}`} onChange={onChange} />;
  }

  if (field == "location") {
    return <InputSelectLocation defaultValue={defaultValue} className={`${className}`} onChange={onChange} />;
  }
}
