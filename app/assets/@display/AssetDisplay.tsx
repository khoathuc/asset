import "@/styles/asset.display.css";
import ListRow from "@/components/ui/list/ListRow";
import List from "@/components/ui/list/List";
import { assets } from "@prisma/client";
import { Assignee } from "../@attrs/Assignee";
import { Status } from "../@attrs/Status";
import { Vendor } from "../@attrs/Vendor";
import { Location } from "../@attrs/Location";
import { Type } from "../@attrs/Type";
import { Date } from "../@attrs/Date";
import { AcquisitionCost } from "../@attrs/AcquisitionCost";
import DisplaySection from "@/components/layout/DisplaySection";
import Side from "@/components/layout/Side";
import More from "@/public/more.svg";
import AssetActions from "../assetaction/AssetActions";

type AssetDisplayProps = {
  asset: assets;
};

export default async function AssetDisplay({ asset }: AssetDisplayProps) {
  return (
    <DisplaySection label="Detail" className="relative px-6 py-4">
      <List>
        <ListRow label="Name">{asset.name}</ListRow>
        <ListRow label="Code">
          <div className="text-sm text-success">{asset.code}</div>
        </ListRow>
        <ListRow label="Serial">{asset.serial_number}</ListRow>
        <ListRow label="Current Assignee">
          <Assignee asset={asset} />
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
          <Date date={asset.active_date} />
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
      <Side className="right-6">
        <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
          <label
            tabIndex={0}
            className="btn h-8 min-h-fit w-8 bg-neutral p-0 text-neutral-content hover:text-neutral-focus"
          >
            <More className="h-4 w-4" />
          </label>
          <AssetActions asset={asset} />
        </div>
      </Side>
    </DisplaySection>
  );
}
