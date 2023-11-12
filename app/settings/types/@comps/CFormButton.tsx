"use client";
import { types } from "@prisma/client";
import Custom from "@/public/custom.svg";
import { Modal } from "@/components/layout/Modal";
import CFormBuilder from "../../../../components/ui/cform/CFormBuilder";
import { useState } from "react";

export function CFormButton({ type }: { type: types }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <Custom className="h-4 w-4" />
        Custom Fields
      </button>
      {showModal &&
        Modal.initModal(
          <CFormBuilder
            form={type.form}
            label={type.name}
            onClose={() => setShowModal(false)}
          />,
        )}
    </>
  );
}
