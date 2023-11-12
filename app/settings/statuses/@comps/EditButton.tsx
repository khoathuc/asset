"use client";
import Edit from "@/public/edit.svg";
import {Modal} from "@/components/layout/Modal";
import { statuses } from "@prisma/client";
import { EditForm } from "./Form";
import { useState } from "react";

export default function EditButton({status}:{status: statuses}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={()=>setShowModal(true)}>
        <Edit className="h-4 w-4"></Edit>
        Edit Status
      </button>
      {showModal &&
        Modal.initModal(<EditForm status={status} onClose={() => setShowModal(false)} />)}
    </>
  );
}