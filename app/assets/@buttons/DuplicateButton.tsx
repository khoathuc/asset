"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import DuplicateConfirm from "../@confirm-dialog/DuplicateConfirm";

export default function DuplicateButton({ asset, className}: { asset: assets, className?:string }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setShowModal(true)}>
        Duplicate asset
      </button>
      {showModal &&
        Modal.initModal(
          <DuplicateConfirm asset={asset} onClose={() => setShowModal(false)} />,
        )}
    </>
  );
}
