"use client";
import React, { useState } from "react";
import { actions } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "../@form/EditForm";

export default function EditButton({ action }: { action: actions }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={()=>setShowModal(true)}>
        <Edit className="h-4 w-4" />
        Edit action
      </button>
      {showModal && Modal.initModal(<EditForm action={action} onClose={()=> setShowModal(false)} />)}
    </>
  );
}
