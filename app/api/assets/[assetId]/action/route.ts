import { getAssetById } from "@/app/assets/actions";
import { uploadFile } from "@/app/base/file";
import prisma from "@/lib/db/prisma";
import { assets } from "@prisma/client";
import { parseJSON } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";
import { readData } from "./reader";
import { getCurrentUser } from "@/lib/session";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const {
      asset,
      name,
      changes,
      changes_log,
      action_cost,
      action_date,
      description,
      file_url,
    } = await readData(data);

    const user = await getCurrentUser();

    await prisma.assets.update({
      where: {
        id: asset.id,
      },
      data: changes,
    });

    await prisma.asset_logs.create({
      data: {
        name: name,
        user_id: Number(user?.id),
        metatype: "update",
        object_id: asset.id,
        object_export: {name: asset.name, id: asset.id, code: asset.code},
        object_type: "asset",
        action_cost: action_cost,
        action_date: action_date,
        changes: changes_log,
        description: description,
        file: file_url,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, message: error.message });
    }
  }
}
