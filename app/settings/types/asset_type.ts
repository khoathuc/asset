import { useData } from "@/context/data.context";
import { types } from "@prisma/client";

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

export function getTypeById(id: number|string) {
  const { contextData } = useData();
  const { types } = contextData;
  
  const res = types.find((type: types)=>type.id == id);

  return res;
}
