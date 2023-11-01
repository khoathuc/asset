"use client";
import React from "react";
import { locations } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "./Form";

export default function EditButton({ location }: { location: locations }) {
  function handleClick() {
    Modal.initModal(<EditForm location={location} />, () => {
      Modal.openModal();
    });
  }

  return (
    <>
      <button onClick={handleClick}>
        <Edit className="h-4 w-4" />
        Edit location
      </button>
    </>
  );
}
