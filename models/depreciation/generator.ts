import { assets, depreciations } from "@prisma/client";
import { Asset } from "../asset/asset";
import { Depreciation } from "./depreciation";
import { getDateOfBeginOfMonth } from "@/lib/utils/datetime";

export class Generator {
  private depreciation?: depreciations;

  constructor(depreciation: depreciations) {
    this.depreciation = depreciation;

    return this;
  }


  private async generateRecord(asset: assets, year: number, period: number) {
    const period_start_date = getDateOfBeginOfMonth(year, period);

    const salvage_price = asset.salvage_price;
    const opening_book_price = await Asset.caculate(asset).openingBookPrice(period_start_date);
  }


  async generateRecords() {
    if (!this.depreciation) {
      throw new Error("Invalid depreciation");
    }

    const depreciation_assets = await Depreciation.getAssets(this.depreciation);
    const depreciation_period = Depreciation.getPeriod(this.depreciation);
    if (!depreciation_period) {
      throw new Error("Invalid depreciation(2)");
    }

    const { start_period, end_period, year } = depreciation_period;
    for (let i = start_period; i <= end_period; ++i) {
      depreciation_assets.forEach(async (depreciation_asset) => {
        const depreciation_record = await this.generateRecord(
          depreciation_asset,
          year,
          i,
        );
      });
    }
  }
}
