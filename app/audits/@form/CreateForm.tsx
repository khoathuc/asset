"use client";
import "@/styles/form.css";
import { InputSelectLocation } from "@/app/settings/locations/@input/InputSelectLocation";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/form/Input";
import { Textarea } from "@/components/ui/form/textarea";
import { auditSchema } from "@/lib/validations/audit";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { InputSelectUsers } from "@/app/users/@input/InputSelectUsers";
import { toast } from "react-toastify";
import { addAudit } from "../actions";

type AuditFormSchema = z.infer<typeof auditSchema>;

export function CreateForm({ onClose }: { onClose: () => void }) {
  const methods = useForm<AuditFormSchema>({
    resolver: zodResolver(auditSchema),
  });

  const { register, formState, reset, setValue, watch } = methods;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: AuditFormSchema) => {
    setIsLoading(true);
    var formData = new FormData();

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
      await addAudit(formData);
      toast.success("Create Audit successfully");
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
        label="CREATE NEW AUDIT"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Audit Name *
          </label>
          <Input
            type="text"
            placeholder="Audit name"
            className="input input-bordered"
            {...register("name")}
          />
          <p className="error">{errors.name?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Locations *
          </label>
          <InputSelectLocation
            isMulti={true}
            onChange={(values: Array<string>) => {
              setValue("locations", JSON.stringify(values));
            }}
          />
          <p className="error">{errors.locations?.message?.toString()}</p>
        </div>

        <div className="flex justify-between">
          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Start Date *
            </label>
            <Input
              type="date"
              className="input input-bordered h-[38px]"
              {...register("start_date")}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            <p className="error">{errors.start_date?.message?.toString()}</p>
          </div>

          <div className="form-control flex w-[45%] flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              End Date *
            </label>
            <Input
              type="date"
              className="input input-bordered h-[38px]"
              {...register("end_date")}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            <p className="error">{errors.end_date?.message?.toString()}</p>
          </div>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Auditors *
          </label>
          <InputSelectUsers
            name="auditors"
            onChange={(values: Array<string>) => {
              setValue("auditors", JSON.stringify(values));
            }}
          />
          <p className="error">{errors.auditors?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Followers
          </label>
          <InputSelectUsers
            name="followers"
            onChange={(values: Array<string>) => {
              setValue("followers", JSON.stringify(values));
            }}
          />
          <p className="error">{errors.followers?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">File</label>
          <Input
            type="file"
            placeholder="File"
            className="file-input file-input-bordered"
            {...register("file")}
          />
          <p className="error">{errors.file?.message?.toString()}</p>
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

        {isLoading && (
          <div className="absolute inset-0 pointer-events-none bg-gray-500 bg-opacity-25">
            <div className="h-full flex items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-lg"></span>
                Loading...
              </div>
            </div>
          </div>
        )}
      </ModalForm>
    </FormProvider>
  );
}
