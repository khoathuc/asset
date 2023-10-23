export default function PageHeader({
  children,
  label,
  subLabel,
}: {
  children?: React.ReactNode;
  label: String;
  subLabel: String;
}) {
  return (
    <div className="relative flex h-20 w-full flex-col bg-base-100 px-5 pt-2.5">
      <div className="text-2xl font-black">{label}</div>
      <div className="text-sm font-medium text-neutral-600">{subLabel}</div>
      {children}
    </div>
  );
}
