import PageBody from "@/components/layout/PageBody";
import PageHeader from "@/components/layout/PageHeader";
import Stats from "./@stat/Stat";
import AssetMonthLyLineChart from "./@linechart/AssetMonthLyLineChart";
import AssetStatusPieChart from "./@piechart/AssetStatusPieChart";
import { getAllAssets } from "../assets/actions";
import AssetLocationPieChart from "./@piechart/AssetLocationPieChart";
import AssetAssetTypePieChart from "./@piechart/AssetAssetTypePieChart";

export default async function Page() {
  const assets = await getAllAssets();

  return (
    <>
      <PageHeader
        label="Dashboard"
        subLabel="Acquire, operate, maintain, and dispose of assets"
      ></PageHeader>
      <PageBody>
        <div className="flex h-full w-full flex-1 justify-center overflow-auto px-12">
          <div className="flex flex-col">
            <div className="mt-5 w-full">
              <Stats />
            </div>
            <div className="mt-5 flex gap-10">
              <AssetMonthLyLineChart />
              <AssetStatusPieChart assets={assets}/>
            </div>
            <div className="mt-5 flex gap-10 pb-20">
              <AssetLocationPieChart assets={assets} />
              <AssetAssetTypePieChart assets={assets}/>
            </div>
          </div>
        </div>
      </PageBody>
    </>
  );
}
