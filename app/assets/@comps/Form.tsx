"use client";
import ModalForm from "@/components/layout/ModalForm";
import "@/styles/form.css";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { assetSchema } from "@/lib/validations/asset";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/form/Input";
import { SelectLocation } from "@/components/ui/form/Select/location/SelectLocation";
import { SelectAssetType } from "@/components/ui/form/Select/asset_type/SelectAssetType";
import { SelectVendor } from "@/components/ui/form/Select/vendor/SelectVendor";
import { getType } from "@/app/settings/types/actions";
import { toast } from "react-toastify";
import { cfieldValue, CFormInput } from "@/components/ui/cform/CFormInput";
import { addAsset } from "../actions";

type AssetFormData = z.infer<typeof assetSchema>;

export function CreateForm({ onClose }: { onClose: () => void }) {
  const [cform, setCform] = useState<cfieldValue[]>([]);

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

  const handleTypeChange = async (type_id: number) => {
    try {
      const type = await getType(type_id);
      if (type) {
        setCform(type.form as cfieldValue[]);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Invalid type");
      }
    }
  };

  const onSubmit = async (data: AssetFormData) => {
    setIsLoading(true);

    var formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];
        if (key == "file" && value instanceof FileList) {
          formData.append("file", data.file[0]);
        } else if (key == "form") {
          try {
            formData.append("form", JSON.stringify(value))
          } catch (error) {
            if(error instanceof Error){
              toast.error(`Error parsing 'form' field: ${error.message}`);
            }
          }
        }else{
          formData.append(key,value)
        }
      }
    }

    try {
      await addAsset(formData);
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
            <SelectLocation
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
            <SelectVendor
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
          <SelectAssetType
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
      </ModalForm>
    </FormProvider>
  );
}
