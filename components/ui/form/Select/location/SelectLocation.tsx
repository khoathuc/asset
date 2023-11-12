"use client";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { getAllLocations } from "@/locations/actions";
import { toast } from "react-toastify";
import { ActionMeta } from "react-select";

export interface LocationOption {
  readonly value: number;
  readonly label: string;
}

type SelectLocationProps = {
    value?: number | undefined;
    onChange: (value: number) => void;
}

export function SelectLocation({value, onChange}: SelectLocationProps) {
  const [initialOptions, setInitialOptions] = useState<LocationOption[]>([]);

  const fetchLocations = async (inputValue: string) => {
    try {
      const locations = await getAllLocations(inputValue);

      const mappedOptions: LocationOption[] = locations.map((item) => ({
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
    return new Promise<LocationOption[]>((resolve) => {
      setTimeout(() => {
        const options = fetchLocations(inputValue);
        resolve(options);
      }, 1000);
    });
  };

  const handleChange = (selected: LocationOption | null, actionMeta: ActionMeta<LocationOption>)=>{
    if(selected){
        onChange(selected.value);
    }
  }

  // useEffect to trigger data fetching on component mount
  useEffect(() => {
    fetchLocations("");
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
