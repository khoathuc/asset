"use client";
import "@/styles/form.css";
import Select from "react-select";
import ModalForm from "@/components/layout/ModalForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { typeSchema } from "@/lib/validations/types";
import { z } from "zod";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/textarea";
import { toast } from "react-toastify";
import { editType } from "../actions";
import { types } from "@prisma/client";
import { REDUCING_BALANCE_METHOD, STRAIGHT_LINE_METHOD } from "@/app/depreciations/depreciations";

type TypeFormData = z.infer<typeof typeSchema>;
export function EditForm({
  type,
  onClose,
}: {
  type: types;
  onClose: () => void;
}) {
  const [is_depreciable, setIsDepreciable] = useState(type.is_depreciable);
  const [depreciation_method, setDepreciationMethod] = useState<string | null>(
    type.depreciation_conf ? type.depreciation_conf.depreciation_method : null,
  );
  const methods = useForm<TypeFormData>({
    resolver: zodResolver(typeSchema),
  });

  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: TypeFormData) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", type.id.toString());
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];
        formData.append(key, value);
      }
    }

    try {
      await editType(formData);
      toast.success("Edit Asset Type Successfully");
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
        label="CREATE NEW ASSET TYPE"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Asset Type Name *
          </label>
          <Input
            type="text"
            placeholder="Asset Type name"
            className="input input-bordered"
            {...register("name")}
            defaultValue={type.name.toString()}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Code prefix *
          </label>
          <Input
            type="text"
            placeholder="Leave blank for auto generate"
            className="input input-bordered"
            {...register("prefix")}
            defaultValue={type.prefix.toString()}
          />
          <p className="error">{errors.prefix?.message?.toString()}</p>
          <p className="text-xs text-zinc-700">
            * Custom Code Prefix for Assets and Accessories in this type
          </p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Description
          </label>
          <Textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            {...register("description")}
            defaultValue={type.description || ""}
          />
        </div>

        <div className="form-control flex">
          <label className="flex gap-2 pb-1 text-sm font-bold text-current">
            <Input
              type="checkbox"
              className="toggle toggle-sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIsDepreciable(!is_depreciable);
              }}
            />
            Track depreciation for asset of this type
          </label>
        </div>

        {is_depreciable && (
          <>
            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Useful life *
              </label>
              <Input
                type="number"
                placeholder="Useful life"
                className="input input-bordered"
              />
            </div>

            <div className="flex-box form-control flex">
              <label className="pb-1 text-sm font-bold text-current">
                Depreciation method
              </label>
              <Select
                options={[
                  {
                    value: STRAIGHT_LINE_METHOD,
                    label: STRAIGHT_LINE_METHOD,
                  },
                  {
                    value: REDUCING_BALANCE_METHOD,
                    label: REDUCING_BALANCE_METHOD,
                  },
                ]}
                onChange={(selected: { value: string; label: string }) => {
                  if (selected) {
                    setDepreciationMethod(selected.value);
                  }
                }}
              />
            </div>
          </>
        )}
      </ModalForm>
    </FormProvider>
  );
}
