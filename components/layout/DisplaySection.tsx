type DisplaySectionProps = {
  label?: string;
  sublabel?: string;
  className?: string;
  children: React.ReactNode;
};

export default function DisplaySection({
  label,
  sublabel,
  className,
  children,
}: DisplaySectionProps) {
  return (
    <div className={`flex flex-col p-4 w-3/4 rounded-xl bg-base-100 shadow-md ${className}`}>
      {label && (
        <div className="mb-2 border-b-2 pb-4 pt-2">
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-semibold">{label}</div>
            {sublabel && <div className="text-md font-light"></div>}
          </div>
        </div>
      )}
      <div>
        {children}
      </div>
    </div>
  );
}
