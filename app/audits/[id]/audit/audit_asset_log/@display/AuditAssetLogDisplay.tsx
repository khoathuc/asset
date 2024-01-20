"use client";
import { Modal } from "@/components/layout/Modal";
import { getUser } from "@/lib/user";
import { assetExportData } from "@/models/audit/audit_log/audit_log";
import { audit_logs } from "@prisma/client";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Note from "@/public/bar_3_center_left.svg";

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

  var user = null;
  if (asset_log.user_id) {
    user = getUser(asset_log.user_id);
  }

  if (!asset_log.object_export) {
    return <></>;
  }

  const object_export = asset_log.object_export;

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
          <h3 className="text-lg font-bold">
            Audited asset {object_export.name}
          </h3>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full flex-col bg-base-200 p-4">
            <span className="text-sm font-light">
              Audited by {user?.username} at{" "}
              {asset_log.since.toLocaleDateString()}
            </span>
          </div>

          <div
            className={`${
              asset_log.is_correct ? "bg-success" : "bg-error"
            } rounded-md p-4`}
          >
            <div className="flex justify-center uppercase text-white">
              {asset_log.is_correct && <>Asset is correctly</>}
              {!asset_log.is_correct && <>Asset is incorrectly</>}
            </div>
          </div>

          <div className="flex gap-2 p-4">
            <Note className="h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-sm uppercase text-slate-500">
                Description
              </span>
              <span className="text-sm">
                {asset_log.description || "No description"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
