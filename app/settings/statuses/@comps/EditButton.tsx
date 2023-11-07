"use client";
import Edit from "@/public/edit.svg";
import {Modal} from "@/components/layout/Modal";
import { statuses } from "@prisma/client";
import { EditForm } from "./Form";

export default function EditButton({status}:{status: statuses}) {
  function handleClick() {
    Modal.initModal(<EditForm status={status}/>, (dialog) => {
      Modal.openModal(dialog);
    })
  }

  return (
    <>
      <button onClick={handleClick}>
        <Edit className="h-4 w-4"></Edit>
        Edit Status
      </button>
    </>
  );
}
