"use client";
import { useData } from "@/context/data.context";
import { assets, locations } from "@prisma/client";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const groupAssetsByLocation = function (
  assets: assets[],
  locations: locations[],
) {
  const groupedByLocation: { location: locations; assets: assets[] }[] = [];

  // Initialize the array with empty arrays for each location
  locations.forEach((location) => {
    groupedByLocation.push({ location, assets: [] });
  });

  // Group assets by status
  assets.forEach((asset) => {
    const location = locations.find((s) => s.id === asset.location_id);
    if (location) {
      const index = groupedByLocation.findIndex(
        (group) => group.location.id === location.id,
      );
      if (index !== -1) {
        groupedByLocation[index].assets.push(asset);
      }
    }
  });

  return groupedByLocation;
};

export default async function AssetLocationPieChart({
  assets,
}: {
  assets: assets[];
}) {
  const { contextData } = useData();
  const { locations } = contextData;

  const group_assets_by_locations = groupAssetsByLocation(assets, locations);

  var assets_series: number[] = [];
  var location_label: string[] = [];

  group_assets_by_locations.forEach((e) => {
    location_label.push(e.location.name);
    assets_series.push(e.assets.length);
  });

  const state = {
    series: assets_series,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: location_label,
      title: {
        text: "Asset By Location",
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
