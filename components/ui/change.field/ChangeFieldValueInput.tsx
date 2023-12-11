import { SelectLocation } from "../form/Select/location/SelectLocation";
import { SelectStatus } from "../form/Select/status/SelectStatus";
import { SelectUser } from "../form/Select/user/SelectUser";

type ChangeFieldInputProps = {
  field: string;
  className: string;
  onChange: (e: any) => void;
};
export function ChangeFieldValueInput({
  field,
  className,
  onChange,
}: ChangeFieldInputProps) {
  if (field == "status") {
    return <SelectStatus className={`${className}`} onChange={onChange} />;
  }

  if (field == "assignee") {
    return <SelectUser className={`${className}`} onChange={onChange} />;
  }

  if (field == "location") {
    return <SelectLocation className={`${className}`} onChange={onChange} />;
  }
}
