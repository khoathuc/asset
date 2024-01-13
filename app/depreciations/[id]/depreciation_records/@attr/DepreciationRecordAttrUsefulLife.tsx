import { DeprecationRecordType } from "@/models/depreciation/generator";

export default function DepreciationRecordAttrUsefulLife({
  depreciation_record,
  className,
}: {
  className?: string;
  depreciation_record: DeprecationRecordType;
}) {
  const { asset } = depreciation_record;
  if (!asset.is_depreciable) {
    return <></>;
  }
  if (!asset.useful_life) {
    return <></>;
  }
  return <div className={`${className}`}>{asset.useful_life * 12} months</div>;
}
