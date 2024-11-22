"use client";
import Edit from "@/public/edit.svg";
import { Modal } from "@/components/layout/Modal";
import { types } from "@prisma/client";
import { EditForm } from "../@form/EditForm";
import { useState } from "react";

export default function EditButton({ type }: { type: types }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <Edit className="h-4 w-4"></Edit>
        Edit type
      </button>
      {showModal &&
        Modal.initModal(
          <EditForm type={type} onClose={() => setShowModal(false)} />,
        )}
    </>
  );
}
