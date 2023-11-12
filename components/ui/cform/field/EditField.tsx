"use client";

import { useState } from "react";
import Edit from "@/public/edit.svg";
import { Modal } from "@/components/layout/Modal";
import { cfieldType } from "@/app/redux/features/cform";
import { CFieldEditForm } from "./CFieldForm";

export default function EditField({field}:{field: cfieldType}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={()=>setShowModal(true)}>
        <Edit className="h-4 w-4"></Edit>
        Edit Field
      </button>
      {showModal &&
        Modal.initModal(
          <CFieldEditForm field={field} onClose={() => setShowModal(false)} />,
        )}
    </>
  );
}
