export default function ListRow({
  label,
  children,
  id,
  className,
}: {
  label: string;
  children?: React.ReactNode;
  id?:string;
  className?: string;
}) {
  return (
    <div className={`list-row relative pl-56 py-1 ${className}`} id={id}>
      <div className="absolute left-0 text-sm font-semibold">{label}</div>
      <div className="min-h-6">{children}</div>
    </div>
  );
}
