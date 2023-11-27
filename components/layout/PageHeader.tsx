import Back from "@/public/arrow_turn_left.svg";
import Link from "next/link";

const BackUrl = function({backUrl}:{backUrl: any}) {
  return (
    <Link href={backUrl} className="absolute left-5">
      <Back className='h-6 w-6'/>
    </Link>
  );
}
export default function PageHeader({
  children,
  label,
  subLabel,
  compact,
  className,
  backUrl,
  ...props
}: {
  children?: React.ReactNode;
  label?: String;
  subLabel?: String;
  compact?: boolean;
  className?: String;
  backUrl?: String;
}) {

  return (
    <div
      className={`page-header relative flex h-20 w-full flex-col border-b bg-base-100 px-5 pt-2.5 ${className} ${
        compact ? "compact" : ""
      }`}
    >
      {label && <div className="-title text-2xl font-black">{label}</div>}
      {subLabel && (
        <div className="-sub-title text-sm font-medium text-neutral-600">
          {subLabel}
        </div>
      )}
      {children}

      {backUrl && <BackUrl backUrl={backUrl}/>}
    </div>
  );
}
