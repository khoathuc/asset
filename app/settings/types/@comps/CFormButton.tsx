"use client";
import { types } from "@prisma/client";
import Custom from "@/public/custom.svg";
import { Modal } from "@/components/layout/Modal";
import CFormBuilder from "../../../../components/ui/cform/CFormBuilder";

export function CFormButton({ type }: { type: types }) {
  function handleClick() {
    Modal.initModal(<CFormBuilder form={type.form} label={type.name} />, (dialog) => {
      Modal.openModal(dialog);
    })
  }
  return (
    <button onClick={handleClick}>
      <Custom className="h-4 w-4" />
      Custom Fields
    </button>
  );
}
