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
import { addAsset, editAsset } from "../actions";
import { Textarea } from "@/components/ui/form/textarea";
import Plus from "@/public/plus.svg";
import { InputSelectTags } from "@/app/settings/tags/@input/InputSelectTag";
import { useData } from "@/context/data.context";
import { assets, types } from "@prisma/client";
import InfoIcon from "@/public/information_circle.svg";
import Image from "next/image";

import { id } from "date-fns/locale";

type AssetFormData = z.infer<typeof assetSchema>;

export function EditForm({
  asset,
  onClose,
}: {
  asset: assets;
  onClose: () => void;
}) {
  const [depreciation, setDepreciation] = useState<any>(null);
  const [cform, setCform] = useState<cfieldValue[]>(
    asset.form as cfieldValue[],
  );
  const [showAdditional, setShowAdditional] = useState(false);
  const { contextData } = useData();
  const { types } = contextData;

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

  useEffect(() => {
    setValue("location_id", asset.location_id.toString());
    setValue("vendor_id", asset.vendor_id.toString());
    setValue("type_id", asset.type_id.toString());
    const type: types = types.find(
      (asset_type: types) => asset_type.id == asset.type_id,
    );

    setDepreciation(type.depreciation_conf);
    if (asset.is_depreciable) {
      var asset_depreciation: any = type.depreciation_conf;
      if (asset.salvage_price) {
        asset_depreciation = {
          ...asset_depreciation,
          salvage_value: asset.salvage_price,
          useful_life: asset.useful_life,
        };
      }

      setDepreciation(asset_depreciation);
    }
  }, []);

  const handleTypeChange = (type_id: number) => {
    const type: types = types.find(
      (asset_type: types) => asset_type.id == type_id,
    );

    setCform(type.form as cfieldValue[]);
    setDepreciation(type.depreciation_conf);
  };

  const onSubmit = async (data: AssetFormData) => {
    setIsLoading(true);
    var formData = new FormData();

    formData.append("id", asset.id.toString());
    if (depreciation) {
      formData.append("depreciation", JSON.stringify(depreciation));
    }

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
      await editAsset(formData);
      toast.success("Added asset successfully");
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
        label="EDIT ASSET"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Asset Name *
              </label>
              <Input
                type="text"
                placeholder="Asset name"
                value={asset.name}
                className="input input-bordered"
                {...register("name")}
              />
              <p className="error">{errors.name?.message?.toString()}</p>
            </div>

            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Code
              </label>
              <Input
                type="text"
                placeholder="Leave blank for auto generate"
                className="input input-bordered"
                value={asset.code}
                {...register("code")}
              />
              <p className="error">{errors.code?.message?.toString()}</p>
              <p className="text-xs text-zinc-700">
                * Custom Code Prefix for Assets and Accessories
              </p>
            </div>
          </div>
          {asset.image && (
            <Image
              src={asset.image.toString()}
              alt={asset.name?.toString()}
              width={150}
              height={150}
            />
          )}
        </div>

        <div className="flex justify-between">
          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Location *
            </label>
            <InputSelectLocation
              defaultValue={asset.location_id}
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
              value={asset.vendor_id}
              onChange={(value: number) => {
                setValue("vendor_id", value.toString());
              }}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Purchase price *
            </label>
            <label className="input-group">
              <Input
                type="number"
                value={asset.purchase_price}
                placeholder="Purchase price"
                className="input input-bordered h-[38px] w-full rounded"
                {...register("purchase_price")}
              />
              <span>USD</span>
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
              defaultValue={
                asset.active_date.toISOString().split("T")[0] ||
                new Date().toISOString().split("T")[0]
              }
            />
            <p className="error">{errors.active_date?.message?.toString()}</p>
          </div>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Type *</label>
          <InputSelectAssetType
            value={asset.type_id}
            onChange={(value: number) => {
              setValue("type_id", value.toString());
              handleTypeChange(value);
            }}
          />
          <p className="error">{errors.type_id?.message?.toString()}</p>
        </div>

        {depreciation && (
          <>
            <div className="flex justify-between">
              <div className="form-control flex w-[45%] flex-col">
                <label className="flex items-center gap-2 pb-1 text-sm font-bold text-current">
                  Salvage value *
                  <span
                    className="link tooltip"
                    data-tip="Asset price when being disposed"
                  >
                    <InfoIcon className="h-4 w-4" />
                  </span>
                </label>
                <label className="input-group">
                  <Input
                    type="number"
                    placeholder="Salvage value"
                    className="input input-bordered h-[38px] w-full rounded"
                    value={depreciation.salvage_value}
                    onChange={(e: any) => {
                      setDepreciation({
                        ...depreciation,
                        salvage_value: e.target.value,
                      });
                    }}
                  />
                  <span>USD</span>
                </label>
              </div>
              <div className="form-control flex w-[45%] flex-col">
                <label className="flex items-center gap-2 pb-1 text-sm font-bold text-current">
                  Useful life *
                  <span
                    className="link tooltip"
                    data-tip="Useful life of this asset"
                  >
                    <InfoIcon className="h-4 w-4" />
                  </span>
                </label>
                <label className="input-group">
                  <Input
                    type="number"
                    placeholder="Useful life"
                    className="input input-bordered h-[38px] w-full rounded"
                    value={depreciation.useful_life}
                    onChange={(e: any) => {
                      setDepreciation({
                        ...depreciation,
                        useful_life: e.target.value,
                      });
                    }}
                  />
                  <span>Years</span>
                </label>
              </div>
            </div>
          </>
        )}

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
              <InputSelectTags value={asset.tag_ids} />
            </div>

            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Description
              </label>
              <Textarea
                className="textarea textarea-bordered"
                placeholder="Description"
                value={asset.description}
                {...register("description")}
              />
            </div>

            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Serial Number
              </label>
              <Input
                type="text"
                value={asset.serial_number}
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
