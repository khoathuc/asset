import prisma from "@/lib/db/prisma";
import { Asset } from "@/models/asset/asset";
import { NextRequest, NextResponse } from "next/server";
var randomstring = require("randomstring");

//from chat GPT :)))
function replaceStringAfterUnderscore(inputString: string, replacement: string) {
  const indexOfUnderscore = inputString.indexOf('_');

  if (indexOfUnderscore !== -1) {
    // Extract the part before the underscore
    const partBeforeUnderscore = inputString.substring(0, indexOfUnderscore + 1);

    // Replace the part after the underscore with the specified replacement
    const modifiedString = partBeforeUnderscore + replacement;

    return modifiedString;
  } else {
    // If there is no underscore, return the original string
    return inputString;
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { assetId: string } },
) {
  try {
    const asset_id = params.assetId.toString();
    const asset = await Asset.loader().getById(Number(asset_id));

    if (!asset) {
      throw new Error("Invalid asset");
    }

    const rand = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });

    const code = replaceStringAfterUnderscore(asset.code, rand);

    const res = await prisma.assets.create({
      data: {
        name: asset.name,
        description: asset.description,
        code,
        tag_ids: asset.tag_ids,
        serial_number: asset.serial_number,
        type_id: asset.type_id,
        location_id: asset.location_id,
        vendor_id: asset.vendor_id,
        status_id: asset.status_id,
        active_date: asset.active_date,
        image: asset.image,
        form: asset.form,
        purchase_price: asset.purchase_price,
      },
    });

    await Asset.on(res).create();
    await Asset.on(res).duplicate(asset);

    return NextResponse.json({ success: true, asset: res });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
}
