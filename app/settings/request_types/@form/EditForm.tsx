"use client";
import "@/styles/form.css";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/form/Input";
import { InputSelectUsers } from "@/app/users/@input/InputSelectUsers";
import { Textarea } from "@/components/ui/form/textarea";
import { requestTypeSchema } from "@/lib/validations/request.types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { SelectApprovalFlow } from "@/components/ui/form/Select/approval_flow/SelectApprovalFlow";
import { editRequestType } from "../action";
import { request_types } from "@prisma/client";
import { JsonArray } from "@prisma/client/runtime/library";

type RequestTypeFormData = z.infer<typeof requestTypeSchema>;

export function EditForm({
  requestType,
  onClose,
}: {
  requestType: request_types;
  onClose: () => void;
}) {
  const [default_followers, setDefaultFollowers] = useState<JsonArray>(
    (requestType.default_followers as JsonArray) || [],
  );

  const method = useForm<RequestTypeFormData>({
    defaultValues: {
      allow_change_approvers: requestType.allow_change_approvers,
    },
    resolver: zodResolver(requestTypeSchema),
  });

  const { register, formState, reset, setValue } = method;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: RequestTypeFormData) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", requestType.id.toString());
    formData.append("default_followers", JSON.stringify(default_followers));
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];
        formData.append(key, value);
      }
    }

    try {
      await editRequestType(formData);
      toast.success("Successfully edit request type");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <FormProvider {...method}>
      <ModalForm
        label="EDIT REQUEST TYPE"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Request Type Name *
          </label>
          <Input
            type="text"
            placeholder="Request Type name"
            className="input input-bordered"
            {...register("name")}
            defaultValue={requestType.name}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Default approvers *
          </label>
          <InputSelectUsers
            name="default_approvers"
            defaultValue={requestType.default_approvers}
            onChange={(values: Array<string>) => {
              setValue("default_approvers", JSON.stringify(values));
            }}
          />
          <p className="error">
            {errors.default_approvers?.message?.toString()}
          </p>
        </div>

        <div className="form-control flex cursor-pointer flex-row gap-3">
          <Input
            type="checkbox"
            className="checkbox checkbox-sm"
            {...register("allow_change_approvers")}
          />
          <span>Allow to change approvers</span>
          <p className="error">
            {errors.allow_change_approvers?.message?.toString()}
          </p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Approval flow *
          </label>
          <SelectApprovalFlow
            onChange={(value: string) => {
              setValue("approval_follow", value);
            }}
            defaultValue={requestType.approval_follow}
          />
          <p className="error">{errors.approval_follow?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Default followers
          </label>
          <InputSelectUsers
            name="default_followers"
            defaultValue={default_followers}
            onChange={(values: Array<string>) => {
              setDefaultFollowers(values);
            }}
          />
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Description
          </label>
          <Textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            {...register("description")}
            defaultValue={requestType.description || ""}
          />
        </div>
      </ModalForm>
    </FormProvider>
  );
}
