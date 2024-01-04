'use client'
import { Modal } from "@/components/layout/Modal";
import { useState } from "react";
import { CreateForm } from "@/app/assets/@form/CreateForm";

export default function CreateButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="flex items-center justify-start text-neutral hover:bg-neutral hover:text-neutral-50"
        onClick={() => setShowModal(true)}
      >
        Create new asset
      </button>
      {showModal && Modal.initModal(<CreateForm onClose={()=>setShowModal(false)}/>)}
    </>
  );
}
