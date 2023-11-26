"use client";
import { assets } from "@prisma/client";
import { Type } from "../../../asset/attrs/Type";
import { Assignee } from "../../../asset/attrs/Assignee";
import { Location } from "../../../asset/attrs/Location";
import { Date } from "../../../asset/attrs/Date";
import { Status } from "../../../asset/attrs/Status";
import { AcquisitionCost } from "../../../asset/attrs/AcquisitionCost";
import { BookValue } from "../../../asset/attrs/BookValue";
import { MoreButton } from "./MoreButton";
import Link from "next/link";


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
        <Link href={`/asset/${asset.id}`} className="link-neutral hover:link">
          {asset.name}
        </Link>
      </td>
      <td>
        <Assignee />
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
        <BookValue asset={asset}/>
      </td>
      <td>
        <MoreButton asset={asset} />
      </td>
    </tr>
  );
}
