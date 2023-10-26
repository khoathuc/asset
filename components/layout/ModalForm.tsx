"use client";
import { ModalFormProps } from "@/types/modal.form";
import { Modal } from "../../utils/modal.form";
import { useForm, useFormContext } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function ModalForm({
  id,
  label,
  onSubmit,
  noValidate,
  children,
}: ModalFormProps) {
  const { handleSubmit } = useFormContext();
  const formId = uuidv4();

  const submit = (data: any) => {
    onSubmit(data);
    Modal.close(id);
  };

  return (
    <>
      <dialog id={id} className="modal block overflow-auto pt-10">
        <div className="modal-box m-auto max-h-none overflow-hidden">
          <div className="border-b-2 ">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="text-lg font-bold">{label ? label : ""}</h3>
          </div>

          <div className="pb-4 pt-8">
            <form
              id={formId}
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(submit)}
              noValidate={noValidate}
            >
              {children}
            </form>
          </div>

          <div className="modal-action gap-3">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button
              type="submit"
              form={formId}
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
