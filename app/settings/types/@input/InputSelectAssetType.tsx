"use client";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { getAllTypes } from "@/app/settings/types/actions";
import { toast } from "react-toastify";
import { ActionMeta } from "react-select";

export interface TypeOption {
  readonly value: number;
  readonly label: string;
}

type SelectTypeProps = {
    value?: number | undefined;
    onChange: (value: number) => void;
}

export function InputSelectAssetType({value, onChange}: SelectTypeProps) {
  const [initialOptions, setInitialOptions] = useState<TypeOption[]>([]);

  const fetchTypes = async (inputValue: string) => {
    try {
      const asset_types = await getAllTypes(inputValue);

      const mappedOptions: TypeOption[] = asset_types.map((item) => ({
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
    return new Promise<TypeOption[]>((resolve) => {
      setTimeout(() => {
        const options = fetchTypes(inputValue);
        resolve(options);
      }, 1000);
    });
  };

  const handleChange = (selected: TypeOption | null, actionMeta: ActionMeta<TypeOption>)=>{
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
