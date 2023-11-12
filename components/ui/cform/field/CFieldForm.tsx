import { CField } from "./CreateField";
import CFormText from "./@form/Text";
import CFormNumber from "./@form/Number";

export function CFieldForm({
  field,
  onClose,
}: {
  field: CField;
  onClose: () => void;
}) {
  switch (field.code) {
    case "text":
      return <CFormText onClose={onClose}/>;
    case "number":
      return <CFormNumber onClose={onClose}/>;
  }
}
