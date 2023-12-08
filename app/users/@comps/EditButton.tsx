"use client";
import React, { useState } from "react";
import { users } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "./Form";

export default function EditButton({ user }: { user: users }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={()=>setShowModal(true)}>
        <Edit className="h-4 w-4" />
        Edit user
      </button>
      {showModal && Modal.initModal(<EditForm user={user} onClose={()=> setShowModal(false)} />)}
    </>
  );
}
