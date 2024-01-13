"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "../@form/EditForm";

export default function EditButton({ asset }: { asset: assets }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <Edit className="-4 h-4" />
        Edit Asset
      </button>
      {showModal &&
        Modal.initModal(
          <EditForm asset={asset} onClose={() => setShowModal(false)} />,
        )}
    </>
  );
}
