"use client";
import { Modal } from "@/components/layout/Modal";
import { audit_logs } from "@prisma/client";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AuditAssetLogDisplay({
  asset_log,
  onClose,
}: {
  asset_log: audit_logs;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement | null>(null);
  const dialogId = uuidv4();

  const handleClose = () => {
    onClose();
  };

  //This way will register the dialog after rendered
  useEffect(() => {
    if (ref.current) {
      Modal.addDialog(ref.current);
      Modal.openModal(ref.current);
    }
  });

  var html = <></>

  return (
    <dialog id={dialogId} ref={ref} className="modal block overflow-auto pt-10">
      <div
        className={`modal-box m-auto max-h-none overflow-hidden`}
        style={{ width: "600px", maxWidth: "none" }}
      >
        <div className="border-b-2">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Audited asset log</h3>
        </div>

        {html}
      </div>
    </dialog>
  );
}
