'use client'
import { Modal } from "@/components/layout/Modal";
import { useState } from "react";
import { CreateAssetForm } from "../@form/CreateAssetForm";
import { requests } from "@prisma/client";

export default function CreateAssetButton({request}:{request: requests}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="flex items-center justify-start text-neutral hover:bg-neutral hover:text-neutral-50"
        onClick={() => setShowModal(true)}
      >
        Create new asset
      </button>
      {showModal && Modal.initModal(<CreateAssetForm onClose={()=>setShowModal(false)} request={request} />)}
    </>
  );
}
