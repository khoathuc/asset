"use client"
import Select, { ActionMeta } from "react-select";
import { FlowOption, getAllApprovalFlows } from "./approval.flow";
import { useEffect } from "react";
type SelectApprovalFlowProps = {
  name?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
  props?: any;
  isDisabled?: boolean;
  className?: string;
};

export function InputSelectApprovalFlow({
  name = "flow",
  defaultValue,
  onChange,
  props,
  isDisabled,
  className,
}: SelectApprovalFlowProps) {
  const flows = getAllApprovalFlows();

  const handleChange = function (
    selected: FlowOption | null,
    actionMeta: ActionMeta<FlowOption>,
  ) {
    if (selected) {
      if (onChange) {
        onChange(selected.value);
      }
    }
  };

  useEffect(()=>{
    if(defaultValue){
      if(onChange){
        onChange(defaultValue)
      }
    }
  }, [])

  return (
    <Select
      name={name}
      options={flows}
      className={`basic-multi-select ${className}`}
      onChange={handleChange}
      isDisabled={isDisabled}
      defaultValue={
        defaultValue
          ? flows.find((flow) => flow.value == defaultValue)
          : null
      }
    />
  );
}
