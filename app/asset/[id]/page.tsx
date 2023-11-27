import { getAllAssets } from "@/app/assets/actions";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const assets = await getAllAssets();

  return assets.map((asset) => ({
    id: asset.id.toString(),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  redirect(`/asset/${params.id}/info`);
}
