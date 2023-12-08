import "@/styles/asset.display.css";
import ListRow from "@/components/ui/list/ListRow";
import List from "@/components/ui/list/List";
import { assets } from "@prisma/client";
import { Assignee } from "../attrs/Assignee";
import { Status } from "../attrs/Status";
import { Vendor } from "../attrs/Vendor";
import { Location } from "../attrs/Location";
import { Type } from "../attrs/Type";
import { Date } from "../attrs/Date";
import { AcquisitionCost } from "../attrs/AcquisitionCost";

type AssetDisplayProps = {
  asset: assets;
};

export default function AssetDisplay({ asset }: AssetDisplayProps) {
  return (
    <div className="flex-start asset-display flex px-10 py-5">
      <List label="Detail" className="test-sm zebra w-3/4">
        <ListRow label="Name">{asset.name}</ListRow>
        <ListRow label="Code">
          <div className="text-sm text-success">{asset.code}</div>
        </ListRow>
        <ListRow label="Serial">{asset.serial_number}</ListRow>
        <ListRow label="Current Assignee">
          <Assignee />
        </ListRow>
        <ListRow label="Status">
          <Status asset={asset} />
        </ListRow>
        <ListRow label="Tags"></ListRow>
        <ListRow label="Vendor">
          <div className="text-sm">
            <Vendor asset={asset} />
          </div>
        </ListRow>
        <ListRow label="Location">
          <Location asset={asset} />
        </ListRow>
        <ListRow label="Asset Type">
          <Type asset={asset} />
        </ListRow>
        {asset.form &&
          Array.isArray(asset.form) &&
          asset.form.map((field: any, index: number) => {
            return (
              <ListRow label={field.name} id={field.id}>
                <div>{field.value}</div>
              </ListRow>
            );
          })}
        <ListRow label="Purchase Date">
          <Date date={asset.purchase_date} />
        </ListRow>
        <ListRow label="Purchase Cost">
          <AcquisitionCost asset={asset} />
        </ListRow>
        <ListRow label="Created At">
          <Date date={asset.since} />
        </ListRow>
        <ListRow label="Updated At">
          <Date date={asset.last_update} />
        </ListRow>
        <ListRow label="Description">
          <div>{asset.description}</div>
        </ListRow>
      </List>
    </div>
  );
}
