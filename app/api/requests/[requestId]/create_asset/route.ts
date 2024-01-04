import prisma from "@/lib/db/prisma";
import { Asset } from "@/models/asset/asset";
import { Request } from "@/models/request/request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const request_id = formData.get('request_id')?.toString();
    if(!request_id){
      throw new Error("Invalid request");
    }

    const request = await Request.loader().getById(parseInt(request_id));
    
    if(!request){
      throw new Error('Invalid Request');
    }

    const data = await Asset.reader(formData).read();

    const asset = await prisma.assets.create({
      data: {
        name: data.name,
        description: data.description,
        code: data.code,
        tag_ids: data.tag_ids,
        serial_number: data.serial_number,
        type_id: data.type_id,
        location_id: data.location_id,
        vendor_id: data.vendor_id,
        status_id: data.status_id,
        active_date: data.active_date,
        image: data.image,
        form: data.form,
        purchase_price: data.purchase_price,
      },
    });

    const asset_log = await Asset.on(asset).create();
    
    Request.on(request).onCreateAsset(asset, asset_log);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
}
