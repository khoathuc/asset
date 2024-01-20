'use client'
import { assets } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

interface AssetContextProps {
  assetData: assets | null;
  fetchAssetData: (asset: assets) => Promise<void>;
}

const AssetContext = createContext<AssetContextProps | undefined>(undefined);

export const AssetProvider = ({ children }: { children: React.ReactNode }) => {
  const [assetData, setAssetData] = useState<assets | null>(null);

  const fetchAssetData = async (asset: assets) => {
    setAssetData(asset);
  };

  return (
    <AssetContext.Provider value={{ assetData, fetchAssetData }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssetData = () => {
  const context = useContext(AssetContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
