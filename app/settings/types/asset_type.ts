import { useData } from "@/context/data.context";

export interface AssetTypeOption {
  readonly value: string;
  readonly label: string;
}

export function getAllAssetTypes() {
  const { contextData } = useData();
  const { types } = contextData;

  var assetTypeOptions: AssetTypeOption[] = [];

  types.forEach((assetType: any) => {
    assetTypeOptions.push({
      value: assetType.id,
      label: assetType.name,
    });
  });

  return assetTypeOptions;
}
