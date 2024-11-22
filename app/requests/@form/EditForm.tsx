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
import { InputSelectApprovalFlow } from "@/app/settings/request_types/approval_flow/InputSelectApprovalFlow";
import { getRequestTypeById } from "@/app/settings/request_types/action";

type RequestFormSchema = z.infer<typeof requestSchema>;

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
