import { getAllAssets, getAssetById } from "@/app/assets/actions"
import PageHeader from "@/components/layout/PageHeader";
import "@/styles/asset.css";

export async function generateStaticParams(){
    const assets = await getAllAssets();

    return assets.map((asset)=>({
        id: asset.id.toString(),
    }))
}

export default async function Page({params}:{params:{id: string}}){
    const asset = await getAssetById(parseInt(params.id));

    return (
        <>
            <PageHeader label={`View asset ${asset?.code} - ${asset?.name}`} className='asset-display-header justify-center items-center text-sm font-medium'/>
        </>
    )
}