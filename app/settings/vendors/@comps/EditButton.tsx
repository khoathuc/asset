"use client";
import React, { useState } from "react";
import { vendors } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "./Form";

export default function EditButton({ vendor }: { vendor: vendors }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={()=>setShowModal(true)}>
        <Edit className="h-4 w-4" />
        Edit vendor
      </button>
      {showModal && Modal.initModal(<EditForm vendor={vendor} onClose={()=> setShowModal(false)} />)}
    </>
  );
}
