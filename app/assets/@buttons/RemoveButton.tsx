"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import { EditForm } from "../@form/EditForm";
import RemoveConfirm from "../@confirm-dialog/RemoveConfirm";

export default function RemoveButton({ asset, className}: { asset: assets, className?:string }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setShowModal(true)}>
        Remove asset
      </button>
      {showModal &&
        Modal.initModal(
          <RemoveConfirm asset={asset} onClose={() => setShowModal(false)} />,
        )}
    </>
  );
}
