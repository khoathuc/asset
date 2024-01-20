import prisma from "@/lib/db/prisma";
import { Asset } from "@/models/asset/asset";
import { NextRequest, NextResponse } from "next/server";

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

    if (asset.assignee_id) {
      throw new Error("Asset is assigned to user, please check in first");
    }

    const res = await prisma.assets.delete({
      where: {
        id: asset.id,
      },
    });

    await Asset.on(res).delete();

    return NextResponse.json({ success: true, asset: JSON.stringify(asset) });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
}
