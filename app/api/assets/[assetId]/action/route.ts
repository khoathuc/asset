import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { readData } from "./reader";
import { getCurrentUser } from "@/lib/session";
import { Asset } from "@/models/asset/asset";
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const action_data = await readData(data);

    var life_cost = action_data.asset.life_cost?.toString();
    if(!life_cost){
      life_cost = '0'
    }

    const res = await prisma.assets.update({
      where: {
        id: action_data.asset.id,
      },
      data: {...action_data.changes, life_cost: parseFloat(action_data.action_cost) + parseFloat(life_cost)},
    });

    await Asset.on(res).action(action_data);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
}
