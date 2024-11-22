"use client";
import Edit from "@/public/edit.svg";
import { Modal } from "@/components/layout/Modal";
import { tags } from "@prisma/client";
import { EditForm } from "../@form/EditForm";
import { useState } from "react";

export default function EditButton({ tag }: { tag: tags }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={()=>setShowModal(true)}>
        <Edit className="h-4 w-4"></Edit>
        Edit Tag
      </button>
      {showModal && Modal.initModal(<EditForm tag={tag} onClose={()=> setShowModal(false)} />)}
    </>
  );
}
