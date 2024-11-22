"use client";
import { useData } from "@/context/data.context";
import { assets, types } from "@prisma/client";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const groupAssetsByType = function (
  assets: assets[],
  types: types[],
) {
  const groupedByType: { type: types; assets: assets[] }[] = [];

  // Initialize the array with empty arrays for each type
  types.forEach((type) => {
    groupedByType.push({ type, assets: [] });
  });

  // Group assets by status
  assets.forEach((asset) => {
    const type = types.find((s) => s.id === asset.type_id);
    if (type) {
      const index = groupedByType.findIndex(
        (group) => group.type.id === type.id,
      );
      if (index !== -1) {
        groupedByType[index].assets.push(asset);
      }
    }
  });

  return groupedByType;
};

export default async function AssetAssetTypePieChart({
  assets,
}: {
  assets: assets[];
}) {
  const { contextData } = useData();
  const { types } = contextData;

  const group_assets_by_types = groupAssetsByType(assets, types);

  var assets_series: number[] = [];
  var type_label: string[] = [];

  group_assets_by_types.forEach((e) => {
    type_label.push(e.type.name);
    assets_series.push(e.assets.length);
  });

  const state = {
    series: assets_series,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: type_label,
      title: {
        text: "Asset By Type",
        align: "left",
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
