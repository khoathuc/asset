"use client";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { getAllVendors } from "@/vendors/actions";
import { toast } from "react-toastify";
import { ActionMeta } from "react-select";

export interface VendorOption {
  readonly value: number;
  readonly label: string;
}

type SelectVendorProps = {
    value?: number | undefined;
    onChange: (value: number) => void;
}

export function InputSelectVendor({value, onChange}: SelectVendorProps) {
  const [initialOptions, setInitialOptions] = useState<VendorOption[]>([]);

  const fetchVendors = async (inputValue: string) => {
    try {
      const vendors = await getAllVendors(inputValue);

      const mappedOptions: VendorOption[] = vendors.map((item) => ({
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
    return new Promise<VendorOption[]>((resolve) => {
      setTimeout(() => {
        const options = fetchVendors(inputValue);
        resolve(options);
      }, 1000);
    });
  };

  const handleChange = (selected: VendorOption | null, actionMeta: ActionMeta<VendorOption>)=>{
    if(selected){
        onChange(selected.value);
    }
  }

  // useEffect to trigger data fetching on component mount
  useEffect(() => {
    fetchVendors("");
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
