"use client";
import { getLocation } from "@/lib/locations";
import { DeprecationRecordType } from "@/models/depreciation/generator";
import { Currency } from "@/utils/currency";
import * as XLSX from "xlsx";

export type DepreciationExport = {
  period: number;
  year: number;
  code: any;
  method: any;
  active_date: any;
  purchase_price: any;
  useful_life: any;
  salvage_price: any;
  opening_book_price: any;
  depreciation_expense: any;
  ending_book_price: any;
};

export class DepreciationExporter {
  public raw_depreciation_records: DeprecationRecordType[] = [];
  public depreciation_records: DepreciationExport[] = [];
  public name: string | null = null;

  constructor(depreciation_records: DeprecationRecordType[]) {
    this.raw_depreciation_records = depreciation_records;
  }

  export() {
    const depreciation_records = this.prepareData();

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(depreciation_records);

    /* calculate column width */
    worksheet['!cols'] = [
        { wch: 5 },  // Width for column A
        { wch: 5 },  // Width for column B
        { wch: 20 },  // Width for column code
        { wch: 20 },  // Width for column method
        { wch: 25 },  // Width for column active_date
        { wch: 25 },  // Width for column purchase_price
        { wch: 5 },  // Width for column useful_life
        { wch: 25 },  // Width for column salvage_price
        { wch: 25 },  // Width for column opening_book_price
        { wch: 25 },  // Width for column depreciation_expense
        { wch: 25 },  // Width for column ending_book_price
      ];

    XLSX.utils.book_append_sheet(workbook, worksheet, this.name || "Sheet 1");
    XLSX.writeFile(workbook, "ReportFor2023.xlsx", { compression: true });
  }

  setName(name: string) {
    this.name = name;
  }

  prepareData(): DepreciationExport[] {
    if (!this.raw_depreciation_records) {
      throw new Error("Invalid depreciation records");
    }

    return this.raw_depreciation_records.map((record) => {
      return {
        period: record.period,
        year: record.year,
        code: record.asset.code,
        method: record.depreciation_method,
        active_date: record.asset.active_date.toLocaleDateString(),
        purchase_price: record.asset.purchase_price.toString(),
        useful_life: record.asset.useful_life,
        salvage_price: record.asset.salvage_price,
        opening_book_price: record.opening_book_price,
        depreciation_expense: record.depreciation_expense,
        ending_book_price: record.ending_book_price,
      };
    });
  }
}
