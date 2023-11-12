"use client";
import ModalForm from "@/components/layout/ModalForm";
import "@/styles/form.css";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { assetSchema } from "@/lib/validations/asset";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/form/Input";
import { SelectLocation } from "@/components/ui/form/Select/location/SelectLocation";
import { SelectAssetType } from "@/components/ui/form/Select/asset_type/SelectAssetType";
import { SelectVendor } from "@/components/ui/form/Select/vendor/SelectVendor";

type AssetFormData = z.infer<typeof assetSchema>;

export function CreateForm({ onClose }: { onClose: () => void }) {
  const methods = useForm<AssetFormData>({
    resolver: zodResolver(assetSchema),
  });

  const { register, formState, reset, setValue } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: any) => {
    console.log(data);
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
              Type *
            </label>
            <SelectAssetType
              onChange={(value: number) => {
                setValue("type_id", value.toString());
              }}
            />
            <p className="error">{errors.type_id?.message?.toString()}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Purchase price
            </label>
            <label className="input-group">
              <Input
                type="text"
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
              className="input input-bordered"
              {...register("active_date")}
              defaultValue={new Date().toISOString()}
            />
            <p className="error">{errors.active_date?.message?.toString()}</p>
          </div>
        </div>
        <div className="form-control flex w-[45%] flex-col">
          <label className="pb-1 text-sm font-bold text-current">Vendor</label>
          <SelectVendor
            onChange={(value: number) => {
              setValue("vendor_id", value.toString());
            }}
          />
        </div>
      </ModalForm>
    </FormProvider>
  );
}
