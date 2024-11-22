"use client";
import { Modal } from "@/components/layout/Modal";
import { JsonValue } from "@prisma/client/runtime/library";
import { v4 as uuidv4 } from "uuid";
import { CreateField } from "./field/CreateField";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/app/redux/store";
import CFormBoard from "./@comps/CFormBoard";

export default function CFormBuilder({
  form,
  onClose,
  onSubmit,
  label,
}: {
  onClose: () => void;
  onSubmit: (form: any) => void;
  form: JsonValue;
  label: String;
}) {
  const ref = useRef<HTMLDialogElement | null>(null);
  const dialogId = uuidv4();

  const cform = useAppSelector((state) => state.cformReducer);

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

  const handleSubmit = () => {
    onSubmit(cform);
  };

  return (
    <>
      <dialog
        id={dialogId}
        ref={ref}
        className="modal block overflow-auto pt-10"
      >
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

            <div className="px-10">
              <CFormBoard form={cform}></CFormBoard>
            </div>
          </div>

          <div className="modal-action gap-3">
            <button className="btn" onClick={handleClose}>
              Close
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn bg-neutral-focus text-neutral-content hover:bg-neutral hover:opacity-75"
            >
              Save
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
