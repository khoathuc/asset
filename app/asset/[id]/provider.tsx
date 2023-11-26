"use client";
import { assets } from "@prisma/client";
import { useAssetData } from "@/context/asset.context";
import { useEffect } from "react";

export default function AssetPageProvider({
  asset,
  children,
}: {
  asset: assets;
  children: React.ReactNode;
}) {
  const { fetchAssetData } = useAssetData();

  useEffect(() => {
    fetchAssetData(asset);
  });

  return <>{children}</>
}
