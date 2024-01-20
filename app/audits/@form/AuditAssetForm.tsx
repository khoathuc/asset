"use client";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/textarea";
import { audit_logs } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"

export function AuditAssetForm({
  onClose,
  asset_log,
}: {
  onClose: () => void;
  asset_log: audit_logs;
}) {
  const [checked, setChecked] = useState(false);
  const [description, setDescription] = useState("");
  const methods = useForm();
  const router = useRouter();
  const { register, formState, reset, setValue, watch } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    var formData = new FormData();

    formData.append("is_correct", checked);
    formData.append("description", description);

    try {
      const response = await axios.post(
        `/api/audits/audit/${asset_log.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success == false) {
        throw new Error(response.data.message);
      }

      toast.success("Audit asset successful");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    router.refresh();
    setIsLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label="Audit Asset"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="form-control flex">
          <label className="flex gap-2 pb-1 text-sm font-bold text-current">
            <Input
              type="checkbox"
              className="toggle toggle-sm"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setChecked(!checked);
              }}
            />
            Is correct
          </label>
        </div>
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Note</label>
          <Textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      </ModalForm>
    </FormProvider>
  );
}
