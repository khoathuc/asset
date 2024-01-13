"use client";
import { assets } from "@prisma/client";
import { AssetItem } from "./AssetItem";

export default function AssetBoard({ assets }: { assets: assets[] }) {
  return (
    <>
      <div className="w-full bg-base-100">
        <div className="overflow-x-auto h-full">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox checkbox-xs" />
                  </label>
                </th>
                <th>Code</th>
                <th>Asset</th>
                <th>Assignee</th>
                <th>Type</th>
                <th>Location</th>
                <th>Acquisition Date</th>
                <th>Status</th>
                <th>Acquisition Cost</th>
                <th>Current Book Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <AssetItem key={asset.id} asset={asset} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
