import { depreciations } from "@prisma/client";
import { DepreciationItem } from "./Item";

export default function DepreciationBoard({depreciations}:{depreciations: depreciations[]}){
    return (
        <>
            <div className="w-full bg-base-100">
                <div className="h-full overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Depreciation report</th>
                                <th>Locations</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {depreciations.map((depreciation, index)=>{
                                return (
                                    <DepreciationItem 
                                        key={depreciation.id}
                                        index={index}
                                        depreciation={depreciation}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}