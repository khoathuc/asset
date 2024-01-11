import { assets, depreciations } from "@prisma/client";
import { Asset } from "../asset/asset";
import { Depreciation } from "./depreciation";
import { getDateOfBeginOfMonth } from "@/lib/utils/datetime";
import { differenceInMonths } from "date-fns";

export class Generator {
  private depreciation?: depreciations;

  constructor(depreciation: depreciations) {
    this.depreciation = depreciation;

    return this;
  }

  private async generateRecord(asset: assets, year: number, period: number) {
    const period_start_date = getDateOfBeginOfMonth(year, period);
    const asset_active_date = new Date(asset.active_date);

    //return if asset not in this depreciation period
    const diff_in_months = differenceInMonths(
      period_start_date,
      asset_active_date,
    );
    if (diff_in_months < 0) {
      return;
    }
    const opening_book_price =
      await Asset.caculate(asset).openingBookPrice(period_start_date);

    console.log("opening_book_price",opening_book_price);
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
