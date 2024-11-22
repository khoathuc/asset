"use client";
import "@/styles/form.css";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { locationSchema } from "@/lib/validations/location";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalForm from "@/components/layout/ModalForm";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/textarea";
import { addLocation } from "../actions";

type LocationFormData = z.infer<typeof locationSchema>;

export function CreateForm({ onClose }: { onClose: () => void }) {
  const methods = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: LocationFormData) => {
    setIsLoading(true);

    var formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];

        if (key == "file" && value instanceof FileList) {
          formData.append("file", data.file[0]);
        } else {
          formData.append(key, value);
        }
      }
    }

    try {
      await addLocation(formData);
      toast.success("Successfully add new location");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label="CREATE NEW LOCATION"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Location Name *
          </label>
          <Input
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
          <Textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            {...register("description")}
          />
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Address</label>
          <Input
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
          <Input
            type="text"
            placeholder="Managers"
            className="input input-bordered"
            {...register("owners")}
          />
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Images</label>
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
  );
}