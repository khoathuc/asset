import CurrencyValue from "@/components/ui/currency/currency.value";
import { Asset } from "@/models/asset/asset";
import QRCode from "@/public/qr_code.svg";
import Link from "next/link";

export default async function AssetStat() {
  const stat = await Asset.stat().all();

  const life_cost_stat = await Asset.stat().lifeCycleSum();

  return (
    <div className="stat">
      <div className="stat-figure text-neutral">
        <QRCode className="h-8 w-8" />
      </div>
      <div className="stat-title">Total Assets</div>
      <div className="stat-value">{stat}</div>
      <div className="stat-desc">
        <CurrencyValue
          value={life_cost_stat.life_cost}
          className="!inline font-semibold"
        />
        <span> spent in asset</span>
      </div>
      <Link
        href={"/assets"}
        className="link-hover stat-desc flex justify-start"
      >
        View all
      </Link>
    </div>
  );
}
