"use client"
import { Modal } from "@/components/layout/Modal";
import React, { useState } from "react";
import { CreateForm } from "./Form";

export default function CreateButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn- btn h-full min-h-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus"
        onClick={()=>setShowModal(true)}
      >
        Create new
      </button>
      {showModal && Modal.initModal(<CreateForm onClose={()=> setShowModal(false)}/>)}
    </>
  );
}