"use client";
import React, { useState } from "react";
import { locations } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "./Form";

export default function EditButton({ location }: { location: locations }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={()=>setShowModal(true)}>
        <Edit className="h-4 w-4" />
        Edit location
      </button>
      {showModal && Modal.initModal(<EditForm location={location} onClose={()=> setShowModal(false)} />)}
    </>
  );
}
