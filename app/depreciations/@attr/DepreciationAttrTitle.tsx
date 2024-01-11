import { depreciations } from "@prisma/client";

export default function DepreciationAttrTitle({
  depreciation,
  className,
}: {
  depreciation: depreciations;
  className?: string;
}) {
  return <div className={`${className}`}>{depreciation.name}</div>;
}
