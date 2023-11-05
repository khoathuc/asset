"use client";
import "@/styles/form.css";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { statusSchema } from "@/lib/validations/status";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type StatusFormData = z.infer<typeof statusSchema>;

export function CreateForm() {
  const methods = useForm<StatusFormData>({
    resolver: zodResolver(statusSchema),
  });

  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: StatusFormData) => {
    setIsLoading(true);

    console.log(data);

    setIsLoading(false);
  };
  return (
    <FormProvider {...methods}>
      <ModalForm
        label="CREATE NEW STATUS"
        onSubmit={onSubmit}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Status Name *
          </label>
          <Input
            required
            type="text"
            placeholder="Status name"
            className="input input-bordered"
            {...register("name")}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Status Type *
          </label>
          <Select placeholder="Select Status Type">
            <option className="border-2 border-l-success" data-color="success" value="1">
              Deployable
            </option>
            <option data-color="warning" value="2">
              Pending
            </option>
            <option data-color="error" value="3">
              Undeployable
            </option>
            <option data-color="error" value="4">
              Archived
            </option>
          </Select>
          <p className="error">{errors.type?.message?.toString()}</p>
        </div>
      </ModalForm>
    </FormProvider>
  );
}
