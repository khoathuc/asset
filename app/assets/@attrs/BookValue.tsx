import { Currency } from "@/utils/currency";
import { assets } from "@prisma/client";

export function BookValue({ asset, className }:{asset: assets, className?:string}){
    return (
        <>
            <div className={`flex gap-2 ${className} -book-value`}>
                {Currency.DecimalToUSD(parseFloat(asset.purchase_price.toString()))}
            </div>
        </>
    )
}