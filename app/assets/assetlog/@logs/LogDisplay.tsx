"use client";
import { Modal } from "@/components/layout/Modal";
import { getUser } from "@/lib/user";
import { asset_logs } from "@prisma/client";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Asset from "@/public/inbox.svg";
import Date from "@/public/calendar.svg";
import Currency from "@/public/currency_dollar.svg";
import Note from "@/public/bar_3_center_left.svg";
import { getLocation } from "@/lib/locations";
import { getStatus } from "@/lib/status";

export default function LogDisplay({
  onClose,
  log,
}: {
  onClose: () => void;
  log: asset_logs;
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
  if (log.user_id) {
    user = getUser(log.user_id);
  }

  var object:any = null;
  if (log.object_export) {
    object = log.object_export;
  }

  return (
    <dialog id={dialogId} ref={ref} className="modal block overflow-auto pt-10">
      <div
        className={`modal-box m-auto max-h-none overflow-hidden`}
        style={{ width: "600px", maxWidth: "none" }}
      >
        <div className="border-b-2 ">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Log Details</h3>
        </div>

        <div className="flex flex-col pb-4">
          <div className="flex flex-col bg-base-200 p-4">
            <span className="text-md font-semibold">{log.name}</span>
            <span className="text-sm font-light">
              Implemented by {user?.username} at{" "}
              {log.action_date.toLocaleDateString()}
            </span>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <div className="flex gap-2">
                <Asset className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm uppercase text-slate-500">
                    Asset
                  </span>
                  <span className="text-sm">
                    {object?.name?.toString() || "No information"} -{" "}
                    {object?.code?.toString() || ""}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Currency className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm uppercase text-slate-500">
                    Transaction Cost
                  </span>
                  <span className="text-sm">abc</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Date className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm uppercase text-slate-500">
                    Transaction date
                  </span>
                  <span className="text-sm">abc</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Note className="h-4 w-4" />
              <div className="flex flex-col">
                <span className="text-sm uppercase text-slate-500">
                  Description
                </span>
                <span className="text-sm">
                  {log.description || "No description"}
                </span>
              </div>
            </div>
          </div>

          {log.changes && (
            <div className="flex flex-col border-t-2 p-4">
              <div className="text-md pb-4 font-bold">Change Values</div>
              <div className="rounded-2xl border-2">
                <table className="table">
                  <thead className="bg-base-200">
                    <tr>
                      <th>Field</th>
                      <th>Old value</th>
                      <th>New value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(log.changes).map(([key, value]) => {
                        var value_old = null;
                        var value_new = null;
                        if(key == 'location'){
                            value_old = getLocation(value.old)?.name;
                            value_new = getLocation(value.new)?.name;
                        }else if(key == 'assignee'){
                            value_old = getUser(value.old)?.username;
                            value_new = getUser(value.new)?.username;
                        }else if(key == 'status'){
                            value_old = getStatus(value.old)?.name;
                            value_new = getStatus(value.new)?.name;
                        }
                      return (
                        <tr>
                          <th className="text-sm font-light">{key}</th>
                          <th className="text-sm font-light">{value_old || "none"}</th>
                          <th className="text-sm font-light">{value_new}</th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
