import PageBody from "@/components/layout/PageBody";
import AssetSidebar from "../../@comps/AssetSidebar";
import AssetDisplay from "../../@comps/AssetDisplay";
import { notFound } from "next/navigation";
import { getAssetById, getAssetLogs } from "@/app/assets/actions";
import LogsDisplay from "../../@comps/LogsDisplay";

export default async function InfoPage({ params }: { params: { id: string } }) {
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
