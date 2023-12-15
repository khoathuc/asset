"use client";
import "@/styles/form.css";
import { actions, assets } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assetLogSchema } from "@/lib/validations/asset.logs";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import React from "react";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/form/Input";
import { z } from "zod";
import { Textarea } from "@/components/ui/form/textarea";
import AssetActionChangeFields from "./AssetActionChangeField";
import AssetActionChangeField from "./AssetActionChangeField";
import { doAction } from "../actions";

type AssetLogForm = z.infer<typeof assetLogSchema>;
type ActionFormProps = {
  asset: assets;
  action: actions;
  onClose: () => void;
};

export function ActionForm({ asset, action, onClose }: ActionFormProps) {
  const [changes, setChanges] = useState({});
  const router = useRouter()
  const methods = useForm<AssetLogForm>({
    resolver: zodResolver(assetLogSchema),
  });

  const { register, formState, reset } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: AssetLogForm) => {
    setIsLoading(true);

    var formData = new FormData();
    formData.append("asset_id", asset.id.toString());
    formData.append("changes", JSON.stringify(changes));

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];
        if (key == "file" && value instanceof FileList) {
          formData.append("file", data.file[0]);
        } else {
          formData.append(key, value);
        }
      }
    }

    try {
      await fetch(`/api/assets/${asset.id}/action`, {
        method: "POST",
        body: formData,
      })

    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    
    setIsLoading(false);
    router.refresh()
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        label={action.name}
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="flex justify-between">
          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Transaction Date*
            </label>
            <Input
              type="date"
              className="input input-bordered h-[38px]"
              {...register("action_date")}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            <p className="error">{errors.action_date?.message?.toString()}</p>
          </div>
          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Transaction Cost *
            </label>
            <label className="input-group">
              <Input
                type="number"
                placeholder="Transaction Cost"
                className="input input-bordered h-[38px] w-full rounded"
                {...register("action_cost")}
                defaultValue={0}
              />
              <span>VND</span>
            </label>
            <p className="error">{errors.action_cost?.message?.toString()}</p>
          </div>
        </div>

        {action.change_fields &&
          Object.entries(action.change_fields).map(([key, change_field]) => {
            return (
              <AssetActionChangeField
                field={key}
                change_field={change_field}
                onChange={(field: string, value: any) => {
                  setChanges({ ...changes, [field]: value });
                }}
              />
            );
          })}

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Description
          </label>
          <Textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            {...register("description")}
          />
          <p className="error">{errors.description?.message?.toString()}</p>
        </div>
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Files</label>
          <Input
            type="file"
            placeholder="Files"
            className="file-input file-input-bordered"
            {...register("file")}
          />
          <p className="error">{errors.file?.message?.toString()}</p>
        </div>
      </ModalForm>
    </FormProvider>
  );
}
