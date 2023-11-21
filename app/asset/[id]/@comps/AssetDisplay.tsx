import { assets } from "@prisma/client";

type AssetDisplayProps = {
  asset: assets;
};

export default function AssetDisplay({ asset }: AssetDisplayProps) {
    return (
        <div>AssetDisplayPage</div>
    )

}
