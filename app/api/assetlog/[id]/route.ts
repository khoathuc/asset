import { AssetLog } from "@/models/asset/asset_log/asset_log"

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const id = params.id 
    const asset_log = await AssetLog.loader().getById(parseInt(id));

    return Response.json({asset_log: asset_log})
  }