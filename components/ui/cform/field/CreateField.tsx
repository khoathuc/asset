"use client";
import More from "@/public/more.svg";
import Number from "@/public/hashtag.svg";
import Date from "@/public/date_picker.svg";
import Dropdown from "@/public/bar_arrow_down.svg";
import { Modal } from "@/components/layout/Modal";
import { CFieldCreateForm } from "./CFieldForm";
import { useState } from "react";

export type CField = {
  icon: React.ReactNode;
  label: String;
  code: String;
};

const CFieldTypes: CField[] = [
  { icon: <More className="h-4" />, label: "Simple Text", code: "text" },
  { icon: <Number className="h-4" />, label: "Number", code: "number" },
  { icon: <Dropdown className="h-4" />, label: "Dropdown", code: "number" },
  { icon: <Date className="h-4" />, label: "Date time", code: "number" },
];

export function CreateField() {
  return (
    <>
      <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
        <label
          tabIndex={0}
          className="btn h-full min-h-full bg-neutral text-neutral-content hover:text-neutral-focus"
        >
          Create Field
        </label>
        <div
          tabIndex={0}
          className="menu dropdown-content rounded-box z-[1] w-[20rem] bg-base-100 p-2 shadow"
        >
          <div className="grid grid-cols-2 gap-2 p-2">
            {CFieldTypes.map((field, index) => {
              const [showModal, setShowModal] = useState(false);

              return (
                <>
                  <div
                    key={index}
                    className="flex cursor-pointer flex-row items-center gap-2 rounded-sm p-2 hover:bg-neutral-200"
                    onClick={(e) => {
                      setShowModal(true);
                    }}
                  >
                    {field.icon}
                    {field.label?.toString()}
                  </div>
                  {showModal &&
                    Modal.initModal(
                      <CFieldCreateForm
                        field={field}
                        onClose={() => setShowModal(false)}
                      />,
                    )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
