import PageBody from "@/components/layout/PageBody";
import AssetSidebar from "../../@comps/AssetSidebar";
import AssetDisplay from "../../@comps/AssetDisplay";
import { notFound } from "next/navigation";
import { getAssetById } from "@/app/assets/actions";

export default async function InfoPage({ params }: { params: { id: string } }) {
  const asset = await getAssetById(parseInt(params.id));
  if (!asset) {
    return notFound();
  }

  return (
    <PageBody side={<AssetSidebar asset={asset} />} side_20 compact className='bg-base-100'>
      <AssetDisplay asset={asset} />
    </PageBody>
  );
}
