"use client";
import ModalForm from "@/components/layout/ModalForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const cTextSchema = z.object({});

type cTextFormData = z.infer<typeof cTextSchema>;

export default function CFormNumber({ onClose }: { onClose: () => void }) {
  const methods = useForm<cTextFormData>({
    resolver: zodResolver(cTextSchema),
  });

  const { register, formState, reset, setValue } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: cTextFormData) => {
    setIsLoading(true);

    console.log(data);
    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label="Simple Text"
        className="w-[20rem]"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        NumberField
      </ModalForm>
    </FormProvider>
  );
}
