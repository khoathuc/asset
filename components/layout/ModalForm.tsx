"use client";
import { useRef } from "react";

type ModalForm = {
  id: string;
  label?: string;
  action: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
};

export default function ModalForm({ id, label, action, children }: ModalForm) {
  const ref = useRef<HTMLFormElement>(null);

  function handleSubmit() {
    const dialogElement = document?.getElementById(
      "js-modal",
    ) as HTMLDialogElement;
    dialogElement.close();
  }

  return (
    <>
      <div className="modal-box overflow-hidden">
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
            id={id}
            className="flex flex-col gap-3"
            action={async (formData) => {
              await action(formData);
              ref.current?.reset();
              handleSubmit();
            }}
            ref={ref}
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
            form={id}
            className="btn bg-neutral-focus text-neutral-content hover:bg-neutral hover:opacity-75"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
