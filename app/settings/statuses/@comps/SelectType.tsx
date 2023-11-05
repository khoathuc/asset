import Select, { ActionMeta, SingleValue , StylesConfig } from "react-select";
import { rgba } from "polished";

export default function SelectType({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  interface TypeOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
  }

  const typeOptions = [
    { value: "1", label: "Deployable", color: "#339900" },
    { value: "2", label: "Pending", color: "#ffcc00" },
    { value: "3", label: "Undeployable", color: "#cc3300" },
    { value: "4", label: "Archived", color: "#cc3300" },
  ];

  const colourStyles: StylesConfig<TypeOption> = {
    option: (styles, state) => {
      const { data, isSelected, isFocused } = state;
      return {
        ...styles,
        borderLeft: `4px solid ${data.color}`,
        backgroundColor: isSelected
          ? data.color
          : isFocused
          ? rgba(data.color, 0.1)
          : undefined,
      };
    },
  };

  const handleChange = (selected: TypeOption | null, actionMeta: ActionMeta<TypeOption>)=>{
    onChange(selected?.value || '');
  }

  return (
    <Select
      options={typeOptions}
      isMulti={false}
      placeholder="Please select status type"
      styles={colourStyles}
      onChange={handleChange}
    />
  );
}
