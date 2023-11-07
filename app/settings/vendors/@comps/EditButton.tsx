"use client";
import React from "react";
import { vendors } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "./Form";

export default function EditButton({ vendor }: { vendor: vendors }) {
  function handleClick() {
    Modal.initModal(<EditForm vendor={vendor} />, (dialog) => {
      Modal.openModal(dialog);
    });
  }

  return (
    <>
      <button onClick={handleClick}>
        <Edit className="h-4 w-4" />
        Edit vendor
      </button>
    </>
  );
}
