import { Location } from "@/app/assets/@attrs/Location";
import CurrencyValue from "@/components/ui/currency/currency.value";
import { DeprecationRecordType } from "@/models/depreciation/generator";
import Link from "next/link";
import DepreciationRecordAttrUsefulLife from "../@attr/DepreciationRecordAttrUsefulLife";

export function DepreciationRecordItem({
  depreciation_record,
  index,
}: {
  index: number;
  depreciation_record: DeprecationRecordType;
}) {
  const { asset } = depreciation_record;
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{depreciation_record.period}</td>
      <td>{asset.code}</td>
      <td>
        <Link href={`/assets/${asset.id}`} className="link-neutral hover:link">
          {asset.name}
        </Link>
      </td>
      <td>
        <Location asset={asset} />
      </td>
      <td>{depreciation_record.depreciation_method}</td>
      <td>
        <div className="-date">{asset.active_date.toLocaleDateString()}</div>
      </td>
      <td>
        <div className="flex justify-center">
          <CurrencyValue value={Number(asset.purchase_price)} />
        </div>
      </td>
      <td>
        <div>
          <DepreciationRecordAttrUsefulLife
            depreciation_record={depreciation_record}
          />
        </div>
      </td>
      <td>
        <div className="flex justify-center">
            <CurrencyValue value={Number(asset.salvage_price)}/>
        </div>
      </td>
      <td>
        <div className="flex justify-center">
            <CurrencyValue value={depreciation_record.opening_book_price} />
        </div>
      </td>
      <td>
        <div className="flex justify-center">
            <CurrencyValue value={depreciation_record.depreciation_expense} />
        </div>
      </td>
      <td>
        <div className="flex justify-center">
            <CurrencyValue value={depreciation_record.ending_book_price} />
        </div>
      </td>
    </tr>
  );
}
