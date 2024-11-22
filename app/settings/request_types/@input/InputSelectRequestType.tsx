"use client";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import { ActionMeta } from "react-select";
import { getAllRequestTypes } from "@/app/settings/request_types/action";

export interface RequestTypeOption {
  readonly value: number;
  readonly label: string;
}

type SelectRequestTypeProps = {
    value?: number | undefined;
    onChange: (value: number) => void;
}

export function InputSelectRequestType({value, onChange}: SelectRequestTypeProps) {
  const [initialOptions, setInitialOptions] = useState<RequestTypeOption[]>([]);

  const fetchTypes = async (inputValue: string) => {
    try {
      const request_types = await getAllRequestTypes(inputValue);

      const mappedOptions: RequestTypeOption[] = request_types.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      
      if (initialOptions.length === 0) {
        setInitialOptions(mappedOptions);
      }
      
      return mappedOptions
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error fetching data: ${error.message.toString()}`);
      }
    }
  };

  const promiseOptions = (inputValue: string) => {
    return new Promise<RequestTypeOption[]>((resolve) => {
      setTimeout(() => {
        const options = fetchTypes(inputValue);
        resolve(options);
      }, 1000);
    });
  };

  const handleChange = (selected: RequestTypeOption | null, actionMeta: ActionMeta<RequestTypeOption>)=>{
    if(selected){
        onChange(selected.value);
    }
  }

  // useEffect to trigger data fetching on component mount
  useEffect(() => {
    fetchTypes("");
  }, []);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions={initialOptions}
      loadOptions={promiseOptions}
      onChange={handleChange}
    />
  );
}
