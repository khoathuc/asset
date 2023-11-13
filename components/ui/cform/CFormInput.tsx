"use client";
import { cfieldType } from "@/app/redux/features/cform";
import { Input } from "../form/Input";
import { useEffect, useState } from "react";

export type cfieldValue = cfieldType & { value: any };

export function CFormInput({
  form,
  onInputChange,
}: {
  form: cfieldValue[];
  onInputChange: (form: cfieldValue[]) => void;
}) {
  const [formData, setFormData] = useState<cfieldValue[] | []>([]);

  const handleChange = (field: cfieldValue) => {
    setFormData((arr) => {
      return arr.map((item) =>
        item.id === field.id ? { ...item, ...field } : item,
      );
    });
  };

  useEffect(() => {
    setFormData(form);
  }, []);

  useEffect(() => {
    onInputChange(formData);
  }, [formData]);

  return (
    <>
      <div>
        {form &&
          form.map((field, index) => {
            return (
              <div key={index} className="form-control flex flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  {field.name}
                </label>
                <Input
                  type={field.type}
                  placeholder={field.note || field.name}
                  className="input input-bordered"
                  value={field.value || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    field.value = e.target.value;
                    handleChange(field);
                  }}
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
