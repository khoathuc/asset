"use client";
import "@/styles/form.css";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { tagSchema } from "@/lib/validations/tags";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/textarea";
import { CompactPicker } from "react-color";
import { toast } from "react-toastify";
import { addTag, editTag } from "../action";

type TagFormData = z.infer<typeof tagSchema>;
const DEFAULT_COLOR = "#aea1ff";

export function CreateForm({ onClose }: { onClose: () => void }) {
  const methods = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
  });

  const { register, formState, reset, setValue } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [color, setColor] = useState(DEFAULT_COLOR);
  useEffect(() => {
    setValue("color", color);
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: TagFormData) => {
    setIsLoading(true);

    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];
        formData.append(key, value);
      }
    }

    try {
      await addTag(formData);
      toast.success("Successfully add tag");
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
        label="CREATE TAG"
        className="w-[28rem]"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Tag Name *
          </label>
          <Input
            required
            type="text"
            placeholder="Tag name"
            className="input input-bordered"
            {...register("name")}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
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

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Color</label>
          <div className="flex justify-between">
            {color && (
              <div
                style={{ backgroundColor: color }}
                className="h-30 w-1/3"
              ></div>
            )}
            <CompactPicker
              onChange={(color) => {
                setColor(color.hex);
                setValue("color", color.hex);
              }}
            />
          </div>
        </div>
      </ModalForm>
    </FormProvider>
  );
}