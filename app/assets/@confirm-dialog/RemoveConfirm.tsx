"use client";
import { Modal } from "@/components/layout/Modal";
import { assets } from "@prisma/client";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RemoveConfirm({
  onClose,
  asset,
}: {
  onClose: () => void;
  asset: assets;
}) {
  const route = useRouter();
  const ref = useRef<HTMLDialogElement | null>(null);
  const dialogId = uuidv4();

  const handleClose = () => {
    onClose();
  };

  const confirm = async () => {
    try {
      const response = await axios.post(`/api/assets/${asset.id}/remove`);
      if (response.data.success == false) {
        throw new Error(response.data.message);
      }

      toast.success("Remove asset successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    route.push('/');
  };

  //This way will register the dialog after rendered
  useEffect(() => {
    if (ref.current) {
      Modal.addDialog(ref.current);
      Modal.openModal(ref.current);
    }
  });

  return (
    <dialog id={dialogId} ref={ref} className="modal block overflow-auto pt-52">
      <div
        className={`modal-box m-auto max-h-none overflow-hidden`}
        style={{ width: "440px", maxWidth: "none" }}
      >
        <div className="border-b-2 ">
          <button
            className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            onClick={handleClose}
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Confirm remove?</h3>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <div className="flex gap-4">
            <Image
              src={"/images/alert.png"}
              alt={"/images/alert.png"}
              width={40}
              height={40}
            ></Image>

            <div className="flex flex-col gap-2">
              <h4 className="font-semibold">
                Do you confirm remove this asset
              </h4>
              <span className="text-sm font-extralight">
                You will not able to retrieve this asset
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button className="btn" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btn-error" onClick={confirm}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
