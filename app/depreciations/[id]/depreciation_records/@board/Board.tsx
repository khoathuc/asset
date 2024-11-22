import { DeprecationRecordType } from "@/models/depreciation/generator";
import { DepreciationRecordItem } from "./Item";

export function DepreciationRecordBoard({depreciation_records}:{depreciation_records: DeprecationRecordType[]}){
    return (
        <div className="w-full bg-base-100">
            <div className="h-full overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Month</th>
                            <th>Code</th>
                            <th>Asset</th>
                            <th>Location</th>
                            <th>Method</th>
                            <th>Active Date</th>
                            <th>Purchase Price</th>
                            <th>Useful life</th>
                            <th>Salvage Price</th>
                            <th>Opening Book Price</th>
                            <th>Depre Expense</th>
                            <th>Ending Book Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {depreciation_records.map((depreciation_record, index)=>{
                            const{asset, year, period} = depreciation_record;
                            return (
                                <DepreciationRecordItem 
                                    key={`${asset.id}-${year}-${period}`}
                                    index={index}
                                    depreciation_record={depreciation_record}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}