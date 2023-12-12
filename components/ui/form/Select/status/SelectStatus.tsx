import { StatusOption, getAllStatuses } from "./status";
import Select, { ActionMeta, StylesConfig } from "react-select";
import chroma from "chroma-js";

type SelectStatusProps = {
  defaultValue?: any;
  onChange?: (value: any) => void;
  props?: any;
  className?: string;
};

const colourStyles: StylesConfig<StatusOption, true> = {
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

export function SelectStatus({
  defaultValue,
  onChange,
  props,
  className,
}: SelectStatusProps) {
  const statuses = getAllStatuses();
  const handleChange = (
    selected: StatusOption | null,
    actionMeta: ActionMeta<StatusOption>,
  ) => {
    if (selected) {
      if (onChange) {
        onChange(selected.value);
      }
    }
  };
  return (
    <Select
      name="statuses"
      options={statuses}
      className={`basic-multi-select ${className}`}
      onChange={handleChange}
      styles={colourStyles}
      defaultValue={
        defaultValue
          ? statuses.find((status) => status.value == defaultValue)
          : null
      }
    />
  );
}
