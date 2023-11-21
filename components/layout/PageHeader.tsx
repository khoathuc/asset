export default function PageHeader({
  children,
  label,
  subLabel,
  compact,
  className,
}: {
  children?: React.ReactNode;
  label?: String;
  subLabel?: String;
  compact?: boolean;
  className?: String
}) {
  return (
    <div className={`page-header relative flex h-20 w-full flex-col bg-base-100 px-5 pt-2.5 border-b ${className} ${compact?'compact':''}`}>
      {label && <div className="text-2xl font-black -title">{label}</div>}
      {subLabel && (
        <div className="text-sm font-medium text-neutral-600 -sub-title">{subLabel}</div>
      )}
      {children}
    </div>
  );
}
