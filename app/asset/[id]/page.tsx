import "@/styles/asset.css";
import { notFound } from "next/navigation";
import { getAllAssets, getAssetById } from "@/app/assets/actions";
import PageBody from "@/components/layout/PageBody";
import PageHeader from "@/components/layout/PageHeader";
import AssetDisplay from "./@comps/AssetDisplay";
import AssetSidebar from "./@comps/AssetSidebar";

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

  return (
    <>
      <PageHeader
        label={`View asset ${asset?.name}`}
        compact
        className="asset-display-header items-center justify-center text-sm font-medium"
      />
      <PageBody side={<AssetSidebar asset={asset}/>} compact>
        <AssetDisplay asset={asset} />
      </PageBody>
    </>
  );
}
