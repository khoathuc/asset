import "@/styles/list.css";
export default function List({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`list-group-wrapper relative flex flex-col ${className}`}>{children}</div>
  );
}
