"use client";
import "@/styles/form.css";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { statusSchema } from "@/lib/validations/status";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/Input";
import {SelectType } from "./SelectType";
import {getOption} from "../type";
import { Textarea } from "@/components/ui/textarea";
import { CompactPicker } from "react-color";
import { addStatus, editStatus } from "../action";
import { statuses } from "@prisma/client";

type StatusFormData = z.infer<typeof statusSchema>;
const DEFAULT_COLOR = "#aea1ff";
const DEFAULT_STATUS = false;

export function CreateForm() {
  const methods = useForm<StatusFormData>({
    resolver: zodResolver(statusSchema),
  });

  const { register, formState, reset, setValue } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  useEffect(() => {
    setValue("default", checked);
    setValue("color", color);
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const [color, setColor] = useState(DEFAULT_COLOR);
  const [checked, setChecked] = useState(DEFAULT_STATUS);

  const onSubmit = async (data: StatusFormData) => {
    setIsLoading(true);

    var formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];
        formData.append(key, value);
      }
    }

    try {
      await addStatus(formData);
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
        label="CREATE NEW STATUS"
        onSubmit={onSubmit}
        className="w-[28rem]"
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
          <SelectType
            onChange={(value: any) => {
              setValue("type", value);
            }}
          />
          <p className="error">{errors.type?.message?.toString()}</p>
        </div>

        <div className="form-control flex">
          <label className="flex gap-2 pb-1 text-sm font-bold text-current">
            Default status
            <Input
              type="checkbox"
              className="toggle toggle-sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("default", !checked);
                setChecked(!checked);
              }}
            />
          </label>
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

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Notes</label>
          <Textarea
            className="textarea textarea-bordered"
            placeholder="Notes"
            {...register("notes")}
          />
        </div>
      </ModalForm>
    </FormProvider>
  );
}

export function EditForm({ status }: { status: statuses }) {
  const methods = useForm<StatusFormData>({
    resolver: zodResolver(statusSchema),
  });

  const { register, formState, reset, setValue } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [color, setColor] = useState(status.color);
  const [checked, setChecked] = useState(status.default);

  useEffect(() => {
    setValue("default", checked);
    setValue("color", color);
    setValue("type", getOption(status.type)?.value as any);
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: StatusFormData) => {
    setIsLoading(true);
    var formData = new FormData();
    formData.append("id", status.id.toString());

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];

        formData.append(key, value);
      }
    }

    try {
      await editStatus(formData)
      toast.success("Successfully edit status");
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
        label="EDIT STATUS"
        onSubmit={onSubmit}
        className="w-[28rem]"
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
            defaultValue={status.name}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Status Type *
          </label>
          <SelectType
            value={status.type}
            onChange={(value: any) => {
              setValue("type", value);
            }}
          />
          <p className="error">{errors.type?.message?.toString()}</p>
        </div>

        <div className="form-control flex">
          <label className="flex gap-2 pb-1 text-sm font-bold text-current">
            Default status
            <Input
              type="checkbox"
              className="toggle toggle-sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue("default", !checked);
                setChecked(!checked);
              }}
              checked={checked}
            />
          </label>
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
              color={color}
              onChange={(color) => {
                setColor(color.hex);
                setValue("color", color.hex);
              }}
            />
          </div>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Notes</label>
          <Textarea
            className="textarea textarea-bordered"
            placeholder="Notes"
            {...register("notes")}
            defaultValue={status.notes || ''}
          />
        </div>
      </ModalForm>
    </FormProvider>
  );
}
