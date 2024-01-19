"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "../@form/EditForm";

export default function CheckinButton({
  asset,
  className,
}: {
  asset: assets;
  className?: string;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setShowModal(true)}>
        Checkin Asset
      </button>
      {showModal &&
        Modal.initModal(
          <EditForm asset={asset} onClose={() => setShowModal(false)} />,
        )}
    </>
  );
}
