"use client";
import "@/styles/form.css";
import ModalForm from "@/components/layout/ModalForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestSchema } from "@/lib/validations/request";
import { z } from "zod";
import { CFormInput, cfieldValue } from "@/components/ui/cform/CFormInput";
import { useEffect, useState } from "react";
import React from "react";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/textarea";
import { InputSelectRequestType } from "@/app/settings/request_types/@input/InputSelectRequestType";
import { toast } from "react-toastify";
import { addRequest } from "../actions";
import { request_types, requests } from "@prisma/client";
import { InputSelectUsers } from "@/app/users/@input/InputSelectUsers";
import { SelectApprovalFlow } from "@/components/ui/form/Select/approval_flow/SelectApprovalFlow";
import { getRequestTypeById } from "@/app/settings/request_types/action";

type RequestFormSchema = z.infer<typeof requestSchema>;

export function CreateForm({ onClose }: { onClose: () => void }) {
  const [cform, setCform] = useState<cfieldValue[]>([]);
  const [request_type, setRequestType] = useState<request_types>();

  const methods = useForm<RequestFormSchema>({
    resolver: zodResolver(requestSchema),
  });

  const { register, formState, reset, setValue, watch } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleTypeChange = async (request_type_id: number) => {
    try {
      const request_type = await getRequestTypeById(request_type_id);

      if (request_type) {
        setCform(request_type.form as cfieldValue[]);
        setRequestType(request_type);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    setValue("form", cform);
  }, [cform]);

  const onSubmit = async (data: RequestFormSchema) => {
    setIsLoading(true);

    var formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];
        if (key == "file" && value instanceof FileList) {
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
      await addRequest(formData);
      toast.success("Added request successfully");
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
        label="CREATE NEW REQUEST"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        {request_type && request_type.description && (
          <div className="rounded-md bg-green-300 p-5">
            <span className="font-medium text-green-800">
              {request_type.description}
            </span>
          </div>
        )}
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Request Name *
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
          <label className="pb-1 text-sm font-bold text-current">Type *</label>
          <InputSelectRequestType
            onChange={(value: number) => {
              setValue("request_type_id", value.toString());
              handleTypeChange(value);
            }}
          />
          <p className="error">{errors.request_type_id?.message?.toString()}</p>
        </div>

        {request_type && (
          <>
            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Approvers *
              </label>
              <InputSelectUsers
                name="approvers"
                defaultValue={request_type.default_approvers}
                isDisabled={request_type.allow_change_approvers}
                onChange={(values: Array<string>) => {
                  setValue("approvers", JSON.stringify(values));
                }}
              />
              <p className="error">{errors.approvers?.message?.toString()}</p>
            </div>
            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Approval flow *
              </label>
              <SelectApprovalFlow
                onChange={(value: string) => {
                  setValue("approval_follow", value);
                }}
                isDisabled
                defaultValue={request_type.approval_follow}
              />
              <p className="error">
                {errors.approval_follow?.message?.toString()}
              </p>
            </div>
            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Default followers
              </label>
              <InputSelectUsers
                name="followers"
                defaultValue={request_type.default_followers}
                onChange={(values: Array<string>) => {
                  setValue("followers", JSON.stringify(values));
                }}
              />
              <p className="error">{errors.followers?.message?.toString()}</p>
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

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">File</label>
          <Input
            type="file"
            placeholder="File"
            className="file-input file-input-bordered"
            {...register("file")}
          />
          <p className="error">{errors.file?.message?.toString()}</p>
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
      </ModalForm>
    </FormProvider>
  );
}

export function EditForm({
  request,
  onClose,
}: {
  request: requests;
  onClose: () => void;
}) {
  const methods = useForm<RequestFormSchema>({
    resolver: zodResolver(requestSchema),
  });

  const { register, formState, reset, setValue, watch } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: RequestFormSchema) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label="EDIT REQUEST"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      ></ModalForm>
    </FormProvider>
  );
}
