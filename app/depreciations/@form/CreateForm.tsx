"use client";
import "@/styles/form.css";
import InfoIcon from "@/public/information_circle.svg";
import { InputSelectLocation } from "@/app/settings/locations/@input/InputSelectLocation";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/form/Input";
import { depreciationSchema } from "@/lib/validations/depreciation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { runDepreciation } from "../actions";
import { Textarea } from "@/components/ui/form/textarea";

type DepreciationFormSchema = z.infer<typeof depreciationSchema>;

export function CreateForm({ onClose }: { onClose: () => void }) {
  const methods = useForm<DepreciationFormSchema>({
    resolver: zodResolver(depreciationSchema),
  });

  const { register, formState, reset, setValue, watch } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: DepreciationFormSchema) => {
    setIsLoading(true);
    var formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];
        formData.append(key, value);
      }
    }

    try {
      await runDepreciation(formData);
      toast.success("Run depreciation successfully");
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
        label="RUN NEW DEPRECIATION"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Depreciation Name
          </label>
          <Input
            type="text"
            placeholder="Leave blank for auto generate"
            className="input input-bordered"
            {...register("name")}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Year *</label>
          <Input
            type="text"
            placeholder="Period"
            className="input input-bordered"
            {...register("year")}
          />
          <p className="error">{errors.year?.message?.toString()}</p>
        </div>

        <div className="flex justify-between">
          <div className="form-control flex w-[45%] flex-col">
            <label className="flex items-center gap-2 pb-1 text-sm font-bold text-current">
              From Period *
              <span className="link tooltip" data-tip="First month of period">
                <InfoIcon className="h-4 w-4" />
              </span>
            </label>
            <Input
              type="text"
              placeholder="Period"
              className="input input-bordered"
              {...register("period_from")}
            />
            <p className="error">{errors.period_from?.message?.toString()}</p>
          </div>

          <div className="form-control flex w-[45%] flex-col">
            <label className="flex items-center gap-2 pb-1 text-sm font-bold text-current">
              To Period *
              <span className="link tooltip" data-tip="Last month of period">
                <InfoIcon className="h-4 w-4" />
              </span>
            </label>
            <Input
              type="text"
              placeholder="Period"
              className="input input-bordered"
              {...register("period_to")}
            />
            <p className="error">{errors.period_to?.message?.toString()}</p>
          </div>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Locations *
          </label>
          <InputSelectLocation
            isMulti={true}
            onChange={(values: Array<string>) => {
              setValue("locations", JSON.stringify(values));
            }}
          />
          <p className="error">{errors.locations?.message?.toString()}</p>
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
          <p className="error">{errors.description?.message?.toString()}</p>
        </div>
      </ModalForm>
    </FormProvider>
  );
}
