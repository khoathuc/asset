"use client";
import "@/styles/form.css";
import ModalForm from "@/components/layout/ModalForm";
import React, { useEffect } from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { vendorSchema } from "@/lib/validations/vendor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { addVendor, editVendor } from "../actions";
import { vendors } from "@prisma/client";

type VendorFormData = z.infer<typeof vendorSchema>;

export function CreateForm({ onClose }: { onClose: () => void }) {
  const methods = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
  });

  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: VendorFormData) => {
    setIsLoading(true);

    var formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];

        if (key == "image" && value instanceof FileList) {
          formData.append("image", data.image[0]);
        } else {
          formData.append(key, value);
        }
      }
    }

    try {
      await addVendor(formData);
      toast.success("Successfully add new vendor");
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
        label="CREATE NEW VENDOR"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Vendor Name *
          </label>
          <Input
            type="text"
            placeholder="Vendor name"
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

        <div className="flex flex-row justify-between">
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">Phone</label>
            <Input
              type="tel"
              placeholder="Phone"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              className="input input-bordered"
              {...register("phone")}
            />
            <p className="error">{errors.phone?.message?.toString()}</p>
          </div>

          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Contact
            </label>
            <Input
              type="text"
              placeholder="Contact"
              className="input input-bordered"
              {...register("contact")}
            />
            <p className="error">{errors.contact?.message?.toString()}</p>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">Email</label>
            <Input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email")}
            />
            <p className="error">{errors.email?.message?.toString()}</p>
          </div>

          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">Url</label>
            <Input
              type="text"
              placeholder="Url"
              className="input input-bordered"
              {...register("url")}
            />
            <p className="error">{errors.url?.message?.toString()}</p>
          </div>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Address</label>
          <Input
            type="text"
            placeholder="Address"
            className="input input-bordered"
            {...register("address")}
          />
          <p className="error">{errors.address?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Images</label>
          <Input
            type="file"
            placeholder="Images"
            className="file-input file-input-bordered"
            accept="image/png, image/jpeg"
            {...register("image")}
          />
          <p className="error">{errors.image?.message?.toString()}</p>
        </div>
      </ModalForm>
    </FormProvider>
  );
}

export function EditForm({
  vendor,
  onClose,
}: {
  vendor: vendors;
  onClose: () => void;
}) {
  const methods = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
  });

  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: VendorFormData) => {
    setIsLoading(true);

    var formData = new FormData();
    formData.append("id", vendor.id.toString());

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];

        if (key == "image" && value instanceof FileList) {
          formData.append("image", data.image[0]);
        } else {
          formData.append(key, value);
        }
      }
    }

    try {
      await editVendor(formData);
      toast.success("Successfully edit vendor");
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
        label="EDIT VENDOR"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Vendor Name *
          </label>
          <Input
            type="text"
            placeholder="Vendor name"
            className="input input-bordered"
            {...register("name")}
            defaultValue={vendor.name}
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
            defaultValue={vendor.description || ""}
          />
        </div>

        <div className="flex flex-row justify-between">
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">Phone</label>
            <Input
              type="tel"
              placeholder="Phone"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              className="input input-bordered"
              {...register("phone")}
              defaultValue={vendor.phone || ""}
            />
            <p className="error">{errors.phone?.message?.toString()}</p>
          </div>

          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Contact
            </label>
            <Input
              type="text"
              placeholder="Contact"
              className="input input-bordered"
              {...register("contact")}
              defaultValue={vendor.contact || ""}
            />
            <p className="error">{errors.contact?.message?.toString()}</p>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">Email</label>
            <Input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email")}
              defaultValue={vendor.email || ""}
            />
            <p className="error">{errors.email?.message?.toString()}</p>
          </div>

          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">Url</label>
            <Input
              type="text"
              placeholder="Url"
              className="input input-bordered"
              {...register("url")}
              defaultValue={vendor.url || ""}
            />
            <p className="error">{errors.url?.message?.toString()}</p>
          </div>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Address</label>
          <Input
            type="text"
            placeholder="Address"
            className="input input-bordered"
            {...register("address")}
            defaultValue={vendor.address || ""}
          />
          <p className="error">{errors.address?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Images</label>
          <Input
            type="file"
            placeholder="Images"
            className="file-input file-input-bordered"
            accept="image/png, image/jpeg"
            {...register("image")}
          />
          <p className="error">{errors.image?.message?.toString()}</p>
        </div>
      </ModalForm>
    </FormProvider>
  );
}
