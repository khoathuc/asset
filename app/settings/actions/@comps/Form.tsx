"use client";
import "@/styles/form.css";
import { actionSchema } from "@/lib/validations/action";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/form/Input";
import { Condition, ConditionsBuilder } from "@/components/ui/condition/ConditionBuilder";

type ActionFormData = z.infer<typeof actionSchema>;

type ChangeField = {
  isUser: true;
  value: any;
  isSetValue: any;
};

type ChangeFields = {
  assignee?: ChangeField;
  location?: ChangeField;
  status?: ChangeField;
};

export function CreateForm({ onClose }: { onClose: () => void }) {
  const method = useForm<ActionFormData>({
    resolver: zodResolver(actionSchema),
  });

  const [changeFields, setChangeFields] = useState<ChangeFields>({});
  const [conditions, setConditions] = useState<Condition[]>([]);

  const { register, formState, reset } = method;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: ActionFormData)=>{
    console.log(data);
  }

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
          <ConditionsBuilder conds={conditions}/>
        </div>

        {/* <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
             Change Fields
          </label>
          <ChangeFieldsBuilder />
        </div> */}
      </ModalForm>
    </FormProvider>
  );
}
