"use client";
import { useState } from "react";
import Plus from "@/public/circle_plus.svg";
import { ConditionInput } from "./ConditionInput";

export type Condition = {
  condition?: string;
  field?: string;
  value?: string;
};

export function ConditionsBuilder({
  conds,
  onSubmit,
}: {
  conds: Condition[];
  onSubmit?: (conds: Condition[]) => void;
}) {
  // const
  const [conditions, setConditions] = useState<Condition[]>(conds);

  return (
    <div className="flex flex-col gap-3">
      {conditions.map((index, condition) => (<ConditionInput condition={condition}/>))}
      <div className="flex items-center justify-end gap-2 hover:cursor-pointer hover:underline">
        <Plus className="h-5" />
        <button
          onClick={(e) => {
            e.preventDefault();
            setConditions((conditions) => [...conditions, {}]);
          }}
        >
          Add new
        </button>
      </div>
    </div>
  );
}
