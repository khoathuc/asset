export function getOption(code: string) {
  return typeOptions.find((option) => option.code === code);
}

export interface TypeOption {
  readonly code: string;
  readonly value: string;
  readonly label: string;
  readonly color: string;
}

export const typeOptions = [
  { code: "DEPLOYABLE", value: "1", label: "Deployable", color: "#339900" },
  { code: "PENDING", value: "2", label: "Pending", color: "#ffcc00" },
  { code: "UNDEPLOYABLE", value: "3", label: "Undeployable", color: "#cc3300" },
  { code: "ARCHIVED", value: "4", label: "Archived", color: "#cc3300" },
];
