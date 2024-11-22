"use server";
import { Asset } from "@/models/asset/asset";

export async function getAssetLogs(id: number){
  return await Asset.loader().getLog(id);
}