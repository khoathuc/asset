import { assets } from "@prisma/client";
import { Asset } from "./asset";
import { Type } from "../type/type";
import {
  getDaysInMonth,
  isSameMinute,
  isSameMonth,
  isSameYear,
} from "date-fns";

export class Caculate {
  private asset?: assets;

  constructor(asset: assets) {
    this.asset = asset;
  }

  private monthlyExpense() {
    if (!this.asset) {
      throw new Error("Invalid asset");
    }
    if (!this.asset.is_depreciable) {
      throw new Error("Asset is not depreciable");
    }
    if (!this.asset.useful_life || this.asset.useful_life == null) {
      throw new Error("Invalid useful life");
    }

    const purchase_price = Number(this.asset.purchase_price);
    const salvage_price = Number(this.asset.salvage_price || 0);
    const useful_months = this.asset.useful_life * 12;

    return (purchase_price - salvage_price) / useful_months;
  }

  private firstMonthExpense() {
    if (!this.asset) {
      throw new Error("Invalid asset");
    }
    if (!this.asset.is_depreciable) {
      throw new Error("Asset is not depreciable");
    }
    const asset_active_date = new Date(this.asset.active_date);
    const asset_active_day = asset_active_date.getDate();

    const monthly_expense = this.monthlyExpense();
    if (asset_active_day != 1) {
      const days_of_month = getDaysInMonth(asset_active_date);
      return (
        (monthly_expense * (days_of_month - asset_active_day)) /
        days_of_month
      );
    } else {
      return monthly_expense;
    }
  }

  async openingBookPrice(date: Date) {
    if (!this.asset) {
      throw new Error("Invalid asset");
    }
    if (!this.asset.is_depreciable) {
      throw new Error("Asset is not depreciable");
    }

    const asset_active_date = new Date(this.asset.active_date);

    console.log(date.getMonth(), this.firstMonthExpense(), this.monthlyExpense());

    if (
      isSameMonth(asset_active_date, date) &&
      isSameYear(asset_active_date, date)
    ) {
    }

    const depreciation_conf = (await Type.loader().getDepreciationConf(
      this.asset?.type_id,
    )) as any;
    const depreciation_method = depreciation_conf?.depreciation_method;
  }
}
