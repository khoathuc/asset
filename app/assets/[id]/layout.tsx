import "@/styles/asset.css";
import { notFound } from "next/navigation";
import { getAllAssets } from "@/app/assets/actions";
import PageHeader from "@/components/layout/PageHeader";
import { AssetNav } from "../@display/AssetNav";
import { getAssetById } from "../actions";

export async function generateStaticParams() {
  const assets = await getAllAssets();

  return assets.map((asset) => ({
    id: asset.id.toString(),
  }));
}

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const asset = await getAssetById(parseInt(params.id));
  if (!asset) {
    return notFound();
  }

  return (
    <>
      <div className="asset-display-page absolute inset-0">
        <PageHeader
          backUrl="/assets"
          label={`View asset ${asset?.name}`}
          compact
          className="asset-display-header text-sm font-medium"
        >
          <AssetNav params={params} />
        </PageHeader>
        {children}
      </div>
    </>
  );
}
