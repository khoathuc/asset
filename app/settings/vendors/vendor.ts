import { useData } from "@/context/data.context";

export interface VendorOption {
  readonly value: string;
  readonly label: string;
}

export function getAllVendors() {
  const { contextData } = useData();
  const { vendors } = contextData;

  var vendorOptions: VendorOption[] = [];

  vendors.forEach((vendor: any) => {
    vendorOptions.push({
      value: vendor.id,
      label: vendor.name,
    });
  });

  return vendorOptions;
}
