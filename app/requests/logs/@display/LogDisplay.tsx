"use client";
import { Modal } from "@/components/layout/Modal";
import { request_logs } from "@prisma/client";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import CreateLogDisplay from "./CreateLogDisplay";
import ApproveLogDisplay from "./ApproveLogDisplay";
import { APPROVED_TYPE, CREATE_TYPE, REJECTED_TYPE } from "../request_log";
import RejectLogDisplay from "./RejectLogDisplay";

export default function LogDisplay({
  onClose,
  log,
}: {
  onClose: () => void;
  log: request_logs;
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
  if(log.metatype == CREATE_TYPE){
    html = <CreateLogDisplay log={log}></CreateLogDisplay>
  }else if(log.metatype == APPROVED_TYPE){
    html = <ApproveLogDisplay log={log}></ApproveLogDisplay>
  }else if(log.metatype == REJECTED_TYPE){
    html = <RejectLogDisplay log={log}></RejectLogDisplay>
  }

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
          <h3 className="text-lg font-bold">Log Details</h3>
        </div>

        {html}
      </div>
    </dialog>
  );
}
