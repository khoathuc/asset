import { Currency } from "@/utils/currency";
import { assets } from "@prisma/client";

export function BookValue({ asset }:{asset: assets}){
    return (
        <>
            <div className='flex gap-2'>
                {Currency.DecimalToUSD(parseFloat(asset.purchase_price.toString()))}
            </div>
        </>
    )
}