"use client";
import { cfieldType, fieldAdded, fieldUpdate } from "@/app/redux/features/cform";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const cNumberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  note: z.string(),
});

const fieldType = "number" as string;
type cNumberFormData = z.infer<typeof cNumberSchema> & {
  id: string;
  type: string;
};

export function CFormCreateNumber({ onClose }: { onClose: () => void }) {
  const methods = useForm<cNumberFormData>({
    resolver: zodResolver(cNumberSchema),
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

  const onSubmit = async (data: cNumberFormData) => {
    setIsLoading(true);

    data.type = fieldType;
    data.id = uuidv4();
    dispatch(fieldAdded(data));

    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label="Simple Number"
        className="w-[28rem]"
        onSubmit={onSubmit}
        onClose={onClose}
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

export function CFormEditNumber({
  field,
  onClose,
}: {
  field: cfieldType;
  onClose: () => void;
}) {
  const methods = useForm<cNumberFormData>({
    resolver: zodResolver(cNumberSchema)
  })

  const dispatch = useDispatch();

  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const onSubmit = async (data: cNumberFormData) => {
    setIsLoading(true);

    data.type = fieldType;
    data.id = field.id;
    dispatch(fieldUpdate(data));

    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label="Edit Simple Number Field"
        className="w-[28rem]"
        onSubmit={onSubmit}
        onClose={onClose}
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
    )

}
