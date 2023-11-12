import { CField } from "./CreateField";
import { CFormCreateText, CFormEditText } from "./@form/Text";
import { CFormCreateNumber, CFormEditNumber } from "./@form/Number";
import { cfieldType } from "@/app/redux/features/cform";

export function CFieldCreateForm({
  field,
  onClose,
}: {
  field: CField;
  onClose: () => void;
}) {
  switch (field.code) {
    case "text":
      return <CFormCreateText onClose={onClose} />;
    case "number":
      return <CFormCreateNumber onClose={onClose} />;
  }
}

export function CFieldEditForm({
  field,
  onClose,
}: {
  field: cfieldType;
  onClose: () => void;
}) {
  switch (field.type) {
    case "text":
      return <CFormEditText field={field} onClose={onClose} />;
    case "number":
      return <CFormEditNumber field={field} onClose={onClose} />;
  }
}
