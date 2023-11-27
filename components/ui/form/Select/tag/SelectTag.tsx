"use client";

import React from "react";
import Select, { StylesConfig } from "react-select";
import { useData } from "@/context/data.context";
import { TagOption, getAllTags } from "./tag";
import chroma from "chroma-js";

type SelectTagsProps = {
  value?: any;
  onChange?: (value: any) => void;
};

const colourStyles: StylesConfig<TagOption, true> = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};

export function SelectTags({ value, onChange }: SelectTagsProps) {
  const tags = getAllTags();

  return (
    <Select isMulti name="tag_ids" options={tags} className="basic-multi-select" styles={colourStyles}/>
  );
}
