"use client";
import { Modal } from "@/components/layout/Modal";
import { useState } from "react";
import DD from "@/public/arrow_down.svg";
import { audit_logs } from "@prisma/client";
import AuditAssetLogDisplay from "../@display/AuditAssetLogDisplay";

export default function ViewAuditedAssetLogButton({asset_log}:{asset_log: audit_logs}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <span className="text-sm normal-case">View</span>
        <DD className="h-3 w-3 text-white" />
      </button>
      {showModal &&
        Modal.initModal(
          <AuditAssetLogDisplay asset_log={asset_log} onClose={() => setShowModal(false)} />,
        )}
    </>
  );
}
