import { InputSelectLocation } from "../../../app/settings/locations/@input/InputSelectLocation";
import { SelectStatus } from "../../../app/settings/statuses/@input/SelectStatus";
import { SelectUser } from "../form/Select/user/SelectUser";

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
    return <SelectStatus defaultValue={defaultValue} className={`${className}`} onChange={onChange} />;
  }

  if (field == "assignee") {
    return <SelectUser defaultValue={defaultValue} className={`${className}`} onChange={onChange} />;
  }

  if (field == "location") {
    return <InputSelectLocation defaultValue={defaultValue} className={`${className}`} onChange={onChange} />;
  }
}
