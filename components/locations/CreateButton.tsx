"use client";
import { Modal } from "../../utils/modal.form";
import ModalForm from "../layout/ModalForm";
import { useForm, FormProvider } from "react-hook-form";
import "../../styles/form.css";
import { useEffect } from "react";

export default function CreateButton() {
  const methods = useForm();
  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const id = "js-location-form";

  function handleClick() {
    Modal.open(id);
  }

  const onSubmit = (data: any) => {
    console.log("form Submitted", data);
  };

  return (
    <>
      <button
        className="btn- btn h-full min-h-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus"
        onClick={handleClick}
      >
        Create new
      </button>
      <FormProvider {...methods}>
        <ModalForm
          id={id}
          label="CREATE NEW LOCATION"
          onSubmit={onSubmit}
          noValidate={true}
        >
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Location Name *
            </label>
            <input
              required
              type="text"
              placeholder="Location name"
              className="input input-bordered"
              {...register("name", {
                required: {
                  value: true,
                  message: "Username is required",
                },
              })}
            />
            <p className="error">{errors.name?.message?.toString()}</p>
          </div>

          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Description
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Description"
              {...register("description")}
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Address
            </label>
            <input
              type="text"
              placeholder="Location address"
              className="input input-bordered"
              {...register("address")}
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Managers
            </label>
            <input
              type="text"
              placeholder="Managers"
              className="input input-bordered"
              {...register("owners")}
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Images
            </label>
            <input
              type="file"
              placeholder="Images"
              className="file-input file-input-bordered"
              accept="image/png, image/jpeg"
              {...register("file")}
            />
          </div>
        </ModalForm>
      </FormProvider>
    </>
  );
}
