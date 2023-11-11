"use client";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const cTextSchema = z.object({
  name: z.string().min(1, "Name is required"),
  note: z.string(),
});

type cTextFormData = z.infer<typeof cTextSchema>;

export default function CFormText({ onClose }: { onClose: () => void}) {
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

  const handleSubmit = async (data: cTextFormData) => {
    setIsLoading(true);
    
    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label="Simple Text"
        className="w-[28rem]"
        onClose={onClose}
        onSubmit={handleSubmit}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Name *</label>
          <Input
            required
            type="text"
            placeholder="Input field name"
            className="input input-bordered"
            {...register("name")}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Note
          </label>
          <Textarea
            className="textarea textarea-bordered"
            placeholder="Note"
            {...register("note")}
          />
        </div>
      </ModalForm>
    </FormProvider>
  );
}
