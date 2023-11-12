import * as React from "react";
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, placeholder, children, ...props }, ref) => {
    return (
      <select className={`${className} select select-bordered w-full max-w-xs`} ref={ref} {...props}>
        {placeholder && <option disabled selected>{placeholder}</option>}
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";

export { Select };
