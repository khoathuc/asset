import "@/styles/list.css";
export default function List({
  label,
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`list flex flex-col ${className}`}>
      {label && <div className="mb-2 text-lg font-semibold">{label}</div>}
      <div className="pl-5">
        <div className="list-group-wrapper flex flex-col relative">{children}</div>
      </div>
    </div>
  );
}
