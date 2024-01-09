"use client";
import ModalForm from "@/components/layout/ModalForm";
import "@/styles/form.css";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { assetSchema } from "@/lib/validations/asset";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/form/Input";
import { InputSelectLocation } from "@/app/settings/locations/@input/InputSelectLocation";
import { InputSelectAssetType } from "@/app/settings/types/@input/InputSelectAssetType";
import { InputSelectVendor } from "@/app/settings/vendors/@input/InputSelectVendor";
import { toast } from "react-toastify";
import { cfieldValue, CFormInput } from "@/components/ui/cform/CFormInput";
import { Textarea } from "@/components/ui/form/textarea";
import Plus from "@/public/plus.svg";
import { InputSelectTags } from "@/app/settings/tags/@input/InputSelectTag";
import { useData } from "@/context/data.context";
import { requests } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

type AssetFormData = z.infer<typeof assetSchema>;

export function CreateAssetForm({
  onClose,
  request,
}: {
  onClose: () => void;
  request: requests;
}) {
  const [cform, setCform] = useState<cfieldValue[]>([]);
  const [showAdditional, setShowAdditional] = useState(false);
  const { contextData } = useData();
  const { types } = contextData;

  const router = useRouter();

  const methods = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
  });

  const { register, formState, reset, setValue, watch } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  useEffect(() => {
    setValue("form", cform);
  }, [cform]);

  const handleTypeChange = (type_id: number) => {
    const type = types.find((asset_type: any) => asset_type.id == type_id);
    setCform(type.form as cfieldValue[]);
  };

  const onSubmit = async (data: AssetFormData) => {
    setIsLoading(true);

    var formData = new FormData();
    formData.append("request_id", request?.id.toString());

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];
        if (key == "image" && value instanceof FileList) {
          formData.append("image", data.image[0]);
        } else if (key == "file" && value instanceof FileList) {
          formData.append("file", data.file[0]);
        } else if (key == "form") {
          try {
            formData.append("form", JSON.stringify(value));
          } catch (error) {
            if (error instanceof Error) {
              toast.error(`Error parsing 'form' field: ${error.message}`);
            }
          }
        } else {
          formData.append(key, value);
        }
      }
    }

    try {
      const response = await axios.post(
        `/api/requests/${request.id}/create_asset`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success == false) {
        throw new Error(response.data.message);
      }

      toast.success("Added asset successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    router.refresh();
    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label="CREATE NEW ASSET"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Asset Name *
          </label>
          <Input
            type="text"
            placeholder="Asset name"
            className="input input-bordered"
            {...register("name")}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Code</label>
          <Input
            type="text"
            placeholder="Leave blank for auto generate"
            className="input input-bordered"
            {...register("code")}
          />
          <p className="error">{errors.code?.message?.toString()}</p>
          <p className="text-xs text-zinc-700">
            * Custom Code Prefix for Assets and Accessories
          </p>
        </div>

        <div className="flex justify-between">
          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Location *
            </label>
            <InputSelectLocation
              onChange={(value: number) => {
                setValue("location_id", value.toString());
              }}
            />
            <p className="error">{errors.location_id?.message?.toString()}</p>
          </div>
          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Vendor
            </label>
            <InputSelectVendor
              onChange={(value: number) => {
                setValue("vendor_id", value.toString());
              }}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Purchase price
            </label>
            <label className="input-group">
              <Input
                type="number"
                placeholder="Purchase price"
                className="input input-bordered h-[38px] w-full rounded"
                {...register("purchase_price")}
              />
              <span>VND</span>
            </label>
            <p className="error">
              {errors.purchase_price?.message?.toString()}
            </p>
          </div>

          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Active Date *
            </label>
            <Input
              type="date"
              className="input input-bordered h-[38px]"
              {...register("active_date")}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            <p className="error">{errors.active_date?.message?.toString()}</p>
          </div>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Type *</label>
          <InputSelectAssetType
            onChange={(value: number) => {
              setValue("type_id", value.toString());
              handleTypeChange(value);
            }}
          />
          <p className="error">{errors.type_id?.message?.toString()}</p>
        </div>

        {cform && (
          <CFormInput
            form={cform}
            onInputChange={(form: cfieldValue[]) => {
              setValue("form", form);
            }}
          />
        )}
        <p className="error">{errors.form?.message?.toString()}</p>

        <>
          <button
            className={`flex items-center justify-center gap-3 rounded-lg bg-base-200 p-2 hover:bg-base-300 ${
              showAdditional ? "hidden" : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setShowAdditional(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Show information
          </button>
        </>
        <div className={`${!showAdditional ? "hidden" : ""}`}>
          <div className="flex flex-col gap-3 bg-base-200 p-5">
            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Tags
              </label>
              <InputSelectTags />
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
              <label className="pb-1 text-sm font-bold text-current">
                Serial Number
              </label>
              <Input
                type="text"
                placeholder="Asset Serial Number"
                className="input input-bordered"
                {...register("serial_number")}
              />
              <p className="error">
                {errors.serial_number?.message?.toString()}
              </p>
            </div>

            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Image
              </label>
              <Input
                type="file"
                placeholder="Image"
                className="file-input file-input-bordered"
                accept="image/png, image/jpeg"
                {...register("image")}
              />
              <p className="error">{errors.image?.message?.toString()}</p>
            </div>

            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                File
              </label>
              <Input
                type="file"
                placeholder="File"
                className="file-input file-input-bordered"
                {...register("file")}
              />
              <p className="error">{errors.file?.message?.toString()}</p>
            </div>
            <button
              className="mt-5 flex self-end rounded-md p-1 text-neutral "
              onClick={(e) => {
                e.preventDefault();
                setShowAdditional(false);
              }}
            >
              Hide information
            </button>
          </div>
        </div>
      </ModalForm>
    </FormProvider>
  );
}
