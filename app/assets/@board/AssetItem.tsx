"use client";
import { assets } from "@prisma/client";
import { Type } from "../@attrs/Type";
import { Assignee } from "../@attrs/Assignee";
import { Location } from "../@attrs/Location";
import { Date } from "../@attrs/Date";
import { Status } from "../@attrs/Status";
import { AcquisitionCost } from "../@attrs/AcquisitionCost";
import { BookValue } from "../@attrs/BookValue";
import { MoreButton } from "../@buttons/MoreButton";
import Link from "next/link";
import { LifeCycleCost } from "../@attrs/LifeCycleCost";


export function AssetItem({ asset }: { asset: assets }) {
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox checkbox-xs" />
        </label>
      </th>
      <td>{asset.code}</td>
      <td>
        <Link href={`/assets/${asset.id}`} className="link-neutral hover:link">
          {asset.name}
        </Link>
      </td>
      <td>
        <Assignee asset={asset}/>
      </td>
      <td>
        <Type asset={asset} />
      </td>
      <td>
        <Location asset={asset}/>
      </td>
      <td>
        <Date date={asset.active_date} />
      </td>
      <td>
        <Status asset={asset} />
      </td>
      <td>
        <AcquisitionCost asset={asset}/>
      </td>
      <td>
        <LifeCycleCost asset={asset} />
      </td>
      <td>
        <MoreButton asset={asset} />
      </td>
    </tr>
  );
}
