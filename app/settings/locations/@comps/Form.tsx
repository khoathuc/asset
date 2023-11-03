"use client";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { locationSchema } from "@/lib/validations/location";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalForm from "@/components/layout/ModalForm";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { addLocation } from "../actions";
import { editLocation } from "../actions";
import { locations } from "@prisma/client";
import Image from "next/image";

type LocationFormData = z.infer<typeof locationSchema>;

export function CreateForm() {
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
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("owners", data.owners);
    if (data.file) {
      formData.append("file", data.file[0]);
    }

    try {
      await addLocation(formData).then();
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

export function EditForm({ location }: { location: locations }) {
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
    formData.append("id", location.id.toString());
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("owners", data.owners);
    if (data.file) {
      formData.append("file", data.file[0]);
    }

    try {
      await editLocation(formData).then();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm label="EDIT LOCATION" onSubmit={onSubmit} className='w-[28rem]' noValidate={true}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
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
                defaultValue={location.name}
              />
              <p className="error">{errors.name?.message?.toString()}</p>
            </div>

            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Address
              </label>
              <Input
                type="text"
                placeholder="Location address"
                className="input input-bordered"
                {...register("address")}
                defaultValue={location.address || ""}
              />
            </div>
          </div>
          {location.image && (
            <Image
              src={location.image.toString()}
              alt={location.name?.toString()}
              width={150}
              height={150}
            />
          )}
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Description
          </label>
          <Textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            {...register("description")}
            defaultValue={location.description || ""}
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
