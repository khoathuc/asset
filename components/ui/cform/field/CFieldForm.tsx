import { CField } from "./CreateField";
import CFormText from "./@form/Text";
import CFormNumber from "./@form/Number";

export function CFieldForm({field}:{field: CField}){
    switch(field.code){
        case "text":
            return <CFormText />
        case "number":
            return <CFormNumber />
    }
}