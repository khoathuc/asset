"use client";
import Edit from "@/public/edit.svg";
import {Modal} from "@/components/layout/Modal";
import { types } from "@prisma/client";
import { EditForm } from "./Form";

export default function EditButton({ type }: { type: types }) {
  function handleClick() {
    Modal.initModal(<EditForm type={type} />, () => {
      Modal.openModal();
    });
  }

  return (
    <button onClick={handleClick}>
      <Edit className="h-4 w-4"></Edit>
      Edit type
    </button>
  );
}
