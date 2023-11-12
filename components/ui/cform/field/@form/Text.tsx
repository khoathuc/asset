"use client";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { cfieldType, fieldAdded, fieldUpdate } from "@/redux/features/cform";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const cTextSchema = z.object({
  name: z.string().min(1, "Name is required"),
  note: z.string(),
});

const fieldType = "text" as string;
type cTextFormData = z.infer<typeof cTextSchema> & { id: string, type: string };

export function CFormCreateText({ onClose }: { onClose: () => void }) {
  const methods = useForm<cTextFormData>({
    resolver: zodResolver(cTextSchema),
  });

  const dispatch = useDispatch();

  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: cTextFormData) => {
    setIsLoading(true);

    data.type = fieldType;
    data.id = uuidv4();
    dispatch(fieldAdded(data));

    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label="Simple Text"
        className="w-[28rem]"
        onClose={onClose}
        onSubmit={onSubmit}
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
          <label className="pb-1 text-sm font-bold text-current">Note</label>
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

export function CFormEditText({
  field,
  onClose,
}: {
  field: cfieldType;
  onClose: () => void;
}) {
  const methods = useForm<cTextFormData>({
    resolver: zodResolver(cTextSchema),
  });

  const dispatch = useDispatch();

  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: cTextFormData) => {
    setIsLoading(true);

    data.type = fieldType;
    data.id = field.id;
    dispatch(fieldUpdate(data));

    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label="Edit Simple Text Field"
        className="w-[28rem]"
        onClose={onClose}
        onSubmit={onSubmit}
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
            defaultValue={field.name}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Note</label>
          <Textarea
            className="textarea textarea-bordered"
            placeholder="Note"
            {...register("note")}
            defaultValue={field.note}
          />
        </div>
      </ModalForm>
    </FormProvider>
  );
}
