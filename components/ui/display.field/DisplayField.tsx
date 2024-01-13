type DisplayFieldProps = {
  field?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};
export default function DisplayField({
  field,
  icon,
  children,
}: DisplayFieldProps) {
  return (
    <div className="flex gap-2 pb-2">
      {icon}
      <div className="flex flex-col">
        {field && (
          <span className="text-sm uppercase text-slate-500">{field}</span>
        )}
        <span className="text-sm">{children}</span>
      </div>
    </div>
  );
}
