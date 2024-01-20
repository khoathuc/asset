"use client";
import { getAllAssets } from "@/app/assets/actions";
import { getAllStatuses } from "@/app/settings/statuses/status";
import { useData } from "@/context/data.context";
import { assets, statuses } from "@prisma/client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const groupAssetsByStatus = function (assets: assets[], statuses: statuses[]) {
  const groupedByStatus: { status: statuses; assets: assets[] }[] = [];

  // Initialize the array with empty arrays for each status
  statuses.forEach((status) => {
    groupedByStatus.push({ status, assets: [] });
  });

  // Group assets by status
  assets.forEach((asset) => {
    const status = statuses.find((s) => s.id === asset.status_id);
    if (status) {
      const index = groupedByStatus.findIndex(
        (group) => group.status.id === status.id,
      );
      if (index !== -1) {
        groupedByStatus[index].assets.push(asset);
      }
    }
  });

  return groupedByStatus;
};

export default async function AssetStatusPieChart({
  assets,
}: {
  assets: assets[];
}) {
  const { contextData } = useData();
  const { statuses } = contextData;

  const group_assets_by_statuses = groupAssetsByStatus(assets, statuses);

  var assets_series: number[] = [];
  var status_label: string[] = [];
  var status_color: string[] = [];

  group_assets_by_statuses.forEach((e) => {
    status_label.push(e.status.name);
    assets_series.push(e.assets.length);
    status_color.push(e.status.color);
  });

  const state = {
    series: assets_series,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: status_label,
      title: {
        text: "Asset By Status",
        align: "left",
      },
      fill: {
        colors: status_color,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };


  return (
    <div className="flex justify-center rounded-md bg-base-100 p-4 shadow-md">
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="pie"
          width={500}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
