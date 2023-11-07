'use client'
import { Modal } from "@/components/layout/Modal";
import { JsonValue } from "@prisma/client/runtime/library";
import { v4 as uuidv4 } from "uuid";
import CreateField from "./field/CreateField";

export default function CFormBuilder({
  form,
  label,
}: {
  form: JsonValue;
  label: String;
}) {
  const dialogId = uuidv4();

  const handleClose = () => {
    Modal.closeModal(dialogId);
  };

  const handleCreate = () => {};

  return (
    <dialog id={dialogId} className="modal block overflow-auto pt-10">
      <div
        className={`modal-box m-auto max-h-none overflow-hidden`}
        style={{ width: "800px", maxWidth: "none" }}
      >
        <div className="border-b-2 ">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">{label ? label : ""}</h3>
        </div>

        <div className="flex flex-col pb-4 pt-8">
          <div className="flex h-8 w-full flex-row justify-between">
            <span className="font-bold">Custom Fields</span>
            <CreateField />
          </div>

          <div className="divider"></div>

          <div>Cfield board</div>
        </div>

        <div className="modal-action gap-3">
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
