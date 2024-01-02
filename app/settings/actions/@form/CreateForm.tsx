"use client";
import "@/styles/form.css";
import { actionSchema } from "@/lib/validations/action";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/form/Input";
import {
  Condition,
  ConditionsBuilder,
} from "@/components/ui/condition/ConditionBuilder";
import {
  ChangeFields,
  ChangeFieldsBuilder,
} from "@/components/ui/change.field/ChangeFieldsBuilder";
import { toast } from "react-toastify";
import { addAction } from "../action";

type ActionFormData = z.infer<typeof actionSchema>;

export function CreateForm({ onClose }: { onClose: () => void }) {
  const method = useForm<ActionFormData>({
    resolver: zodResolver(actionSchema),
  });

  const [changeFields, setChangeFields] = useState<ChangeFields>({
    assignee: {
      isUse: false,
      value: undefined,
      isSetValue: undefined,
    },
    location: {
      isUse: false,
      value: undefined,
      isSetValue: undefined,
    },
    status: {
      isUse: false,
      value: undefined,
      isSetValue: undefined,
    },
  });

  const [conditions, setConditions] = useState<Condition[]>([]);

  const { register, formState, reset } = method;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: ActionFormData) => {
    setIsLoading(true);
    data.conditions = conditions;
    data.change_fields = changeFields;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("conditions", JSON.stringify(data.conditions));
    formData.append("change_fields", JSON.stringify(data.change_fields));

    try {
      await addAction(formData);
      toast.success("Successfully add new action");
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
        label="CREATE NEW ACTION"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
        className="max-w-3xl"
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Asset Name *
          </label>
          <Input
            type="text"
            placeholder="Action name *"
            className="input input-bordered"
            {...register("name")}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Apply Conditions
          </label>
          <ConditionsBuilder
            conds={conditions}
            onChange={(conditions: Condition[]) => {
              setConditions(conditions);
            }}
          />
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Change Fields
          </label>
          <ChangeFieldsBuilder
            fields={changeFields}
            onChangeFieldsChange={(changeFields: ChangeFields) => {
              setChangeFields(changeFields);
            }}
          />
        </div>
      </ModalForm>
    </FormProvider>
  );
}
