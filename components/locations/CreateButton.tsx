"use client";
import { Modal } from "../../utils/modal.form";
import ModalForm from "../layout/ModalForm";
import { useForm, FormProvider, Controller } from "react-hook-form";
import "../../styles/form.css";
import { useEffect } from "react";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/Input";
import { addLocation } from "../../app/settings/locations/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  address: z.string(),
  owners: z.string(),
  file: z.any(),
});

type LocationFormData = z.infer<typeof schema>;

export default function CreateButton() {
  const id = "js-location-form";

  const methods = useForm<LocationFormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const { register, formState, reset, control, setValue, getValues } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  function handleClick() {
    Modal.open(id);
  }

  const onSubmit = async (data: LocationFormData) => {
    setIsLoading(true);

    var formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("owners", data.owners);
    if (data.file) {
      formData.append("file", data.file[0]);
    }

    try {
      await addLocation(formData).then();

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    setIsLoading(false);
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
              {...register("name")}
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
            <Input
              type="file"
              placeholder="Images"
              className="file-input file-input-bordered"
              accept="image/png, image/jpeg"
              {...register("file")}
            />
            <p className="error">{errors.file?.message?.toString()}</p>
          </div>
        </ModalForm>
      </FormProvider>
    </>
  );
}
