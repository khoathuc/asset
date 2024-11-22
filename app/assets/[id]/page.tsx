import { getAllAssets, getAssetById } from "@/app/assets/actions";
import { notFound, redirect } from "next/navigation";
import { getAssetLogs } from "../assetlog/action";
import PageBody from "@/components/layout/PageBody";
import AssetSidebar from "../@display/AssetSidebar";
import AssetDisplay from "../@display/AssetDisplay";
import LogsDisplay from "../assetlog/@logs/LogsDisplay";

export async function generateStaticParams() {
  const assets = await getAllAssets();

  return assets.map((asset) => ({
    id: asset.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const asset = await getAssetById(parseInt(params.id));
  if (!asset) {
    return notFound();
  }

  const logs = await getAssetLogs(parseInt(params.id));

  return (
    <PageBody
      side={<AssetSidebar asset={asset} />}
      side_20
      compact
      scroll-y
      className="bg-base-200"
    >
      <div className="asset-display flex flex-col items-center justify-center gap-10 px-10 py-5 pb-32">
        <AssetDisplay asset={asset} />
        <LogsDisplay logs={logs} />
      </div>
    </PageBody>
  );
}
