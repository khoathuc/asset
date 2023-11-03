'use client'
import ModalForm from "@/components/layout/ModalForm";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export function CreateForm() {
  const methods = useForm();
  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = () => {
    
  };

  return (
    <FormProvider {...methods}>
        <ModalForm
          label="CREATE NEW VENDOR"
          onSubmit={onSubmit}
          noValidate={true}
        >
            
        </ModalForm>
    </FormProvider>
  );
}
