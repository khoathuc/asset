"use server"
import { Asset } from "@/models/asset/asset";

export async function statMonthly(){
    return await Asset.stat().monthly();
}