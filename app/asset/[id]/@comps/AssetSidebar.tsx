import { assets } from "@prisma/client";

type AssetSidebarProps = {
  asset: assets;
};

export default function AssetDisplay({ asset }: AssetSidebarProps) {
    return (
        <div className='bg-base-100 w-full h-full'>
            Side
        </div>
    )
    
}
