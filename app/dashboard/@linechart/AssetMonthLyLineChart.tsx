"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getAllAssetInYear } from "@/app/assets/actions";
import { assets } from "@prisma/client";
import YearPicker from "@/components/ui/picker/YearPicker";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const raw_state = {
  series: [
    {
      name: "Asset Created",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Asset Created in this Year",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  },
};

function groupAssetsByMonth(assets: assets[]): number[] {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const countsByMonth: number[] = Array.from({ length: 12 }, () => 0);

  assets.forEach((asset) => {
    const monthIndex = asset.since.getMonth();
    countsByMonth[monthIndex]++;
  });

  return countsByMonth;
}

export default function AssetMonthLyLineChart() {
  const [selected_year, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [state, setState] = useState(raw_state);
  
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    const fetchAssetStatMonthly = async () => {
      const all_assets = await getAllAssetInYear(selected_year);
      const group_assets_by_month = groupAssetsByMonth(all_assets);

      setState({
        ...state,
        series: [
          {
            name: "Asset Created",
            data: group_assets_by_month,
          },
        ],
      });
    };

    fetchAssetStatMonthly();
  }, [selected_year]);

  return (
    <div className="rounded-md bg-base-100 p-4 shadow-md">
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
          width={500}
        />
      </div>
      <div id="html-dist"></div>
      <div className="flex justify-center">
        <YearPicker selectedYear={selected_year}  onChange={handleYearChange}/>
      </div>
    </div>
  );
}
