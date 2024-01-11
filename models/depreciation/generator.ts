import { assets, depreciations } from "@prisma/client";
import { Asset } from "../asset/asset";
import { Depreciation } from "./depreciation";
import { getDateOfBeginOfMonth, getDateOfEndOfMonth } from "@/lib/utils/datetime";
import { differenceInMonths } from "date-fns";

export class Generator {
  private depreciation?: depreciations;

  constructor(depreciation: depreciations) {
    this.depreciation = depreciation;

    return this;
  }

  private generateRecord(asset: assets, year: number, period: number) {
    const period_end_date = getDateOfEndOfMonth(year, period);
    const asset_active_date = new Date(asset.active_date);

    //return if asset not in this depreciation period
    const diff_in_months = differenceInMonths(
      period_end_date,
      asset_active_date,
    );
    if (diff_in_months < 0) {
      return;
    }

    //caculate opening book price
    const caculate_engine = Asset.caculate(asset);

    const opening_book_price = caculate_engine.openingBookPrice(period_end_date);

    const depreciation_expense = caculate_engine.getPeriodExpense(period_end_date);

    const ending_book_price = Number(opening_book_price) - Number(depreciation_expense);

    return {asset, year, period, opening_book_price, depreciation_expense, ending_book_price}
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

    var depreciation_records: any = [];
    const { start_period, end_period, year } = depreciation_period;
    for (let i = start_period; i <= end_period; ++i) {
      depreciation_assets.forEach((depreciation_asset) => {
        const depreciation_record = this.generateRecord(
          depreciation_asset,
          year,
          i,
        );

        depreciation_records.push(depreciation_record);
      });
    }

    return depreciation_records;
  }
}
