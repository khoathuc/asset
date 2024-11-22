import { Currency } from "@/utils/currency";
import { assets } from "@prisma/client";

export function LifeCycleCost({
  asset,
  className,
}: {
  asset: assets;
  className?: string;
}) {
    const life_cost = asset.life_cost?asset.life_cost:0;
  return (
    <>
      <div className={`flex gap-2 ${className} -cost`}>
        {Currency.DecimalToUSD(parseFloat(life_cost.toString()))}
      </div>
    </>
  );
}
