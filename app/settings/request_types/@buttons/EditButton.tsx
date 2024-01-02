"use client";
import React, { useState } from "react";
import { request_types } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "../@form/EditForm";

export default function EditButton({ requestType }: { requestType: request_types }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={()=>setShowModal(true)}>
        <Edit className="h-4 w-4" />
        Edit
      </button>
      {showModal && Modal.initModal(<EditForm requestType={requestType} onClose={()=> setShowModal(false)} />)}
    </>
  );
}
